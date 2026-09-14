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
  { loc: '/venues.html', priority: '0.7', changefreq: 'monthly' },
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
    html = fillSlot(html, 'name', escapeHTML(r.name));
    html = fillSlot(html, 'role', escapeHTML(r.role || ''));
    html = fillSlot(html, 'bio', escapeHTML(r.bio || ''));
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
    html = fillSlot(html, 'kicker', escapeHTML(r.category || 'Services'));
    html = fillSlot(html, 'name', escapeHTML(r.name));
    html = fillSlot(html, 'role', escapeHTML(r.shortDesc || ''));
    html = fillSlot(html, 'bio', r.longBody || escapeHTML(r.shortDesc || '')); // longBody is HTML
    if (r.included && r.included.length) html = fillSlot(html, 'included', includedList(r.included));
    writeFile(sub + 'index.html', html);
    sitemapUrls.push({ loc: url, priority: isEvent ? '0.9' : '0.6', changefreq: 'monthly' });
  });
}

function genPackages(tpl, data) {
  data.forEach((r) => {
    const title = `${r.name} · Tommy's Tunes`;
    const desc = r.metaDescription || r.tagline || "A specific Tommy's Tunes package tier.";
    const url = SITE + '/package/' + r.slug + '/';
    let html = setMeta(tpl, { title, description: desc, url });
    html = setBodySlug(html, r.slug);
    html = fillSlot(html, 'kicker', 'Packages');
    html = fillSlot(html, 'name', escapeHTML(r.name));
    html = fillSlot(html, 'role', escapeHTML(r.tagline || ''));
    html = fillSlot(html, 'bio', escapeHTML(r.longBody || '')); // package longBody is plain text
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

function genReviews(tpl, data) {
  const cards = data.map(reviewCard).join('') + '\n    ';
  let html = setMeta(tpl, {
    title: "Reviews · Tommy's Tunes",
    description: `${data.length} verified reviews from real Long Island couples and families, sourced from The Knot, WeddingWire, Google, and Yelp.`,
    url: SITE + '/reviews/',
  });
  html = fillByAttr(html, 'data-reviews-grid', cards);
  html = fillByAttr(html, 'data-reviews-counter', `Showing all ${data.length} reviews`);
  writeFile('reviews/index.html', html);
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

/* ---------------- run ---------------- */

function main() {
  const team = loadWindow('js/data/team-data.js').TEAM_DATA || [];
  const services = loadWindow('js/data/services-data.js').SERVICES_DATA || [];
  const packages = loadWindow('js/data/packages-data.js').PACKAGES_DATA || [];
  const reviews = loadWindow('js/data/reviews-data.js').REVIEWS_DATA || [];

  const personTpl = fs.readFileSync(path.join(ROOT, 'templates/person.html'), 'utf8');
  const serviceTpl = fs.readFileSync(path.join(ROOT, 'templates/service.html'), 'utf8');
  const packageTpl = fs.readFileSync(path.join(ROOT, 'templates/package.html'), 'utf8');
  const reviewsTpl = fs.readFileSync(path.join(ROOT, 'templates/reviews.html'), 'utf8');

  genPersons(personTpl, team);
  genServices(serviceTpl, services);
  genPackages(packageTpl, packages);
  genReviews(reviewsTpl, reviews);
  buildSitemap();

  console.log(
    `Generated ${team.length} people, ${services.length} services, ` +
    `${packages.length} packages, ${reviews.length} reviews. ` +
    `Sitemap: ${STATIC_PAGES.length + sitemapUrls.length} URLs.`
  );
}

main();
