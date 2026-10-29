# Cocoa Vino website

The new site for Cocoa Vino, 312 Capitola Ave, Capitola Village. Plain HTML, CSS and JavaScript with no build step, so it runs on any static host.

**Positioning:** Wine bar in the afternoon. Fire pit at sunset. Music at seven. The village's good-time wine bar: wine is the excuse, the night is the product.

## Pages (five nav items)
| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Hero (positioning line, Tonight / Reserve, today's hours and address), This Week (next 7 days from the events data), The Patio, Wine & Chocolate, Every Week, newsletter |
| What's On | `whats-on.html` | Full calendar with filters, Tickets & RSVP links and Add to calendar |
| Wine & Chocolate | `wine.html` | Champagne, California, France, Tuscany, the glass & bottle list, chocolate, charcuterie |
| Private Events | `private-events.html` | Patio parties, buyouts, birthdays, corporate, one request form |
| Visit | `visit.html` | Hours, walk-ins vs reservations, parking, map, phone, Instagram |

The header, footer and phone bar are repeated in each page. If you change one, change all five.

## Updating content
Almost everything lives in **`content.js`**: phone, Instagram, hours, the weekly rhythm, the wine program, the chocolate line, and every event.

**Events:** add `{ date, time, title, badge, text, image, link }`. They sort by date on their own, past dates disappear, and a series ("Multiple Dates") is one entry per date. Badges: Live Music, DJ, Bingo, Trivia, Paint Party, Class, Closed. A "Closed" entry marks that day closed everywhere on the site.

## Voice rules (from the site direction)
- Specific over adjective. Every sentence should have something you could photograph.
- Second person, present tense, short. Name the nights.
- Never use: refined, inviting, sophistication, soulful, nestled, curated, elevated, savor the moment, designed to please every palate, "for the seasoned collector," "check back soon."
- No em dashes, no italics, no small or light type. The site also converts any dash in event times or text to "to."

## Privacy & security
- No analytics or ad trackers. Google Maps only loads when a visitor taps the map.
- Forms collect only what's needed, have a hidden spam-bot trap, and link to `privacy.html`.
- A Content Security Policy blocks any script that isn't the site's own. Links from `content.js` must start with `https://`.
- `_headers` adds HTTPS-only and anti-framing headers on Netlify or Cloudflare Pages.
- Search engines get BarOrPub structured data with hours, plus an Event entry for each calendar item.

## Before launch
- [ ] Confirm hours (currently 3 pm to 10 pm daily, from an old listing)
- [ ] Confirm the Instagram handle (`cocoavinocapitola` is a guess from the event pages)
- [ ] Name the chocolate maker in `content.js` (`chocolate`)
- [ ] Add the real by-the-glass and bottle list (`byTheGlass`), or leave it empty to show the program only
- [ ] Connect the newsletter: paste a Mailchimp, Flodesk or Kit form URL into `newsletterFormAction`
- [ ] Connect private event requests: paste a Formspree or Basin URL into `privateEventsFormAction`. Until then, the form asks guests to call.
- [ ] Online reservations link, if any (`reservationsUrl`). Without it, Reserve goes to the Visit page.
- [ ] Priority photos still wanted: fire pit at dusk with people, the room full on a music night, a single pour of Champagne, the village or beach from the door, the chocolate
- [ ] Logo: `images/logo-mark.svg` is a drawn stand-in. Swap in the real file.

## Preview locally
```bash
cd cocoa-vino-site && python3 -m http.server 8000
```
Then open http://localhost:8000.

## Hosting
Netlify, Cloudflare Pages or GitHub Pages all work for free. Point `cocoavinocapitola.com` at the host when it's ready.
