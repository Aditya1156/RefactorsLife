# RefactorsLife.in

The website for the [RefactorsLife](https://www.youtube.com/@RefactorsLife) YouTube channel — *Where Engineering Meets Life.*

Plain HTML, CSS and JavaScript. There's no build step and no framework, and it hosts free on GitHub Pages, Netlify, Vercel or Cloudflare Pages.

## Pages

| Page | What it's for |
|---|---|
| `index.html` | Home: hero, stats, the three pillars, featured podcast, latest videos, Ask CTA, team, blog, newsletter + community |
| `videos.html` | Full video library with topic filters, search and an in-page player |
| `blog/` | Written guides for popular videos (good for Google search traffic) |
| `resources.html` + `resources/` | Free printable cheat sheets and checklists. One email unlocks them all (grows the newsletter) |
| `hall-of-fame.html` | Real student wins (internships, placements, hackathons) with a "Share your win" form |
| `team.html` | Aditya + editors/designers/writers, with credits |
| `careers.html` | Internship roles, perks, hiring process, application form |
| `ask.html` | Ask Aditya (questions → video ideas), already-answered FAQ, reviews & feedback |
| `collab.html` | Brands, colleges and podcast guests: offers + enquiry form |
| `404.html` | Not-found page |

## Run locally

```bash
cd RefactorsLife
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing content

Almost everything lives in two files:

- **`assets/js/config.js`**: social links, email, homepage stats, form endpoints.
- **`assets/js/data.js`**: videos, team, internship roles, perks, blog list, reviews, answered questions.

Common tasks:

- **New videos:** run `node scripts/sync-videos.mjs`. It pulls the latest uploads from the channel, updates views and durations, and keeps your manual fields. Then check the `cat` of any new videos.
- **Feature a different podcast episode:** move `featured: true` to another video.
- **Add an editor:** add them to `team` in `data.js` (put their photo in `assets/img/team/`), then set `editor: "their-id"` on the videos they edited. Their card shows the count, and the video cards show "Edited by …".
- **Add a review:** add it to `reviews` in `data.js`. Only add real, approved reviews; submissions arrive through the form.
- **New blog post:** copy one of the files in `blog/`, edit it, add an entry to `posts` in `data.js`, and add the URL to `sitemap.xml`.
- **Open/close a role:** edit `roles` in `data.js`.
- **New free resource:** copy a file in `resources/`, edit it, and add it to `resources` in `data.js`. Use `soon: true` to show "Coming soon · Notify me" (signups are collected as a waitlist).
- **Add a Hall of Fame win:** verify the submission, then add it to `wins` in `data.js`. Only add real wins with proof.

## Connecting the forms

Until you set this up, every form opens the visitor's email app with the message pre-filled (sent to `email` in `config.js`). The one exception is resource unlocking: it opens the resource straight away and only collects the email once the `resources` endpoint is set. To collect submissions properly, pick one:

**Option A: Google Sheets (free, recommended).** Follow the steps at the top of `scripts/google-apps-script.gs`. Every form lands in its own tab of one Sheet, and you can get an email per submission. Paste the web-app URL into all seven `forms` entries in `config.js`.

**Option B: Formspree.** Create a form at formspree.io and paste its URL (`https://formspree.io/f/xxxx`) into `config.js`. The free tier has a monthly limit.

Every form includes a hidden honeypot field to stop basic spam bots.

## Deploying to refactorslife.in

**GitHub Pages:**
1. Push this folder to a GitHub repo.
2. Go to Settings → Pages and deploy from the `main` branch, root folder.
3. The `CNAME` file already contains `refactorslife.in`.
4. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`
5. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued.

**Netlify / Vercel / Cloudflare Pages:** import the repo (no build command, publish directory `/`), then add `refactorslife.in` under custom domains and follow their DNS instructions. You can delete `CNAME` on these hosts.

After going live:
- Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://refactorslife.in/sitemap.xml`.
- Put `refactorslife.in` in the YouTube channel links, every video description, and the Instagram/LinkedIn bios.

## Structure

```
├── index.html, videos.html, team.html, careers.html, ask.html, collab.html, 404.html
├── blog/                    index + posts
├── assets/
│   ├── css/style.css        design system (tokens, components, dark/light)
│   ├── js/config.js         links, stats, form endpoints
│   ├── js/data.js           all content
│   ├── js/main.js           header/footer, renderers, video modal, forms
│   └── img/                 photo, favicon, social share image
├── scripts/
│   ├── sync-videos.mjs      refresh videos from YouTube
│   └── google-apps-script.gs  free form backend
├── PLAN.md                  site strategy & growth roadmap
└── CNAME, robots.txt, sitemap.xml, site.webmanifest
```
