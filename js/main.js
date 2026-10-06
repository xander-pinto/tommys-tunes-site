/* ============================================================
   Tommy's Tunes — main.js

   What this file does:
   1. Loads shared components (nav, footer, modal) into every page
   2. Handles the "Check your date" modal
   3. Handles nav scroll behavior + mobile menu
   4. Picks 4 random featured talent and 1 random testimonial per page load

   Where to edit content:
   - Add/remove featured talent: /js/data/team-data.js (window.TEAM_DATA)
   - Add/remove testimonial quotes: /js/data/testimonials-data.js (window.TESTIMONIALS_DATA)
   - All other content lives in the .html files
   ============================================================ */


/* --- Component loader ---
   Pages drop in <div data-component="nav"></div> etc. and main.js
   fetches the matching file from /components/ and injects it. */

const COMPONENTS = {
  nav: '/components/nav.html',
  footer: '/components/footer.html',
  modal: '/components/modal-check-your-date.html',
  awards: '/components/awards.html',
  'awards-wall': '/components/awards-wall.html',
};

async function loadComponents() {
  const slots = document.querySelectorAll('[data-component]');
  await Promise.all(Array.from(slots).map(async (slot) => {
    const name = slot.dataset.component;
    const url = COMPONENTS[name];
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      slot.outerHTML = await res.text();
    } catch (err) {
      console.warn(`[components] failed to load ${name}:`, err);
    }
  }));
}


/* --- Nav: active link, scroll state, mobile menu --- */

function setupNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Mark the active link based on the current page name.
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  const navKey = page === '' || page === 'index' ? 'home' : page;
  nav.querySelectorAll(`[data-nav="${navKey}"]`).forEach((el) => {
    el.setAttribute('aria-current', 'page');
  });

  // Add .is-scrolled when the user scrolls past 24px.
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile burger toggle.
  /* Collapsible sections in the phone menu. Flat, the menu is 28 rows and
     1,506px tall in an 844px viewport, so it opens mid-list and has to be
     scrolled. Collapsed, the seven top-level destinations fit on screen
     and the 18 sub-links are one tap away. The parent stays a real link;
     the chevron beside it does the expanding. */
  nav.querySelectorAll('.nav-mobile-toggle').forEach((btn) => {
    const sub = nav.querySelector('#' + btn.getAttribute('aria-controls'));
    if (!sub) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      sub.hidden = open;
    });
  });

  const burger = nav.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close mobile menu when a link is tapped.
    nav.querySelectorAll('.nav-mobile a, .nav-mobile button').forEach((el) => {
      el.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}


/* --- Modal: Check your date --- */

function setupModal() {
  const modal = document.getElementById('check-your-date-modal');
  if (!modal) return;

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstField = modal.querySelector('input, select, textarea, button');
    if (firstField) setTimeout(() => firstField.focus(), 60);
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  // Any element with data-open-modal triggers the modal.
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-modal="true"]')) {
      e.preventDefault();
      open();
    }
    if (e.target.closest('[data-close-modal="true"]')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // "I don't know my date yet" — disable the date input when checked.
  const noDate = modal.querySelector('#cyd-no-date');
  const dateField = modal.querySelector('#cyd-date');
  if (noDate && dateField) {
    noDate.addEventListener('change', () => {
      dateField.disabled = noDate.checked;
      if (noDate.checked) dateField.value = '';
    });
  }
}


/* --- Lightbox: click any [data-lightbox] image to open full-size --- */

function setupLightbox() {
  // Build the lightbox DOM once and reuse.
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lb);
  }

  const img = lb.querySelector('.lightbox-img');
  const closeBtn = lb.querySelector('.lightbox-close');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    img.src = '';
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      const tImg = trigger.querySelector('img') || trigger;
      const src = trigger.dataset.lightbox || (tImg.src || '');
      open(src, tImg.alt || '');
    }
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === img) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
  });
}


/* --- Document preview: click any [data-doc] link to open in-page modal --- */

function setupDocPreview() {
  let dm = document.getElementById('doc-modal');
  if (!dm) {
    dm = document.createElement('div');
    dm.id = 'doc-modal';
    dm.className = 'doc-modal';
    dm.innerHTML = `
      <div class="doc-panel">
        <button type="button" class="doc-modal-close doc-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div class="doc-header">
          <div class="doc-title"></div>
          <div class="doc-actions">
            <a class="btn btn-secondary doc-open" target="_blank" rel="noopener">Open in tab</a>
            <a class="btn btn-primary doc-download" download>Download</a>
          </div>
        </div>
        <iframe class="doc-frame" src="" title=""></iframe>
      </div>
    `;
    document.body.appendChild(dm);
  }

  const title = dm.querySelector('.doc-title');
  const frame = dm.querySelector('.doc-frame');
  const dlBtn = dm.querySelector('.doc-download');
  const openBtn = dm.querySelector('.doc-open');
  const closeBtn = dm.querySelector('.doc-close');

  const open = (url, name) => {
    title.textContent = name || 'Document';
    frame.src = url;
    frame.title = name || '';
    dlBtn.href = url;
    openBtn.href = url;
    dm.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    dm.classList.remove('is-open');
    document.body.style.overflow = '';
    frame.src = '';
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-doc]');
    if (trigger) {
      e.preventDefault();
      const url = trigger.dataset.doc;
      const name = trigger.dataset.docName || trigger.textContent.trim();
      open(url, name);
    }
  });

  closeBtn.addEventListener('click', close);
  dm.addEventListener('click', (e) => {
    if (e.target === dm) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dm.classList.contains('is-open')) close();
  });
}


