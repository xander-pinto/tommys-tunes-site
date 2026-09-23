/* ============================================================
   Tommy's Tunes — showcases data

   Two-section page on /showcase.html:
     - "Upcoming showcases" auto-renders future-dated entries
       in chronological order. Homepage shows max 2.
     - "Past showcases" auto-renders past-dated entries in
       reverse chronological order (newest first). Notes don't
       display on past cards.

   Fields:
     date        ISO format (YYYY-MM-DD), used for sorting + filtering
     dateDisplay Human-readable, shown on the card
     time        Free-form ("12:00pm – 3:00pm", "Doors at 6pm", etc.)
     venue       Name of the venue
     type        Label (e.g. "Bridal Showcase", "Performance")
     note        Optional one-liner shown on upcoming cards only
     ticketUrl   Optional. When present, renders a "Get tickets →" link.
   ============================================================ */

window.SHOWCASES_DATA = [

  /* ----------------- UPCOMING ----------------- */

  {
    date: '2026-05-31',
    dateDisplay: 'May 31, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'Port Jefferson Country Club',
    type: 'Bridal Showcase',
    note: 'Meet the team, see the lighting setups live, and ask anything. Open to all couples.',
    ticketUrl: 'https://www.portjeffersoncountryclub.com/events-and-packages/wedding-showcase',
  },
  {
    date: '2026-06-16',
    dateDisplay: 'June 16, 2026',
    time: '6:00pm – 9:00pm',
    venue: 'The Watermill',
    type: 'Bridal Showcase',
    note: 'Smithtown. Drop in, chat with the crew, and talk through your night.',
    ticketUrl: 'https://watermillcaterers.ticketspice.com/summer-2026-showcase',
  },
  {
    date: '2026-08-16',
    dateDisplay: 'August 16, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'The Inn At East Wind',
    type: 'Bridal Showcase',
    note: 'LI Bridal Expo Super Show. Wading River.',
    ticketUrl: 'https://longislandbridalexpo.com/longisland-bridal-shows-2/',
  },
  {
    date: '2026-08-18',
    dateDisplay: 'August 18, 2026',
    time: '6:30pm – 8:30pm',
    venue: 'Garden City Hotel',
    type: 'Bridal Showcase',
    note: 'LI Bridal Expo.',
    ticketUrl: 'https://longislandbridalexpo.com/longisland-bridal-shows-2/',
  },
  {
    date: '2026-10-21',
    dateDisplay: 'October 21, 2026',
    time: 'Doors open 6:00pm',
    venue: 'Fox Hollow',
    type: 'Bridal Showcase',
    note: 'Fall showcase in Woodbury. Meet the team and talk through your night.',
    ticketUrl: 'https://foxhollowcatering.ticketspice.com/fall-2026-showcase',
  },
  {
    date: '2026-10-28',
    dateDisplay: 'October 28, 2026',
    time: 'Doors open 6:00pm',
    venue: 'The Watermill',
    type: 'Bridal Showcase',
    note: 'Fall showcase in Smithtown. See the setups live and ask us anything.',
    ticketUrl: 'https://watermillcaterers.ticketspice.com/fall-2026-showcase',
  },
  {
    date: '2026-08-19',
    dateDisplay: 'August 19, 2026',
    time: 'Doors at 6:00pm',
    venue: 'The Watermill',
    type: 'Bridal Showcase',
    note: 'Smithtown. Stop by the Tommy\'s Tunes table and talk through your night.',
    ticketUrl: 'https://watermillcaterers.ticketspice.com/august-19-2026-showcase',
  },
  {
    date: '2026-09-16',
    dateDisplay: 'September 16, 2026',
    time: '6:30pm – 9:00pm',
    venue: "Captain Bill's - Bay Shore",
    type: 'Bridal Showcase',
    note: 'LI Bridal Expo.',
    ticketUrl: 'https://longislandbridalexpo.com/longisland-bridal-shows-2/',
  },
  {
    date: '2026-11-01',
    dateDisplay: 'November 1, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'Atlantis Banquet & Events - Riverhead',
    type: 'Bridal Showcase',
    note: 'LI Bridal Expo Super Show.',
    ticketUrl: 'https://longislandbridalexpo.com/longisland-bridal-shows-2/',
  },
  {
    date: '2026-11-08',
    dateDisplay: 'November 8, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'Port Jefferson Country Club',
    type: 'Bridal Showcase',
    note: 'Meet the team, see the setups live, and ask anything. Open to all couples.',
    ticketUrl: 'https://www.portjeffersoncountryclub.com/event-registration',
  },
  {
    date: '2026-11-15',
    dateDisplay: 'November 15, 2026',
    time: '6:30pm – 9:00pm',
    venue: 'Garden City Hotel',
    type: 'Bridal Showcase',
    note: 'LI Bridal Expo.',
    ticketUrl: 'https://longislandbridalexpo.com/longisland-bridal-shows-2/',
  },

  /* ----------------- PAST ----------------- */

  {
    date: '2026-05-28',
    dateDisplay: 'May 28, 2026',
    time: '9:00am – 3:00pm',
    venue: 'Suffolk Community College · Brentwood Campus',
    type: 'Corporate Showcase',
  },
  {
    date: '2026-05-20',
    dateDisplay: 'May 20, 2026',
    time: '6:30pm – 9:00pm',
    venue: 'Willow Creek Country Club - Mt. Sinai',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-05-20',
    dateDisplay: 'May 20, 2026',
    time: '6:00pm – 8:00pm',
    venue: 'Pavilion at Sunken Meadow',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-05-11',
    dateDisplay: 'May 11, 2026',
    time: '6:00pm – 9:00pm',
    venue: "Land's End",
    type: 'Bridal Showcase',
  },
  {
    date: '2026-04-26',
    dateDisplay: 'April 26, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'Atlantis Banquet & Events - Riverhead',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-04-21',
    dateDisplay: 'April 21, 2026',
    time: '6:00pm – 9:00pm',
    venue: 'Fox Hollow',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-04-14',
    dateDisplay: 'April 14, 2026',
    time: '6:00pm – 9:00pm',
    venue: 'Crest Hollow Country Club',
    type: 'Performance',
  },
  {
    date: '2026-03-29',
    dateDisplay: 'March 29, 2026',
    time: '1:00pm – 4:00pm',
    venue: 'The Watermill',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-03-15',
    dateDisplay: 'March 15, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'Willow Creek Country Club - Mt. Sinai',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-02-23',
    dateDisplay: 'February 23, 2026',
    time: '6:30pm – 9:00pm',
    venue: 'Garden City Hotel',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-02-22',
    dateDisplay: 'February 22, 2026',
    time: '12:00pm – 3:00pm',
    venue: 'The Inn At East Wind',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-02-07',
    dateDisplay: 'February 7, 2026',
    time: '1:00pm – 3:00pm',
    venue: 'Port Jefferson Country Club',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-02-01',
    dateDisplay: 'February 1, 2026',
    time: '1:00pm – 5:00pm',
    venue: 'Flowerfield',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-01-31',
    dateDisplay: 'January 31, 2026',
    time: '1:00pm – 4:00pm',
    venue: 'The Watermill',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-01-15',
    dateDisplay: 'January 15, 2026',
    time: '6:00pm – 9:00pm',
    venue: "Villa Lombardi's",
    type: 'Bridal Showcase',
  },
  {
    date: '2026-01-11',
    dateDisplay: 'January 11, 2026',
    time: '12:00pm – 5:00pm',
    venue: 'Nassau Veterans Memorial Coliseum',
    type: 'Bridal Showcase',
  },
  {
    date: '2026-01-10',
    dateDisplay: 'January 10, 2026',
    time: '12:00pm – 5:00pm',
    venue: 'Nassau Veterans Memorial Coliseum',
    type: 'Bridal Showcase',
  },

];
