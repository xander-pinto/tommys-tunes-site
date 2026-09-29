/* ============================================================
   Tommy's Tunes, packages data
   Single source of truth for /packages.html and the
   /package.html detail page.
   ============================================================ */

window.PACKAGES_DATA = [
  {
    slug: 'basic',
    name: 'Basic Entertainment',
    tagline: 'For intimate weddings and small gatherings of 75 or fewer.',
    photo: '/assets/images/packages/basic/basic_pf.jpg',
    longBody: 'The right tier for intimate weddings, microweddings, and small private events. One named DJ/MC running the entire night, same person on the music, the mic, and your timeline. The straightforward Tommy\'s Tunes experience without any production extras.',
    included: [
      '4 hours of music & entertainment',
      '1-man team: DJ/MC in professional attire',
      'Custom playlist consultation',
      'Setup & breakdown included',
    ],
    demo: null,
    gallery: [],
  },
  {
    slug: 'deluxe',
    name: 'Deluxe Entertainment',
    tagline: 'The Long Island wedding standard. DJ on the music, MC working the room.',
    photo: '/assets/images/packages/deluxe/deluxe_pf.jpg',
    longBody: 'The most-booked package on Long Island. Two named talent, a DJ focused entirely on the music, and a dedicated MC working the room and the timeline. The split lets each person do one job well, which is the difference you feel on the dance floor.',
    included: [
      '4 hours of music & entertainment',
      '2-man team: DJ + MC in professional attire',
      'Custom playlist consultation',
      'Setup & breakdown included',
    ],
    featured: true,
    demo: null,
    gallery: [],
  },
  {
    slug: 'super-deluxe',
    name: 'Super Deluxe Entertainment',
    tagline: 'Same team from ceremony through last dance, with the illuminated DJ booth.',
    photo: '/assets/images/packages/super-deluxe/super_deluxe_pf.jpg',
    longBody: 'Adds an extra 90 minutes of music coverage and the illuminated DJ booth. Your DJ runs music for the ceremony and cocktail hour as well as the reception, and the booth itself becomes part of the décor, colored to match your palette.',
    included: [
      '5½ hours of music & entertainment',
      'DJ music for ceremony + cocktail hour',
      'Illuminated DJ front board (your color palette)',
      '2-man team: DJ + MC',
    ],
    demo: null,
    gallery: [],
  },
  {
    slug: 'premiere',
    name: 'Premiere Entertainment',
    tagline: 'When you want the room to look as good as it sounds.',
    photo: '/assets/images/packages/premiere/premeire_pf.jpg',
    longBody: 'Adds full intelligent lighting and a dedicated lighting tech. Two Martin Mac 250 moving lights mounted on illuminated truss towers, the level of production you see at a club night, programmed to follow the wedding timeline instead of fighting it.',
    included: [
      '5 hours of music & entertainment',
      'DJ music for cocktail hour',
      'Illuminated DJ front board',
      '2 Mac Lights on 2 illuminated towers',
      '3-man team: DJ + MC + Light Tech',
    ],
    demo: null,
    gallery: [],
  },
  {
    slug: 'supreme',
    name: 'Supreme Entertainment',
    tagline: 'Adds live event photography on screens throughout the night.',
    photo: '/assets/images/packages/supreme/supreme_pf.jpg',
    // Wide room shot: the booth and the two TV towers sit small in the
    // middle with a lot of ceiling above. Zoom in on the setup instead.
    photoStyle: 'background-size: 143%; background-position: 42% 100%;',
    longBody: 'Layers Zap Shots, our live event photography, on top of the Premiere production. A pro photographer works the crowd while two 60-inch LCD TVs show the photos as they happen. Guests see themselves on screen within minutes.',
    included: [
      '5 hours of music & entertainment',
      'DJ music for cocktail hour',
      '2 × 60" LCD TVs with photographer displaying Zap Shots (live digital photos)',
      'Illuminated DJ front board',
      '2 Mac Lights on 2 illuminated towers',
      '4-man team: DJ + MC + Photographer + TV Tech',
    ],
    demo: null,
    gallery: [
      '/assets/images/packages/supreme/supreme_entertainment_example.jpg',
      '/assets/images/packages/supreme/example_supreme.jpg',
      '/assets/images/packages/supreme/supreme_dance.jpg',
    ],
  },
  {
    slug: 'grand',
    tag: 'Ultimate',
    name: 'Grand Entertainment',
    tagline: 'The full production, plus a live sax or percussionist on the reception.',
    photo: '/assets/images/packages/grand/grand_pf.jpg',
    longBody: 'This is the works. Everything in Supreme, and then a live musician on top of it, your pick of a saxophonist or a percussionist riffing over the DJ while the floor goes off. Five of our people run the room: the DJ, the MC, a photographer putting live shots up on the screens, a tech keeping the lights and TVs moving, and the musician. The whole space is lit, every part of the production is firing at once, and the energy is the kind guests are still texting you about weeks later. If you want your night to feel like the best show in town, this is the tier.',
    included: [
      '5 hours of music & entertainment',
      'DJ music for cocktail hour',
      '2 × 60" LCD TVs with photographer (Zap Shots + digital gallery)',
      'Illuminated DJ front board',
      '2 Mac Lights on 2 illuminated towers',
      'Your choice: live Sax Player OR Percussionist for reception',
      '5-man team: DJ + MC + Photographer + TV/Light Tech + Musician',
    ],
    ultimate: true,
    demo: null,
    gallery: [
      '/assets/images/packages/grand/grand_entertainment_pic.jpg',
    ],
  },
];