/* --- Footer year --- */

function setupFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ============================================================
   ROTATION POOLS
   ============================================================ */

/* Featured talent rotation pool — single source of truth lives in
   /js/data/team-data.js as window.TEAM_DATA. Edit content there.
   We fall back to a tiny inline pool if the data file didn't load,
   so featured-talent rendering still works on pages that forgot to include it. */
const TEAM_POOL = (typeof window !== 'undefined' && Array.isArray(window.TEAM_DATA))
  ? window.TEAM_DATA
  : [];

/* Testimonial rotation pool — single source of truth lives in
   /js/data/testimonials-data.js as window.TESTIMONIALS_DATA. Edit content there.
   Falls back to an empty pool if the data file didn't load. */
const TESTIMONIAL_POOL = (typeof window !== 'undefined' && Array.isArray(window.TESTIMONIALS_DATA))
  ? window.TESTIMONIALS_DATA
  : [];


/* EDIT: Venue rotation pool — keep in sync with venues.html */
const VENUE_POOL = [
  'Brecknock Hall', 'Coindre Hall', 'Crescent Beach Club',
  'Crest Hollow Country Club', 'Fountainhead', 'Fox Hollow', 'Glen Cove Mansion',
  'Green Tree Country Club', 'Harbor Club @ Prime', 'Hempstead House',
  'Huntington Country Club', 'Larkfield', 'Majestic Gardens',
  'The Mansion at Oyster Bay', 'The Metropolitan - Glen Cove', 'Milleridge Inn',
  'North Hills Country Club', 'Oheka Castle', 'The Royalton - Roslyn',
  'Royalton on The Greens', 'Sea Cliff Manor', 'Seawanhaka Yacht Club',
  'Sunken Meadow Pavilion', 'Vanderbilt Mansion', "Verdi's of Westbury",
  'Watermill', 'Westbury Manor', 'The Whitman Club at The Greens',
  'Allegria', 'The Barn at Old Bethpage', 'Bellport Country Club',
  'Bourne Mansion', "Captain Bill's", 'Coral House',
  'Heritage Club at Bethpage', 'Inn at New Hyde Park', 'Jericho Terrace',
  "Land's End", 'The Lannin', "Lombardi's On The Bay",
  'Memorare Knight of Columbus', 'The Piermont', 'The Riviera', 'Sand Castle',
  'Sea Star Ballroom', 'Shandon Court', 'Simplay New York',
  'Southward Ho Country Club', 'Timber Point Country Club', 'Villa Lombardis',
  'West Hempstead Fire Department', 'Brentwood Country Club', "Danford's",
  'East Wind', 'Floral Terrace', 'Flowerfield', 'Hamlet Willow Creek (Mount Sinai)',
  'The Hamlet Windwatch', 'Hilton Garden Inn (Stony Brook)', 'Hotel Indigo',
  'Hyatt Regency Hotel', 'Irish Coffee Pub', 'Mill Pond Country Club',
  'Moose Lodge - Mt. Sinai', 'Old Field Club', 'Port Jeff Country Club',
  'Portuguese Heritage Center', 'Refuge', 'RGNY', 'Rock Hill Country Club',
  'Smithtown Landing Country Club', 'Soundview Caterers', 'Stonebridge Country Club',
  'Three Village Inn', 'Upsky', 'Windows on The Lake',
  'Duck Walk Vineyard', 'George Weir Barn', "Giorgio's", 'Jamesport Manor Inn',
  'Jedediah Hawkins', 'Macari Vineyard', 'Peconic Bay Yacht Club',
  'Raphael Vineyard', 'Sunset Harbour', 'The Vineyard Caterers',
  'American Legion Hall - Brooklyn', 'Brooklyn Botanical Gardens', 'Citi Field',
  'Crestwood Manor', 'El Caribe', 'Elks Lodge', 'Essex House',
  'Glenn Island Harbour Club', 'Mamaroneck Beach and Yacht Club', 'Marina Del Ray',
  "Russo's On The Bay", 'Trumpets on The Gate', "Water's Edge",
];


/* --- Pick N random items without repeats --- */
function pickRandom(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}


/* --- Render: featured talent ---
   The page provides <div data-rotation="team" data-count="4"></div>
   We fill it with 4 randomized cards. */

// Homepage "Meet the crew" rotation shows only DJs, MCs, and live musicians
// (including percussionists) who have a real photo. Technicians, the dancer,
// photographers, specialty roles, and anyone still on the placeholder image
// are excluded so the homepage only ever shows finished, photo'd profiles.
const CREW_ROLE = /(\bDJ\b|\bMC\b|musician|percussionist|saxophonist)/i;
const hasRealPhoto = (p) => p.photo && !/empty_image/i.test(p.photo);

// EDIT: People to keep OUT of the homepage "Meet the crew" rotation — staff who
// only pick up the occasional shift. They still appear on the full team page;
// they just won't show as featured crew. Add or remove slugs here.
const CREW_EXCLUDE = new Set(['yianni']);

