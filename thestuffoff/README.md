# The Stuff Off — thestuffoff.com

The website for The Stuff Off, an invitation-only Thanksgiving throwdown.
Rebuilt from the original Wix site as a plain static site: no build step, no framework, just HTML, CSS and a few lines of JavaScript.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Home: last year's recap, the party photos, what the event is, the rules |
| `signup.html` | Sign Up: category descriptions, judge call, entry form |
| `competitors.html` | Competitors list and champs |
| `about.html` | About |
| `contact.html` | Contact / apply to judge form |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |
| `css/style.css` | All styles. Colors and fonts are variables at the top. |
| `js/main.js` | Mobile menu and form submission. **Form endpoint goes here.** |
| `img/` | Logo (`logo.png` transparent, `logo-og.png` for social previews), photos (`photos/` full size, `thumbs/` small) |
| `CNAME` | Tells GitHub Pages to serve the site at thestuffoff.com |

## Editing the site

Open any `.html` file and change the text. Each page has the same header and footer; if you change the menu, change it on every page.

- **New year's recap:** replace the first `<section>` in `index.html`.
- **Photos:** drop a full-size JPG in `img/photos/` and a ~640px copy in `img/thumbs/`, then add a `<figure class="polaroid">` block in `index.html`.
- **Competitors:** add `<li>Name</li>` lines to the lists in `competitors.html`.
- **Date and time:** the `.when` paragraph in `signup.html`.
- **Colors and fonts:** the `:root` block at the top of `css/style.css`.

## Forms (do this once)

GitHub Pages can't receive form submissions by itself. Create a free form at [Formspree](https://formspree.io) (or a similar service), then paste the endpoint URL into `FORM_ENDPOINT` at the top of `js/main.js`. Both forms will submit there and you'll get the entries by email. Until then the forms fall back to opening the visitor's email app.

## Hosting on GitHub Pages

1. Put these files at the root of their own repository (for example `sweetassbiscuits/thestuffoff`).
2. In that repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. In **Settings → Pages → Custom domain**, enter `thestuffoff.com` and tick *Enforce HTTPS* once the certificate is issued.
4. At your domain registrar, point the domain at GitHub Pages:
   - `A` records for `thestuffoff.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `sweetassbiscuits.github.io`
5. When DNS has propagated, cancel the Wix site/domain connection.

## Previewing locally

Any static server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
