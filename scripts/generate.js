#!/usr/bin/env node
/* ============================================================
   Tommy's Tunes — static page generator

   Reads the data files in /js/data and writes finished HTML for
   every detail page (team, services, packages) and the reviews page,
   plus sitemap.xml. Netlify runs this at deploy time (see netlify.toml)
   so crawlers get real names, bios, copy, and per-page <title> in the
   RAW HTML instead of an empty JS shell.

   The data files stay the single source of truth — this script only
   assembles output. To preview detail pages locally, run:
     node scripts/generate.js
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://tommystunes.com';

/* The 5 high-intent event pages get keyword URLs; everything else
   follows the uniform /service|person|package/<slug>/ pattern. */
const EVENT_URLS = {
  'weddings': 'wedding-dj-long-island',
  'sweet-16-quinces': 'sweet-16-dj',
  'mitzvahs': 'bar-bat-mitzvah-dj',
  'corporate': 'corporate-event-dj',
  'other-events': 'other-events',
  'live-music': 'live-wedding-music-long-island',
  'photo-booths': 'photo-booth-rental-long-island',
};

/* Static (already server-rendered) pages, for the sitemap. */
const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services.html', priority: '0.9', changefreq: 'monthly' },
  { loc: '/packages.html', priority: '0.9', changefreq: 'monthly' },
  { loc: '/team.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/showcase.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/about.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/faq.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/venues.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/vendors.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/service-area.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/careers.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/forms.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/music-suggestions.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms.html', priority: '0.3', changefreq: 'yearly' },
];

const sitemapUrls = [];

/* ---------------- helpers ---------------- */

function loadWindow(rel) {
  const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: rel });
  return sandbox.window;
}