function renderFeaturedTalent() {
  document.querySelectorAll('[data-rotation="team"]').forEach((slot) => {
    const count = parseInt(slot.dataset.count || '4', 10);
    const eligible = TEAM_POOL.filter((p) => p.role && CREW_ROLE.test(p.role) && hasRealPhoto(p) && !CREW_EXCLUDE.has(p.slug));
    const picks = pickRandom(eligible, count);
    slot.innerHTML = picks.map((p) => {
      const href = p.slug ? `/person/${encodeURIComponent(p.slug)}/` : null;
      const card = `
        <div class="team-card-photo" aria-hidden="true">
          <img src="${p.photo}" alt="" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="team-card-name">${p.name}</div>
        <div class="team-card-role">${p.role}</div>
      `;
      return href
        ? `<a class="card-link team-card" href="${href}">${card}</a>`
        : `<div class="team-card">${card}</div>`;
    }).join('');
  });
}


/* --- Render: testimonial --- */

function renderTestimonial() {
  document.querySelectorAll('[data-rotation="testimonial"]').forEach((slot) => {
    const count = parseInt(slot.dataset.count || '1', 10);
    const picks = pickRandom(TESTIMONIAL_POOL, count);
    if (!picks.length) return;
    const cards = picks.map((pick) => {
      const stars = '★'.repeat(pick.rating || 5);
      return `
        <blockquote class="testimonial">
          <div class="testimonial-stars" aria-label="${pick.rating || 5} out of 5 stars">${stars}</div>
          <p class="testimonial-quote">&ldquo;${pick.quote}&rdquo;</p>
          <footer class="testimonial-attr">
            <span class="testimonial-name">${pick.talent}</span>
            <span class="testimonial-meta">${pick.event} · <a href="${pick.source_url}" target="_blank" rel="noopener">${pick.source}</a></span>
          </footer>
        </blockquote>
      `;
    }).join('');
    slot.innerHTML = count > 1 ? `<div class="testimonial-pair">${cards}</div>` : cards;
  });
}


/* --- Render: upcoming showcase calendar ---
   Reads window.SHOWCASES_DATA, filters out past events, sorts by date,
   then renders cards into [data-showcase-calendar]. Hides the section
   entirely if there are no upcoming events. */
/* --- Event structured data for the showcases ---
   These are dated, public, mostly ticketed events, which is exactly what
   schema.org/Event describes, and marking them up is what lets them show
   as events in search rather than as a line of text on a page.
   Built from the same SHOWCASES_DATA the cards render from, so the two can
   never disagree. Injected rather than hand-written into showcase.html
   because that page is not generated, and a static copy would go stale the
   moment a date is added. --- */
