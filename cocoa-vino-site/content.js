// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to update the website. No coding needed:
// change the text between the quotes, add or remove items.
// Items marked SAMPLE are placeholders — replace with real ones.
// ─────────────────────────────────────────────────────────────

window.SITE = {
  // Newsletter: paste your provider's form URL here (see README).
  // Leave empty to show a "thanks" message without sending anywhere.
  newsletterFormAction: "",

  // 0 = Sunday … 6 = Saturday. Use 24h times. null = closed.
  // UNCONFIRMED: public listings say 3pm–10pm — please verify.
  hours: {
    0: ["15:00", "22:00"],
    1: ["15:00", "22:00"],
    2: ["15:00", "22:00"],
    3: ["15:00", "22:00"],
    4: ["15:00", "22:00"],
    5: ["15:00", "22:00"],
    6: ["15:00", "22:00"],
  },

  // Scrolling "Now pouring" banner
  nowPouring: [
    "Vintage Champagne — rotating",
    "Santa Cruz Mountains Pinot Noir",
    "Paso Robles Rhône blend",
    "Napa Cabernet, library vintage",
    "Live music Fridays",
  ],

  // Menu cards. type: red | white | bubbles | flight   (SAMPLE)
  menu: [
    { type: "bubbles", name: "Vintage Champagne", region: "Rotating selection", note: "Our signature: a different vintage bottle open every week.", price: "Glass MP" },
    { type: "red", name: "Santa Cruz Mountains Pinot Noir", region: "Santa Cruz Mountains", note: "Bright cherry, forest floor, a whisper of spice.", price: "$18" },
    { type: "red", name: "Library Cabernet", region: "Napa Valley", note: "Hard-to-find older vintage, poured by the ounce.", price: "$24" },
    { type: "white", name: "Chardonnay", region: "Sonoma Coast", note: "Coastal, mineral, restrained oak.", price: "$15" },
    { type: "white", name: "Albariño", region: "Central Coast", note: "Salty, citrusy, made for a beach afternoon.", price: "$14" },
    { type: "flight", name: "California Classics", region: "3 tastes", note: "A tour of the state: coast, mountains and valley.", price: "$28" },
    { type: "flight", name: "Bubbles Flight", region: "3 sparklings", note: "Vintage Champagne alongside two California sparklers.", price: "$36" },
    { type: "flight", name: "Big Reds Flight", region: "3 tastes", note: "Zinfandel, Syrah and Cabernet from small producers.", price: "$32" },
  ],

  // Events. date: YYYY-MM-DD. Past events hide automatically.
  // Optional: badge (small label), image (e.g. "images/bingo.jpg"), link (ticket/RSVP URL).
  // From the current site, Oct 2026. Add next dates for the recurring nights.
  events: [
    { date: "2026-10-28", time: "Evening", title: "Wednesday Night Bingo", badge: "Multiple Dates",
      text: "Beneficiary of the night: 2B-RAD. An evening of wine, community and a little friendly competition, where great wine meets great company.", image: "images/bingo.jpg", link: "" },
    { date: "2026-10-30", time: "Evening", title: "Live Music: Brett Fowler", badge: "Live Music",
      text: "Singer and guitarist from the SC County music scene for over 10 years. Hits from the 70s, 80s, 90s and more. Everyone always enjoys!", image: "", link: "" },
    { date: "2026-11-04", time: "Evening", title: "Wednesday Night Trivia", badge: "Multiple Dates",
      text: "Midweek plans? Solved. Trivia Night @CocoaVinoCapitola!", image: "", link: "" },
  ],
};
