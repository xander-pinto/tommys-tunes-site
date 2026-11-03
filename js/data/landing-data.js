/* ============================================================
   Tommy's Tunes: landing page content
   Read only by scripts/generate.js, never loaded in the browser, so the
   headline, overview and questions are real HTML in the page source.

   Rules for editing this file:
   - review.quote must be a word-for-word piece of a review in
     reviews-data.js. The generator looks it up and builds the attribution
     from that review, and drops the quote with a warning if it is not found.
   - general: true means the review is about the company, not this service.
     The card says so.
   - Answers state only what the site, the team or a review can back up.
     Open questions waiting on the team live in
     reports/landing-questions-to-answer.md (gitignored).
   ============================================================ */

const QUOTE = "We quote each event rather than publishing one price. Tell us your date and we will send you a quote within one business day.";
const ANY = "Yes. It pairs with any package we run.";
const GENERAL = {
  guests: "Tons of our guests asked for the name of the DJ company because they loved them.",
  electric: "The dance floor was electric all night, we were dancing on speakers, singing for hours.",
  nonstop: "I wanted a night of nonstop dancing and Anderson and Mike absolutely exceeded my expectations.",
  crowd: "The team was awesome, upbeat, accommodating and really did such an awesome job reading the crowd.",
  pressure: "They did not push themselves on us or pressure us to get the most expensive package.",
  pros: "They are consummate professionals, a pleasure to work with, and so responsive.",
};
const general = (k) => ({ quote: GENERAL[k], general: true });