function emitShowcaseEventSchema(upcoming) {
  if (!upcoming || !upcoming.length) return;
  document.querySelectorAll('[data-showcase-schema]').forEach((n) => n.remove());

  const events = upcoming.map((ev) => {
    const e = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${ev.type} at ${ev.venue}`,
      startDate: ev.date,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: ev.venue,
        address: { '@type': 'PostalAddress', addressRegion: 'NY', addressCountry: 'US' },
      },
      organizer: {
        '@type': 'Organization',
        name: "Tommy's Tunes DJ Entertainment",
        url: 'https://tommystunes.com',
      },
      image: 'https://tommystunes.com/assets/images/og-default.jpg',
    };
    if (ev.note) e.description = ev.note;
    if (ev.ticketUrl) {
      e.offers = {
        '@type': 'Offer',
        url: ev.ticketUrl,
        availability: 'https://schema.org/InStock',
      };
    }
    return e;
  });

  const tag = document.createElement('script');
  tag.type = 'application/ld+json';
  tag.setAttribute('data-showcase-schema', '');
  tag.textContent = JSON.stringify(events);
  document.head.appendChild(tag);
}


function renderShowcaseCalendar() {
  const section = document.getElementById('showcase-calendar-section');
  const container = document.querySelector('[data-showcase-calendar]');
  if (!section || !container) return;

  const data = (typeof window !== 'undefined' && Array.isArray(window.SHOWCASES_DATA))
    ? window.SHOWCASES_DATA : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = data
    .filter((ev) => new Date(ev.date + 'T00:00:00') >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  emitShowcaseEventSchema(upcoming);

  if (!upcoming.length) {
    container.innerHTML = `
      <div class="showcase-event-card" style="grid-column: 1 / -1; text-align: center;">
        <div class="showcase-event-type" style="margin-bottom: var(--sp-2);">Coming soon</div>
        <div class="showcase-event-venue" style="margin-bottom: var(--sp-3);">Next showcase dates to be announced</div>
        <p class="showcase-event-note">Call <a href="tel:6317325886" style="color: var(--royal-blue); text-decoration: none;">631-732-5886</a> to ask about upcoming dates, or <a href="#" data-open-modal="true" style="color: var(--royal-blue); text-decoration: none;">drop us a line</a> and we'll let you know when the next one's on the calendar.</p>
      </div>
    `;
  } else {
    container.innerHTML = upcoming.map((ev) => `
      <div class="showcase-event-card">
        <div class="showcase-event-date">${ev.dateDisplay}</div>
        ${ev.time ? `<div class="showcase-event-time">${ev.time}</div>` : ''}
        <div class="showcase-event-venue">${ev.venue}</div>
        <div class="showcase-event-type">${ev.type}</div>
        ${ev.note ? `<p class="showcase-event-note">${ev.note}</p>` : ''}
        ${ev.ticketUrl ? `<a class="showcase-event-tickets" href="${ev.ticketUrl}" target="_blank" rel="noopener">Get tickets &rarr;</a>` : ''}
      </div>
    `).join('');
  }

  // Past showcases — render into separate section, hide section if empty
  const pastSection = document.getElementById('showcase-past-section');
  const pastContainer = document.querySelector('[data-showcase-past]');
  if (!pastSection || !pastContainer) return;

  const past = data
    .filter((ev) => new Date(ev.date + 'T00:00:00') < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!past.length) {
    pastSection.hidden = true;
    return;
  }

  pastSection.hidden = false;
  pastContainer.innerHTML = past.map((ev) => `
    <div class="showcase-past-card">
      <div class="showcase-past-badge">Past</div>
      <div class="showcase-past-date">${ev.dateDisplay}</div>
      <div class="showcase-past-venue">${ev.venue}</div>
      <div class="showcase-past-type">${ev.type}</div>
    </div>
  `).join('');

  // Show the first 6 past cards; the rest sit behind a See more toggle.
  const PAST_VISIBLE = 6;
  const pastCards = Array.from(pastContainer.children);
  if (pastCards.length > PAST_VISIBLE) {
    pastCards.slice(PAST_VISIBLE).forEach((card) => { card.hidden = true; });
    const wrap = document.createElement('div');
    wrap.className = 'text-center';
    wrap.style.marginTop = 'var(--sp-6)';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-secondary';
    btn.textContent = `See all ${pastCards.length}`;
    let expanded = false;
    btn.addEventListener('click', () => {
      expanded = !expanded;
      pastCards.slice(PAST_VISIBLE).forEach((card) => { card.hidden = !expanded; });
      btn.textContent = expanded ? 'See less' : `See all ${pastCards.length}`;
    });
    wrap.appendChild(btn);
    pastContainer.insertAdjacentElement('afterend', wrap);
  }
}


/* Shuffle the showcase grid tiles into a fresh random order on each load.
   The HTML order stays the canonical "edit here" list — JS just reorders
   the rendered DOM, so adding/removing tiles in showcase.html still works. */
function shuffleShowcase() {
  document.querySelectorAll('.showcase-masonry').forEach((grid) => {
    const tiles = Array.from(grid.children);
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    tiles.forEach((tile) => grid.appendChild(tile));
  });
}

/* --- Render: venue marquee --- */
function renderVenueMarquee() {
  document.querySelectorAll('[data-venue-marquee]').forEach((track) => {
    const shuffled = pickRandom(VENUE_POOL, VENUE_POOL.length);
    const spans = shuffled.map((name) => `<span>${name}</span>`).join('');
    track.innerHTML = spans + spans; /* duplicate for seamless loop */
    track.style.animationDuration = (shuffled.length * 4) + 's'; /* 4s per venue = same pace regardless of count */
  });
}


/* --- Render: homepage upcoming-showcase preview ---
   Conditional: hides the entire section if there are no upcoming events.
   Max 2 cards. Renders into [data-showcase-calendar-preview] on index.html. */
function renderShowcaseHomePreview() {
  const section = document.getElementById('home-showcase-preview-section');
  const container = document.querySelector('[data-showcase-calendar-preview]');
  if (!section || !container) return;

  const data = (typeof window !== 'undefined' && Array.isArray(window.SHOWCASES_DATA))
    ? window.SHOWCASES_DATA : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = data
    .filter((ev) => new Date(ev.date + 'T00:00:00') >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  if (!upcoming.length) {
    section.hidden = true;
    return;
  }

  container.innerHTML = upcoming.map((ev) => `
    <div class="showcase-event-card showcase-event-card--light showcase-event-card--row">
      <div class="showcase-event-row-date">
        <div class="showcase-event-date">${ev.dateDisplay}</div>
        ${ev.time ? `<div class="showcase-event-time">${ev.time}</div>` : ''}
      </div>
      <div class="showcase-event-row-body">
        <div class="showcase-event-type">${ev.type}</div>
        <div class="showcase-event-venue">${ev.venue}</div>
        ${ev.note ? `<p class="showcase-event-note">${ev.note}</p>` : ''}
        ${ev.ticketUrl ? `<a class="showcase-event-tickets showcase-event-tickets--light" href="${ev.ticketUrl}" target="_blank" rel="noopener">Get tickets &rarr;</a>` : ''}
      </div>
    </div>
  `).join('');
}


/* --- "How did you hear about us?" → reveal a text field when "Other" is picked.
   Delegated on document so it works for the modal (loaded async) and the
   inline contact-page form alike. --- */
/* --- "Check your date" modal: optional appointment request. Checking the box
   reveals a location choice; picking a location renders a mini calendar of the
   next 8 weeks limited to that location's open days. Clicking a day shows
   one-hour slots inside its real hours; tapped slots collect into the hidden
   appointment_times field (and a visible summary). Nothing here promises real
   availability — a rep confirms every request by phone. --- */
const APPT_HOURS = {
  // weekday (0=Sun) -> [open hour, close hour) in 24h; null = closed
  'Selden showroom': { 0: null, 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 17], 6: [9, 17] },
  'Melville office': { 0: null, 1: [12, 20], 2: [12, 20], 3: [12, 20], 4: [12, 20], 5: null, 6: [11, 15] },
};
const APPT_WEEKS_AHEAD = 8;

function apptFmtHour(h) {
  const ampm = h < 12 ? 'am' : 'pm';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return hr + ':00' + ampm;
}

function setupAppointmentToggle() {
  // One shared state; `state.form` tracks which form (modal or contact page)
  // the visitor is using, so pages with both never cross wires.
  const state = { form: null, location: null, month: null, day: null, picks: new Map() };

  function els() {
    const wrap = state.form && state.form.querySelector('[data-appointment-fields]');
    if (!wrap) return null;
    return {
      wrap,
      calWrap: wrap.querySelector('[data-appt-calendar-wrap]'),
      cal: wrap.querySelector('[data-appt-calendar]'),
      slots: wrap.querySelector('[data-appt-slots]'),
      selected: wrap.querySelector('[data-appt-selected]'),
      input: wrap.querySelector('[data-appt-times-input]'),
    };
  }

  function dayKey(d) { return d.toISOString().slice(0, 10); }

  function isOpenDay(d) {
    const hours = APPT_HOURS[state.location];
    if (!hours || !hours[d.getDay()]) return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const limit = new Date(today); limit.setDate(limit.getDate() + APPT_WEEKS_AHEAD * 7);
    return d > today && d <= limit;
  }

  function renderCalendar() {
    const e = els(); if (!e) return;
    const y = state.month.getFullYear(), mo = state.month.getMonth();
    const monthName = state.month.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const first = new Date(y, mo, 1);
    const daysInMonth = new Date(y, mo + 1, 0).getDate();

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const canPrev = new Date(y, mo, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
    const lastAllowed = new Date(today); lastAllowed.setDate(lastAllowed.getDate() + APPT_WEEKS_AHEAD * 7);
    const canNext = new Date(y, mo + 1, 1) <= lastAllowed;

    let html = '<div class="appt-cal-head">'
      + '<button type="button" class="appt-cal-nav" data-cal-prev ' + (canPrev ? '' : 'disabled') + ' aria-label="Previous month">&larr;</button>'
      + '<span>' + monthName + '</span>'
      + '<button type="button" class="appt-cal-nav" data-cal-next ' + (canNext ? '' : 'disabled') + ' aria-label="Next month">&rarr;</button>'
      + '</div><div class="appt-cal-grid">';
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d) => { html += '<span class="appt-cal-dow">' + d + '</span>'; });
    for (let i = 0; i < first.getDay(); i++) html += '<span></span>';
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(y, mo, day);
      const key = dayKey(d);
      const open = isOpenDay(d);
      const has = state.picks.has(key) && state.picks.get(key).size > 0;
      const sel = state.day === key;
      html += '<button type="button" class="appt-cal-day' + (sel ? ' is-active' : '') + (has ? ' has-picks' : '') + '"'
        + ' data-cal-day="' + key + '"' + (open ? '' : ' disabled') + '>' + day + '</button>';
    }
    html += '</div>';
    e.cal.innerHTML = html;
  }

  function renderSlots() {
    const e = els(); if (!e) return;
    if (!state.day) { e.slots.hidden = true; return; }
    const d = new Date(state.day + 'T12:00:00');
    const range = APPT_HOURS[state.location][d.getDay()];
    if (!range) { e.slots.hidden = true; return; }
    const picked = state.picks.get(state.day) || new Set();
    const label = d.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    let html = '<div class="appt-slots-label">' + label + ' &middot; pick a time</div><div class="appt-slots-row">';
    for (let h = range[0]; h < range[1]; h++) {
      const slot = apptFmtHour(h) + '\u2013' + apptFmtHour(h + 1);
      html += '<button type="button" class="appt-slot' + (picked.has(slot) ? ' is-picked' : '') + '" data-slot="' + slot + '">' + slot + '</button>';
    }
    html += '</div>';
    e.slots.innerHTML = html;
    e.slots.hidden = false;
  }

  function syncOutput() {
    const e = els(); if (!e) return;
    const parts = [];
    [...state.picks.keys()].sort().forEach((key) => {
      const set = state.picks.get(key);
      if (!set || !set.size) return;
      const d = new Date(key + 'T12:00:00');
      const label = d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      parts.push(label + ': ' + [...set].join(', '));
    });
    e.input.value = parts.join(' | ');
    e.selected.hidden = parts.length === 0;
    e.selected.innerHTML = parts.length
      ? '<strong>Your appointment:</strong> ' + parts.join(' &middot; ')
      : '';
  }

  function reset(full) {
    state.day = null; state.picks = new Map();
    state.month = new Date(); state.month.setDate(1);
    const e = els(); if (!e) return;
    e.slots.hidden = true; e.selected.hidden = true; e.input.value = '';
    if (full) {
      state.location = null;
      e.calWrap.hidden = true;
      e.wrap.querySelectorAll('input[name="appointment_location"]').forEach((r) => { r.checked = false; });
    }
  }

  document.addEventListener('change', (evt) => {
    const t = evt.target;
    if (t.matches && (t.matches('input[name="appointment_requested"]') || t.matches('input[name="appointment_location"]'))) {
      const form = t.closest('form');
      if (form !== state.form) { state.form = form; }
    }
    if (t.matches && t.matches('input[name="appointment_requested"]')) {
      const e = els(); if (!e) return;
      e.wrap.hidden = !t.checked;
      e.wrap.querySelectorAll('input[name="appointment_location"]').forEach((r) => { r.required = t.checked; });
      if (!t.checked) reset(true);
    }
    if (t.matches && t.matches('input[name="appointment_location"]')) {
      state.location = t.value;
      reset(false);
      const e = els(); if (!e) return;
      e.calWrap.hidden = false;
      renderCalendar();
    }
  });

  document.addEventListener('click', (evt) => {
    const inOurForm = evt.target.closest && evt.target.closest('form') === state.form;
    if (!inOurForm) return;
    const prev = evt.target.closest && evt.target.closest('[data-cal-prev]');
    const next = evt.target.closest && evt.target.closest('[data-cal-next]');
    const dayBtn = evt.target.closest && evt.target.closest('[data-cal-day]');
    const slotBtn = evt.target.closest && evt.target.closest('.appt-slot');
    if (prev && !prev.disabled) { state.month.setMonth(state.month.getMonth() - 1); renderCalendar(); }
    if (next && !next.disabled) { state.month.setMonth(state.month.getMonth() + 1); renderCalendar(); }
    if (dayBtn && !dayBtn.disabled) { state.day = dayBtn.dataset.calDay; renderCalendar(); renderSlots(); }
    if (slotBtn) {
      const slot = slotBtn.dataset.slot;
      const current = state.picks.get(state.day);
      if (current && current.has(slot)) {
        state.picks = new Map(); // tap again to unbook
      } else {
        state.picks = new Map([[state.day, new Set([slot])]]); // one appointment, one slot
      }
      renderSlots(); renderCalendar(); syncOutput();
    }
  });
}


/* --- Appointment requests must carry a day + time. The picker writes into a
   hidden field, and hidden inputs can't use HTML5 required (browsers refuse to
   focus them), so validate on submit instead. --- */
function setupAppointmentValidation() {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || !form.querySelector) return;
    const box = form.querySelector('input[name="appointment_requested"]');
    if (!box || !box.checked) return;
    const timeInput = form.querySelector('[data-appt-times-input]');
    const err = form.querySelector('[data-appt-error]');
    if (timeInput && !timeInput.value.trim()) {
      e.preventDefault();
      if (err) {
        err.hidden = false;
        err.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (err) {
      err.hidden = true;
    }
  });
}


function setupReferralOther() {
  document.addEventListener('change', (e) => {
    const select = e.target;
    if (!select.matches || !select.matches('select[name="referral_source"]')) return;
    const form = select.closest('form');
    const wrap = form && form.querySelector('[data-referral-other]');
    if (!wrap) return;
    const input = wrap.querySelector('input');
    const show = select.value === 'Other';
    wrap.hidden = !show;
    if (input) {
      input.required = show;
      if (!show) input.value = '';
    }
  });
}


/* --- Submit the inquiry form in the background so people stay where they are
   and get a real confirmation instead of Netlify's default receipt page. Both
   copies of the form keep action="/thank-you.html" as the no-JS fallback. --- */
function setupFormSuccess() {
  document.addEventListener('submit', async (e) => {
    if (e.defaultPrevented) return; // appointment validation already stopped it
    const form = e.target;
    if (!form || !form.getAttribute || form.getAttribute('name') !== 'check-your-date') return;

    e.preventDefault();
    const data = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    const label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      showFormSuccess(form, data);
    } catch (err) {
      // Never lose a lead to a flaky network. Hand it back to the browser,
      // which does a normal POST and lands on /thank-you.html.
      console.error('[form] background submit failed:', err.message);
      if (btn) { btn.disabled = false; btn.textContent = label; }
      form.submit();
    }
  });
}


function showFormSuccess(form, data) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const firstName = String(data.get('name') || '').trim().split(/\s+/)[0];
  const eventDate = String(data.get('event_date') || '').trim();
  const apptTime = String(data.get('appointment_time') || '').trim();
  const apptPlace = String(data.get('appointment_location') || '').trim();

  const prettyDate = (() => {
    if (!eventDate) return '';
    const d = new Date(eventDate + 'T12:00:00');
    return isNaN(d) ? '' : d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  })();

  const lines = [];
  lines.push(prettyDate
    ? `Your request for <strong>${esc(prettyDate)}</strong> is in, and we're checking availability now.`
    : `Your request is in, and we're looking at it now.`);

  if (apptTime) {
    lines.push(`We've got you down for <strong>${esc(apptTime)}</strong>` +
      (apptPlace ? ` at our ${esc(apptPlace)}` : '') +
      `. If that time doesn't work on our end, we'll call you to reschedule.`);
  }

  lines.push(`Someone from our team will get back to you <strong>within one business day</strong>. ` +
    `If you'd rather just talk it through, call us at <a href="tel:6317325886">631-732-5886</a>.`);

  const panel = document.createElement('div');
  panel.className = 'form-success';
  panel.setAttribute('role', 'status');
  panel.innerHTML =
    `<svg class="form-success-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">` +
    `<circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2" opacity="0.25"/>` +
    `<path d="M15 24.5l6.5 6.5L33 18" stroke="currentColor" stroke-width="2.5" ` +
    `stroke-linecap="round" stroke-linejoin="round"/></svg>` +
    lines.map((l) => `<p>${l}</p>`).join('');

  if (form.closest('.modal')) {
    panel.insertAdjacentHTML('beforeend',
      '<button type="button" class="btn btn-primary" data-close-modal="true">Back to the site</button>');
  }

  // Swap the intro copy over too, so the panel doesn't sit under "Check your date."
  const scope = form.parentElement || document;
  const heading = scope.querySelector('[data-form-heading]');
  if (heading) heading.textContent = firstName ? `Thanks, ${firstName}.` : 'Thanks for reaching out.';
  scope.querySelectorAll('[data-form-intro]').forEach((el) => { el.hidden = true; });

  // Both copies of this form carry an author-CSS display:flex, which outranks
  // the browser's [hidden] rule, so hide it inline as well.
  form.hidden = true;
  form.style.display = 'none';
  form.insertAdjacentElement('afterend', panel);
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


/* --- Boot --- */

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();
  setupNav();
  setupModal();
  setupLightbox();
  setupDocPreview();
  setupFooterYear();
  setupReferralOther();
  setupAppointmentToggle();
  setupAppointmentValidation();
  setupFormSuccess();
  renderFeaturedTalent();
  setupHeroVideo();
  renderTestimonial();
  renderShowcaseCalendar();
  renderShowcaseHomePreview();
  shuffleShowcase();
  renderVenueMarquee();
  setupReviewClamps();
  setupSectionRail();
  renderPackageCards();
  setupRosterNav();
});


