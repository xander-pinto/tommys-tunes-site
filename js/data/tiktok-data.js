/* ============================================================
   Tommy's Tunes — TikTok library
   Source of truth for every TikTok clip we surface on the site.

   One clip can appear in several places. Tag it and the pages pick it up:
     people:   ['richie']        -> shows on /person/richie/
     services: ['co2-guns']      -> shows on /service/co2-guns/
   Both arrays can hold more than one slug, and a clip with empty arrays
   sits here unused until someone tags it.

   HOW TO ADD ONE: open the post on tiktok.com, copy the number at the end
   of the URL (.../video/7667019507885559053) into `id`, write a caption in
   our own voice rather than pasting the hashtags, then tag it.

   `views` is a snapshot for our own prioritising, not shown on the site.
   `shelved` means Xander looked at it and said no. Leave those alone; they are
   kept so nobody re-proposes them later.
   `pinned` forces a clip to the top of its page ahead of the view ordering, for
   the ones we want seen first regardless of how they performed.
   ============================================================ */

window.TIKTOK_DATA = [
  {
    id: '7667019507885559053',
    caption: 'A bride and groom who put Mario Kart on the ballroom screens.',
    views: '3.6M',
    people: [],
    services: ['weddings'],
    featured: true,
  },
  {
    id: '7673306294203337997',
    caption: 'Boys against girls, and the whole room sang along.',
    views: '186.3K',
    people: ['leo'],
    services: ['weddings'],
    featured: true,
  },
  {
    id: '7674399844835888397',
    caption: 'The transition people keep asking Rich about.',
    views: '19.4K',
    people: ['richie'],
    services: [],
  },
  {
    id: '7679454491388693774',
    caption: 'Rich reading the floor and going somewhere nobody expected.',
    views: '2977',
    people: ['richie'],
    services: [],
  },
  {
    id: '7681468205969198350',
    caption: 'Rich locking in behind the booth.',
    views: '1708',
    people: ['richie'],
    services: [],
  },
  {
    id: '7682079990120205582',
    caption: 'Smooth mix, no gap in the floor.',
    views: '832',
    people: ['richie'],
    services: [],
  },
  {
    id: '7679112687753694477',
    caption: 'Curtis walking a reception entrance in on the sax.',
    views: '603',
    people: ['curtis'],
    services: ['saxophonist'],
  },
  {
    id: '7672438145849298190',
    caption: 'A saxophone beat drop, played live over the set.',
    views: '786',
    people: ['mark'],
    services: ['saxophonist'],
  },
  {
    id: '7672110097790799118',
    caption: 'Sax over the dance floor, mid-reception.',
    views: '904',
    people: ['mark'],
    services: ['saxophonist'],
  },
  {
    id: '7678513362828856589',
    caption: 'A first dance on the cloud.',
    views: '555',
    people: [],
    services: ['dancing-on-cloud'],
  },
  {
    id: '7680700134480432397',
    caption: 'CO2 guns turning a reception into a nightclub.',
    views: '574',
    people: [],
    services: ['co2-guns'],
  },
  {
    id: '7680316321044647182',
    caption: 'The couple said the CO2 guns were worth it. They were.',
    views: '580',
    people: [],
    services: ['co2-guns'],
  },
  {
    id: '7678034411819994381',
    caption: 'Ending the night with a CO2 sendoff.',
    views: '484',
    people: [],
    services: ['co2-guns'],
  },
  {
    id: '7677633130005564686',
    caption: 'Introducing the new Mr. and Mrs.',
    views: '2852',
    people: ['leo'],
    services: ['weddings'],
  },
  {
    id: '7675475125017349389',
    caption: 'The groom picked her up and the room lost it.',
    views: '2875',
    people: [],
    services: ['weddings'],
  },
  {
    id: '7679212373550386446',
    caption: 'A bridal party that brought its own energy.',
    views: '623',
    people: [],
    services: ['weddings'],
  },

  /* --- Untagged. Real posts, no home yet. Add a slug to either array and
     they appear. The two mariachi clips have nowhere to go until there's a
     mariachi service page. --- */
  { id: '7674021866587131150', caption: 'MC Joe keeping the energy up.', views: '2128', people: ['joe-cip'], services: [] },
  { id: '7673667987634785549', caption: 'I want to dance with somebody.', views: '1798', people: ['leo'], services: ['weddings'] },
  { id: '7679861910795242765', caption: 'A mechanical bull at a wedding.', views: '1693', people: [], services: [], shelved: 'not a real bull, shows nothing about what we do' },
  { id: '7672900990466624782', caption: 'They sang the whole thing to each other.', views: '1070', people: [], services: ['weddings'] },
  { id: '7675163306457369870', caption: 'A mariachi band through dinner.', views: '948', people: [], services: [], shelved: 'mariachi, not useful in our context' },
  { id: '7675860340965428493', caption: 'Mariachi following the couple through the room.', views: '777', people: [], services: [], shelved: 'mariachi, not useful in our context' },
  { id: '7676610460711439629', caption: 'A stick pony at a wedding.', views: '792', people: [], services: [], shelved: 'stick pony, no' },
  { id: '7676245781547846926', caption: 'The helicopter on the dance floor.', views: '721', people: [], services: [], shelved: 'helicopter, same as the bull' },
  { id: '7681109263342718221', caption: 'Two families becoming one.', views: '650', people: ['joe-cip'], services: [] },
  { id: '7682571326908828941', caption: 'Curtis playing an upbeat one right on the dance floor.', views: '646', people: ['curtis'], services: ['saxophonist'] },
  { id: '7681789440603262222', caption: 'A fairytale reception.', views: '642', people: [], services: ['weddings'] },
  { id: '7678861314818624781', caption: 'A Guyanese family and a St. Lucian family becoming one.', views: '596', people: [], services: ['weddings'] },
  { id: '7679552230566956302', caption: 'Who did it better.', views: '580', people: [], services: [], shelved: 'not a strong video' },
  { id: '7683163942545329421', caption: 'Rich pulling off a transition nobody saw coming.', views: '536', people: ['richie'], services: [] },
  { id: '7680678676584893710', caption: 'Married on her birthday.', views: '505', people: [], services: [], shelved: 'not a strong video' },
  { id: '7678743474794941710', caption: 'The bride grabbed the mic for a song she loves.', views: '486', people: [], services: ['weddings'] },
  { id: '7678162374456626445', caption: 'Packed floor, all night.', views: '450', people: [], services: ['weddings'] },

  /* --- Second pass 2026-09-09: the rest of the account. The profile grid only
     loads ~33 at a time, so the first import missed these 54. --- */
  { id: '7671082351987936526', caption: 'The groomsmen brought WWE belts to the wedding.', views: '6126', people: [], services: ['weddings'] },
  { id: '7665854575965981966', caption: 'Joe Cip. pulling the energy out of the room.', views: '6117', people: ['joe-cip'], services: [] },
  { id: '7611942649309842702', caption: 'A guest vocalist sitting in with us at the Melograno wedding.', views: '4495', people: [], services: [], shelved: 'guest vocalist, cut' },
  { id: '7525714610800954679', caption: 'A Thursday wedding at the Piermont.', views: '3256', people: [], services: ['weddings'] },
  { id: '7658072468099271950', caption: 'Pat on the drums. Not your average wedding.', views: '2671', people: ['pat'], services: ['percussionist', 'weddings'] },
  { id: '7661058214997314829', caption: 'Nobody stays seated when Queen comes on.', views: '2587', people: [], services: ['weddings'] },
  { id: '7511095224509287723', caption: 'Blakeley and Christopher, the new Mr. and Mrs. Wood.', views: '2529', people: [], services: ['weddings'] },
  { id: '7585349862867127607', caption: 'A packed night at Fox Hollow.', views: '2439', people: [], services: ['weddings'] },
  { id: '7605356801718013198', caption: 'Come see us.', views: '2436', people: [], services: [], shelved: 'cut' },
  { id: '7663610999899000077', caption: 'Leo commanding a room.', views: '2161', people: ['leo'], services: [] },
  { id: '7593097754964938039', caption: 'An average night at Fox Hollow.', views: '1917', people: [], services: ['weddings'] },
  { id: '7656924865210993933', caption: 'A fairytale wedding, on the cloud and under the sparklers.', views: '1663', people: [], services: ['dancing-on-cloud', 'cold-sparklers', 'weddings'] },
  { id: '7671705166009109774', caption: 'Mike N. calling everyone in around the couple.', views: '1632', people: ['mike-n'], services: ['weddings'] },
  { id: '7520665663581523230', caption: 'Northport senior prom.', views: '1594', people: [], services: [], shelved: 'prom, cut' },
  { id: '7585332914641030431', caption: 'A first dance in the middle of the cloud.', views: '1571', people: [], services: ['dancing-on-cloud'] },
  { id: '7670680786428759310', caption: 'Joe Cip. getting every hand in the room up.', views: '1468', people: ['joe-cip'], services: ['weddings'] },
  { id: '7620883942014520606', caption: 'Kevin had his boys locked in at Larkfield.', views: '1366', people: [], services: [], shelved: 'cut' },
  { id: '7671328642902887693', caption: 'A DJ who is into the music changes the whole wedding.', views: '1328', people: [], services: [], shelved: 'cut' },
  { id: '7641339123797593357', caption: 'Pat on the kit while the floor sings along.', views: '1256', people: ['pat'], services: ['percussionist', 'weddings'] },
  { id: '7668110150217043214', caption: 'The bridesmaids put on a whole performance.', views: '1245', people: [], services: ['weddings'] },
  { id: '7666581018144492813', caption: 'To the window, to the wall.', views: '1229', people: [], services: ['weddings'] },
  { id: '7641333992901446925', caption: 'Mark S. and the energy a saxophone adds.', views: '1194', people: ['mark-s'], services: ['saxophonist'] },
  { id: '7632082034449566990', caption: 'The one song you don\'t want to leave a wedding without hearing.', views: '1149', people: [], services: ['weddings'] },
  { id: '7657692231364545805', caption: 'Sunset, and the two of them.', views: '1125', people: [], services: ['weddings'] },
  { id: '7667685280014519565', caption: 'A room full of people having the night they wanted.', views: '1090', people: [], services: ['weddings'] },
  { id: '7639834799556807950', caption: 'Ready to celebrate with us.', views: '1070', people: [], services: ['weddings'] },
  { id: '7658468581054745869', caption: 'Anderson on the decks with Mike on the mic.', views: '1015', people: ['anderson', 'mike'], services: ['weddings'] },
  { id: '7641729642151316766', caption: 'Taylor Swift at the Old Field Club. Must play or do not play.', views: '1008', people: [], services: ['weddings'] },
  { id: '7668476119762357517', caption: 'PJ, and reason number 302 to hire an energetic MC.', views: '951', people: ['pj'], services: ['weddings'] },
  { id: '7669531049587690766', caption: 'We like our dance floors active.', views: '935', people: [], services: ['weddings'] },
  { id: '7666174659041201421', caption: 'Mario Kart at your wedding. Would you.', views: '926', people: [], services: [], shelved: 'duplicate Mario Kart, cut' },
  { id: '7665122898163633421', caption: 'The top five Joe Cip. moments.', views: '879', people: [], services: [], shelved: 'silly, not right for the site' },
  { id: '7669902160271789326', caption: 'Joe Cip. sending his love out to the floor.', views: '845', people: ['joe-cip'], services: [] },
  { id: '7662160015976959245', caption: 'Tuned In, volume one. Joe Cip. on the mic, Rich on the decks, the cloud and the sparklers.', views: '838', people: ['joe-cip', 'richie'], services: ['weddings', 'dancing-on-cloud', 'cold-sparklers'], pinned: true },
  { id: '7668843051317546254', caption: 'Rich cooking again.', views: '755', people: ['richie'], services: [] },
  { id: '7665522418781392141', caption: 'Take us to the promised land, Joe.', views: '755', people: ['joe-cip'], services: [] },
  { id: '7668372544231116045', caption: 'Whose grandpa has this much swag.', views: '750', people: [], services: [], shelved: 'grandpa swag, cut' },
  { id: '7617972366638894350', caption: 'Kerrie and Stephen, married in March.', views: '750', people: [], services: ['weddings'] },
  { id: '7657310431563812110', caption: 'Live drums over the set.', views: '736', people: ['joe-i'], services: ['percussionist'] },
  { id: '7661775586720976142', caption: 'Weddings bring out the best in us.', views: '728', people: [], services: ['weddings'] },
  { id: '7659907676972911886', caption: 'A Taylor Swift moment that gave the room chills.', views: '708', people: [], services: ['weddings'] },
  { id: '7669205277471771918', caption: 'Everybody\'s favorite DJ at it again.', views: '675', people: ['richie'], services: [] },
  { id: '7663248481695354126', caption: 'Every wedding needs a good DJ.', views: '636', people: [], services: ['weddings'] },
  { id: '7608643528075398414', caption: 'The moment the floor lights up and the party levels up.', views: '623', people: [], services: ['dance-floor'] },
  { id: '7661555810186562830', caption: 'Curtis making you feel every note.', views: '619', people: ['curtis'], services: ['saxophonist'] },
  { id: '7662490902153219342', caption: 'Rich working like a wizard.', views: '612', people: ['richie'], services: [] },
  { id: '7660688147260476685', caption: 'Curtis playing through the limbo.', views: '611', people: ['curtis'], services: ['saxophonist'] },
  { id: '7659548167490243853', caption: 'Fourth of July weekend, flags and all.', views: '580', people: [], services: ['weddings'] },
  { id: '7659180980359499022', caption: 'Live drums on the funk soul brother.', views: '566', people: ['joe-i'], services: ['percussionist'] },
  { id: '7663884871793675534', caption: 'Serious hands on the drums.', views: '548', people: ['joe-i'], services: ['percussionist'] },
  { id: '7664729434099911950', caption: 'Tuned In, volume two.', views: '466', people: [], services: ['weddings'], pinned: true },
  { id: '7662914765227937038', caption: 'We found John Summit\'s biggest fan at a wedding.', views: '417', people: [], services: ['weddings'] },
  { id: '7660286292332219661', caption: 'Tag that guy.', views: '415', people: [], services: ['weddings'] },
  { id: '7651328322592443661', caption: 'Knicks fans at a wedding during the finals.', views: '387', people: [], services: [], shelved: 'Knicks clip, quality is too poor' },

  /* --- Third pass 2026-09-21: everything posted since the second pass. Two of
     these came in squarish, with letterbox bars top and bottom. Per Xander they
     keep the bars rather than being cropped to fill, so the posters stay the
     whole frame. --- */
  { id: '7684444976968699150', caption: 'Born just in time to cut the mozzarella.', views: '4478', people: [], services: ['weddings'] },
  { id: '7686984150724775181', caption: 'Leo on intros, and a bouquet caught like a football.', views: '2370', people: ['leo'], services: ['weddings'] },
  { id: '7685507295568006414', caption: 'Mike on the mic, Rich on the decks.', views: '2329', people: ['mike', 'richie'], services: ['weddings'] },
  { id: '7684810501431266573', caption: 'Rich doing what he does behind the booth.', views: '2002', people: ['richie'], services: [] },
  { id: '7686646219065642253', caption: 'Joe Cip. running the introductions.', views: '1622', people: ['joe-cip'], services: ['weddings'] },
  { id: '7685058414761790734', caption: 'Curtis on the sax, trading off with the mic.', views: '1419', people: ['curtis'], services: ['weddings', 'saxophonist'] },
  { id: '7683893069061590286', caption: 'A slow one, sung with feeling.', views: '1266', people: [], services: [], shelved: 'Xander passed on it' },
  { id: '7685778370226933006', caption: 'A Jets chant at a wedding, pushups and all.', views: '797', people: [], services: ['weddings'] },
  { id: '7687307160304258318', caption: 'Leo leading the Footloose line dance.', views: '658', people: ['leo'], services: ['weddings'] },
  { id: '7687654499120401677', caption: 'A first dance on the cloud.', views: '616', people: [], services: ['weddings', 'dancing-on-cloud'] },
  { id: '7686248739379399950', caption: 'Mike N. on intros, and the flowers got spiked.', views: '543', people: ['mike-n'], services: ['weddings'] },
  { id: '7685889245600419086', caption: 'When the song you grew up on comes on.', views: '417', people: [], services: [], shelved: 'Xander passed on it' },
  { id: '7687996919435545869', caption: 'Joe Cip. on the mic for a reception people swear is staged.', views: '2', people: ['joe-cip'], services: ['weddings'] },
];
