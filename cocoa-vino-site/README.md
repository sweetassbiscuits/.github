# Cocoa Vino — website

A new, dynamic site for Cocoa Vino (312 Capitola Ave, Capitola, CA). It's plain HTML, CSS and JavaScript with no build step, so it runs on any host.

## What's dynamic
- **Live "Open now / Closed" badge** and today's hours highlighted
- **"Now pouring" ticker** that scrolls continuously
- **Filterable menu** (Reds / Whites / Bubbles / Flights)
- **Events list** that hides past events on its own
- **Newsletter signup** with validation and interest tags
- Scroll animations, a sticky nav and a mobile menu

## Updating content
Edit **`content.js`**. It holds the hours, menu, events and ticker text. Anything marked SAMPLE is placeholder content to replace with real items.

## Before launch (placeholders to replace)
- [ ] Confirm the hours (public listings say 3–10pm daily)
- [ ] Real phone number (`tel:` link in `index.html`)
- [ ] Instagram / Facebook URLs (footer)
- [ ] Real menu, prices and events in `content.js`
- [ ] Photos: save a bar photo as `images/hero.jpg` and it shows behind the headline automatically
- [ ] Logo: `images/logo-mark.svg` is a drawn stand-in for the bottle-and-glass mark; swap in the real file
- [ ] Connect the newsletter (below)

## Connecting the newsletter
Pick a provider such as Mailchimp, Buttondown, Flodesk or Kit, then paste its form POST URL into `newsletterFormAction` in `content.js`. The email field is named `email`. Until a URL is set, the form only shows a thank-you message and doesn't save addresses.

## Preview locally
```bash
cd cocoa-vino-site && python3 -m http.server 8000
```
Then open http://localhost:8000.

## Hosting
Netlify, Vercel, Cloudflare Pages or GitHub Pages all work for free. Point the `cocoavinocapitola.com` domain at the host when it's ready.