/* --- Package cards ---
   Six tiers rendered from PACKAGES_DATA so the page and the detail
   pages can never drift. Photo-led, three across on a laptop, and the
   bullet list is capped so one long tier can't stretch the whole row. */
function renderPackageCards() {
  const data = (typeof window !== 'undefined' && Array.isArray(window.PACKAGES_DATA))
    ? window.PACKAGES_DATA : [];
  if (!data.length) return;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* The homepage slot asks for the compact form: photo, name, one line.
     The bullets and the button belong on /packages, where someone is
     actually comparing. Same data either way. */
  document.querySelectorAll('[data-package-cards]').forEach((slot) => {
    const compact = slot.hasAttribute('data-compact');
    slot.innerHTML = data.map((pkg) => {
      const tag = pkg.tag || (pkg.featured ? 'Most popular' : '');
      const specs = (pkg.included || []).slice(0, 4)
        .map((line) => `<li>${esc(line)}</li>`).join('');
      return `
      <a class="card-link package-card${pkg.featured ? ' is-featured' : ''}${compact ? ' is-compact' : ''}" href="/package/${esc(pkg.slug)}/">
        <div class="card-photo" style="background-image: url('${esc(pkg.photo)}');${esc(pkg.photoStyle || '')}"></div>
        ${tag ? `<span class="package-tag">${esc(tag)}</span>` : ''}
        <h3>${esc(pkg.name)}</h3>
        <p class="package-tagline">${esc(pkg.tagline)}</p>
        ${compact ? '' : `<ul class="package-specs">${specs}</ul>
        <span class="btn btn-primary">See details</span>`}
      </a>`;
    }).join('');
  });
}