function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripTags(str) {
  return String(str == null ? '' : str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(str, n) {
  const s = stripTags(str);
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

/* Replace the inner content of the first element bearing `attr`
   (e.g. 'data-slot="name"' or 'data-reviews-grid'). Tag-agnostic via
   a backreference; safe because every target slot starts empty. */
function fillByAttr(html, attr, inner) {
  const esc = attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(<([a-zA-Z0-9]+)\\b[^>]*\\b' + esc + '[^>]*>)([\\s\\S]*?)(<\\/\\2>)');
  return html.replace(re, (m, open, tag, mid, close) => open + inner + close);
}

function fillSlot(html, slot, inner) {
  return fillByAttr(html, 'data-slot="' + slot + '"', inner);
}

function setMeta(html, { title, description, url }) {
  const t = escapeHTML(title);
  const d = escapeHTML(description);
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + t + '</title>');
  html = html.replace(/(<meta name="description" content=")[^"]*(">)/, '$1' + d + '$2');
  html = html.replace(/(<meta property="og:title" content=")[^"]*(">)/, '$1' + t + '$2');
  html = html.replace(/(<meta property="og:description" content=")[^"]*(">)/, '$1' + d + '$2');
  // Drop any existing canonical/og:url, then inject fresh ones before </head>.
  html = html.replace(/[ \t]*<meta property="og:url"[^>]*>\s*\n?/g, '');
  html = html.replace(/[ \t]*<link rel="canonical"[^>]*>\s*\n?/g, '');
  html = html.replace('</head>',
    '  <link rel="canonical" href="' + url + '">\n' +
    '  <meta property="og:url" content="' + url + '">\n</head>');
  return html;
}

function setBodySlug(html, slug) {
  return html.replace(/<body([^>]*)>/, (m, attrs) =>
    /data-slug=/.test(attrs) ? m : '<body' + attrs + ' data-slug="' + escapeHTML(slug) + '">');
}

function includedList(items) {
  if (!items || !items.length) return '';
  return items.map((it) => '<li>' + escapeHTML(it) + '</li>').join('');
}

function writeFile(rel, content) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
}

function servicePathFor(slug) {
  return EVENT_URLS[slug] ? EVENT_URLS[slug] + '/' : 'service/' + slug + '/';
}

/* ---------------- landing page format ---------------- */

let LANDING = { services: {}, packages: {}, people: {} };
let REVIEWS = [];
const landingWarnings = [];

/* A quote must be a verbatim piece of a real review. The attribution is built
   from that review, never typed by hand. If it is not found the card is left
   out and the build reports it, rather than showing an unverifiable quote. */
function lpReview(review, label) {
  if (!review) return '';
  const q = review.quote.toLowerCase();
  const found = REVIEWS.find((r) => (r.review_text || '').toLowerCase().includes(q));
  if (!found) { landingWarnings.push(`${label}: quote not found in reviews`); return ''; }
  const shown = review.quote.charAt(0).toUpperCase() + review.quote.slice(1);
  const who = [shortName(found.name), review.note || formatEvent(found.event_type).toLowerCase(), formatDate(found.date)].filter(Boolean).join(', ');
  return `<figure class="lp-review">
          ${review.general ? '<p class="lp-review-label">About Tommy&#39;s Tunes</p>' : ''}<div class="lp-stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <blockquote>${escapeHTML(shown)}</blockquote>
          <figcaption>${escapeHTML(who)} &middot; ${escapeHTML(found.source)}</figcaption>
          <p class="lp-trust">40+ years on Long Island &middot; ${REVIEWS.length} reviews</p>
        </figure>`;
}

function lpQuestions(list) {
  if (!list || !list.length) return '';
  let costDone = false;
  const items = list.map(([q, a]) => {
    const isCost = !costDone && /how much/i.test(q);
    if (isCost) costDone = true;
    return `<details class="lp-q"${isCost ? ' id="cost"' : ''}><summary>${q}</summary><p>${a}</p></details>`;
  }).join('\n          ');
  return `<section class="section section-tinted" data-toc="Questions">
      <div class="container">
        <div class="section-head">
          <span class="overline">Good to know</span>
          <h2>Your questions, <em>answered.</em></h2>
        </div>
        <div class="lp-qs">
          ${items}
        </div>
      </div>
    </section>`;
}

function lpOverview(paras) {
  return (paras || []).map((t) => `<p>${t}</p>`).join('');
}

/* The overview, the headline and the questions are finished HTML, so the
   render script must not replace them: the slot attribute comes off here. */
function applyLanding(html, entry, r, label) {
  const e = entry || {};
  html = html.replace('<!--LP:HEADLINE-->', e.headline || escapeHTML(r.name));
  html = html.replace('<!--LP:REVIEW-->', lpReview(e.review, label));
  html = html.replace('<!--LP:QUESTIONS-->', lpQuestions(e.questions));
  if (!e.review) html = html.replace('class="lp-copy"', 'class="lp-copy lp-copy--solo"');
  const photo = r.photo && !/coming-soon/.test(r.photo) ? r.photo : '';
  if (!photo) return html.replace(/\s*<div class="lp-media"[^>]*><\/div>/, '');
  // The hero frame is a wide strip (about 2.8:1 on a laptop). A tall, squarish
  // or small photo cropped to fill it loses its subject and gets stretched, so
  // those are shown whole over a blurred copy of themselves instead.
  const size = imageSize(photo);
  const fit = r.photoFit ?? (size && (size.w / size.h < 1.4 || size.w < 1000));
  const url = escapeHTML(photo);
  // The hero is a CSS background, which the browser's preload scanner cannot
  // see, so announce it in <head> as the page's top-priority image.
  html = html.replace('</head>', `  <link rel="preload" as="image" href="${url}" fetchpriority="high">\n</head>`);
  return html.replace('class="lp-media" data-slot="hero-photo" role="img"', fit
    ? `class="lp-media lp-media--fit" data-slot="hero-photo" role="img" aria-label="${escapeHTML(r.name)}" style="--photo:url('${url}')"`
    : `class="lp-media" data-slot="hero-photo" role="img" aria-label="${escapeHTML(r.name)}" style="background-image:url('${url}');${escapeHTML(r.photoStyle || '')}"`);
}

// Pixel size of a JPEG or PNG under the site root, read from its header.
function imageSize(webPath) {
  let b;
  try { b = fs.readFileSync(path.join(ROOT, webPath)); } catch { return null; }
  if (b[0] === 0x89 && b[1] === 0x50) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC)
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

/* ---------------- detail pages ---------------- */

function genPersons(tpl, data) {
  data.forEach((r) => {
    const title = r.role ? `${r.name} · ${r.role} · Tommy's Tunes` : `${r.name} · Tommy's Tunes`;
    const desc = r.bio ? truncate(r.bio, 155)
      : (r.role ? `${r.name}, ${r.role} at Tommy's Tunes — Long Island DJ entertainment since 1985.`
                : "A named member of the Tommy's Tunes team.");
    const url = SITE + '/person/' + r.slug + '/';
    let html = setMeta(tpl, { title, description: desc, url });
    html = setBodySlug(html, r.slug);
    html = fillSlot(html, 'kicker', 'The team');
    const lp = LANDING.people[r.slug] || {};
    html = html.replace('<!--LP:HEADLINE-->', lp.headline || escapeHTML(r.name));
    html = html.replace('<!--LP:REVIEW-->', lpReview(lp.review, 'person ' + r.slug));
    html = fillSlot(html, 'role', escapeHTML(r.role || ''));
    html = fillSlot(html, 'bio', escapeHTML(r.bio || ''));
    // Bake the portrait into the HTML so it is the page's high-priority image
    // from the first byte, not something detail-render.js fills in later.
    if (r.photo) {
      const size = imageSize(r.photo);
      const dims = size ? ` width="${size.w}" height="${size.h}"` : '';
      const style = r.photoStyle ? ` style="${escapeHTML(r.photoStyle)}"` : '';
      html = html.replace('<img data-slot="hero-img" alt="">',
        `<img data-slot="hero-img" src="${escapeHTML(r.photo)}" alt="${escapeHTML(r.name + (r.role ? ', ' + r.role : ''))}"${dims} fetchpriority="high"${style}>`);
    }
    writeFile('person/' + r.slug + '/index.html', html);
    sitemapUrls.push({ loc: url, priority: '0.6', changefreq: 'monthly' });
  });
}

function genServices(tpl, data) {
  data.forEach((r) => {
    const isEvent = !!EVENT_URLS[r.slug];
    const title = r.metaTitle || `${r.name} · Tommy's Tunes`;
    const desc = r.metaDescription || r.shortDesc || "A specific Tommy's Tunes service or upgrade.";
    const sub = servicePathFor(r.slug);
    const url = SITE + '/' + sub;
    let html = setMeta(tpl, { title, description: desc, url });
    html = setBodySlug(html, r.slug);
    const lp = LANDING.services[r.slug];
    html = applyLanding(html, lp, r, 'service ' + r.slug);
    html = fillSlot(html, 'kicker', escapeHTML(r.kicker || (isEvent ? 'Events' : (r.category || 'Services')))).replace('data-slot="kicker"', '');
    html = fillSlot(html, 'role', (lp && lp.role) || escapeHTML(r.shortDesc || '')).replace('data-slot="role"', '');
    const body = lp && lp.overview ? lpOverview(lp.overview) : (r.longBody || escapeHTML(r.shortDesc || ''));
    html = fillSlot(html, 'bio', body).replace('data-slot="bio"', 'data-bio');
    if (r.included && r.included.length) html = fillSlot(html, 'included', includedList(r.included));
    writeFile(sub + 'index.html', html);
    sitemapUrls.push({ loc: url, priority: isEvent ? '0.9' : '0.6', changefreq: 'monthly' });
  });
}

function genPackages(tpl, data) {
  data.forEach((r) => {
    /* Was hardcoded to the name, which silently threw away any metaTitle on a
       package record. genServices has always honoured it; this did not. */
    const title = r.metaTitle || `${r.name} · Tommy's Tunes`;
    const desc = r.metaDescription || r.tagline || "A specific Tommy's Tunes package tier.";
    const url = SITE + '/package/' + r.slug + '/';
    let html = setMeta(tpl, { title, description: desc, url });
    html = setBodySlug(html, r.slug);
    const lp = LANDING.packages[r.slug];
    html = applyLanding(html, lp, r, 'package ' + r.slug);
    html = fillSlot(html, 'kicker', 'Packages');
    html = fillSlot(html, 'role', escapeHTML(r.tagline || ''));
    const body = lp && lp.overview ? lpOverview(lp.overview) : escapeHTML(r.longBody || '');
    html = fillSlot(html, 'bio', body).replace('data-slot="bio"', 'data-bio');
    if (r.included && r.included.length) html = fillSlot(html, 'included', includedList(r.included));
    writeFile('package/' + r.slug + '/index.html', html);
    sitemapUrls.push({ loc: url, priority: '0.6', changefreq: 'monthly' });
  });
}

/* ---------------- reviews page ---------------- */

const SOURCE_URLS = {
  'The Knot': 'https://www.theknot.com/marketplace/tommys-tunes-dj-entertainment-selden-ny-209421',
  'WeddingWire': 'https://m.weddingwire.com/biz/tommys-tunes-selden-syosset/507ba584bfd4f3f3',
  'Google': 'https://www.google.com/search?q=Tommy%27s+Tunes+DJ+Entertainment+Selden+NY',
  'Yelp': 'https://www.yelp.com/search?find_desc=Tommy%27s+Tunes+DJ&find_loc=Selden%2C+NY',
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EVENT_LABELS = {
  'wedding': 'Wedding', 'sweet 16': 'Sweet 16', 'mitzvah': 'Mitzvah', 'corporate': 'Corporate',
  'communion': 'Communion', 'birthday': 'Birthday', 'bridal shower': 'Bridal shower', 'other': 'Other event',
};

function shortName(full) {
  const p = (full || '').trim().split(/\s+/);
  if (!p[0]) return '';
  if (p.length === 1) return p[0];
  return p[0] + ' ' + p[p.length - 1][0] + '.';
}
function formatDate(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const i = parseInt(m, 10) - 1;
  return MONTHS[i] ? `${MONTHS[i]} ${y}` : ym;
}
function formatEvent(e) {
  if (!e) return '';
  return EVENT_LABELS[e] || (e.charAt(0).toUpperCase() + e.slice(1));
}

function reviewCard(r) {
  const stars = '★'.repeat(r.rating || 5);
  const djs = (r.named_djs || []).filter(Boolean);
  const djLine = djs.length ? `\n          <div class="review-talent">with ${escapeHTML(djs.join(' + '))}</div>` : '';
  const sourceUrl = SOURCE_URLS[r.source] || '#';
  const dateLine = r.date ? `\n            <span> · ${escapeHTML(formatDate(r.date))}</span>` : '';
  return `
      <article class="review-card">
        <div class="review-stars" aria-label="${r.rating || 5} out of 5 stars">${stars}</div>
        <p class="review-quote">${escapeHTML(r.review_text)}</p>
        <div class="review-meta">
          <div class="review-byline">
            <strong>${escapeHTML(shortName(r.name))}</strong>
            <span> · ${escapeHTML(formatEvent(r.event_type))}</span>${dateLine}
          </div>${djLine}
          <a href="${escapeHTML(sourceUrl)}" class="review-source" target="_blank" rel="noopener">Verified on ${escapeHTML(r.source)} →</a>
        </div>
      </article>`;
}

/* Structured-data review count, from the review data rather than typed in. */
function setReviewCount(html, n) {
  return html.replace(/("reviewCount":\s*")\d+(")/g, `$1${n}$2`);
}

function genReviews(tpl, data) {
  const cards = data.map(reviewCard).join('') + '\n    ';
  let html = setMeta(tpl, {
    title: "Reviews · Tommy's Tunes",
    description: `${data.length} verified reviews from real Long Island couples and families, sourced from The Knot, WeddingWire, Google, and Yelp.`,
    url: SITE + '/reviews/',
  });
  html = fillByAttr(html, 'data-reviews-grid', cards);
  html = fillByAttr(html, 'data-reviews-counter', `Showing ${data.length} reviews`);
  html = setReviewCount(html, data.length);
  writeFile('reviews/index.html', html);

  // The homepage carries the same AggregateRating. It was hand-typed as 250
  // and went stale the day new reviews were added, so keep it in step here.
  const homeFile = path.join(ROOT, 'index.html');
  const home = fs.readFileSync(homeFile, 'utf8');
  const nextHome = setReviewCount(home, data.length);
  if (nextHome !== home) fs.writeFileSync(homeFile, nextHome);
  sitemapUrls.push({ loc: SITE + '/reviews/', priority: '0.8', changefreq: 'weekly' });
}

/* ---------------- sitemap ---------------- */

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const all = STATIC_PAGES
    .map((s) => ({ loc: SITE + s.loc, priority: s.priority, changefreq: s.changefreq }))
    .concat(sitemapUrls);
  const body = all.map((u) =>
    `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ).join('\n\n');
  writeFile('sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${body}\n\n</urlset>\n`);
}

/* ---------------- asset fingerprints ----------------
   /css and /js are cached for an hour, but pages are not. So after a deploy,
   anyone who had visited in the last hour got the new HTML with the old
   stylesheet: on 2026-11-24 the new "Popular" tags showed as plain text and
   the new cards had no styling. Stamping every local stylesheet and script
   link with a hash of the file (styles.css?v=3f9a2c1b0d) makes a changed file
   a new URL, so browsers fetch it at once and keep the cache when it hasn't
   changed.

   Runs on Netlify builds only (NETLIFY=true), or locally with FINGERPRINT=1,
   so working copies don't churn on every CSS edit. Idempotent: an existing
   ?v= is replaced, never doubled. */

const SKIP_DIRS = new Set(['node_modules', '.git', '.playwright-mcp', '.claude', '.netlify', 'templates', 'reports', 'scripts']);
const assetHashes = {};

function assetHash(rel) {
  if (!(rel in assetHashes)) {
    const file = path.join(ROOT, rel);
    assetHashes[rel] = fs.existsSync(file)
      ? require('crypto').createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 10)
      : null;
  }
  return assetHashes[rel];
}

function htmlFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) htmlFiles(path.join(dir, entry.name), out);
    } else if (entry.name.endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function fingerprintAssets() {
  const ref = /((?:href|src)=")(\/(?:css|js)\/[^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]+)?"/g;
  let pages = 0;
  for (const file of htmlFiles(ROOT)) {
    const html = fs.readFileSync(file, 'utf8');
    const next = html.replace(ref, (m, attr, url) => {
      const h = assetHash(url.slice(1));
      return h ? `${attr}${url}?v=${h}"` : m;
    });
    if (next !== html) { fs.writeFileSync(file, next); pages++; }
  }
  console.log(`Fingerprinted css/js links on ${pages} pages.`);
}

/* ---------------- run ---------------- */

function main() {
  const team = loadWindow('js/data/team-data.js').TEAM_DATA || [];
  const services = loadWindow('js/data/services-data.js').SERVICES_DATA || [];
  const packages = loadWindow('js/data/packages-data.js').PACKAGES_DATA || [];
  const reviews = loadWindow('js/data/reviews-data.js').REVIEWS_DATA || [];
  REVIEWS = reviews;
  LANDING = loadWindow('js/data/landing-data.js').LANDING_DATA || LANDING;

  const personTpl = fs.readFileSync(path.join(ROOT, 'templates/person.html'), 'utf8');
  const serviceTpl = fs.readFileSync(path.join(ROOT, 'templates/service.html'), 'utf8');
  const packageTpl = fs.readFileSync(path.join(ROOT, 'templates/package.html'), 'utf8');
  const reviewsTpl = fs.readFileSync(path.join(ROOT, 'templates/reviews.html'), 'utf8');

  genPersons(personTpl, team);
  genServices(serviceTpl, services);
  genPackages(packageTpl, packages);
  genReviews(reviewsTpl, reviews);
  buildSitemap();

  landingWarnings.forEach((w) => console.warn('[landing] ' + w));
  console.log(
    `Generated ${team.length} people, ${services.length} services, ` +
    `${packages.length} packages, ${reviews.length} reviews. ` +
    `Sitemap: ${STATIC_PAGES.length + sitemapUrls.length} URLs.`
  );

  if (process.env.NETLIFY === 'true' || process.env.FINGERPRINT === '1') fingerprintAssets();
}

main();
