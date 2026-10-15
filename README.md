# RefactorsLife.in

The website for the [RefactorsLife](https://www.youtube.com/@RefactorsLife) YouTube channel: *Where Engineering Meets Life.*

**Stack:** Next.js 16 (App Router, Cache Components, View Transitions) · React 19 · TypeScript · Tailwind CSS 4 · Keystatic CMS · MDX + Shiki · Motion · Zod · Lucide icons. Deploys to Vercel.

## Quick start

```bash
npm install
npm run dev          # site: http://localhost:3000 · editor: http://localhost:3000/keystatic
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run format` | Prettier (also sorts Tailwind classes) |
| `npm run sync:videos` | Pull the latest uploads from YouTube into `src/content/videos.json` |

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, channel card, live stats, topics, podcast, latest videos, resources, Hall of Fame, team, blog, newsletter |
| `/videos` | Library with topic filters (shareable `?cat=` links), search and an in-page player |
| `/learn`, `/learn/[slug]` | Learning paths: ordered videos with notes, outcomes and progress tracking (saved per device) |
| `/resources`, `/resources/[slug]` | Free printable cheat sheets; one email unlocks all |
| `/blog`, `/blog/[slug]` | MDX guides for popular videos |
| `/hall-of-fame` | Verified student wins + "Share your win" form |
| `/ask` | Ask Aditya, already-answered FAQ, reviews & feedback |
| `/team`, `/careers`, `/collab` | Team & editor credits, internships + application, brand/college/guest enquiries |

Also: press **⌘K / Ctrl+K** anywhere to search videos, paths, posts, resources and pages. Blog posts have highlighted code with copy buttons, a reading progress bar and an "On this page" sidebar; pages fade between each other on navigation.

## Updating content: the editor at /keystatic

Run `npm run dev` and open **http://localhost:3000/keystatic**. No code needed:

| Section | What you edit |
|---|---|
| **Videos** | Category, "featured podcast" flag, and **Edited by** (credits an editor on the video card and team page) |
| **Learning paths** | Create a path: pick videos in order, add a note per step, outcomes and a companion resource |
| **Blog posts** | Write posts with a rich editor. Insert *YouTube video*, *Callout* and *Video link* blocks from the toolbar |
| **Free resources** | Card text plus the printable page (checklists or command tables). Tick *Coming soon* for a waitlist |
| **Already-answered questions** | FAQ entries that link to the video answering them |
| **Hall of Fame / Reviews** | Add only verified wins and real reviews (submissions arrive via the forms) |
| **Team / Internship roles** | People, photos and links; roles, and the "open seat" card each shows on the team page |

Saving writes to `src/content/` and the site updates on the next refresh. Commit and push to publish. Things that rarely change (social links, fallback stats, navigation, topics strip, perks) are in `src/content/site.ts`.

**Editing on the live site:** connect Keystatic to GitHub (see the Keystatic block in `.env.example`). Each save then becomes a commit and Vercel redeploys automatically, so interns can update the site from a browser.

If you edit files in `src/content/` by hand or run `npm run sync:videos` while the dev server is running, restart `npm run dev` to see the change.

## Environment variables

Copy `.env.example` to `.env.local` (and add the same in Vercel → Settings → Environment Variables):

- `FORMS_ENDPOINT`: where every form submission goes. Recommended: the free Google Sheets backend in `scripts/google-apps-script.gs` (each form gets its own tab, optional email alerts). Formspree also works. Submissions go through a Server Action, so the endpoint is never exposed to the browser. In development without it, submissions are printed to the terminal; in production without it, forms show a "not connected yet" message with your email.
- `YOUTUBE_API_KEY` (optional): the site then pulls new uploads, view counts and subscriber numbers from YouTube automatically, refreshed hourly. Get a free key in Google Cloud Console → enable *YouTube Data API v3* → Credentials → API key. Without it, run `npm run sync:videos` after uploading.

## Deploy to refactorslife.in (Vercel)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo (framework auto-detected, no settings to change).
3. Add the environment variables above.
4. **Settings → Domains** → add `refactorslife.in` and `www.refactorslife.in`, then set the DNS records Vercel shows you at your domain registrar.
5. In [Google Search Console](https://search.google.com/search-console), add the domain and submit `https://refactorslife.in/sitemap.xml`.

Every push to `main` redeploys automatically; pull requests get preview URLs.

## Project structure

```
src/
├── app/
│   ├── (site)/             all public pages, with header/footer layout and page-transition template
│   ├── keystatic/, api/    the content editor and its save API
│   └── …                   root layout, sitemap, robots, manifest, icons, share images, 404
├── components/
│   ├── ui/                 Button, Card, Eyebrow, Section, PageHero, Dialog, Reveal, icons…
│   ├── layout/             header, footer, background, ⌘K command menu, providers
│   ├── home/               hero, channel card, stats, pillars, topics marquee
│   ├── video/              video card, library, featured episode, player modal
│   ├── forms/              form fields, form shell, all site forms
│   ├── resources/          resource grid + unlock, printable doc
│   ├── community/          Hall of Fame, team, roles, steps, FAQ, reviews
│   ├── learn/              path card, step list with progress
│   └── blog/               post card, code block, table of contents, reading progress
├── content/                ← content files managed by Keystatic (+ site.ts settings)
├── lib/                    content reader, YouTube API, forms + Server Action, progress store, share images
├── assets/fonts/           Geist fonts for share images
└── mdx-components.tsx      styles/components available inside MDX
public/images, public/brand logos (logo.svg, logo-white.svg, logo-mark.svg)
scripts/                    sync-videos.mjs, google-apps-script.gs
legacy-static/              the previous plain-HTML version, kept for reference (safe to delete)
```

See [PLAN.md](PLAN.md) for the growth strategy and roadmap.
