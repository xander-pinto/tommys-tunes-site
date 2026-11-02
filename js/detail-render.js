/* ============================================================
   Tommy's Tunes — detail page renderer
   Powers /person.html, /service.html, /package.html.

   Each template page sets <body data-detail-type="person|service|package">
   and includes well-marked DOM slots that this script populates from
   the matching data file (team-data.js, services-data.js, packages-data.js).

   URL contract:  /person.html?slug=joe-cip
   If the slug is missing or doesn't match, we render a "Not found" state.
   ============================================================ */

(function () {
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
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

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value || '';
    });
  }

  function setHTML(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.innerHTML = value || '';
    });
  }

  function setBackground(selector, url) {
    document.querySelectorAll(selector).forEach((el) => {
      if (url) el.style.backgroundImage = `url('${url}')`;
    });
  }

  function setImg(selector, url, alt) {
    document.querySelectorAll(selector).forEach((el) => {
      if (url) el.src = url;
      if (alt != null) el.alt = alt;
    });
  }

  function showSection(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.hidden = false;
    });
  }

  function hideSection(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.hidden = true;
    });
  }

  function renderGallery(images) {
    if (!images || !images.length) {
      hideSection('[data-slot="gallery-section"]');
      return;
    }
    const html = images
      .map(
        (src) => `
          <a class="gallery-tile" href="${escapeHTML(src)}" data-lightbox="${escapeHTML(src)}">
            <img src="${escapeHTML(src)}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'">
          </a>
        `,
      )
      .join('');
    setHTML('[data-slot="gallery"]', html);
    showSection('[data-slot="gallery-section"]');
  }

  function backdropLabel(src) {
    const file = src.split('/').pop() || '';
    const name = file.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function renderBackdrops(images) {
    if (!images || !images.length) {
      hideSection('[data-slot="backdrops-section"]');
      return;
    }
    const html = images
      .map((src) => {
        const label = backdropLabel(src);
        return `
          <a class="gallery-tile backdrop-tile" href="${escapeHTML(src)}" data-lightbox="${escapeHTML(src)}" title="${escapeHTML(label)}">
            <img src="${escapeHTML(src)}" alt="${escapeHTML(label)}" loading="lazy" onerror="this.parentElement.style.display='none'">
            <span class="backdrop-label">${escapeHTML(label)}</span>
          </a>
        `;
      })
      .join('');
    setHTML('[data-slot="backdrops"]', html);
    showSection('[data-slot="backdrops-section"]');
  }

  function renderOneDemo(demo) {
    if (!demo || !demo.url) return '';
    let media = '';
    if (demo.type === 'youtube') {
      media = `<div class="demo-embed"><iframe src="${escapeHTML(demo.url)}" title="Demo" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    } else if (demo.type === 'instagram') {
      media = `<div class="demo-embed"><iframe src="${escapeHTML(demo.url)}" title="Instagram" allowfullscreen></iframe></div>`;
    } else if (demo.type === 'video') {
      media = `<video controls preload="metadata" playsinline><source src="${escapeHTML(demo.url)}"></video>`;
    }
    if (!media) return '';
    const caption = demo.caption ? `<p class="demo-caption">${escapeHTML(demo.caption)}</p>` : '';
    return `<div class="demo-item">${media}${caption}</div>`;
  }

  // Accepts either a single `demo` object or a `demos` array (preferred).
  function renderDemo(record) {
    const list = Array.isArray(record.demos)
      ? record.demos
      : (record.demo ? [record.demo] : []);
    const html = list.map(renderOneDemo).filter(Boolean).join('');
    if (!html) {
      hideSection('[data-slot="demo-section"]');
      return;
    }
    setHTML('[data-slot="demo"]', html);
    showSection('[data-slot="demo-section"]');
  }

  /* A page leads with its best-performing clips rather than everything tagged
     to it, so the library can be tagged liberally without a page opening as a
     wall. The rest are one press away, not thrown out.

     Phones get three instead of nine: the grid collapses to a single column
     there, so nine stacked 9:16 clips is about five thousand pixels of scroll
     before you reach the button. Read once at load, not per render, so the
     count stays consistent between the first paint and later presses. */
  const MAX_TIKTOKS =
    window.matchMedia && window.matchMedia('(max-width: 640px)').matches ? 3 : 9;

  function viewCount(v) {
    const m = String(v || '').trim().match(/^([\d.]+)\s*([KM]?)$/i);
    if (!m) return 0;
    const n = parseFloat(m[1]) || 0;
    const mult = m[2].toUpperCase() === 'M' ? 1e6 : m[2].toUpperCase() === 'K' ? 1e3 : 1;
    return n * mult;
  }

  /* Clips live in one tagged library (tiktok-data.js) rather than being pasted
     into each record, so a single post can appear on a person's page and a
     service page at once. `field` is 'people' on person pages, 'services'
     elsewhere.

     We render our own poster and only build TikTok's iframe when someone
     clicks. Loading several of their players at once makes them degrade into a
     "Related videos" panel, and this also keeps TikTok's scripts and cookies
     off the page for anyone who never presses play. Posters are self-hosted
     because TikTok's thumbnail URLs are signed and expire within days. */
  function renderTikToks(record, field) {
    const all = Array.isArray(window.TIKTOK_DATA) ? window.TIKTOK_DATA : [];
    const picks = all
      .filter((c) => Array.isArray(c[field]) && c[field].includes(record.slug))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
                   || viewCount(b.views) - viewCount(a.views));
    if (!picks.length) {
      hideSection('[data-slot="tiktok-section"]');
      return;
    }
    const html = picks.map((c, i) => `
      <figure class="tiktok-card"${i >= MAX_TIKTOKS ? ' data-tiktok-extra hidden' : ''}>
        <div class="demo-embed is-portrait">
          <button type="button" class="tiktok-facade" data-tiktok-id="${escapeHTML(c.id)}"
                  style="background-image:url('/assets/images/tiktok/${escapeHTML(c.id)}.jpg')"
                  aria-label="Play: ${escapeHTML(c.caption || 'TikTok clip')}">
            <span class="tiktok-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
          </button>
        </div>
        ${c.caption ? `<figcaption>${escapeHTML(c.caption)}</figcaption>` : ''}
      </figure>
    `).join('');
    setHTML('[data-slot="tiktoks"]', html);

    const moreWrap = document.querySelector('[data-slot="tiktok-more"]');
    if (moreWrap) {
      const hidden = picks.length - MAX_TIKTOKS;
      if (hidden > 0) {
        moreWrap.innerHTML =
          `<button type="button" class="btn btn-secondary" data-tiktok-more>` +
          `Show ${Math.min(hidden, MAX_TIKTOKS)} more</button>` +
          `<span class="tiktok-count">${MAX_TIKTOKS} of ${picks.length}</span>`;
        moreWrap.hidden = false;
      } else {
        moreWrap.hidden = true;
      }
    }
    showSection('[data-slot="tiktok-section"]');
  }

  /* Reveal another page's worth of clips per press rather than dumping all of
     them at once, so a section with forty of them stays walkable. */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('[data-tiktok-more]');
    if (!btn) return;
    const still = [...document.querySelectorAll('[data-tiktok-extra][hidden]')];
    still.slice(0, MAX_TIKTOKS).forEach((el) => { el.hidden = false; });
    const left = still.length - MAX_TIKTOKS;
    const count = document.querySelector('.tiktok-count');
    const total = document.querySelectorAll('.tiktok-card').length;
    if (left > 0) {
      btn.textContent = `Show ${Math.min(left, MAX_TIKTOKS)} more`;
      if (count) count.textContent = `${total - left} of ${total}`;
    } else {
      if (count) count.remove();
      btn.remove();
    }
  });

  // Swap the poster for the real player on click. One at a time, by design.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.tiktok-facade');
    if (!btn) return;
    const id = btn.getAttribute('data-tiktok-id');
    if (!id) return;
    const frame = document.createElement('iframe');
    frame.src = 'https://www.tiktok.com/embed/v2/' + encodeURIComponent(id);
    frame.title = 'TikTok clip';
    frame.setAttribute('allow', 'encrypted-media;');
    frame.setAttribute('allowfullscreen', '');
    btn.replaceWith(frame);
  });

  function renderReviews(record) {
    const all = Array.isArray(window.TESTIMONIALS_DATA) ? window.TESTIMONIALS_DATA : [];
    const picks = all.filter((r) => Array.isArray(r.slugs) && r.slugs.includes(record.slug));
    if (!picks.length) {
      hideSection('[data-slot="reviews-section"]');
      return;
    }
    const html = picks.map((r) => {
      const stars = '★'.repeat(r.rating || 5);
      const meta = [r.event, r.source].filter(Boolean);
      const metaHTML = r.source_url
        ? `${escapeHTML(r.event || '')}${r.event && r.source ? ' · ' : ''}<a href="${escapeHTML(r.source_url)}" target="_blank" rel="noopener">${escapeHTML(r.source || '')}</a>`
        : escapeHTML(meta.join(' · '));
      return `
        <blockquote class="testimonial">
          <div class="testimonial-stars" aria-label="${r.rating || 5} out of 5 stars">${stars}</div>
          <p class="testimonial-quote">&ldquo;${escapeHTML(r.quote)}&rdquo;</p>
          <footer class="testimonial-attr">
            <span class="testimonial-meta">${metaHTML}</span>
          </footer>
        </blockquote>
      `;
    }).join('');
    setHTML('[data-slot="reviews"]', html);
    showSection('[data-slot="reviews-section"]');
  }

  function renderSocials(socials) {
    if (!socials) {
      hideSection('[data-slot="socials-section"]');
      return;
    }
    const items = [];
    if (socials.instagram) items.push(`<a href="${escapeHTML(socials.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
    if (socials.tiktok)    items.push(`<a href="${escapeHTML(socials.tiktok)}" target="_blank" rel="noopener">TikTok</a>`);
    if (socials.youtube)   items.push(`<a href="${escapeHTML(socials.youtube)}" target="_blank" rel="noopener">YouTube</a>`);
    if (!items.length) {
      hideSection('[data-slot="socials-section"]');
      return;
    }
    setHTML('[data-slot="socials"]', items.join(''));
    showSection('[data-slot="socials-section"]');
  }

  /* --- "On this page" sticky bar: built from whichever sections have content --- */
  function topOffset() {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 96;
    return navH + 56; // nav + the toc bar itself
  }

  function buildTOC() {
    const toc = document.querySelector('[data-slot="toc"]');
    if (!toc) return;
    const inner = toc.querySelector('.detail-toc-inner');
    const sections = Array.from(document.querySelectorAll('[data-toc]')).filter((s) => !s.hidden);
    if (sections.length < 2) {
      toc.hidden = true;
      return;
    }
    sections.forEach((sec, i) => {
      if (!sec.id) sec.id = 'section-' + i;
    });
    inner.innerHTML = sections
      .map((sec) => `<a href="#${sec.id}" data-toc-link="${sec.id}">${escapeHTML(sec.getAttribute('data-toc'))}</a>`)
      .join('');
    toc.hidden = false;

    const links = new Map();
    inner.querySelectorAll('[data-toc-link]').forEach((a) => links.set(a.getAttribute('data-toc-link'), a));
    const setActive = (id) => links.forEach((a, key) => a.classList.toggle('is-active', key === id));
    setActive(sections[0].id);

    // Smooth-scroll on click (CSS scroll-margin-top handles the sticky offset).
    inner.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id);
        history.replaceState(null, '', '#' + id);
      });
    });

    // Scroll-spy: highlight the section currently near the top.
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: `-${topOffset()}px 0px -55% 0px`, threshold: 0 },
      );
      sections.forEach((s) => obs.observe(s));
    }
  }

  function renderNotFound(type) {
    const labels = {
      person: { title: 'Person not found', back: 'Back to the team', href: '/team.html' },
      service: { title: 'Service not found', back: 'Back to services', href: '/services.html' },
      package: { title: 'Package not found', back: 'Back to packages', href: '/packages.html' },
    };
    const cfg = labels[type] || labels.person;
    const root = document.querySelector('[data-slot="detail-root"]');
    if (!root) return;
    root.innerHTML = `
      <section class="section section-light">
        <div class="container text-center">
          <h1>${cfg.title}</h1>
          <p style="margin-top: var(--sp-3);">We couldn't find that one. <a href="${cfg.href}">${cfg.back}</a>.</p>
        </div>
      </section>
    `;
  }

  function renderPerson(record) {
    document.title = `${record.name} · Tommy's Tunes`;
    setText('[data-slot="kicker"]', 'The team');
    setText('[data-slot="name"]', record.name);
    setText('[data-slot="role"]', record.role || '');
    if (record.photo) {
      setImg('[data-slot="hero-img"]', record.photo, record.name);
      // Optional per-person framing tweak, e.g. photoStyle: 'transform: scale(1.4) translateX(6%);'
      if (record.photoStyle) {
        document.querySelectorAll('[data-slot="hero-img"]').forEach((el) => { el.style.cssText += record.photoStyle; });
      }
    } else {
      hideSection('.profile-portrait');
    }
    setText('[data-slot="bio"]', record.bio || '');
    renderDemo(record);
    renderTikToks(record, 'people');
    renderGallery(record.gallery);
    renderReviews(record);
    renderSocials(record.socials);
    buildTOC();
  }

  /* Sibling services from the same category. Deliberately derived rather than
     hand-listed: 47 service pages would be 47 lists to maintain and they would
     rot the first time a service is added. A `pairsWith` array on the record
     overrides the category when a hand-picked set is better, which it usually
     is (uplighting belongs next to monogram and dance floor, not next to
     every other lighting SKU). Capped at 6 so it stays a suggestion. */
  /* Mirrors EVENT_URLS in scripts/generate.js. The five Specialty services are
     published at keyword URLs rather than /service/<slug>/, so a link built
     from the slug alone would 404 on exactly the five pages that matter most. */
  var SERVICE_PATHS = {
    'weddings': '/wedding-dj-long-island/',
    'sweet-16-quinces': '/sweet-16-dj/',
    'mitzvahs': '/bar-bat-mitzvah-dj/',
    'corporate': '/corporate-event-dj/',
    'other-events': '/other-events/',
  };

  function renderRelated(record) {
    const all = Array.isArray(window.SERVICES_DATA) ? window.SERVICES_DATA : [];
    const pathFor = (s) => SERVICE_PATHS[s.slug] || ('/service/' + s.slug + '/');
    let picks = [];
    if (Array.isArray(record.pairsWith) && record.pairsWith.length) {
      picks = record.pairsWith.map((sl) => all.find((s) => s.slug === sl)).filter(Boolean);
    } else {
      picks = all.filter((s) => s.category === record.category && s.slug !== record.slug);
    }
    picks = picks.slice(0, 6);
    if (!picks.length) { hideSection('[data-slot="related-section"]'); return; }
    setHTML('[data-slot="related"]', picks.map((s) => `
      <a class="related-card" href="${escapeHTML(pathFor(s))}">
        <span class="related-card-photo"${s.photo ? ` style="background-image:url('${escapeHTML(s.photo)}')"` : ''} aria-hidden="true"></span>
        <span class="related-card-name">${escapeHTML(s.name)}</span>
        <span class="related-card-desc">${escapeHTML(s.shortDesc || '')}</span>
      </a>`).join(''));
    showSection('[data-slot="related-section"]');
  }

  /* Named crew for this kind of night. Needs a `crew` array of team slugs on
     the service record; there is no way to infer it, and the one source that
     looked promising (people tagged on TikTok clips) only covers three
     services. Hidden entirely until that array exists. */
  function renderCrew(record) {
    const team = Array.isArray(window.TEAM_DATA) ? window.TEAM_DATA : [];
    const picks = (record.crew || []).map((sl) => team.find((p) => p.slug === sl)).filter(Boolean);
    if (!picks.length) { hideSection('[data-slot="crew-section"]'); return; }
    setHTML('[data-slot="crew"]', picks.map((p) => `
      <a class="related-card" href="/person/${escapeHTML(p.slug)}/">
        <span class="related-card-photo"${p.photo ? ` style="background-image:url('${escapeHTML(p.photo)}')"` : ''} aria-hidden="true"></span>
        <span class="related-card-name">${escapeHTML(p.name)}</span>
        <span class="related-card-desc">${escapeHTML(p.role || '')}</span>
      </a>`).join(''));
    showSection('[data-slot="crew-section"]');
  }

  function renderService(record) {
    document.title = `${record.name} · Tommy's Tunes`;
    setText('[data-slot="kicker"]', record.category || 'Services');
    setText('[data-slot="name"]', record.name);
    setText('[data-slot="role"]', record.shortDesc || '');
    setBackground('[data-slot="hero-photo"]', record.photo);
    // Optional per-service framing tweak, e.g. photoStyle: 'background-position: center 12%;'
    if (record.photoStyle) {
      document.querySelectorAll('[data-slot="hero-photo"]').forEach((el) => { el.style.cssText += record.photoStyle; });
    }
    setHTML('[data-slot="bio"]', record.longBody || record.shortDesc || '');
    if (record.included && record.included.length) {
      const html = record.included.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
      setHTML('[data-slot="included"]', html);
      showSection('[data-slot="included-section"]');
    } else {
      hideSection('[data-slot="included-section"]');
    }
    renderDemo(record);
    renderTikToks(record, 'services');
    renderGallery(record.gallery);
    renderBackdrops(record.backdrops);
    renderRelated(record);
    renderCrew(record);
    hideSection('[data-slot="socials-section"]');
    buildTOC();
  }

  function renderPackage(record) {
    document.title = `${record.name} · Tommy's Tunes`;
    setText('[data-slot="kicker"]', 'Packages');
    setText('[data-slot="name"]', record.name);
    setText('[data-slot="role"]', record.tagline || '');
    setBackground('[data-slot="hero-photo"]', record.photo);
    setText('[data-slot="bio"]', record.longBody || '');
    if (record.included && record.included.length) {
      const html = record.included.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
      setHTML('[data-slot="included"]', html);
      showSection('[data-slot="included-section"]');
    } else {
      hideSection('[data-slot="included-section"]');
    }
    renderDemo(record);
    renderGallery(record.gallery);
    renderCrew(record);
    hideSection('[data-slot="related-section"]');
    hideSection('[data-slot="socials-section"]');
    hideSection('[data-slot="tiktok-section"]');
    buildTOC();
  }

  function boot() {
    const type = document.body.dataset.detailType;
    if (!type) return;

    const slug = getParam('slug') || document.body.dataset.slug;
    let pool = null;
    if (type === 'person')  pool = window.TEAM_DATA;
    if (type === 'service') pool = window.SERVICES_DATA;
    if (type === 'package') pool = window.PACKAGES_DATA;

    if (!pool) {
      console.warn('[detail-render] data pool missing for', type);
      renderNotFound(type);
      return;
    }

    const record = pool.find((r) => r.slug === slug);
    if (!record) {
      renderNotFound(type);
      return;
    }

    if (type === 'person')  renderPerson(record);
    if (type === 'service') renderService(record);
    if (type === 'package') renderPackage(record);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
