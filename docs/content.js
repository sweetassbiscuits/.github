// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to update the website. No coding needed:
// change the text between the quotes, add or remove items.
// Items marked SAMPLE are placeholders — replace with real ones.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  // Newsletter: paste your provider's form URL here (see README).
  // Until it is set, signups are not saved anywhere.
  newsletterFormAction: "",

  // Private events form: paste a form service URL (Formspree, Basin, etc.).
  // Until it is set, the form asks the guest to call instead.
  privateEventsFormAction: "",

  // Contact & social. An empty value ("") hides its button or link.
  phone: "(831) 854-2777",
  instagram: "https://www.instagram.com/cocoavinocapitola",   // CONFIRM handle
  facebook: "",
  reservationsUrl: "",  // online booking link, if he uses one. Empty = Reserve goes to the Visit page.

  // 0 = Sunday ... 6 = Saturday. 24h times. null = closed that day.
  // CONFIRM: public listings say 3pm to 10pm daily.
  hours: {
    0: ["15:00", "22:00"],
    1: ["15:00", "22:00"],
    2: ["15:00", "22:00"],
    3: ["15:00", "22:00"],
    4: ["15:00", "22:00"],
    5: ["15:00", "22:00"],
    6: ["15:00", "22:00"],
  },

  // The weekly rhythm (Home: "Every Week")
  weekly: [
    { day: "Mondays", title: "Paint parties & classes", text: "Paint a layered wood piece or decorate a gingerbread house with a glass in hand. Supplies are on us." },
    { day: "Wednesdays", title: "Bingo & trivia", text: "Every bingo night raises money for a local cause. Trivia nights bring five rounds, prizes and a cheese board." },
    { day: "Thursdays", title: "House DJ", text: "Chill house and jazzy grooves from 7 pm while the fire pit burns." },
    { day: "Friday to Sunday", title: "Live music", text: "Local guitarists, jazz duos and Hawaiian harmonies, inside and on the patio." },
  ],

  // Wine & Chocolate. byTheGlass items: { name, region, glass, bottle }
  // Leave byTheGlass empty and the page shows the program instead of a list.
  wine: [
    { title: "Vintage Champagne", text: "There is always a vintage bottle open. Order a glass of something most bars only sell by the case." },
    { title: "California", text: "Napa Valley and Paso Robles, from names you know like Caymus and DAOU to hard-to-find small producers." },
    { title: "France", text: "Crisp Sancerre for a sunny afternoon and classic French reds for after dark." },
    { title: "Tuscany", text: "Tuscan reds to pour while the sun drops behind the village." },
  ],
  byTheGlass: [],
  chocolate: "Artisan chocolate by the piece, picked to go with what's in your glass. Ask the bar for a pairing.",   // NAME the maker
  charcuterie: "Cheese and charcuterie boards built for sharing at the fire pit.",

  // Events. date: YYYY-MM-DD. Sorted automatically; past dates hide on their own.
  // badge: Live Music, DJ, Bingo, Trivia, Paint Party, Class or Closed.
  // "Closed" shows as a notice and marks the bar closed that day.
  // image (optional): e.g. "images/bingo.jpg". link: the event's RSVP/details page.
  events: [
    { date: "2026-10-28", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Bingo", badge: "Bingo", text: "Beneficiary of the night: 2B-RAD. An evening of wine, community and friendly competition at Cocoa Vino.", image: "images/bingo.jpg", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-bingo-2026-10-28-19-00" },
    { date: "2026-10-29", time: "7:00 pm – 9:00 pm", title: "Chill House Music with DJ Ryan James", badge: "DJ", text: "Santa Cruz DJ Ryan James blends chill house with jazz-inspired, melodic progressive electronic music. Deep grooves to go with your glass.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/chill-house-music-with-dj-ryan-james-17" },
    { date: "2026-10-30", time: "6:00 pm – 9:00 pm", title: "Brett Fowler", badge: "Live Music", text: "Singer and guitarist Brett Fowler has played the Santa Cruz County scene for over 10 years. Sets include hits from the 70s, 80s, 90s and more.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/brett-fowler-14" },
    { date: "2026-11-04", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Trivia", badge: "Trivia", text: "Five fun trivia rounds with wine, cheese and charcuterie, plus prizes for the smartest (or luckiest) team. Your favorite midweek night out in Capitola Village.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-trivia-2026-11-04-19-00" },
    { date: "2026-11-06", time: "6:00 pm – 9:00 pm", title: "James Brudnick & Harrison Brand", badge: "Live Music", text: "Bay Area guitarist Harrison Brand joins veteran bassist James Brudnick for an intimate night of groove-driven jazz with decades of Monterey Bay sound.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/james-brudnick-harrison-brand-2" },
    { date: "2026-11-07", time: "6:00 pm – 9:00 pm", title: "Gabi & Kayton Rivera", badge: "Live Music", text: "Santa Cruz husband-and-wife duo blending indie and jazz into a warm, easygoing sound. Reimagined indie favorites and laid-back grooves made to pair with wine.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/gabi-kayton-rivera-3" },
    { date: "2026-11-08", time: "4:00 pm – 7:00 pm", title: "Nick & Rich Matteis", badge: "Live Music", text: "Nick and Rich Matteis of Acoustic 2 Man Jam deliver a high-energy acoustic set with percussive guitar, melodic leads and tight harmonies. Over 20 years playing Northern California.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/nick-rich-matteis-5" },
    { date: "2026-11-09", time: "6:00 pm", title: "Sip, Paint & Be Merry - Layered Wood Paint Party!", badge: "Paint Party", text: "Get into the holiday spirit with a Layered Wood Paint Party. No experience necessary, all supplies included. 21+ only.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/sip-paint-be-merry-layered-wood-paint-party" },
    { date: "2026-11-11", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Bingo", badge: "Bingo", text: "Beneficiary of the night: Veteran Surf Alliance. An evening of wine, community and friendly competition at Cocoa Vino.", image: "images/bingo.jpg", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-bingo-2026-11-11-19-00" },
    { date: "2026-11-13", time: "6:00 pm – 9:00 pm", title: "Brett Fowler", badge: "Live Music", text: "Singer and guitarist Brett Fowler has played the Santa Cruz County scene for over 10 years. Sets include hits from the 70s, 80s, 90s and more.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/brett-fowler-16" },
    { date: "2026-11-14", time: "6:00 pm – 9:00 pm", title: "Mark Van Haren", badge: "Live Music", text: "Step back into the golden era of 70s pop-soul with guitarist and vocalist Mark Van Haren. Raised on Stevie Wonder, Hall & Oates, Steely Dan and the Beatles.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/mark-van-haren-3" },
    { date: "2026-11-18", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Trivia", badge: "Trivia", text: "Five fun trivia rounds with wine, cheese and charcuterie, plus prizes for the smartest (or luckiest) team. Your favorite midweek night out in Capitola Village.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-trivia-2026-11-18-19-00" },
    { date: "2026-11-20", time: "6:00 pm – 9:00 pm", title: "Brett Fowler", badge: "Live Music", text: "Singer and guitarist Brett Fowler has played the Santa Cruz County scene for over 10 years. Sets include hits from the 70s, 80s, 90s and more.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/brett-fowler-18" },
    { date: "2026-11-22", time: "4:00 pm – 7:00 pm", title: "Mark Van Haren", badge: "Live Music", text: "Step back into the golden era of 70s pop-soul with guitarist and vocalist Mark Van Haren. Raised on Stevie Wonder, Hall & Oates, Steely Dan and the Beatles.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/mark-van-haren-4" },
    { date: "2026-11-26", time: "3:00 pm – 10:00 pm", title: "Closed - Happy Thanksgiving!", badge: "Closed", text: "Cocoa Vino is closed for Thanksgiving.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/closed-happy-thanksgiving" },
    { date: "2026-11-27", time: "6:00 pm – 9:00 pm", title: "Brett Fowler", badge: "Live Music", text: "Singer and guitarist Brett Fowler has played the Santa Cruz County scene for over 10 years. Sets include hits from the 70s, 80s, 90s and more.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/brett-fowler-17" },
    { date: "2026-11-28", time: "6:00 pm – 9:00 pm", title: "Dos Bros - Feel Good Music!", badge: "Live Music", text: "Upbeat rhythms and positive lyrics with reggae and surf influences. Original music on ukulele, guitar, bass, keys, drums and horns that captures the essence of summer.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/dos-bros-feel-good-music-3" },
    { date: "2026-12-02", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Trivia", badge: "Trivia", text: "Five fun trivia rounds with wine, cheese and charcuterie, plus prizes for the smartest (or luckiest) team. Your favorite midweek night out in Capitola Village.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-trivia-2026-12-02-19-00" },
    { date: "2026-12-04", time: "6:00 pm – 9:00 pm", title: "Scott Cooper & Fred Rodriguez", badge: "Live Music", text: "A spirited mix of originals and covers from jazz to bluegrass, Dylan to the Dead. Members of Rosebud who have played Terrapin Crossroads and Felton Music Hall; Cooper is also known for China Cats and KPIG radio.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/scott-cooper-fred-rodriguez-7" },
    { date: "2026-12-05", time: "6:00 pm – 9:00 pm", title: "Mark Van Haren", badge: "Live Music", text: "Step back into the golden era of 70s pop-soul with guitarist and vocalist Mark Van Haren. Raised on Stevie Wonder, Hall & Oates, Steely Dan and the Beatles.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/mark-van-haren-5" },
    { date: "2026-12-07", time: "6:00 pm", title: "Tides of Light - Layered Wood Paint Party!", badge: "Paint Party", text: "A Layered Wood Paint Party. No experience necessary, all supplies included. 21+ only.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/tides-of-light-layered-wood-paint-party" },
    { date: "2026-12-09", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Bingo", badge: "Bingo", text: "Beneficiary of the night: R.A.C.K. An evening of wine, community and friendly competition at Cocoa Vino.", image: "images/bingo.jpg", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-bingo-2026-12-09-19-00" },
    { date: "2026-12-11", time: "6:00 pm – 9:00 pm", title: "Papiba Godinho - Brazilian Guitarist, Singer and Songwriter", badge: "Live Music", text: "Papiba Godinho, Brazilian guitarist, singer and founder of SambaDá, plays original music and classics by Jobim, Djavan and Gilberto Gil. A capoeira mestre bringing the true spirit of Brazil to Santa Cruz.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/papiba-godinho-brazilian-guitarist-singer-and-songwriter-14" },
    { date: "2026-12-12", time: "3:00 pm", title: "Closed for a Private Event", badge: "Closed", text: "Cocoa Vino is closed Saturday, December 12 for a private event.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/closed-for-a-private-event" },
    { date: "2026-12-14", time: "7:00 pm", title: "Gingerbread House Decorating Class", badge: "Class", text: "Decorate a gingerbread house with Capitola Candy Co. The house, frosting, candy and festive fun are provided; you bring the creativity. 21+ only.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/gingerbread-house-decorating-class" },
    { date: "2026-12-16", time: "7:00 pm – 8:30 pm", title: "Wednesday Night Trivia", badge: "Trivia", text: "Five fun trivia rounds with wine, cheese and charcuterie, plus prizes for the smartest (or luckiest) team. Your favorite midweek night out in Capitola Village.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/wednesday-night-trivia-2026-12-16-19-00" },
    { date: "2026-12-19", time: "6:00 pm – 9:00 pm", title: "Nick & Rich Matteis", badge: "Live Music", text: "Nick and Rich Matteis of Acoustic 2 Man Jam deliver a high-energy acoustic set with percussive guitar, melodic leads and tight harmonies. Over 20 years playing Northern California.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/nick-rich-matteis-6" },
    { date: "2026-12-25", time: "3:00 pm – 10:00 pm", title: "Closed - Merry Christmas!", badge: "Closed", text: "Cocoa Vino is closed for Christmas.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/closed-merry-christmas" },
    { date: "2027-01-09", time: "6:00 pm – 9:00 pm", title: "Ho'omana Hawaiian Band", badge: "Live Music", text: "Formed in 2001, Ho'omana is one of Northern and Central California's top Hawaiian groups, with fresh arrangements of traditional and contemporary songs and beautiful three-part harmonies.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/hoomana-hawaiian-band-5" },
    { date: "2027-01-16", time: "6:00 pm – 9:00 pm", title: "Gabi & Kayton Rivera", badge: "Live Music", text: "Santa Cruz husband-and-wife duo blending indie and jazz into a warm, easygoing sound. Reimagined indie favorites and laid-back grooves made to pair with wine.", image: "", link: "https://www.cocoavinocapitola.com/event-details-registration/gabi-kayton-rivera-4" },
  ],
};