/* --- Roster category rail (team page) ---
   49 people in 8 groups is a long scroll with no way back. Same fixed
   gutter rail the homepage uses, so it costs the roster no width and the
   cards stay full size. Built from the roster headings themselves, so
   adding a category to team.html keeps the rail in sync. --- */
function setupRosterNav() {
  const slot = document.querySelector('[data-roster-nav]');
  if (!slot) return;

  const cats = [...document.querySelectorAll('.roster-category')]
    .filter((c) => c.id && c.querySelector('.roster-category-heading'));
  if (!cats.length) return;

  /* Markup ships hidden so it never flashes as a bare list before JS
     turns it into the rail. */
  slot.removeAttribute('hidden');
  slot.className = 'section-rail roster-rail';
  slot.setAttribute('aria-label', 'Roster categories');
  slot.innerHTML = '<ol>' + cats.map((c) => {
    const label = c.querySelector('.roster-category-heading').textContent.trim();
    const count = c.querySelectorAll('.team-card').length;
    return `<li><a href="#${c.id}" data-roster-link="${c.id}" aria-current="false">`
      + `<span class="section-rail-label">${label} &middot; ${count}</span></a></li>`;
  }).join('') + '</ol>';

  const links = new Map(
    [...slot.querySelectorAll('[data-roster-link]')].map((a) => [a.dataset.rosterLink, a])
  );
  const setActive = (id) => {
    links.forEach((a, key) => a.setAttribute('aria-current', key === id ? 'true' : 'false'));
  };
  setActive(cats[0].id);

  /* Track the set of categories crossing the band rather than reacting to
     one entry, so a scroll that leaves every category still holds the
     last good answer instead of clearing it. */
  const inBand = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) inBand.add(e.target); else inBand.delete(e.target);
    });
    if (!inBand.size) return;
    const sorted = [...inBand].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    );
    setActive(sorted[sorted.length - 1].id);
  }, { rootMargin: '-25% 0px -70% 0px', threshold: 0 });

  cats.forEach((c) => io.observe(c));
}


