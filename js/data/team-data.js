/* ============================================================
   Tommy's Tunes, team data
   Single source of truth for the homepage rotation, the team
   roster, and the /person.html detail page.

   To add a person:
     1. Add a record below.
     2. Drop their headshot at /assets/images/team/<slug>/<file> (or use
        /assets/images/team/empty_image.jpg until you have one).
     3. (Optional) Add bio, socials, demo/demos, and gallery photos.

   Demos: use a `demos` array. Each entry is
     { type: 'youtube', url: 'https://www.youtube.com/embed/<id>', caption: '...' }
   For a clip that should start partway in, add ?start=<seconds> to the url.
   Local files use { type: 'video', url: '/assets/.../clip.mp4', caption: '...' }.

   Empty fields are hidden gracefully on the detail page, fill them
   in over time, no rush.
   ============================================================ */

window.TEAM_DATA = [
  {
    slug: 'pj',
    featured: true,
    name: 'PJ',
    role: 'MC',
    photo: '/assets/images/team/mcs/pj/pj_pf.jpg',

    thumb: '/assets/images/team/mcs/pj/pj_pf-600w.jpg',
    bio: 'PJ teaches music during the week, and you can hear it the second he picks up the mic: clear, warm and easy to like. He gets the floor going, then walks out and dances with it, because he can actually move.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/TXuCrMH1Jaw', caption: 'On the mic at a wedding, with the band.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/76l3Bpn4kCM', caption: 'A Sweet 16 at Flowerfield.' },
    ],
    gallery: [
      '/assets/images/team/mcs/pj/PJ_portrait.jpg',
      '/assets/images/team/mcs/pj/pj_happy.jpg',
    ],
  },
  {
    slug: 'joe-cip',
    featured: true,
    name: 'Joe Cip.',
    role: 'MC · DJ',
    photo: '/assets/images/team/mcs/joe-cip/joe_cip_pf.jpg',

    thumb: '/assets/images/team/mcs/joe-cip/joe_cip_pf-600w.jpg',
    bio: 'Joe Cip is usually the best-dressed guy in the room, often in sunglasses. He\'s been on the mic since he was fifteen, twenty-six years now, and he still brings more energy than anyone there. Couples love him because he cares. He stays on top of the timeline, keeps the night moving, and gets the whole room going with him.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/PF-G36jukFc', caption: 'On the mic at Sunken Meadow, 2026.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/O2Tl1QHdeaE', caption: 'On the mic.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/3WQgZpfzxB4', caption: 'Hosting the night.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/eWjwECUgGqY', caption: 'A prom demo with DJ Anderson.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/IYZ1Gf-01T4', caption: 'Hosting a Bar Mitzvah.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/6sxBipgCVH0', caption: 'On a demo with DJ Steven.' },
    ],
    gallery: [
      '/assets/images/team/mcs/joe-cip/joe_enthusiastic.jpg',
      '/assets/images/team/mcs/joe-cip/cip_actionshot.jpg',
      '/assets/images/team/mcs/joe-cip/cip_smiling_oldpic.JPG',
      '/assets/images/team/mcs/joe-cip/joe_announcing.jpg',
      '/assets/images/team/mcs/joe-cip/joe_flyyyy.jpg',
      '/assets/images/team/mcs/joe-cip/joe_talk.jpg',
    ],
  },
  {
    slug: 'mike',
    featured: true,
    name: 'Mike',
    role: 'MC',
    photo: '/assets/images/team/mcs/mike/mike_pf.jpg',

    thumb: '/assets/images/team/mcs/mike/mike_pf-600w.jpg',
    bio: 'Mike is classy and direct. He says what needs saying and nothing more, runs a tight, organized night, and never makes it about himself. He\'s a family man, which may be why families trust him with theirs.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/DfGghNZqJNQ', caption: 'On the mic.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/ew7rP0d43KU', caption: 'Running a full party with DJ Dom.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/JHOJfSej0fc', caption: 'Hosting a wedding with the crew.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/rwZ7LyD-afQ', caption: 'On the mic with DJ Dominick.' },
    ],
    gallery: [
      '/assets/images/team/mcs/mike/mike_on_mic.jpg',
      '/assets/images/team/mcs/mike/mike_speaking.jpg',
      '/assets/images/team/mcs/mike/mike_having_fun.jpg',
    ],
  },
  {
    slug: 'leo',
    featured: true,
    name: 'Leo',
    role: 'MC · DJ · EN/ES',
    photo: '/assets/images/team/mcs/leo/leo_pf.avif',
    bio: 'Leo is bilingual in English and Spanish, and maybe the most precise MC on the roster. He never says too much or too little. He lets people have their moments, then steers the room where it needs to go, and he stays out on the floor even when he isn\'t the loudest one there. He\'s new to Tommy\'s Tunes, but he\'s been doing this a long time.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/52CquNBGDPE', caption: 'On the mic and running intros.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/Trd-c2k0ruw', caption: 'Doing the introductions.' },
    ],
    gallery: [],
  },
  {
    slug: 'mike-n',
    name: 'Mike N.',
    role: 'MC',
    photo: '/assets/images/team/mcs/mike-n/mike_n_pf.jpg',

    thumb: '/assets/images/team/mcs/mike-n/mike_n_pf-600w.jpg',
    bio: 'Mike N. is old school in the best way. He\'s an older Italian gentleman who has done this his whole life, and he\'ll give it to you straight. He treats your night like he\'s done a thousand of them, because he has. When you picture a classic Long Island MC, you\'re picturing Mike.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/coeKryVyKEU', caption: 'On the mic at Larkfield, 2026.' },
    ],
    gallery: [],
  },
  {
    slug: 'joe-costa',
    name: 'Joe Costa',
    role: 'MC',
    photo: '/assets/images/team/mcs/joe-costa/joe_costa_pf.JPG',

    thumb: '/assets/images/team/mcs/joe-costa/joe_costa_pf-600w.jpg',
    bio: 'Joe has been on the mic since he was a teenager and has run more parties than he can count. You can tell from how easy he is to be around. He\'s professional and kind, and he\'ll do whatever it takes to make your night go right.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/vAmu35AwUrM', caption: 'Demo reel.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/PsBrel-K-SE', caption: 'Working a night with DJ Steven.' },
    ],
    gallery: [
      '/assets/images/team/mcs/joe-costa/joe_costa_action.jpg',
    ],
  },
  {
    slug: 'david',
    name: 'David',
    role: 'MC',
    photo: '/assets/images/team/mcs/david/david_on_mic.jpg',

    thumb: '/assets/images/team/mcs/david/david_on_mic-600w.jpg',
    bio: 'David is the young gun, the one you want when a Sweet 16 or a Mitzvah needs to move. He lives on the mic, pulls the crowd into each moment, and sets up the shots people look back on for years. He makes sure the night never sits still.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/C140WD5h6Gw?start=1', caption: 'Running the introductions at a wedding.' },
    ],
    gallery: [
      '/assets/images/team/mcs/david/davidpic.jpg',
      '/assets/images/team/mcs/david/david_crowd.jpg',
      '/assets/images/team/mcs/david/david_cake.jpg',
    ],
  },
  {
    slug: 'zach',
    name: 'Zach',
    role: 'MC',
    photo: '/assets/images/team/mcs/zach/zach_pf.avif',
    bio: 'Zach is one of the youngest on the roster and one of the most reliable. He\'s confident on the mic and close to obsessive about the timeline, and nobody in the room will care more about getting your night right.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/JJzcTUVoZWY', caption: 'Hosting a Sweet 16.' },
    ],
    gallery: [],
  },
  {
    slug: 'yianni',
    name: 'Yianni',
    role: 'MC · EN/GR',
    photo: '/assets/images/team/mcs/yianni/yianni_pf.jpg',

    thumb: '/assets/images/team/mcs/yianni/yianni_pf-600w.jpg',
    bio: 'Yianni is bilingual in English and Greek, the natural pick when a wedding leans Greek. He\'s young and easy to work with, and he keeps both sides of the room in the celebration.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/bvn6C8LQZMU', caption: 'Doing the introductions.' },
    ],
    gallery: [],
  },
  {
    slug: 'max',
    name: 'Max',
    role: 'MC',
    photo: '/assets/images/team/mcs/max/max_pf.jpg',

    thumb: '/assets/images/team/mcs/max/max_pf-600w.jpg',
    bio: 'A likable, fun presence with a clear voice and plenty of parties behind him. Max knows how to work a room when he\'s on the schedule.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/iRK-VVmC6j0', caption: 'On the mic.' },
    ],
    gallery: [],
  },
  {
    slug: 'richie',
    featured: true,
    name: 'Rich',
    role: 'DJ',
    photo: '/assets/images/team/djs/richie/rich_pf.JPG',

    thumb: '/assets/images/team/djs/richie/rich_pf-600w.jpg',
    bio: 'Our TikTok calls him everyone\'s favorite DJ, and he\'s earned it. Rich may be the most requested name on the roster. His mixes run high energy, and he knows enough music to handle whatever the floor asks for. He\'s building a real following, and after one night with him you\'ll see why.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/PF-G36jukFc', caption: 'On the decks at Sunken Meadow, 2026.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/EoTbENf2NhI', caption: 'MCing and DJing a night solo.' },
    ],
    gallery: [
      '/assets/images/team/djs/richie/richie_arms_out.jpg',
      '/assets/images/team/djs/richie/richie_glasses.jpg',
      '/assets/images/team/djs/richie/rich_pointing.JPG',
    ],
  },
  {
    slug: 'dominick',
    featured: true,
    name: 'Dominick',
    role: 'DJ',
    photo: '/assets/images/team/djs/dominick/dom_pf.JPG',

    thumb: '/assets/images/team/djs/dominick/dom_pf-600w.jpg',
    bio: 'Dominick reads a room as well as anyone, and he\'s one of our most requested DJs. He\'s been doing this since he was a teenager. He shows up early, stays organized and sweats every detail, right down to whether the wires are tangled.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/ew7rP0d43KU', caption: 'Running a full party with MC Mike.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/rwZ7LyD-afQ', caption: 'On the decks with MC Mike.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/coeKryVyKEU', caption: 'On the decks at Larkfield, 2026.' },
    ],
    gallery: [],
  },
  {
    slug: 'anderson',
    featured: true,
    name: 'Anderson',
    role: 'DJ · MC · EN/ES',
    photo: '/assets/images/team/djs/anderson/anderson_pf.jpg',

    thumb: '/assets/images/team/djs/anderson/anderson_pf-600w.jpg',
    bio: 'Anderson is bilingual in English and Spanish and precise behind the decks. He mixes clean, keeps the energy up and reads a crowd well. He\'s been doing this a long time and he\'s as reliable as they come, which is why he\'s a go-to for weddings and Quinceañeras that move between two languages all night.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/5vw9sdANqAg', caption: 'MCing in English and Spanish.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/oqZ0QnOVRf8?start=29', caption: 'DJing a prom.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/eWjwECUgGqY', caption: 'A prom demo with MC Joe Cip.' },
    ],
    gallery: [
      '/assets/images/team/djs/anderson/anderson_behind_booth.jpg',
    ],
  },
  {
    slug: 'jon',
    featured: true,
    name: 'Jon',
    role: 'DJ · MC',
    photo: '/assets/images/team/djs/jon/jon_pf.jpg',

    thumb: '/assets/images/team/djs/jon/jon_pf-600w.jpg',
    bio: 'Jon\'s transitions are so smooth you won\'t notice them. He keeps everything organized and every blend clean, and he reads where the floor wants to go before it gets there. Couples feel it even if they can\'t name it.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/1WAMXBaWtM4?start=21', caption: 'DJing a wedding.' },
    ],
    gallery: [],
  },
  {
    slug: 'steven',
    name: 'Steven',
    role: 'DJ',
    photo: '/assets/images/team/djs/steven/steven_pf.jpg',
    bio: 'Steven sits on both sides of the wedding. He\'s behind the decks with fast, high-energy sets, and he\'s also the guy you plan the whole thing with from the start. He\'s been DJing since he was eighteen, so he knows exactly what makes a wedding work and how to keep it on schedule. He cares about the details because he\'s usually the one who mapped them out with you.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/TXuCrMH1Jaw', caption: 'Behind the decks at a wedding.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/JHOJfSej0fc', caption: 'DJing a wedding with the crew.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/6sxBipgCVH0', caption: 'On a demo with Joe Cip.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/PsBrel-K-SE', caption: 'Working a night with Joe Costa.' },
    ],
    gallery: [
      '/assets/images/team/djs/steven/steven_behind_booth.jpg',
    ],
  },
  {
    slug: 'konstantine',
    name: 'Konstantine',
    role: 'DJ',
    photo: '/assets/images/team/djs/konstantine/Konstantine_pf.jpg',

    thumb: '/assets/images/team/djs/konstantine/Konstantine_pf-600w.jpg',
    bio: 'Konstantine is a club DJ at heart. You\'ll catch him spinning bigger rooms and nightlife events, with a real following behind him. He brings that energy to weddings and parties, keeps the music loud and moving, and cares about every set.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/YPPfJBD8G3k?start=57', caption: 'On a set.' },
    ],
    gallery: [],
  },
  {
    slug: 'johnny-munroe',
    name: 'Johnny Munroe',
    role: 'DJ',
    photo: '/assets/images/team/djs/johnny-munroe/johnny_pf.jpg',

    thumb: '/assets/images/team/djs/johnny-munroe/johnny_pf-600w.jpg',
    bio: 'Johnny is the youngest DJ on the roster. He mixes with real technical skill and knows how to lock in a younger crowd. He can pick up the mic when he needs to, and he\'s friendly and easygoing.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [
      '/assets/images/team/djs/johnny-munroe/johnny_djing.jpg',
      '/assets/images/team/djs/johnny-munroe/packed_floor_with_johnny.jpg',
    ],
  },
  {
    slug: 'ruben',
    name: 'Ruben',
    role: 'DJ · EN/ES',
    photo: '/assets/images/team/djs/ruben/ruben_pf.jpg',

    thumb: '/assets/images/team/djs/ruben/ruben_pf-600w.jpg',
    bio: 'Ruben is one of the kindest guys on the roster and one of the most experienced. He\'s bilingual in English and Spanish, mixes with a real touch, and cares about getting your night right. If you get the chance, ask him about watches.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/xqNlj59OCRU', caption: 'On the mic.' },
    ],
    gallery: [],
  },
  {
    slug: 'gio',
    name: 'Gio',
    role: 'DJ · EN/ES',
    photo: '/assets/images/team/djs/gio/gio_pf.jpg',

    thumb: '/assets/images/team/djs/gio/gio_pf-600w.jpg',
    bio: 'Gio is a DJ first, an MC when the night calls for it, and bilingual in English and Spanish either way. He takes the craft seriously and pays close attention to the details. He also produces his own music, so his ear runs deeper than most.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/cE23xYn59LE', caption: 'A wedding at East Wind, with DJ Steven.' },
    ],
    gallery: [],
  },
  {
    slug: 'mark',
    name: 'Mark',
    role: 'Saxophonist',
    photo: '/assets/images/team/live-musicians/mark/mark_livemusician_pf.jpg',

    thumb: '/assets/images/team/live-musicians/mark/mark_livemusician_pf-600w.jpg',
    bio: 'Mark is a saxophone player who knows what a live horn does to a room. Put him in a cocktail hour or on the floor during the reception and the energy lifts. He\'s polished and professional.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/gVdgmpTlu0I', caption: 'On the saxophone.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/mark/mark_action.jpg',
    ],
  },
  {
    slug: 'mark-s',
    name: 'Mark S.',
    role: 'Saxophonist',
    photo: '/assets/images/team/live-musicians/mark_stuckey/mark_stuckey_pf.jpg',

    thumb: '/assets/images/team/live-musicians/mark_stuckey/mark_stuckey_pf-600w.jpg',
    bio: 'Mark is a high-energy saxophone player and a nice guy. He brings real enthusiasm to a set and has a strong following on social media.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/4T8rrU7YS7c', caption: 'Playing right in the crowd.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/o_mNTcEVXoQ', caption: 'On the saxophone.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/mark_stuckey/mark_stuckey_action.jpg',
      '/assets/images/team/live-musicians/mark_stuckey/mark_stuckey_alt.jpg',
    ],
  },
  {
    slug: 'curtis',
    name: 'Curtis',
    role: 'Saxophonist',
    photo: '/assets/images/team/live-musicians/curtis/curtis_pf.jpg',

    thumb: '/assets/images/team/live-musicians/curtis/curtis_pf-600w.jpg',
    bio: 'Curtis turns a sax set into a show. He\'s known for bold, out-there outfits and for stepping off the stage to play in the middle of the crowd, dancing with them the whole time. He brings the party with him.',
    socials: { instagram: 'https://www.instagram.com/mrsmoothnsaxy/', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/PF-G36jukFc', caption: 'The light-up sax at Sunken Meadow, 2026.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/O5N2y_D_URg', caption: 'On the saxophone, right in the crowd.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/TXuCrMH1Jaw', caption: 'Playing a wedding with the band.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/ew7rP0d43KU', caption: 'Featured in a full party set.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/hxnTOUZ6ARg', caption: 'On the sax, summer 2026.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/nCB8A5etAhE', caption: 'One minute on the sax.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/jXFs42irwGQ', caption: 'On the steel drums.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/coeKryVyKEU', caption: 'On the sax at Larkfield, 2026.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/curtis/curtis_happy.jpg',
      '/assets/images/team/live-musicians/curtis/curtis_playing.jpg',
      '/assets/images/team/live-musicians/curtis/curtis_tie.jpg',
      '/assets/images/team/live-musicians/curtis/curt.jpg',
    ],
  },
  {
    slug: 'andrew',
    name: 'Andrew',
    role: 'Saxophonist',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'A saxophone player on the Tommy\'s Tunes roster, ready to add a live horn to your cocktail hour or reception.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/4S3YXDePBHw', caption: 'On the saxophone.' },
    ],
    gallery: [],
  },
  {
    slug: 'marino',
    name: 'Marino',
    role: 'Saxophonist',
    photo: '/assets/images/team/live-musicians/marino/marino_pf.jpg',

    thumb: '/assets/images/team/live-musicians/marino/marino_pf-600w.jpg',
    bio: 'A saxophone player on the Tommy\'s Tunes roster, bringing a live horn to cocktail hour and reception sets.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/DMeU5UexY68', caption: 'On the saxophone.' },
    ],
    gallery: [],
  },
  {
    slug: 'pat',
    name: 'Pat',
    role: 'Percussionist',
    photo: '/assets/images/team/live-musicians/pat/pat_pf.jpg',
    bio: 'Pat is an old-school percussionist, and he plays the entire night instead of a song or two. He\'s down to earth and kind, and you\'ll feel every beat he adds to the room. People walk away knowing they got their money\'s worth.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/PF-G36jukFc', caption: 'On percussion at Sunken Meadow, 2026.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/fkCTcd3bbhs?start=4', caption: 'On the drums.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/TXuCrMH1Jaw', caption: 'Playing a wedding with the band.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/pat/pat_action.jpg',
    ],
  },
  {
    slug: 'joe-i',
    name: 'Joe I.',
    role: 'Percussionist',
    photo: '/assets/images/team/live-musicians/joe-i/joei_cooking.jpg',

    thumb: '/assets/images/team/live-musicians/joe-i/joei_cooking-600w.jpg',
    bio: 'Joe is a percussionist who plays with serious energy and plenty of polish. He\'s done countless events, and with him behind the drums at a reception, the live element hits harder.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'video', url: '/assets/images/team/live-musicians/joe-i/joe_I_drumming.mp4', caption: 'On the drums.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/vNlwLu4T9Bs', caption: 'On the drums at an event.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/JHOJfSej0fc', caption: 'Playing a wedding with the crew.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/KpvTJKqM328', caption: 'A full percussion demo.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/ktWprOQismE', caption: 'An earlier percussion demo.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/joe-i/joei_in_action.jpg',
      '/assets/images/team/live-musicians/joe-i/joe_i_headshot.jpg',
    ],
  },
  {
    slug: 'drew',
    name: 'Drew',
    role: 'Percussionist',
    photo: '/assets/images/team/live-musicians/drew/drew_pf.jpg',

    thumb: '/assets/images/team/live-musicians/drew/drew_pf-600w.jpg',
    bio: 'A percussionist on the Tommy\'s Tunes roster, adding live drums over the DJ for cocktail hour or the reception.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'video', url: '/assets/images/team/live-musicians/drew/drew_percussion.mp4', caption: 'Live percussion over the DJ set.' },
    ],
    gallery: [],
  },
  {
    slug: 'will',
    name: 'Will',
    role: 'Percussionist',
    photo: '/assets/images/team/live-musicians/will/will_drumming.jpg',

    thumb: '/assets/images/team/live-musicians/will/will_drumming-600w.jpg',
    bio: 'Will is one of the younger percussionists on the roster, and he teaches percussion when he\'s not playing events. He has the skill and the ear, cares about every set, and keeps getting better.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/3Fn_9vQwrHg?start=24', caption: 'On the drum set.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/ew7rP0d43KU', caption: 'Featured in a full party set.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/will/will_action_pic_with_bride_and_groom.jpg',
    ],
  },
  {
    slug: 'john',
    name: 'John',
    role: 'Percussionist',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'A percussionist on the Tommy\'s Tunes roster, bringing live drums and real energy to the floor.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/RaJtQYbjxGM', caption: 'On the drums.' },
    ],
    gallery: [],
  },
  {
    slug: 'melody',
    name: 'Melody',
    role: 'Guitarist · Vocalist',
    photo: '/assets/images/team/live-musicians/melody/melody_pf.jpg',

    thumb: '/assets/images/team/live-musicians/melody/melody_pf-600w.jpg',
    bio: 'A guitarist and vocalist on the Tommy\'s Tunes roster. Melody sings while she plays, a warm acoustic fit for ceremonies, cocktail hours, and dinner sets.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/iM0J0c1Mxmo', caption: 'Singing and playing guitar.' },
    ],
    gallery: [
      '/assets/images/team/live-musicians/melody/melody_playing.jpg',
    ],
  },
  {
    slug: 'luciano',
    name: 'Luciano',
    role: 'Guitarist',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'A jazz guitarist on the Tommy\'s Tunes roster, a relaxed, elegant fit for a ceremony or cocktail hour.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/M0j7ZiJ1jfo', caption: 'On the jazz guitar.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/YxL7aSTuJfY', caption: 'A jazz guitar set.' },
    ],
    gallery: [],
  },
  {
    slug: 'scott',
    name: 'Scott',
    role: 'Pianist',
    photo: '/assets/images/team/live-musicians/scott/scott_pf.jpg',

    thumb: '/assets/images/team/live-musicians/scott/scott_pf-600w.jpg',
    bio: 'A pianist on the Tommy\'s Tunes roster, a graceful fit for ceremonies, cocktail hours, and dinner sets.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/pEnF3ufyOJA', caption: 'On the piano.' },
    ],
    gallery: [],
  },
  {
    slug: 'robert',
    name: 'Robert',
    role: 'Photographer',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'Robert is a photographer who loves the craft. He shoots all night and catches the moments most people miss. If you catch him between sets, he\'ll probably want to talk cars.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'dan-k',
    name: 'Dan K.',
    role: 'Photographer',
    photo: '/assets/images/team/photographers/dan-k/dan_k_pf.jpg',

    thumb: '/assets/images/team/photographers/dan-k/dan_k_pf-600w.jpg',
    bio: 'Dan is always working the room with his camera up, finding the shot. He knows how to position people so everyone looks their best, and he\'s an easy, friendly presence all night.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'steve',
    name: 'Steve',
    role: 'Photographer',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'Steve cares about how your night feels as much as how it looks. He\'s warm and always tuned into the moment, which is why his shots land.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'shad',
    name: 'Shad',
    role: 'Dancer',
    photo: '/assets/images/team/specialty/shad/shad_pf.jpg',

    thumb: '/assets/images/team/specialty/shad/shad_pf-600w.jpg',
    bio: 'Shad is one of our hype dancers, and his job is energy. He\'s out on the floor with your guests, pulling people up and making sure nobody\'s stuck on the sidelines. He doesn\'t use a mic. He just gets the room moving when a party needs a push.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/MlKJWvkBOGQ', caption: 'Dancing with the guests.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/FpvXSr9OEKs', caption: 'A routine with dancer Sally.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/Q8iUmzPENTk', caption: 'A full dance demo.' },
      { type: 'youtube', url: 'https://www.youtube.com/embed/N1Dv_yBbrKs', caption: 'Getting the crowd going.' },
    ],
    gallery: [
      '/assets/images/team/specialty/shad/shad_hand.jpg',
      '/assets/images/team/specialty/shad/shad_pic.jpg',
    ],
  },
  {
    slug: 'sally',
    name: 'Sally',
    role: 'Dancer',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'A dancer on the Tommy\'s Tunes roster, out on the floor keeping the energy high and the guests moving.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demos: [
      { type: 'youtube', url: 'https://www.youtube.com/embed/FpvXSr9OEKs', caption: 'A routine with dancer Shad.' },
    ],
    gallery: [],
  },
  {
    slug: 'tommy-masino',
    name: 'Tommy Masino',
    role: 'Founder',
    photo: '/assets/images/about/tommy.JPG',

    thumb: '/assets/images/about/tommy-600w.jpg',
    bio: 'Tommy has been the voice behind Tommy\'s Tunes since 1985. He started it as a one-man DJ outfit in Selden and built it into one of Long Island\'s longest-running entertainment families. Forty years and thousands of weddings later, he\'s still at the center of it. His three sons grew up in the back of the truck and now run the company alongside him.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'tj-masino',
    name: 'TJ Masino',
    role: 'Director of Operations',
    photo: '/assets/images/team/management/tj-masino/Tj_Masino_pf.jpg',

    thumb: '/assets/images/team/management/tj-masino/Tj_Masino_pf-600w.jpg',
    bio: 'TJ figures out who works which event and what gear rides on which truck, week after week. He grew up in the back of the box truck and never really left. When the right people and the right equipment show up at the right party, that\'s TJ\'s work.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'dom-masino',
    name: 'Dom Masino',
    role: 'Director of Client Relations',
    photo: '/assets/images/team/management/dom-masino/dom_masino_pf.jpg',

    thumb: '/assets/images/team/management/dom-masino/dom_masino_pf-600w.jpg',
    bio: 'A little of everything, and usually the first voice you\'ll hear. Dom holds down the front desk, answers the first emails, and pitches in on sales and scheduling wherever he\'s needed. Ask him what he does and the honest answer is "whatever today needs." He grew up in this business and runs it now alongside his dad and brothers.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'joe-masino',
    name: 'Joe Masino',
    role: 'Director of Sales',
    photo: '/assets/images/team/management/joe-masino/joe_masino_pf.jpg',

    thumb: '/assets/images/team/management/joe-masino/joe_masino_pf-600w.jpg',
    bio: 'The one you\'ll meet first. Joe sits down with couples, walks them through every detail, and runs the showcases. If you\'ve toured the Selden showroom or talked through your wedding, odds are it was Joe across the table. He grew up in the business and now leads sales for the family.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'chris',
    name: 'Chris',
    role: 'Technician',
    photo: '/assets/images/team/technicians/chris/chris_pf.jpeg',

    thumb: '/assets/images/team/technicians/chris/chris_pf-600w.jpg',
    bio: 'Chris is our most experienced technician. Ten years in, he can do all of it: load-ins, lights, sound, photo booths, sparklers and dry ice. He\'s on top of everything and cares a lot more than he lets on. Off the clock you\'ll catch him in his blue BMW, probably on his way to flip something for a profit.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'blake',
    name: 'Blake',
    role: 'Technician',
    photo: '/assets/images/team/technicians/blake/blake_pf.jpg',

    thumb: '/assets/images/team/technicians/blake/blake_pf-600w.jpg',
    bio: 'Blake might be the most energetic technician we\'ve got. Six years in, he lives for the photo booth, loves getting to know people and making them feel special, and you\'ll probably catch him hopping into a few pictures himself. He\'s always dancing and laughing, and you feel it the second he walks in.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'goose',
    name: 'Goose',
    role: 'Technician',
    photo: '/assets/images/team/technicians/goose/goose_pf.jpg',

    thumb: '/assets/images/team/technicians/goose/goose_pf-600w.jpg',
    bio: 'Goose is Dan K.\'s son. He\'s in college and working toward photography of his own, and he takes pride in doing the job right.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'jesse',
    name: 'Jesse',
    role: 'Technician',
    photo: '/assets/images/team/technicians/jesse/jesse_pf.jpg',

    thumb: '/assets/images/team/technicians/jesse/jesse_pf-600w.jpg',
    bio: 'Jesse is a newer face on the crew. He\'s studying music in college and is seriously gifted at it. He\'s one of the kindest people you\'ll meet, and you can rely on him.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'robbie',
    name: 'Robbie',
    role: 'Technician',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'Robbie is part of the technician crew, handling the load-ins, setups, and gear that make an event run clean from the first guest to the last song.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'danny',
    name: 'Danny',
    role: 'Technician',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'Danny is part of the technician crew, handling the load-ins, setups, and gear that make an event run clean from the first guest to the last song.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'matt-a',
    name: 'Matt A.',
    role: 'Technician',
    photo: '/assets/images/team/empty_image.jpg',

    thumb: '/assets/images/team/empty_image-600w.jpg',
    bio: 'Matt A. is part of the technician crew, handling the load-ins, setups, and gear that make an event run clean from the first guest to the last song.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'xander',
    name: 'Xander',
    role: 'Technician',
    photo: '/assets/images/team/technicians/xander/xander_pf.jpg',

    thumb: '/assets/images/team/technicians/xander/xander_pf-600w.jpg',
    bio: 'Xander built this site and runs a lot of the media side. You\'ll spot him at events with a gimbal, getting footage that makes the accounts look as good as the parties feel. Four years in, he\'s second only to Chris in the warehouse and can run just about everything at an event except dry ice. He\'s fresh off his MBA, headed toward AI engineering, and always sweating the small details that make a night look right.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
  {
    slug: 'lilly',
    name: 'Lilly',
    role: 'Mascot',
    photo: '/assets/images/team/specialty/lilly/lilly_pf.jpg',

    thumb: '/assets/images/team/specialty/lilly/lilly_pf-600w.jpg',
    bio: 'Lilly is the Masino family husky and the unofficial heart of the place. Sweet, well-mannered, and impossible not to love, she turns up at the Selden showroom now and then to say hello. Every family business needs a mascot. Lilly\'s ours.',
    socials: { instagram: '', tiktok: '', youtube: '' },
    demo: null,
    gallery: [],
  },
];
