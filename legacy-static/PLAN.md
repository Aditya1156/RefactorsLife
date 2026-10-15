# RefactorsLife.in — Plan

## Why a website, when we already have YouTube?

YouTube owns the audience. If the algorithm changes, reach drops overnight. The website is the one place we own, and it does four things YouTube can't:

1. **Owns the relationship.** Newsletter emails and the Telegram group stay ours.
2. **Brings in Google search traffic.** Blog guides rank for searches like "github student pack 2026" and send those readers to the videos.
3. **Runs the team.** Internship hiring, editor credits and a public portfolio for everyone who contributes.
4. **Looks professional to partners.** Brands and colleges check for a real site before they reach out or pay.

## The funnel

```
Google search ──► Blog guide ──► Embedded video ──► Subscribe
YouTube video ──► refactorslife.in link in description ──► Ask / Newsletter / Telegram
Ask page ──► question ──► becomes a video ──► asker shares it ──► new viewers
Interns ──► credited work ──► they share it with their college ──► new viewers
```

Every page ends in one of four actions: **watch, subscribe, ask, join.**

## Features and what each one is for

| Feature | Page | What it grows |
|---|---|---|
| Video library with filters + in-page player | Videos | Watch time, binge sessions |
| Ask Aditya (anonymous option, topics) | Ask | Video ideas from real demand, engagement |
| "Already answered" FAQ → video | Ask | Views on older videos |
| Reviews & feedback wall | Ask | Social proof for new visitors and sponsors |
| Blog guides for top videos | Blog | Google traffic (SEO) |
| Internship roles + application form | Careers | A team that scales output; reach into every intern's college |
| Editor / designer credits | Team, video cards | Motivates the team, attracts applicants |
| Campus Ambassador role | Careers | Reach into colleges |
| Brands, colleges, podcast-guest enquiries | Work with us | Revenue, guests, on-campus talks |
| Newsletter "The Refactor" | Home | Owned audience that doesn't depend on the algorithm |
| Free resources (email unlock) | Resources | The fastest-growing source of newsletter signups; printable sheets get shared in college groups |
| Hall of Fame | Hall of Fame, Home | Social proof from real outcomes; featured students share it, which brings in new viewers |
| Telegram / Instagram / LinkedIn / GitHub links | Home, footer | Cross-platform following |
| SEO: meta tags, Open Graph, schema, sitemap | All | Rich previews when shared on WhatsApp/LinkedIn; indexing |

## Roadmap

**Phase 1: Launch (week 1–2)**
- [ ] Buy `refactorslife.in` and deploy (see README).
- [ ] Connect the forms to Google Sheets (`scripts/google-apps-script.gs`).
- [ ] Set up a `hello@refactorslife.in` mailbox (Zoho Mail free plan, or Cloudflare Email Routing to Gmail).
- [ ] Add the site link to the channel header, all video descriptions, a pinned comment, and Instagram/LinkedIn bios.
- [ ] Submit the sitemap to Google Search Console.
- [ ] Post the internship openings on LinkedIn, Telegram and college groups.

**Phase 2: Team & content engine (month 1–2)**
- [ ] Hire 1 editor, 1 thumbnail designer, 1 writer. Add them to `data.js` with credits.
- [ ] One blog post for every new long-form video (the writer intern owns this).
- [ ] Back-fill blog posts for the top 5 videos by views (Copilot, Gen AI labs, Chef app).
- [ ] Start the newsletter: one email every two weeks.
- [ ] First "Your questions answered" video, built from the Ask inbox.

**Phase 3: Community & partnerships (month 2–4)**
- [ ] Campus ambassadors at 5–10 colleges.
- [ ] Collect and publish the first 10 real reviews.
- [ ] Feature the first 10 verified wins in the Hall of Fame, and post each one on Instagram/LinkedIn.
- [ ] A one-page media kit PDF linked from Work with us, once the numbers grow.
- [ ] Pitch SIH-prep workshops to college tech clubs.
- [ ] Monthly podcast guest, sourced through the guest form.

**Phase 4: Upgrades (when needed)**
- Public questions board with upvotes (Supabase / Firebase).
- Finish the "coming soon" resources (resume template, 4-year roadmap, outreach templates).
- Hindi/English language toggle for blog posts.
- Move to Astro or Next.js once there are 30+ blog posts (the content structure in `data.js` carries over).

## What to measure

Add privacy-friendly analytics (Cloudflare Web Analytics or Google Analytics 4) and check monthly:

- Site visitors → YouTube clicks (Subscribe button and video plays)
- Newsletter signups
- Questions submitted / questions turned into videos
- Internship applications per role
- Organic search clicks (Search Console)
- Collaboration enquiries

## Brand rules

- **Look:** light and minimal. White canvas, frosted-glass cards, soft blue background glow. Blue (`#2563eb`) is the one accent colour, with sky and indigo used only in gradients. Black is kept for small premium details (Subscribe button, video badges, active filters).
- **Type:** Geist for text, Geist Mono for small "code" labels (`// placements`, `01 —`).
- **Voice:** honest, practical, a little playful with dev metaphors ("refactor", "commit"). No hype, no fake numbers, no fake reviews.