/* --- Hero video source ---
   The hero box is landscape on a laptop and portrait on a phone, so one
   16:9 file cannot serve both: measured, a 16:9 frame shows 23-26% of its
   width on a phone, a 9:16 cut of the same footage shows 74-82%.

   The media attribute on <source> would do this declaratively and Chrome
   does honour it (verified three ways), but Safari and Firefox could not
   be checked here, and a browser that ignores it hands phones the desktop
   file, which is the exact thing this exists to prevent. So choose here.

   No src ships in the HTML, so nothing downloads until this runs and
   nothing is wasted. The still is a CSS background on the element, so the
   hero looks finished on the first paint either way. --- */
function setupHeroVideo() {
  const video = document.querySelector('.hero-bg-video');
  if (!video) return;

  /* Reduced motion is a stated preference, and data saver is a stated
     budget. Both get the still, which is already on screen, and neither
     pays for a download they did not ask for. */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduced || saveData) return;

  const tall = window.matchMedia('(max-width: 899px)').matches;
  const src = tall ? video.dataset.srcTall : video.dataset.srcWide;
  if (!src) return;

  video.src = src;
  /* autoplay is set here rather than in the markup: with no src attribute
     the browser has nothing to autoplay on parse, and muted + playsInline
     have to be true before play() to satisfy the autoplay policy. */
  video.muted = true;
  const start = () => video.play().catch(() => { /* policy said no; still shows */ });
  if (video.readyState >= 2) start();
  else video.addEventListener('loadeddata', start, { once: true });
}