const services = {
  /* --- Event types: the long copy stays in services-data.js and folds. --- */
  'weddings': {
    headline: 'Long Island wedding DJ and MC, <em>family-run since 1985.</em>',
    role: 'Planned with you in person, then run by a DJ and MC who know your timeline.',
    review: { quote: 'The playlist was amazing and perfectly tailored to us while still having something for every guest, which kept the dance floor packed all night.' },
    questions: [
      ['What is the difference between the DJ and the MC?', 'The DJ focuses on the music. The MC works the room and the timeline, handling the announcements and keeping the night moving. Our Deluxe package and up split the two jobs, and our Basic package has one person doing both.'],
      ['How does planning work?', 'You sit down with us at the Selden showroom or the Melville office, and Zoom works too. We walk through the ceremony music, cocktail hour, grand entrance, parent dances, your must-plays and your do-not-plays. We do as many meetings as you need.'],
      ['Can we give you a do-not-play list?', 'Yes. Your must-plays and do-not-plays are part of the planning, and your DJ and MC have them before the night starts.'],
      ['Will you know our venue?', 'After forty years on Long Island, probably. Our recommended vendor partnerships are on the <a href="/venues.html">venues page</a>, and if yours is not listed, ask us.'],
      ['Do you have a bilingual MC?', 'Yes. Anderson, Leo, Ruben and Gio work in English and Spanish, and Yianni works in English and Greek.'],
      ['How much does a wedding DJ cost?', 'We quote each wedding based on what you need rather than publishing one price. Tell us your date and we will send you a quote within one business day, with no pressure to upgrade. Our <a href="/packages.html">packages page</a> shows what each tier includes.'],
    ],
  },
  'sweet-16-quinces': {
    headline: 'Sweet 16 and Quincea&ntilde;era DJs <em>who get the whole room dancing.</em>',
    review: { quote: 'DJ Joe kept the energy high all night and played the perfect mix of music that kept the dance floor packed.' },
    questions: [
      ['Will the teenagers actually dance?', 'After forty years of these, our answer is yes, if the MC reads the room. Keeping the energy alive between the formal moments and pulling reluctant cousins onto the floor is a big part of the job.'],
      ['How does the candle lighting work?', 'It usually runs 16 entries, each with a person to call up and a song that plays. We walk through it with you using our Candlelighting Form, so every cue is set before the doors open.'],
      ['Can the night be in Spanish?', 'Yes. It can be full Spanish from entrance to last song, English announcements with Spanish music, or Spanish toasts followed by English party tracks.'],
      ['Do you handle the Quincea&ntilde;era waltz and surprise dance?', 'Yes. The waltz, the surprise dance and the crown moment are all planned and cued with you ahead of the night.'],
      ['How much does a Sweet 16 DJ cost?', QUOTE],
    ],
  },
  'mitzvahs': {
    headline: 'Bar and Bat Mitzvah DJs <em>for the family and the teens.</em>',
    review: { quote: 'They are consummate professionals, a pleasure to work with, and so responsive.', note: 'A family who hired us for a wedding and a bar mitzvah' },
    questions: [
      ['Do you know the traditions?', 'Yes. The Hora calls, the motzi and kiddush, when to drop Hava Nagila and how to lead the chair lift are part of the standard for anyone working a mitzvah here.'],
      ['How does the candle lighting work?', 'Thirteen candles, each with a person to call up and a song that plays. We plan it with you using our Mitzvah Protocol, which you can fill out at home.'],
      ['Can it be more traditional or more relaxed?', 'Either. Some mitzvahs lean traditional, and others run closer to a Sweet 16 with the candle lighting threaded in. It is as religious or as relaxed as your family wants.'],
      ['Who would MC it?', '<a href="/person/david/">David</a> most often leads our mitzvahs, and the rest of the team can step in too.'],
      ['How much does a mitzvah DJ cost?', QUOTE],
    ],
  },
  'corporate': {
    headline: 'Corporate event DJ and sound, <em>so your speakers land.</em>',
    review: general('crowd'),
    questions: [
      ['What kinds of corporate events do you do?', 'Fundraisers, holiday parties, awards dinners and product launches, from full dance parties to mostly seated nights with speeches.'],
      ['Will people be able to hear the speeches?', 'That is the standard we hold to: mic clarity across every table and balanced volume, so the front row and the back row both hear clearly.'],
      ['Can you work from our run-of-show?', 'Yes. Send us yours or build it with us. We confirm the gear, the music cues and any custom moments at least a week out.'],
      ['Can you do something custom?', 'Yes. A specific intro mix for an award winner, a brand-coordinated playlist or an unusual lighting setup can all be worked out with you in advance.'],
      ['How much does a corporate event DJ cost?', 'Tell us the date and the run-of-show, and we will come back with a quote that fits the budget and the brief.'],
    ],
  },
  'other-events': {
    headline: 'If you have a party, <em>we will do it.</em>',
    review: { quote: "Tommy's Tunes did an awesome job at my Birthday Celebration!" },
    questions: [
      ['What kinds of parties do you do?', 'Communions, graduations, milestone birthdays, anniversaries, retirement parties, holiday gatherings, vow renewals, proms, engagement parties, reunions and block parties.'],
      ['Is my party too small?', 'No. The setup scales to your event, so a backyard 80th birthday does not get the same gear as a 400-guest holiday party, and you should not pay for what you do not need.'],
      ['What can you bring?', 'Music, an MC, lighting, a photo booth, or any combination. We figure out what your night actually requires.'],
      ['How much does it cost?', 'We build a quote around your event. Tell us the day, the guest count and a few sentences about the party, and we will come back with options that fit your budget.'],
    ],
  },

  /* --- Live music --- */
  'saxophonist': {
    headline: 'Wedding saxophonist, <em>live on your dance floor.</em>',
    review: { quote: 'Our favorite part was having a live saxophonist-Curtis. He blew everyone away with his skills and personality.' },
    overview: [
      "A DJ fills the dance floor. A live saxophonist gives the whole room something to watch. Your player performs over the DJ's music, so you get the songs you love with a live performer on top of them. It's why live sax is the Long Island wedding favorite.",
      "It works two ways. At cocktail hour, sax can run as a standalone instrumental act. At the reception, it comes in as an energy boost during the biggest dance moments of the night.",
      "Each of our five players brings something different. Curtis turns a set into a show, with bold outfits and a habit of stepping off the stage to dance through the crowd. Mark is polished and professional, and knows exactly what a live horn does to a room. Mark S. brings high energy to every set, and Andrew and Marino round out the roster.",
      "Couples notice. One bride who wasn't sure about adding sax wrote, &ldquo;I was so back and forth about the sax player but DO IT!!! Everyone loved it.&rdquo; Another couple called it &ldquo;a great addition to our package.&rdquo;",
    ],
    questions: [
      ['What does a wedding saxophonist do?', 'Plays live sax layered over the DJ, so your night has a live performer on top of the music. One couple put it this way: &ldquo;He played along with the DJ which made it all more fun!&rdquo;'],
      ['Is sax better for cocktail hour or the reception?', 'Either one works. At cocktail hour it is a standalone instrumental act. At the reception it is an energy boost during the biggest dance moments.'],
      ['Who would be playing?', 'We have five sax players on the roster: <a href="/person/curtis/">Curtis</a>, <a href="/person/mark/">Mark</a>, <a href="/person/mark-s/">Mark S.</a>, <a href="/person/andrew/">Andrew</a> and <a href="/person/marino/">Marino</a>. Curtis is known for stepping off the stage to play in the middle of the crowd.'],
      ['Can I add sax to my DJ package?', 'Yes, it pairs with any package. The <a href="/package/grand/">Grand package</a> already includes your choice of a live sax player or a percussionist for the reception.'],
      ['How much does a wedding saxophonist cost?', QUOTE],
    ],
  },
  'pianist': {
    headline: 'Live wedding pianist <em>for a calm, classic tone.</em>',
    review: { quote: 'Scott, played piano for our cocktail hour and I heard from many guests that he was FANTASTIC!!!' },
    overview: [
      "Live piano sets a calm, classic tone in the background instead of pulling focus. It is the choice for the processional, a few standards over cocktails, or a soft underlay while people find their seats.",
      "We match the song list to the moment, so it never feels like filler. That goes for the ceremony, cocktail hour and dinner alike.",
    ],
    questions: [
      ['When does a pianist play?', 'The ceremony, cocktail hour or dinner. It suits any part of the night where you want live music in the background.'],
      ['Will the songs fit our ceremony?', 'We match the song list to the moment, from the processional to a soft underlay while guests find their seats.'],
      ['Who would be playing?', '<a href="/person/scott/">Scott</a> is our pianist. One couple wrote that many of their guests told them he was fantastic.'],
      ['Can I add a pianist to my DJ package?', ANY],
      ['How much does a wedding pianist cost?', QUOTE],
    ],
  },
  'jazz-guitarist': {
    headline: 'Jazz guitarist <em>for an easy, understated cocktail hour.</em>',
    review: { quote: 'our cocktail hour guitarist did a great job.' },
    overview: [
      "Solo instrumental jazz guitar is the most understated live option we offer. It fills a cocktail hour or a seated dinner with real music without raising the volume of the room, so people can still hear each other talk.",
      "Pick this when you want live atmosphere, not a performance everyone has to stop and watch. Your guests get the feel of live music, and the conversation keeps going.",
    ],
    questions: [
      ['Is it loud?', 'No. It is the most understated live option we offer, and people can still hear each other talk.'],
      ['When does a jazz guitarist play?', 'Cocktail hour or a seated dinner, whenever you want live atmosphere rather than a show.'],
      ['Would a jazz trio be better?', 'A guitarist is one player and stays quiet. A <a href="/service/jazz-trio/">jazz trio</a> gives you a fuller sound if you want more.'],
      ['Can I add this to my DJ package?', ANY],
      ['How much does a jazz guitarist cost?', QUOTE],
    ],
  },
  'guitarist-vocalist': {
    headline: 'One guitarist and vocalist, <em>a full live act.</em>',
    review: general('guests'),
    overview: [
      "One musician on guitar and vocals is the most flexible one-piece live act we offer. A single player can carry an outdoor ceremony, fill a cocktail hour or play a relaxed dinner set.",
      "It is the easy pick when you want live music but the space or the budget calls for keeping it simple. Our roster includes <a href=\"/person/melody/\">Melody</a> on guitar and vocals.",
    ],
    questions: [
      ['Can one person really carry a ceremony?', 'Yes. This act can carry an outdoor ceremony on its own, from a single player.'],
      ['Where does this work best?', 'A ceremony, a cocktail hour or a relaxed dinner set, especially when the space calls for keeping things simple.'],
      ['Can I add this to my DJ package?', ANY],
      ['How much does a guitarist and vocalist cost?', QUOTE],
    ],
  },
  'vocalist': {
    headline: 'A live vocalist <em>for the song that matters most.</em>',
    review: general('electric'),
    overview: [
      "A live singer performs over the DJ track, so a familiar song gets a real voice instead of the recording.",
      "It is best saved for the moments that matter: a first dance, a cocktail-hour set, or a specific song you love. A live vocal lands harder there than anything coming out of a speaker.",
    ],
    questions: [
      ['How does a vocalist work with the DJ?', 'The singer performs live over the DJ track, so the song stays familiar and the voice is real.'],
      ['When should we use a vocalist?', 'A first dance, a cocktail-hour set or a specific song you love are the moments where it lands best.'],
      ['Can I add a vocalist to my DJ package?', ANY],
      ['How much does a live wedding vocalist cost?', QUOTE],
    ],
  },
  'steel-drum': {
    headline: 'Steel drum for cocktail hour, <em>solo or a full trio.</em>',
    review: { quote: 'The steel drum during cocktail hour at Lands End was a perfect touch as well!' },
    overview: [
      "Choose a solo steel pan player or a full three-piece reggae trio. It is our default pick for an outdoor cocktail hour, when you want guests to stop and notice the music.",
      "One couple called it a perfect touch at their cocktail hour.",
    ],
    questions: [
      ['Should we book a solo player or a trio?', 'Both are available. A solo steel pan player is one option, and a three-piece reggae trio is the fuller one.'],
      ['When does steel drum work best?', 'Outdoor cocktail hours are the default, because guests stop and notice the music.'],
      ['Can I add this to my DJ package?', ANY],
      ['How much does a steel drum player cost?', QUOTE],
    ],
  },
  'percussionist': {
    headline: 'Live wedding percussion <em>the whole room can feel.</em>',
    review: { quote: 'DJ Rich and MC Mike and their percussionist literally rocked my wedding. No one sat.' },
    overview: [
      "Live percussion layered over the DJ is the best add-on for a high-energy reception, when you want the room to feel a live drum and not just hear one.",
      "Couples who book it talk about the energy. One wrote that their percussionist was &ldquo;nonstop&rdquo; and that &ldquo;the crowd loved him.&rdquo; Another wrote that the reception took off thanks to &ldquo;the DJ, MC and percussionist.&rdquo;",
      "Our percussionists include <a href=\"/person/pat/\">Pat</a>, <a href=\"/person/joe-i/\">Joe I.</a>, <a href=\"/person/drew/\">Drew</a>, <a href=\"/person/will/\">Will</a> and <a href=\"/person/john/\">John</a>, and you can pair one with a saxophonist for even more live sound on the floor.",
    ],
    questions: [
      ['What does a percussionist do with a DJ?', 'Plays live drums layered over the DJ, so the music you picked gets a live drum on top of it.'],
      ['Should we pick sax or percussion?', 'Both add live energy. Our <a href="/package/grand/">Grand package</a> includes your choice of either one for the reception, and you can book both.'],
      ['When does it work best?', 'High-energy receptions, when the dance floor is the point of the night.'],
      ['How much does a wedding percussionist cost?', QUOTE],
    ],
  },
  'electric-violinist': {
    headline: 'Electric violin <em>on a packed dance floor.</em>',
    review: general('electric'),
    overview: [
      "A four-hour, high-energy electric violin set pairs with the DJ track during the reception. It is visually striking and brings a unique sound to a packed dance floor.",
      "If you want something guests have not seen at every wedding, this is a strong choice. For a softer classical sound at the ceremony, look at our <a href=\"/service/string-quartet/\">string duo, trio or quartet</a> instead.",
    ],
    questions: [
      ['How long does the electric violinist play?', 'It is a four-hour set.'],
      ['Does it work with the DJ?', 'Yes. The violin pairs with the DJ track during the reception.'],
      ['Is it the same as a string quartet?', 'No. Electric violin is a high-energy reception act, and a <a href="/service/string-quartet/">string group</a> is the traditional classical sound for a ceremony or formal cocktail hour.'],
      ['How much does an electric violinist cost?', QUOTE],
    ],
  },
  'string-quartet': {
    headline: 'String quartet, trio or duo <em>for your ceremony.</em>',
    review: { quote: 'We went with a string duet for our ceremony and cocktail hour and they perfectly set the atmosphere.' },
    overview: [
      "Classical strings are the most traditional live sound we offer, built for the ceremony or a more formal cocktail hour.",
      "Book a duo, a trio or a full quartet depending on the room and the budget. Popular pairings include a guitar and cello duo for something warm and intimate, or a guitar, cello and violin trio when you want a fuller sound carrying down the aisle.",
      "One couple wrote that their violin and cello were &ldquo;an elegant touch during the ceremony and cocktail hour.&rdquo; When the reception starts, your DJ and MC take it from there.",
    ],
    questions: [
      ['Do we need a full quartet?', 'Not always. It depends on the room and the budget, and a duo or trio is often the right size.'],
      ['What pairings are popular?', 'A guitar and cello duo for something warm and intimate, or a guitar, cello and violin trio for a fuller sound.'],
      ['When do strings play?', 'The ceremony or a more formal cocktail hour.'],
      ['Can I add strings to my DJ package?', ANY],
      ['How much does a string quartet cost?', QUOTE],
    ],
  },
  'jazz-trio': {
    headline: 'Live jazz trio on Long Island, <em>built around your sound.</em>',
    review: general('guests'),
    overview: [
      "A three-piece live jazz combo for cocktail hour or a seated dinner is the kind of music that fills the room without taking it over.",
      "We build the trio around the sound you want. Sax, guitar and bass gives you a classic jazz feel. Piano, percussion and sax brings more energy. Piano, percussion and violin is softer and more romantic.",
      "Tell us the vibe and we set the lineup to match.",
    ],
    questions: [
      ['What instruments are in the trio?', 'You choose the feel: sax, guitar and bass for classic jazz, piano, percussion and sax for more energy, or piano, percussion and violin for something softer.'],
      ['When does a jazz trio play?', 'Cocktail hour or a seated dinner.'],
      ['Can I add a trio to my DJ package?', ANY],
      ['How much does a jazz trio cost?', QUOTE],
    ],
  },
  'ceremony-dj': {
    headline: 'A second DJ <em>for your ceremony or cocktail hour.</em>',
    review: { quote: 'They were so easy to work with and they did the ceremony and reception PERFECTLY and had our guests dancing all night.' },
    overview: [
      "A second DJ is dedicated to your ceremony or a separate cocktail space, so your main DJ never has to leave the reception room to cover it.",
      "Each space gets its own setup, its own music, and someone watching it the whole time. It is the fix for any event where the ceremony and the party are not in the same room.",
    ],
    questions: [
      ['Do we need a second DJ?', 'If your ceremony or cocktail hour is in a different space from the reception, this keeps your main DJ in the reception room.'],
      ['What does the second space get?', 'Its own setup, its own music, and someone watching it the whole time.'],
      ['What if everything is in one room?', 'You may not need it. Our <a href="/package/super-deluxe/">Super Deluxe package</a> also includes DJ music for the ceremony and cocktail hour.'],
      ['How much does a ceremony DJ cost?', QUOTE],
    ],
  },
  'afterparty-dj': {
    headline: 'An afterparty DJ <em>for when the night isn&rsquo;t over.</em>',
    review: { quote: 'I got so many compliments from guests that our after party was the best one they have attended for a wedding yet!' },
    overview: [
      "A dedicated DJ for the afterparty means the night does not have to end with the reception.",
      "Whether the crowd moves to a hotel suite, a bar or a back room at the venue, you get a fresh setup and fresh energy without leaning on a phone and a Bluetooth speaker.",
    ],
    questions: [
      ['Where can the afterparty be?', 'A hotel suite, a bar or a back room at the venue are all common.'],
      ['Is it a different setup from the reception?', 'Yes. The afterparty gets its own fresh setup.'],
      ['How much does an afterparty DJ cost?', QUOTE],
    ],
  },
  'party-dancer': {
    headline: 'Professional party dancers <em>who get the floor moving.</em>',
    review: general('nonstop'),
    overview: [
      "A professional dancer works your floor for four hours. It is the right add-on when you want guaranteed dance-floor energy without leaning on the bar to do it.",
      "Our dancers include <a href=\"/person/shad/\">Shad</a> and <a href=\"/person/sally/\">Sally</a>. They work alongside your DJ and MC.",
    ],
    questions: [
      ['How long does a party dancer work?', 'Four hours on the floor.'],
      ['What does a party dancer do?', 'Works the dance floor to keep the energy up.'],
      ['Can I add a dancer to my package?', ANY],
      ['How much does a party dancer cost?', QUOTE],
    ],
  },

  /* --- Photo booths --- */
  'mirror-booth': {
    headline: 'Mirror photo booth <em>with prints on the spot.</em>',
    review: { quote: 'Our guests loved the mirror photo booth and the zap photos.' },
    overview: [
      "The Magic Mirror is the newest option in our lineup. It prints a 2x6 or 4x6 in color or black and white, and guests can also have their photos texted or emailed directly from the machine.",
      "It draws a crowd, moves quickly and keeps people engaged throughout the night. Choose from 28 backdrop designs, from sequins and roses to rustic barn doors to themed prints, with flowerwall backdrops available as an upgrade.",
      "Every booth comes with a professional attendant, props, unlimited prints, a customized photo strip, and a USB or digital link with all the pictures taken.",
    ],
    questions: [
      ['Do guests get prints?', 'Yes, unlimited prints as a 2x6 strip or a 4x6 photo, in color or black and white. They can also text or email their photos from the machine.'],
      ['Is someone there to run it?', 'Yes. A professional attendant assists guests.'],
      ['Do we get the photos afterward?', 'Yes, on a USB or a digital link with all the pictures taken.'],
      ['Can we pick the backdrop?', 'Yes, from 28 designs. A flowerwall backdrop is available as an upgrade.'],
      ['How much does a mirror photo booth cost?', QUOTE],
    ],
  },
  'glam-booth': {
    headline: 'Glam photo booth, <em>magazine-style portraits.</em>',
    review: { quote: "The photobooth was everyone's favorite thing!", general: true },
    overview: [
      "The Beauty Glam Booth is a single-exposure setup. The filter is applied in-camera, and the result is a polished, black-and-white editorial-style 4x6 print. Guests can also have the photo texted or emailed.",
      "It photographs well in any lighting and tends to draw repeat visitors throughout the night. Choose from 28 backdrop designs, from sequins and roses to rustic barn doors to themed prints.",
      "It comes with a professional attendant, props, unlimited prints, and a USB or digital link with all the pictures taken.",
    ],
    questions: [
      ['What makes a glam booth different?', 'It takes a single exposure with the filter applied in-camera, so you get a polished black-and-white editorial-style print.'],
      ['Do guests get prints?', 'Yes, unlimited prints, and they can also text or email the photo.'],
      ['Is someone there to run it?', 'Yes. A professional attendant assists guests.'],
      ['How much does a glam booth cost?', QUOTE],
    ],
  },
  'open-air-booth': {
    headline: 'Open-air photo booth <em>built for the whole table.</em>',
    review: { quote: 'The photo booth pictures came out great', general: true },
    overview: [
      "The Open Air Booth is built for groups. The 8x8 backdrop fits large families, full wedding parties and anyone who refuses to be left out.",
      "It prints a 2x6 strip in color or black and white, with a simple setup and fast flow. Choose from 28 backdrop designs, with flowerwall backdrops available as an upgrade.",
      "It comes with a professional attendant, props, unlimited prints, a customized photo strip, and a USB or digital link with all the pictures taken.",
    ],
    questions: [
      ['How big a group fits?', 'The 8x8 backdrop is built for large families and full wedding parties.'],
      ['Do guests get prints?', 'Yes, unlimited 2x6 strips in color or black and white.'],
      ['Open-air or mirror booth?', 'Pick open-air for big group shots. The <a href="/service/mirror-booth/">mirror booth</a> is our general-purpose booth and also texts or emails photos from the machine.'],
      ['How much does an open-air booth cost?', QUOTE],
    ],
  },
  '360-booth': {
    headline: '360 booth, <em>video straight to their phones.</em>',
    review: general('electric'),
    overview: [
      "Guests step onto the platform, the arm rotates, and the clip goes straight to their phone. There is no app and no waiting.",
      "The 360 Booth is one of our most-requested add-ons right now. It works for every age group and produces the kind of content guests share the same night.",
    ],
    questions: [
      ['How does a 360 booth work?', 'Guests step onto the platform, the arm rotates around them, and the video goes to their phone.'],
      ['Do guests need an app?', 'No. There is no app and no waiting.'],
      ['Who is it good for?', 'It works for every age group.'],
      ['How much does a 360 booth cost?', 'Pricing is on request, because every venue setup is different. Tell us your date and venue and we will send you a quote within one business day.'],
    ],
  },

  /* --- Audio and phone booths --- */
  'audio-guestbook': {
    headline: 'An audio guest book <em>you will actually go back to.</em>',
    review: { quote: 'We also used the audio guest book which our guests said was a great touch.' },
    overview: [
      "We set up a vintage-style rotary phone at your event. Guests pick it up at any point in the night and record a message. There is no app, no login and no friction for your guests.",
      "Messages range from heartfelt to genuinely funny, and most couples come back to them long after the wedding.",
      "After the event you get digital files of every recording, plus a personalized mini turntable speaker so you can play the messages back at home. One bride wrote that the little record player speaker is adorable and serves as a nice decoration.",
    ],
    questions: [
      ['How does an audio guest book work?', 'Guests pick up a vintage-style rotary phone at any point in the night and record a message.'],
      ['Do we get the recordings?', 'Yes. You get digital files of every recording after the event.'],
      ['What else comes with it?', 'A personalized mini turntable speaker, so you can play the messages back at home.'],
      ['Audio guest book or phone booth?', 'The phone is the simpler setup. The <a href="/service/phone-booth/">white phone booth</a> adds a standalone booth and a custom display that doubles as a photo spot.'],
      ['How much does an audio guest book cost?', QUOTE],
    ],
  },
  'phone-booth': {
    headline: 'A white phone booth <em>for messages and photos.</em>',
    review: { quote: 'my FAVORITE was the white phone booth with the audio guest book.' },
    overview: [
      "A standalone white phone booth comes with a custom wedding-newspaper display, digital audio recordings of every message, and a personalized mini turntable speaker.",
      "It is a polished, photographable take on the audio guest book. Guests leave a message, and the booth doubles as a photo spot through the night.",
    ],
    questions: [
      ['What comes with the phone booth?', 'A custom wedding-newspaper display, digital audio recordings of every message, and a personalized mini turntable speaker.'],
      ['Do we get the messages?', 'Yes, as digital audio recordings.'],
      ['Can it record video?', 'That is our <a href="/service/video-phone-booth/">white video phone booth</a>.'],
      ['How much does a phone booth cost?', QUOTE],
    ],
  },
  'video-phone-booth': {
    headline: 'A video phone booth <em>so you can see them too.</em>',
    review: { quote: 'He even introduced us to the video phone booth, which was such a hit.' },
    overview: [
      "This is the video upgrade to our white phone booth, with the same custom newspaper display, but every message is recorded as a digital video.",
      "It is a keepsake that is closer to a wedding documentary than a guest book. You see your guests, not just hear them.",
    ],
    questions: [
      ['How is it different from the white phone booth?', 'Every message is recorded as a digital video instead of audio.'],
      ['Do we get the videos?', 'Yes, every message comes to you as a digital video.'],
      ['How much does a video phone booth cost?', QUOTE],
    ],
  },

  /* --- Lighting --- */
  'basic-lights': {
    headline: 'Basic dance floor lights, <em>clean and even.</em>',
    review: { quote: "Tommy's tunes was amazing, from the MC to the DJ, sax and lighting." },
    overview: [
      "Two stand-mounted lights wash the dance floor in even color. This is the baseline, and the right call when you want the room to read as a polished wedding rather than a club.",
      "It also makes sense if you would rather spend the lighting budget elsewhere. Step up to <a href=\"/service/mac-towers/\">intelligent lights</a> or <a href=\"/service/uplighting/\">uplighting</a> when you want the room itself to be part of the show.",
    ],
    questions: [
      ['What are basic lights?', 'Two lights on stands that wash the dance floor in even color.'],
      ['Basic lights or uplighting?', 'Basic lights cover the dance floor. <a href="/service/uplighting/">Uplighting</a> runs around the perimeter and colors the walls and ceiling.'],
      ['How much do basic lights cost?', QUOTE],
    ],
  },
  'illuminated-booth': {
    headline: 'A DJ booth <em>that matches your room.</em>',
    review: { quote: 'And the set up was stunning, with uplight across the room and the light up DJ board.' },
    overview: [
      "The frontboard is the visual anchor of the DJ setup. It is what guests see when they look toward the DJ, and it sets the tone for the setup as a whole.",
      "We offer five options: Classic Black, White Illuminated, White Illuminated with Black Trim, White Illuminated with TV, and Rustic.",
      "The Classic Black is straightforward and fits any room. The White Illuminated options add light and pair naturally with uplighting and intelligent lights. The Rustic board fits barn, vineyard and garden venues.",
    ],
    questions: [
      ['What are the options?', 'Classic Black, White Illuminated, White Illuminated with Black Trim, White Illuminated with TV, and Rustic.'],
      ['Which one fits a barn or vineyard?', 'The Rustic board fits barn, vineyard and garden venues.'],
      ['Which packages include it?', 'The illuminated front board is included in our <a href="/package/super-deluxe/">Super Deluxe</a>, <a href="/package/premiere/">Premiere</a>, <a href="/package/supreme/">Supreme</a> and <a href="/package/grand/">Grand</a> packages.'],
      ['How much does it cost to add?', QUOTE],
    ],
  },
  'mac-towers': {
    headline: 'Moving light towers, <em>club-level production.</em>',
    review: { quote: 'the lighting and effects that were used the whole evening were top notch.' },
    overview: [
      "Two or four Martin Mac 250 intelligent moving lights are mounted on illuminated vertical truss towers.",
      "When a light tech is assigned to the night, they become a managed part of the event, responding to the music, shifting through colors, and giving the dance floor a different energy than static lighting alone.",
      "It is full club-level production for receptions where the dance floor is the show. They are available as part of the Premiere, Supreme and Grand packages, or booked separately.",
    ],
    questions: [
      ['How many lights are there?', 'Two or four Martin Mac 250 moving lights on illuminated truss towers.'],
      ['Who runs them?', 'A light tech, when one is assigned to your night. Our <a href="/package/premiere/">Premiere package</a> includes one.'],
      ['Which packages include them?', 'Premiere, Supreme and Grand include them, and you can also book them separately.'],
      ['How much do light towers cost?', QUOTE],
    ],
  },
  'uplighting': {
    headline: 'Wedding uplighting <em>that washes the room in color.</em>',
    review: { quote: 'And the set up was stunning, with uplight across the room and the light up DJ board.' },
    overview: [
      "Uplighting is placed along the perimeter of the room and washes the walls and ceiling with color.",
      "It can be held at a single tone for a formal, composed atmosphere, or shifted through multiple colors as the event progresses.",
      "It is one of the highest-impact visual upgrades available for any ballroom, and it shows clearly in photos and video.",
    ],
    questions: [
      ['What is uplighting?', 'Lights placed around the perimeter of the room that wash the walls and ceiling with color.'],
      ['Can the colors change during the night?', 'Yes. It can hold a single tone or shift through multiple colors as the event progresses.'],
      ['Will it show in our photos?', 'Yes. It shows clearly in photos and video.'],
      ['How much does uplighting cost?', QUOTE],
    ],
  },
  'dance-floor': {
    headline: 'An illuminated LED dance floor <em>that responds to the music.</em>',
    review: general('electric'),
    overview: [
      "Our full illuminated dance floor is built from modular LED panels that cover the entire dance floor surface. The panels change color in real time and can be programmed to respond to the music.",
      "It is one of the more dramatic visual upgrades available, and it transforms the center of the room in a way no other single add-on does.",
      "It is available for weddings, Sweet 16s, Bar and Bat Mitzvahs, and corporate events.",
    ],
    questions: [
      ['How does an LED dance floor work?', 'Modular LED panels cover the dance floor surface, change color in real time, and can be programmed to respond to the music.'],
      ['What events is it for?', 'Weddings, Sweet 16s, Bar and Bat Mitzvahs, and corporate events.'],
      ['How much does an LED dance floor cost?', QUOTE],
    ],
  },
  'dance-stages': {
    headline: 'Illuminated dance stages <em>that frame the floor.</em>',
    review: general('nonstop'),
    overview: [
      "Our illuminated dance stages light up from below with color-changing LED panels.",
      "They give the dance floor a clear boundary, look strong in photos and video, and create a visual focal point that keeps guests oriented toward the center of the room.",
      "They are available as a standalone add-on.",
    ],
    questions: [
      ['What are dance stages?', 'Platforms that light up from below with color-changing LED panels.'],
      ['Can I book them on their own?', 'Yes, they are available as a standalone add-on.'],
      ['How much do dance stages cost?', QUOTE],
    ],
  },
  'monogram': {
    headline: 'Your name in lights, <em>on the wall or the floor.</em>',
    review: general('guests'),
    overview: [
      "Your initials, names or corporate logo are projected on a wall or the floor.",
      "Each one is custom designed for your event and tested on-site before the doors open, so it looks right when your guests walk in.",
    ],
    questions: [
      ['What can you project?', 'Your initials, your names or a corporate logo.'],
      ['Where does it go?', 'On a wall or on the floor.'],
      ['Which packages work with it?', 'It pairs with any package.'],
      ['How much does a custom monogram cost?', QUOTE],
    ],
  },
  'love-letters': {
    headline: 'LOVE marquee letters, <em>a backdrop all night.</em>',
    review: general('guests'),
    overview: [
      "Forty-five-inch illuminated marquee letters spell LOVE in a white LED casing about four feet tall. They are one of our most-booked decor add-ons for Long Island wedding receptions.",
      "They photograph well without any extra staging and give guests a natural backdrop throughout the night.",
      "Prefer a warmer look? Our Rustic LOVE has a weathered finish, a natural fit for barn spaces, vineyard venues and any event with an organic feel. It pairs well with a <a href=\"/service/flower-walls/\">flower wall</a>.",
    ],
    questions: [
      ['How big are the letters?', 'Forty-five inches, about four feet tall, in a white LED casing.'],
      ['Is there a rustic option?', 'Yes. The Rustic LOVE has a weathered finish for barn and vineyard venues.'],
      ['How much do LOVE letters cost?', QUOTE],
    ],
  },
  'mr-mrs-letters': {
    headline: 'MR &amp; MRS marquee letters <em>for your dais or dance floor.</em>',
    review: general('guests'),
    overview: [
      "Forty-five-inch illuminated MR &amp; MRS marquee letters come in a white LED casing, about four feet tall.",
      "Place them at the dais table, along the perimeter, or anywhere you want them visible. They photograph well on their own and give guests a built-in backdrop all night.",
    ],
    questions: [
      ['How big are the letters?', 'Forty-five inches, about four feet tall.'],
      ['Where do they go?', 'At the dais table, along the perimeter, or anywhere you want them visible.'],
      ['How much do MR &amp; MRS letters cost?', QUOTE],
    ],
  },
  '16-letters': {
    headline: 'Giant 16 marquee letters <em>for your Sweet 16.</em>',
    review: { quote: 'DJ Joe kept the energy high all night and played the perfect mix of music that kept the dance floor packed.', general: true },
    overview: [
      "Forty-five-inch illuminated numbers spell 16 in a white LED casing, built for Sweet 16s and Quincea&ntilde;eras.",
      "They make a bright, photo-friendly centerpiece that needs no extra staging.",
      "We can also build custom LED letters for any name or word, confirmed with you in advance.",
    ],
    questions: [
      ['How big are the numbers?', 'Forty-five inches, in a white LED casing.'],
      ['Can you spell a name instead?', 'Yes. We can build custom LED letters for any name or word, confirmed with you in advance.'],
      ['How much do 16 letters cost?', QUOTE],
    ],
  },

  /* --- Photo, video and effects --- */
  'zap-shots': {
    headline: 'Live photos on screen <em>as your night happens.</em>',
    review: { quote: 'We knew it was worth it when we walked into the ballroom for our room reveal and saw our ceremony pictures already up on the screens!!!!' },
    overview: [
      "Digital Zap Shots put two large LCD TVs in your room and a professional photographer in the crowd. Photos go up on screen as they happen, and guests see themselves on the wall within minutes of the shot being taken.",
      "You keep every shot on a flash drive after the event.",
      "One bride wrote that it was &ldquo;so amazing to see moments from our whole day flash across the screens during the reception.&rdquo;",
    ],
    questions: [
      ['What are Zap Shots?', 'A professional photographer works the crowd while two large LCD TVs show the photos as they happen.'],
      ['Do we get the photos?', 'Yes, every shot on a flash drive.'],
      ['Which packages include it?', 'Our <a href="/package/supreme/">Supreme</a> and <a href="/package/grand/">Grand</a> packages include it.'],
      ['How much do Zap Shots cost?', QUOTE],
    ],
  },
  'zap-photographer': {
    headline: 'A Zap Shot photographer <em>working the room all night.</em>',
    review: { quote: 'The Zap photographer was absolutely incredible!' },
    overview: [
      "Our Zap Shot photographer works the room all night, without the in-room TVs.",
      "You get the same professional candid coverage, captured live and handed back as a full digital gallery and a flash drive after the event.",
      "It is the pick when you want the photos but already have your screens covered, or do not want screens at all.",
    ],
    questions: [
      ['What do we get?', 'A full digital gallery and a flash drive after the event.'],
      ['How is it different from Zap Shots?', 'Same candid coverage, without the in-room TVs. <a href="/service/zap-shots/">Zap Shots</a> adds the screens.'],
      ['How much does a Zap Shot photographer cost?', QUOTE],
    ],
  },
  'photo-montage': {
    headline: 'A photo montage <em>that tells your story on screen.</em>',
    review: general('guests'),
    overview: [
      "Send us 50 of your favorite photos and we cut them into a music-set montage that plays on two LCD TVs during the event. You keep it on a flash drive.",
      "It is a simple way to put your story on screen: the years before the wedding, the kid before the Sweet 16, the couple before the vows.",
    ],
    questions: [
      ['How many photos do we send?', '50 of your favorites.'],
      ['Where does it play?', 'On two LCD TVs during the event.'],
      ['Do we keep it?', 'Yes, on a flash drive.'],
      ['How much does a photo montage cost?', QUOTE],
    ],
  },
  'video-package': {
    headline: 'Wedding video, <em>in three lengths.</em>',
    review: { quote: 'Special shout out to Jim, the videographer and Dominic, at the Photo Booth. Both were highly professional and easy to work with!' },
    overview: [
      "We offer three tiers of wedding videography. Take I covers four hours of reception, Take II covers six hours, and Take III covers church plus reception.",
      "Every tier includes a 25-photo montage delivered with the final video.",
    ],
    questions: [
      ['What are the three packages?', 'Take I covers four hours of reception, Take II covers six hours, and Take III covers church plus reception.'],
      ['Does it include the ceremony?', 'Take III covers church plus reception.'],
      ['What else comes with it?', 'Every tier includes a 25-photo montage delivered with the final video.'],
      ['How much does wedding video cost?', QUOTE],
    ],
  },
  'dancing-on-cloud': {
    headline: 'Dancing on a cloud <em>for your first dance.</em>',
    review: { quote: 'The dancing on the cloud and sparklers were a huge hit.' },
    overview: [
      "A machine produces a layered fog effect that sits at floor level and does not rise. It photographs extremely well and creates a distinct visual moment at the start of the reception.",
      "It clears quickly, so the room is ready for the rest of the night. It is available as a standalone add-on.",
      "One couple said it looked like &ldquo;the most beautiful scene, straight out of a movie.&rdquo;",
    ],
    questions: [
      ['What is dancing on a cloud?', 'A layered fog effect that sits at floor level and does not rise, usually for the first dance.'],
      ['Does the fog stick around?', 'No, it clears quickly.'],
      ['Will it look good in photos?', 'Yes, it photographs extremely well.'],
      ['How much does dancing on a cloud cost?', QUOTE],
    ],
  },
  'co2-guns': {
    headline: 'CO2 guns <em>for your biggest moments.</em>',
    review: { quote: 'We bought the CO2 canons and LED foam light sticks which everyone loved, and it made the night so much more fun.' },
    overview: [
      "A one- or two-gun CO2 setup is used for entrances, drops and the last dance, the moments when the room needs to feel like a concert.",
      "One couple wrote that it made the night so much more fun.",
    ],
    questions: [
      ['When do you use CO2 guns?', 'Entrances, drops and the last dance.'],
      ['How many guns are there?', 'A one- or two-gun setup.'],
      ['How much do CO2 guns cost?', QUOTE],
    ],
  },
  'cold-sparklers': {
    headline: 'Cold sparklers, <em>the moment everyone films.</em>',
    review: { quote: "if your venue allows, get the cold sparklers I promise you, you'll love every second of it!!!" },
    overview: [
      "This is the moment the whole room reaches for their phones. Cold sparklers fire a fountain of bright sparks into the air right on cue, and because they run cool instead of open flame, they are safe to set off indoors.",
      "Save them for the big beats: your grand entrance, the cake cutting, the last dance, the send-off. A certified technician runs the whole show, you get unlimited blasts all night, and the shots come out looking like a music video.",
      "Want it even cleaner? We can set them inside glass enclosures for a polished, built-in look.",
    ],
    questions: [
      ['Are cold sparklers safe indoors?', 'They run cool instead of open flame, and a certified technician runs them.'],
      ['Will my venue allow them?', 'Most venues that say no to real sparklers are happy to say yes to these, but check with yours first.'],
      ['When should we use them?', 'Your grand entrance, the cake cutting, the last dance or the send-off. You get unlimited blasts all night.'],
      ['How much do cold sparklers cost?', QUOTE],
    ],
  },
  'flower-walls': {
    headline: 'Flower walls <em>for photos all night.</em>',
    review: general('guests'),
    overview: [
      "We have four flower wall options, all 8 feet by 8 feet. Place one behind the dais table, use it as a photo booth backdrop, or set it up freestanding for guests to photograph in front of throughout the night.",
      "The options include green and white Hedges, Spring and White. Neon sign upgrades are available in &ldquo;That's Amore&rdquo; and &ldquo;Mr. &amp; Mrs.&rdquo;, and you may also supply your own neon sign.",
    ],
    questions: [
      ['How big is a flower wall?', '8 feet by 8 feet.'],
      ['Where does it go?', 'Behind the dais table, as a photo booth backdrop, or freestanding.'],
      ['Can we add a neon sign?', 'Yes. We offer &ldquo;That&rsquo;s Amore&rdquo; and &ldquo;Mr. &amp; Mrs.&rdquo;, and you can supply your own.'],
      ['How much does a flower wall cost?', QUOTE],
    ],
  },
  'lawn-games': {
    headline: 'Lawn games <em>for cocktail hour.</em>',
    review: general('crowd'),
    overview: [
      "We have two options. Birdie Ball is a portable putting green that works for indoor and outdoor setups, comes with 2 clubs and 3 balls, and fits both corporate events and casual cocktail hours.",
      "Corn Hole comes with custom boards printed for the new Mr. and Mrs., with &ldquo;team bride&rdquo; and &ldquo;team groom&rdquo; bean bags included.",
    ],
    questions: [
      ['What games do you have?', 'Birdie Ball, a portable putting green, and Corn Hole with custom boards.'],
      ['Do they work indoors?', 'Birdie Ball works for indoor and outdoor setups.'],
      ['Are the Corn Hole boards custom?', 'Yes, printed for the new Mr. and Mrs., with &ldquo;team bride&rdquo; and &ldquo;team groom&rdquo; bean bags.'],
      ['How much do lawn games cost?', QUOTE],
    ],
  },
  'extra-speakers': {
    headline: 'Extra speakers, <em>so every guest hears it.</em>',
    review: { quote: "they worked closely with me to figure out the speaker situation during the ceremony to make sure the music would be heard by everyone since it's always difficult with acoustics outside." },
    overview: [
      "Tripod-mounted speakers extend the sound past the main setup. Book them for a separate ceremony spot, a cocktail area down the hall, or any room big enough that one PA will not carry clean audio to the back.",
      "The point is simple: every guest hears the music and the announcements clearly, wherever they are standing.",
    ],
    questions: [
      ['When do we need extra speakers?', 'A separate ceremony spot, a cocktail area down the hall, or a room too big for one PA.'],
      ['Do they help with outdoor ceremonies?', 'They can. One bride wrote that we worked with her on the speaker setup because acoustics outside are always difficult.'],
      ['How much do extra speakers cost?', QUOTE],
    ],
  },
  'additional-tvs': {
    headline: 'Extra LED screens <em>around the room.</em>',
    review: { quote: 'They also provide a photographer that displays real time photos on multiple large screen monitors around the reception hall.' },
    overview: [
      "Extra 60-, 65- or 75-inch LED TVs are placed around the room.",
      "Use them for sponsor logos and slides at a corporate event, scrolling photos at a wedding, or just more places for guests to catch the live <a href=\"/service/zap-shots/\">Zap Shots</a> as they happen. The bigger the room, the more they earn their spot.",
    ],
    questions: [
      ['What sizes are available?', '60, 65 or 75 inches.'],
      ['What can they show?', 'Sponsor logos and slides, scrolling photos, or live Zap Shots.'],
      ['How much do extra TVs cost?', QUOTE],
    ],
  },
  'furniture': {
    headline: 'Event furniture <em>that shapes the room.</em>',
    review: general('crowd'),
    overview: [
      "Sometimes a room needs more than a dance floor. Our event furniture fills the space the way you want it: extra seating for guests, cocktail tables to gather around, or a relaxed lounge area where people can step away from the music and still feel part of the night.",
      "We carry a wide range of seating and tables, and we can light up select counters and tabletops with LEDs for a glow that matches the rest of your setup.",
      "Every event is different, so what we bring depends on your venue and the room you are working with. Tell us the vibe you are after, and we will build the space around it.",
    ],
    questions: [
      ['What furniture do you have?', 'Seating, cocktail tables and lounge pieces, with LED lighting on select counters and tabletops.'],
      ['How do we choose?', 'Tell us the vibe and your venue, and we will build the space around it.'],
      ['How much does event furniture cost?', QUOTE],
    ],
  },
};

