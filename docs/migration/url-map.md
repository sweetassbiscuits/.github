# saintkaymedia.com: URL inventory and redirect map

Crawled 2026-10-05 from the live Showit + WordPress site (sitemap_index.xml plus internal links).

## Canonical host

Google has indexed the bare domain: `https://saintkaymedia.com` (every canonical tag uses it).
The new site keeps that. `www.saintkaymedia.com` redirects to it in a single https hop.

Today `https://www.saintkaymedia.com/` 301s to **http**://saintkaymedia.com/ (an https-to-http downgrade, then a second hop).
The new setup fixes this.

## Pages (Showit)

| Old URL | Title today | New URL |
|---|---|---|
| `/` | Saint Kay Media \| Personal Growth and Culture Podcasts | `/` |
| `/about` | About Saint Kay Media \| Podcast Network for Personal Growth | `/about` |
| `/shows` | Saint Kay Media Shows \| Podcasts on Culture, Men, and Society | `/shows` |
| `/events` | Saint Kay Media \| Live Podcasts and Speaking Events | `/events` |
| `/connect` | Connect Saint Kay Media \| Pitch, Book, or Say Hello | `/connect` |
| `/media-kit` | Saint Kay Media \| Podcast Advertising and Media Kit | `/media-kit` |

These keep their exact paths, so no redirect is needed.

## Essays (WordPress) → Diary

| Old URL | New URL |
|---|---|
| `/blog/` | `/diary` |
| `/2026/03/22/why-i-started-saint-kay/` | `/diary/why-i-started-saint-kay` |
| `/2026/03/23/i-got-in-the-water-anyway/` | `/diary/i-got-in-the-water-anyway` |
| `/2026/03/24/i-stopped-crying-for-seventeen-years/` | `/diary/i-stopped-crying-for-seventeen-years` |
| `/2026/03/29/both-can-be-true/` | `/diary/both-can-be-true` |
| `/2026/04/01/i-had-a-lawn/` | `/diary/i-had-a-lawn` |

Older slugs that already redirect today (point them straight at the final URL, with no chains):

| Old URL | New URL |
|---|---|
| `/2026/03/22/saintkaymedia/` | `/diary/why-i-started-saint-kay` |
| `/2026/03/24/saintkaymedia/` | `/diary/why-i-started-saint-kay` |
| `/2026/03/23/what-doing-a-triathlon-at-237-pounds-taught-me-about-everything-and-why-i-tell-my-sons-to-do-it-today/` | `/diary/i-got-in-the-water-anyway` |
| `/2026/03/24/what-doing-a-triathlon-at-237-pounds-taught-me-about-everything-and-why-i-tell-my-sons-to-do-it-today/` | `/diary/i-got-in-the-water-anyway` |

## Archives, author, feed

| Old URL | New URL |
|---|---|
| `/category/*` (essay, personal-growth, growth) | `/diary` |
| `/tag/*` (21 tags) | `/diary` |
| `/author/kaysaintkay-com-2/` | `/about/kenda` |
| `/feed/` | `/rss.xml` |

## Already broken (linked from the current homepage, 404 today)

`/portfolio`, `/blog-post-demo-only-delete`. They redirect to `/` and `/diary`.

## Fixes the new site makes

- Sitemap lists every page. Today only `/` and the essays are in it, and the Showit pages are missing.
- Remove `Crawl-delay: 10` from robots.txt (it slows Bing).
- Meta descriptions for the Diary index and "I got in the water anyway", which have none today. Also align that essay's title with its URL.
- Per-page share images (today every page shares the logo).
- Internal links point at final URLs, not redirecting ones.