/* --- Section rail ---
   A fixed dot per band so a reader part-way down a long page can see
   where they are and jump. Built from the DOM rather than a hardcoded
   list, so adding or removing a band keeps the rail in sync.

   Stops come from two places, merged in document order:
     - a .section or .final-cta that carries an .overline (its label)
     - any element marked [data-rail], for pages whose structure lives in
       headings inside one long band rather than in separate sections
       (the FAQ's five groups, the venue regions). The attribute value
       overrides the label if it is set.

   Every page, not just the homepage, but only where it earns its place:
   three stops minimum, and only screens wide enough to have a gutter
   outside the 1320px container for it to sit in. The team page is the
   one exception, since its roster rail already owns that gutter. --- */
function setupSectionRail() {
  if (!window.matchMedia('(min-width: 1430px)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  if (document.querySelector('[data-roster-nav]')) return;

  const slug = (s) => 'sec-' + s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const stops = [];
  const hero = document.querySelector('.hero');
  if (hero) {
    if (!hero.id) hero.id = 'home-top';
    stops.push({ el: hero, label: 'Top' });
  }

  document.querySelectorAll('.section, .final-cta, [data-rail]').forEach((el) => {
    if (el === hero) return;
    /* A [data-rail] heading nested in a section that already stops here
       would double up, so the attribute wins and the section is skipped
       only when it has no overline of its own. */
    const marked = el.hasAttribute('data-rail');
    const label = marked
      ? (el.getAttribute('data-rail').trim() || el.textContent.trim())
      : (el.querySelector('.overline') || {}).textContent;
    if (!label) return;
    if (!el.id) el.id = slug(label);
    stops.push({ el, label: label.trim() });
  });

  if (stops.length < 3) return;

  const rail = document.createElement('nav');
  rail.className = 'section-rail';
  rail.setAttribute('aria-label', 'Page sections');
  const list = document.createElement('ol');

  stops.forEach((stop) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + stop.el.id;
    a.setAttribute('aria-label', stop.label);
    const label = document.createElement('span');
    label.className = 'section-rail-label';
    label.textContent = stop.label;
    a.appendChild(label);
    li.appendChild(a);
    list.appendChild(li);
    stop.link = a;
  });

  rail.appendChild(list);
  document.body.appendChild(rail);

  /* Dark grounds: the rail sits over these, so it flips palette. A
     [data-rail] heading inherits the ground of the band it sits in. */
  const isDark = (el) =>
    !!el.closest('.hero, .final-cta, .section-dark');

  const setActive = (stop) => {
    stops.forEach((s) => s.link.removeAttribute('aria-current'));
    stop.link.setAttribute('aria-current', 'true');
    rail.classList.toggle('on-dark', isDark(stop.el));
  };

  setActive(stops[0]);

  /* Fires as a band crosses the middle of the viewport. */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const stop = stops.find((s) => s.el === entry.target);
      if (stop) setActive(stop);
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  stops.forEach((s) => observer.observe(s.el));
}


/* --- Homepage featured reviews: clamp long quotes, add a See more toggle.
   Only runs inside .reviews-clamped so the full /reviews page is untouched. --- */
function setupReviewClamps() {
  document.querySelectorAll('.reviews-clamped .review-card').forEach((card) => {
    const quote = card.querySelector('.review-quote');
    if (!quote || quote.scrollHeight <= quote.clientHeight + 2) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'review-more';
    btn.textContent = 'See more';
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('is-expanded');
      btn.textContent = open ? 'See less' : 'See more';
    });
    quote.insertAdjacentElement('afterend', btn);
  });
}