const packages = {
  'basic': {
    headline: 'Basic Entertainment, <em>one DJ and MC for an intimate night.</em>',
    review: { quote: 'We had a small wedding and it was so important to us that everyone was up and dancing and enjoying themselves the whole time.' },
    overview: [
      "This is the right tier for intimate weddings, microweddings and small private events of 75 guests or fewer. One named DJ and MC runs the entire night, the same person on the music, the mic and your timeline.",
      "You get four hours of music and entertainment, a custom playlist consultation, and setup and breakdown. It is the straightforward Tommy's Tunes experience without any production extras.",
    ],
    questions: [
      ['Who is this package for?', 'Intimate weddings, microweddings and small gatherings of 75 or fewer.'],
      ['Can one person do both jobs?', 'Yes. One named person handles the music, the mic and your timeline.'],
      ['What if we want a separate MC?', 'That is our <a href="/package/deluxe/">Deluxe package</a>.'],
      ['How much is the Basic package?', QUOTE],
    ],
  },
  'deluxe': {
    headline: 'Deluxe Entertainment, <em>a DJ on the music and an MC in the room.</em>',
    review: general('pressure'),
    overview: [
      "This is our most-booked package. Two named talents work your night: a DJ focused entirely on the music, and a dedicated MC working the room and the timeline.",
      "The split lets each person do one job well, and that is the difference you feel on the dance floor.",
      "You get four hours of music and entertainment, a custom playlist consultation, and setup and breakdown.",
    ],
    questions: [
      ['Why have a DJ and an MC?', 'Each person does one job well. The DJ stays on the music, and the MC works the room and the timeline.'],
      ['How long is it?', 'Four hours of music and entertainment.'],
      ['What if we need ceremony music?', 'Our <a href="/package/super-deluxe/">Super Deluxe package</a> adds DJ music for the ceremony and cocktail hour.'],
      ['How much is the Deluxe package?', QUOTE],
    ],
  },
  'super-deluxe': {
    headline: 'Super Deluxe Entertainment, <em>one team from ceremony to last dance.</em>',
    review: { quote: 'They were so easy to work with and they did the ceremony and reception PERFECTLY and had our guests dancing all night.' },
    overview: [
      "Super Deluxe adds an extra 90 minutes of music coverage and the illuminated DJ booth. Your DJ runs music for the ceremony and cocktail hour as well as the reception.",
      "The booth itself becomes part of the decor, colored to match your palette.",
      "You get five and a half hours of music and entertainment and a two-person team: a DJ and an MC.",
    ],
    questions: [
      ['Does it cover the ceremony?', 'Yes. DJ music for the ceremony and cocktail hour is included.'],
      ['How long is it?', 'Five and a half hours of music and entertainment.'],
      ['What does the illuminated booth do?', 'It becomes part of the decor, colored to match your palette.'],
      ['How much is the Super Deluxe package?', QUOTE],
    ],
  },
  'premiere': {
    headline: 'Premiere Entertainment, <em>a room that looks as good as it sounds.</em>',
    review: { quote: 'And the set up was stunning, with uplight across the room and the light up DJ board.' },
    overview: [
      "Premiere adds full intelligent lighting and a dedicated lighting tech. Two Martin Mac 250 moving lights are mounted on illuminated truss towers, the level of production you see at a club night, programmed to follow the wedding timeline.",
      "You get five hours of music and entertainment, DJ music for cocktail hour, the illuminated DJ front board, and a three-person team: a DJ, an MC and a light tech.",
    ],
    questions: [
      ['What lighting is included?', 'Two Martin Mac 250 moving lights on two illuminated towers, plus the illuminated DJ front board.'],
      ['Who runs the lights?', 'A dedicated light tech is part of your team.'],
      ['How long is it?', 'Five hours of music and entertainment, with DJ music for cocktail hour.'],
      ['How much is the Premiere package?', QUOTE],
    ],
  },
  'supreme': {
    headline: 'Supreme Entertainment, <em>your night live on screen.</em>',
    review: { quote: 'They also provide a photographer that displays real time photos on multiple large screen monitors around the reception hall.' },
    overview: [
      "Supreme layers Zap Shots, our live event photography, on top of the Premiere production. A pro photographer works the crowd while two 60-inch LCD TVs show the photos as they happen. Guests see themselves on screen within minutes.",
      "You get five hours of music and entertainment, DJ music for cocktail hour, the illuminated DJ front board, two Mac lights on illuminated towers, and a four-person team: a DJ, an MC, a photographer and a TV tech.",
    ],
    questions: [
      ['What does Supreme add over Premiere?', 'Zap Shots: a pro photographer and two 60-inch LCD TVs showing the photos as they happen.'],
      ['How big is the team?', 'Four people: a DJ, an MC, a photographer and a TV tech.'],
      ['How long is it?', 'Five hours of music and entertainment, with DJ music for cocktail hour.'],
      ['How much is the Supreme package?', QUOTE],
    ],
  },
  'grand': {
    headline: 'Grand Entertainment, <em>the full production with live music.</em>',
    review: { quote: "Tommy's tunes was amazing, from the MC to the DJ, sax, lighting and drums." },
    overview: [
      "This is the works. You get everything in Supreme, and then a live musician on top of it: your pick of a saxophonist or a percussionist riffing over the DJ while the floor goes off.",
      "Five of our people run the room: the DJ, the MC, a photographer putting live shots up on the screens, a tech keeping the lights and TVs moving, and the musician.",
      "You get five hours of music and entertainment, DJ music for cocktail hour, two 60-inch LCD TVs with Zap Shots and a digital gallery, the illuminated DJ front board, and two Mac lights on illuminated towers.",
    ],
    questions: [
      ['What does Grand add over Supreme?', 'A live musician for the reception: your choice of a <a href="/service/saxophonist/">saxophonist</a> or a <a href="/service/percussionist/">percussionist</a>.'],
      ['How big is the team?', 'Five people: a DJ, an MC, a photographer, a TV and light tech, and the musician.'],
      ['How long is it?', 'Five hours of music and entertainment, with DJ music for cocktail hour.'],
      ['How much is the Grand package?', QUOTE],
    ],
  },
};

const people = {
  'pj': { headline: 'PJ, the MC who gets the floor rowdy, <em>then joins it.</em>', review: { quote: 'The dance floor was packed all night thanks to DJ Jon and MC PJ.' } },
  'joe-cip': { headline: 'Joe Cip., twenty-six years on the mic <em>and still all energy.</em>', review: { quote: 'DJ Rich and MC Joe Cip were absolutely incredible. They listened and executed beyond our expectations.' } },
  'mike': { headline: 'Mike, the MC who runs <em>a tight, well-organized night.</em>', review: { quote: 'DJ Dominick and MC Mike L were fantastic.' } },
  'leo': { headline: 'Leo, a bilingual MC <em>who steers the room.</em>', review: { quote: 'DJ Impact and MC Leo kept the energy up all night' } },
  'mike-n': { headline: 'Mike N., <em>a classic Long Island MC.</em>' },
  'joe-costa': { headline: 'Joe Costa, <em>a true veteran on the mic.</em>', review: { quote: 'He knew exactly how to hype the room without ever stealing the spotlight.' } },
  'david': { headline: 'David, the MC for Sweet 16s and mitzvahs <em>that need to move.</em>', review: { quote: 'energetic, fun, and amazing with our Sweet 16 crowd.' } },
  'zach': { headline: 'Zach, confident on the mic and <em>obsessive about your timeline.</em>' },
  'yianni': { headline: 'Yianni, a bilingual MC <em>in English and Greek.</em>', review: { quote: 'Emcee Yianni and DJ Frank were spot on when playing our requested songs and music genre throughout the event.' } },
  'max': { headline: 'Max, a fun presence <em>with a clear voice.</em>', review: { quote: 'MC Max & DJ Joe CiP were absolutely incredible! They kept the dance floor energetic and were even better than advertised.' } },
  'richie': { headline: 'Rich, <em>everyone&rsquo;s favorite DJ.</em>', review: { quote: 'DJ Rich and MC Mike and their percussionist literally rocked my wedding. No one sat.' } },
  'dominick': { headline: 'Dominick, the DJ who <em>reads a room like nobody else.</em>', review: { quote: "Dominick's music was INCREDIBLE" } },
  'anderson': { headline: 'Anderson, a bilingual DJ and MC <em>who mixes clean.</em>', review: { quote: 'He was so nice and really nailed exactly the vibe we wanted as far as music goes.' } },
  'jon': { headline: 'Jon, the DJ whose transitions <em>you never catch.</em>', review: { quote: 'The MC PJ and DJ Jon absolutely crushed. No one left the dance floor all night!' } },
  'steven': { headline: 'Steven, the DJ who <em>plans your night with you.</em>', review: { quote: 'He responded quickly when I emailed him with questions and even a few last-minute song changes for our ceremony.' } },
  'konstantine': { headline: 'Konstantine, a club DJ <em>at your party.</em>', review: { quote: 'MC Mike and DJ Konstantine had the party VIBING!' } },
  'johnny-munroe': { headline: 'Johnny Munroe, the DJ who <em>locks in a younger crowd.</em>', review: { quote: 'John kept the dance floor packed all night long' } },
  'ruben': { headline: 'Ruben, a bilingual DJ <em>with years behind him.</em>', review: { quote: 'Joe our mC and Ruben our Dj did a phenomenal job!' } },
  'gio': { headline: 'Gio, a bilingual DJ <em>with a producer&rsquo;s ear.</em>', review: { quote: 'Gio and Anderson were great and worked with us to execute a complicated vision we had for our reception entrance.' } },
};

window.LANDING_DATA = { services, packages, people };
