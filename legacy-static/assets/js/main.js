/* ==========================================================================
   RefactorsLife — site script
   Renders shared chrome + data-driven sections, and handles forms.
   ========================================================================== */
(function () {
  "use strict";

  const CFG = window.RL_CONFIG;
  const DATA = window.RL_DATA;
  const ROOT = document.body.dataset.root || "";
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  /* ---------- Icons (Lucide-style, 24px grid) ---------- */
  const ICONS = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    play: '<path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" fill="currentColor" stroke="none"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    youtube: '<path fill="currentColor" stroke="none" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>',
    telegram: '<path fill="currentColor" stroke="none" d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  };
  const icon = (name, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  window.RL_ICON = icon;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fmtViews = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M" : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K" : String(n)) + " views";
  const thumb = (id, q = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
  const catLabel = (id) => (DATA.categories.find((c) => c.id === id) || {}).label || "";
  const member = (id) => DATA.team.find((m) => m.id === id);
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  /* ---------- Header / footer ---------- */
  const NAV = [
    { href: "videos.html", label: "Videos", key: "videos" },
    { href: "resources.html", label: "Resources", key: "resources" },
    { href: "blog/index.html", label: "Blog", key: "blog" },
    { href: "hall-of-fame.html", label: "Hall of Fame", key: "fame" },
    { href: "ask.html", label: "Ask Aditya", key: "ask" },
    { href: "team.html", label: "Team", key: "team" },
    { href: "careers.html", label: "Careers", key: "careers" },
  ];

  function renderHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const page = document.body.dataset.page;
    const links = NAV.map((n) => `<a href="${ROOT}${n.href}"${n.key === page ? ' aria-current="page"' : ""}>${n.label}</a>`).join("");
    mount.outerHTML = `
      <div class="bg-orbs" aria-hidden="true"><span></span><span></span><span></span></div>
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header" id="top">
        <div class="container"><div class="nav-shell">
          <a class="logo" href="${ROOT}index.html" aria-label="RefactorsLife home">
            <span class="logo-mark">R/</span><span><b>Refactors</b><span>Life</span></span>
          </a>
          <nav class="nav" aria-label="Main">${links}</nav>
          <div class="header-actions">
            <a class="btn btn-yt btn-sm" href="${CFG.channel.subscribe}" target="_blank" rel="noopener">${icon("youtube")}Subscribe</a>
            <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">${icon("menu")}</button>
          </div>
        </div></div>
      </header>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <a href="${ROOT}index.html">Home</a>${links}
        <a class="btn btn-yt" href="${CFG.channel.subscribe}" target="_blank" rel="noopener">${icon("youtube")}Subscribe on YouTube</a>
      </nav>`;

    const header = $(".site-header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const btn = $(".menu-toggle");
    const panel = $("#mobile-nav");
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.innerHTML = icon(open ? "x" : "menu");
    });
  }

  function renderFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    const s = CFG.socials;
    mount.outerHTML = `
      <footer class="site-footer">
        <div class="container"><div class="footer-inner">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="logo" href="${ROOT}index.html"><span class="logo-mark">R/</span><span><b>Refactors</b><span>Life</span></span></a>
              <p>${esc(CFG.tagline)}. Podcasts, tutorials and honest career talk for engineering students — one commit at a time.</p>
              <div class="footer-social">
                <a href="${s.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube")}</a>
                <a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="${s.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
                <a href="${s.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
                <a href="${s.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${icon("telegram")}</a>
              </div>
            </div>
            <div class="footer-col"><h4>Watch & read</h4><ul>
              <li><a href="${ROOT}videos.html">All videos</a></li>
              <li><a href="${ROOT}videos.html?cat=podcast">Podcast</a></li>
              <li><a href="${ROOT}blog/index.html">Blog</a></li>
              <li><a href="${ROOT}resources.html">Free resources</a></li>
              <li><a href="${CFG.channel.url}" target="_blank" rel="noopener">YouTube channel</a></li>
            </ul></div>
            <div class="footer-col"><h4>Community</h4><ul>
              <li><a href="${ROOT}ask.html">Ask a question</a></li>
              <li><a href="${ROOT}ask.html#reviews">Reviews & feedback</a></li>
              <li><a href="${ROOT}hall-of-fame.html">Hall of Fame</a></li>
              <li><a href="${s.telegramGroup}" target="_blank" rel="noopener">Telegram group</a></li>
              <li><a href="${ROOT}index.html#newsletter">Newsletter</a></li>
            </ul></div>
            <div class="footer-col"><h4>Work with us</h4><ul>
              <li><a href="${ROOT}careers.html">Internships</a></li>
              <li><a href="${ROOT}team.html">Team</a></li>
              <li><a href="${ROOT}collab.html">Brands & colleges</a></li>
              <li><a href="mailto:${CFG.email}">${esc(CFG.email)}</a></li>
            </ul></div>
          </div>
          <div class="wordmark" aria-hidden="true">RefactorsLife</div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} RefactorsLife. Refactor your life.</span>
            <span class="mono">git commit -m "keep going"</span>
          </div>
        </div></div>
      </footer>
      <div class="modal" id="video-modal" role="dialog" aria-modal="true" aria-label="Video player">
        <div class="modal-inner">
          <div class="modal-bar"><h3 id="video-modal-title"></h3><button class="icon-btn" type="button" data-close aria-label="Close video">${icon("x")}</button></div>
          <div class="modal-frame"></div>
        </div>
      </div>
      <div class="modal modal-light" id="resource-modal" role="dialog" aria-modal="true" aria-labelledby="res-title">
        <div class="form-card res-card">
          <button class="icon-btn res-close" type="button" data-res-close aria-label="Close">${icon("x")}</button>
          <div class="res-step res-form-step">
            <div class="icon-tile" data-res-icon></div>
            <h3 id="res-title"></h3>
            <p class="muted" data-res-text></p>
            <form class="form" data-res-form>
              <div class="field"><label for="res-email">Email</label><input id="res-email" type="email" name="email" required autocomplete="email" placeholder="you@college.edu"></div>
              <div class="field"><label for="res-name">Name <span class="opt">(optional)</span></label><input id="res-name" type="text" name="name" autocomplete="name"></div>
              <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="display:none">
              <button class="btn btn-accent" type="submit" style="justify-self:stretch;justify-content:center"></button>
              <p class="form-note">You'll also get The Refactor newsletter. Unsubscribe anytime.</p>
            </form>
          </div>
          <div class="res-step res-done-step" role="status">
            <div class="form-success" style="display:grid;padding:12px 0 0">
              <div class="ok">${icon("check")}</div>
              <h3 data-res-done-title></h3>
              <p data-res-done-text></p>
              <a class="btn btn-accent" data-res-open href="#" target="_blank" rel="noopener">Open resource ${icon("arrowUpRight")}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------- Video modal ---------- */
  let lastFocus;
  function openVideo(id, title) {
    const modal = $("#video-modal");
    if (!modal) return window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
    lastFocus = document.activeElement;
    $(".modal-frame", modal).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    $("#video-modal-title").textContent = title || "";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    $("[data-close]", modal).focus();
  }
  function closeVideo() {
    const modal = $("#video-modal");
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    $(".modal-frame", modal).innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function bindVideoModal() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-video]");
      if (trigger) {
        e.preventDefault();
        openVideo(trigger.dataset.video, trigger.dataset.title);
        return;
      }
      if (e.target.closest("[data-close]") || e.target.id === "video-modal") closeVideo();
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeVideo());
  }

  /* ---------- Renderers ---------- */
  function videoCard(v) {
    const ed = v.editor && member(v.editor);
    return `
      <button class="video-card reveal" type="button" data-video="${v.id}" data-title="${esc(v.title)}">
        <div class="video-thumb">
          <img src="${thumb(v.id)}" alt="" loading="lazy" width="480" height="360">
          ${v.cat ? `<span class="cat">${esc(catLabel(v.cat))}</span>` : ""}
          ${v.duration ? `<span class="duration">${v.duration}</span>` : ""}
          <div class="play"><span>${icon("play")}</span></div>
        </div>
        <div>
          <h3>${esc(v.title)}</h3>
        </div>
        <div class="meta"><span>${fmtViews(v.views)}</span>${ed && !ed.placeholder ? `<span>·</span><span class="credit">Edited by ${esc(ed.name)}</span>` : ""}</div>
      </button>`;
  }

  const renderers = {
    stats(el) {
      el.innerHTML = CFG.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
    },

    "latest-videos"(el) {
      const n = Number(el.dataset.limit || 6);
      el.innerHTML = DATA.videos.filter((v) => !v.featured).slice(0, n).map(videoCard).join("");
    },

    featured(el) {
      const v = DATA.videos.find((x) => x.featured) || DATA.videos[0];
      el.innerHTML = `
        <button class="feature-media" type="button" data-video="${v.id}" data-title="${esc(v.title)}" aria-label="Play: ${esc(v.title)}">
          <img src="${thumb(v.id, "maxresdefault")}" onerror="this.src='${thumb(v.id)}'" alt="" loading="lazy">
          <div class="play"><span>${icon("play")}</span></div>
        </button>
        <div class="feature-body">
          <span class="eyebrow warm">Refactoring Life with Aditya · Podcast</span>
          <h3>${esc(v.title)}</h3>
          <p>Long-form, honest conversations with students and engineers who've been there — hackathons, placements, burnout, side projects and everything between.</p>
          <div class="waveform" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="animation-delay:${(i % 7) * -0.18}s"></i>`).join("")}</div>
          <div class="actions">
            <button class="btn btn-primary" type="button" data-video="${v.id}" data-title="${esc(v.title)}">${icon("play")}Play episode${v.duration ? ` · ${v.duration}` : ""}</button>
            <a class="btn btn-ghost" href="${ROOT}collab.html#guest">Be a guest</a>
          </div>
        </div>`;
    },

    "all-videos"(el) {
      const chips = $("[data-chips]");
      const search = $("[data-search]");
      const count = $("[data-count]");
      const params = new URLSearchParams(location.search);
      let cat = params.get("cat") || "all";
      let q = "";

      const counts = DATA.videos.reduce((a, v) => ((a[v.cat] = (a[v.cat] || 0) + 1), a), {});
      chips.innerHTML = [{ id: "all", label: "All" }, ...DATA.categories]
        .map((c) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${c.id === cat}">${c.label}<span class="count">${c.id === "all" ? DATA.videos.length : counts[c.id] || 0}</span></button>`)
        .join("");

      const draw = () => {
        const list = DATA.videos.filter((v) => (cat === "all" || v.cat === cat) && (!q || v.title.toLowerCase().includes(q)));
        el.innerHTML = list.length
          ? list.map(videoCard).join("")
          : `<div class="empty" style="grid-column:1/-1"><b>No videos match “${esc(q)}”</b><span>Try another word — or <a class="accent" href="${ROOT}ask.html">request this topic</a>.</span></div>`;
        if (count) count.textContent = `${list.length} video${list.length === 1 ? "" : "s"}`;
        observeReveals(el);
      };

      chips.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cat]");
        if (!b) return;
        cat = b.dataset.cat;
        $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
        const url = new URL(location.href);
        cat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", cat);
        history.replaceState(null, "", url);
        draw();
      });
      search.addEventListener("input", () => {
        q = search.value.trim().toLowerCase();
        draw();
      });
      draw();
    },

    team(el) {
      el.innerHTML = DATA.team
        .filter((m) => m.id !== "aditya" || el.dataset.includeFounder !== undefined)
        .map((m) => {
          if (m.placeholder) {
            return `
            <a class="person reveal" href="${ROOT}careers.html">
              <div class="person-photo placeholder"><span>open seat</span></div>
              <div><h3>This could be you</h3><div class="role">${esc(m.role)} · <span class="accent">Apply →</span></div></div>
            </a>`;
          }
          const links = Object.entries(m.links || {})
            .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${esc(m.name)} on ${k}">${icon(ICONS[k] ? k : "globe")}</a>`)
            .join("");
          const edited = DATA.videos.filter((v) => v.editor === m.id).length;
          const photo = m.photo
            ? `<img src="${ROOT}${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
            : `<span class="initials">${esc(m.name.split(" ").map((w) => w[0]).join("").slice(0, 2))}</span>`;
          return `
            <div class="person reveal">
              <div class="person-photo"${m.photo ? "" : ' style="display:grid;place-items:center"'}>${photo}</div>
              <div>
                <h3>${esc(m.name)}</h3>
                <div class="role">${esc(m.role)}${edited ? ` · ${edited} video${edited > 1 ? "s" : ""} edited` : ""}</div>
                ${m.bio ? `<p class="muted" style="margin-top:8px;font-size:14.5px">${esc(m.bio)}</p>` : ""}
                ${links ? `<div class="socials">${links}</div>` : ""}
              </div>
            </div>`;
        })
        .join("");
    },

    roles(el) {
      el.innerHTML = DATA.roles
        .map(
          (r, i) => `
          <details class="role-item reveal" id="${r.id}"${i === 0 ? " open" : ""}>
            <summary>
              <div class="icon-tile ${r.tone}">${icon(r.icon)}</div>
              <div>
                <h3>${esc(r.title)}</h3>
                <div class="sub"><span class="tag-chip">${esc(r.type)}</span></div>
              </div>
              <span class="chev">${icon("chevron")}</span>
            </summary>
            <div class="role-body">
              <p>${esc(r.summary)}</p>
              <div class="cols">
                <div><h4>// what you'll do</h4><ul>${r.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
                <div><h4>// what you need</h4><ul>${r.need.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
              </div>
              <a class="btn btn-accent btn-sm" href="#apply" data-pick-role="${r.id}" style="width:fit-content">Apply for this role ${icon("arrowRight")}</a>
            </div>
          </details>`
        )
        .join("");
      el.addEventListener("click", (e) => {
        const a = e.target.closest("[data-pick-role]");
        if (!a) return;
        const sel = $("#apply-role");
        if (sel) sel.value = a.dataset.pickRole;
      });
    },

    "role-options"(el) {
      el.innerHTML += DATA.roles.map((r) => `<option value="${r.id}">${esc(r.title)}</option>`).join("");
      const hash = location.hash.slice(1);
      if (DATA.roles.some((r) => r.id === hash)) el.value = hash;
    },

    perks(el) {
      el.innerHTML = DATA.perks
        .map((p) => `<div class="card reveal"><div class="icon-tile">${icon(p.icon)}</div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`)
        .join("");
    },

    posts(el) {
      const n = Number(el.dataset.limit || 99);
      el.innerHTML = DATA.posts
        .slice(0, n)
        .map(
          (p) => `
          <a class="card post-card reveal" href="${ROOT}blog/${p.slug}.html">
            <div class="cover"><img src="${thumb(p.video, "maxresdefault")}" onerror="this.src='${thumb(p.video)}'" alt="" loading="lazy"></div>
            <div class="body">
              <div class="post-meta"><span>${esc(p.tag)}</span><span class="sep"></span><span>${esc(p.read)}</span></div>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.excerpt)}</p>
            </div>
          </a>`
        )
        .join("");
    },

    reviews(el) {
      if (!DATA.reviews.length) {
        el.outerHTML = `
          <div class="empty reveal">
            ${icon("heart", "accent").replace("<svg", '<svg width="28" height="28"')}
            <b>The wall is waiting for its first review</b>
            <span>Watched a video that helped? Leave a review below — approved reviews show up here.</span>
          </div>`;
        return;
      }
      const stars = (n) => Array.from({ length: 5 }, (_, i) => `<span style="opacity:${i < n ? 1 : 0.25}">${icon("star")}</span>`).join("");
      el.innerHTML = DATA.reviews
        .map(
          (r) => `
          <figure class="card review reveal">
            <div class="rating" aria-label="${r.rating} out of 5">${stars(r.rating)}</div>
            <blockquote>“${esc(r.text)}”</blockquote>
            <figcaption class="who"><span class="av">${esc(r.name[0])}</span><span>${esc(r.name)}<small>${esc(r.meta || "")}</small></span></figcaption>
          </figure>`
        )
        .join("");
    },

    answered(el) {
      el.innerHTML = DATA.answered
        .map((a) => {
          const v = DATA.videos.find((x) => x.id === a.video);
          return `
          <details>
            <summary>${esc(a.q)}<span class="plus"></span></summary>
            <div class="answer">
              <span class="tag-chip">${esc(a.tag)}</span>
              <p>${esc(a.a)}</p>
              <button class="link-arrow" type="button" style="background:none;border:0;padding:0;width:fit-content" data-video="${a.video}" data-title="${esc(v ? v.title : a.q)}">${icon("play")} Watch the answer</button>
            </div>
          </details>`;
        })
        .join("");
    },

    "post-date"(el) {
      el.textContent = fmtDate(el.dataset.date);
    },

    resources(el) {
      const n = Number(el.dataset.limit || 99);
      const list = DATA.resources.filter((r) => !el.dataset.limit || !r.soon).slice(0, n);
      el.innerHTML = list
        .map(
          (r) => `
          <div class="card resource reveal">
            <div class="resource-top"><div class="icon-tile ${r.tone || ""}">${icon(r.icon)}</div><span class="tag-chip">${esc(r.kind)}</span></div>
            <h3>${esc(r.title)}</h3>
            <p>${esc(r.text)}</p>
            <div class="resource-actions">
              ${r.soon
                ? `<button class="btn btn-ghost btn-sm" type="button" data-resource="${r.id}">Coming soon · Notify me</button>`
                : `<button class="btn btn-accent btn-sm" type="button" data-resource="${r.id}">${unlocked() ? "Open" : "Get it free"} ${icon("arrowRight")}</button>`}
              ${r.video ? `<button class="link-arrow" type="button" style="background:none;border:0;padding:0" data-video="${r.video}" data-title="${esc(r.title)}">${icon("play")} Video</button>` : ""}
            </div>
          </div>`
        )
        .join("");
    },

    wins(el) {
      const n = Number(el.dataset.limit || 99);
      const chips = el.dataset.filter !== undefined ? $("[data-win-chips]") : null;
      let type = "all";
      const typeLabel = (id) => (DATA.winTypes.find((t) => t.id === id) || {}).label || "Win";
      const card = (w) => {
        const avatar = w.photo
          ? `<img class="av" src="${ROOT}${esc(w.photo)}" alt="" loading="lazy">`
          : `<span class="av">${esc(w.name.split(" ").map((x) => x[0]).join("").slice(0, 2))}</span>`;
        return `
          <article class="card win reveal">
            <div class="win-head"><span class="tag-chip">${esc(typeLabel(w.type))}</span><span class="win-badge">${icon("trophy")}</span></div>
            <h3>${esc(w.title)}</h3>
            <p>${esc(w.story)}</p>
            ${w.video ? `<button class="link-arrow" type="button" style="background:none;border:0;padding:0;width:fit-content" data-video="${w.video}" data-title="${esc(w.title)}">${icon("play")} The video behind it</button>` : ""}
            <div class="win-who">${avatar}<div><b>${esc(w.name)}</b><small>${esc(w.meta || "")}</small></div>
              ${w.link ? `<a class="win-link" href="${esc(w.link)}" target="_blank" rel="noopener" aria-label="${esc(w.name)}'s profile">${icon("linkedin")}</a>` : ""}
            </div>
          </article>`;
      };
      const draw = () => {
        const list = DATA.wins.filter((w) => type === "all" || w.type === type).slice(0, n);
        // On the full page, keep an inviting "your win here" card in the grid.
        const invite = chips
          ? `<a class="empty win-invite reveal" href="#share">${icon("trophy")}<b>Your win could be here</b><span>Internship, placement, hackathon or first PR — share it and get featured.</span></a>`
          : "";
        el.innerHTML = list.length
          ? list.map(card).join("") + invite
          : `<div class="empty" style="grid-column:1/-1"><b>No ${esc(typeLabel(type).toLowerCase())} wins yet</b><span>Be the first — <a class="accent" href="#share">share yours</a>.</span></div>`;
        observeReveals(el);
      };
      if (chips) {
        chips.innerHTML = [{ id: "all", label: "All wins" }, ...DATA.winTypes]
          .map((t) => `<button class="chip" type="button" data-type="${t.id}" aria-pressed="${t.id === "all"}">${t.label}</button>`)
          .join("");
        chips.addEventListener("click", (e) => {
          const b = e.target.closest("[data-type]");
          if (!b) return;
          type = b.dataset.type;
          $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
          draw();
        });
      }
      draw();
    },

    "win-count"(el) {
      el.textContent = DATA.wins.length;
    },
  };

  /* ---------- Resources (email unlock) ---------- */
  // One signup unlocks every resource. Only a flag is stored — never the email.
  function unlocked() {
    try { return localStorage.getItem("rl-unlocked") === "1"; } catch (e) { return false; }
  }
  function markUnlocked() {
    try { localStorage.setItem("rl-unlocked", "1"); } catch (e) {}
  }

  function bindResources() {
    const modal = $("#resource-modal");
    if (!modal) return;
    const form = $("[data-res-form]", modal);
    let current;

    const close = () => {
      modal.classList.remove("open", "done");
      document.body.style.overflow = "";
    };
    const open = (r) => {
      current = r;
      if (!r.soon && unlocked()) return window.open(ROOT + r.file, "_blank", "noopener");
      $("[data-res-icon]", modal).className = `icon-tile ${r.tone || ""}`;
      $("[data-res-icon]", modal).innerHTML = icon(r.icon);
      $("#res-title").textContent = r.title;
      $("[data-res-text]", modal).textContent = r.soon ? "This one's still being made. Leave your email and we'll send it the day it's ready." : r.text;
      $('[type="submit"]', form).innerHTML = r.soon ? "Notify me" : `Unlock free ${icon("arrowRight")}`;
      modal.classList.remove("done");
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(() => $("#res-email").focus(), 50);
    };

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-resource]");
      if (t) {
        const r = DATA.resources.find((x) => x.id === t.dataset.resource);
        if (r) open(r);
        return;
      }
      if (e.target.closest("[data-res-close]") || e.target === modal) close();
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = formToObject(form);
      if (data._gotcha) return;
      delete data._gotcha;
      Object.assign(data, { form: "resources", resource: current.id, waitlist: current.soon ? "yes" : "no", page: location.pathname, submittedAt: new Date().toISOString() });

      const btn = $('[type="submit"]', form);
      btn.disabled = true;
      try {
        // Unlocking never waits on email: if no endpoint is set, the resource opens straight away.
        if (current.soon || (CFG.forms || {}).resources) await send("resources", data);
        if (!current.soon) markUnlocked();
        $("[data-res-done-title]", modal).textContent = current.soon ? "You're on the list!" : "Unlocked — enjoy!";
        $("[data-res-done-text]", modal).textContent = current.soon ? "We'll email you as soon as it's ready." : "Every other free resource is unlocked for you too.";
        const link = $("[data-res-open]", modal);
        link.style.display = current.soon ? "none" : "";
        link.href = current.soon ? "#" : ROOT + current.file;
        modal.classList.add("done");
        form.reset();
        $$('[data-render="resources"]').forEach((el) => (renderers.resources(el), observeReveals(el)));
      } catch (err) {
        console.error(err);
        toast("Couldn't send that. Please try again.");
      } finally {
        btn.disabled = false;
      }
    });
  }

  function renderAll() {
    $$("[data-render]").forEach((el) => {
      const fn = renderers[el.dataset.render];
      if (fn) fn(el);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function observeReveals(scope = document) {
    const els = $$(".reveal:not(.in)", scope);
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))), { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Forms ---------- */
  const SUBJECTS = { ask: "Question", review: "Review", apply: "Internship application", collab: "Collaboration enquiry", newsletter: "Newsletter signup", resources: "Resource waitlist", win: "Hall of Fame submission" };

  function formToObject(form) {
    const out = {};
    new FormData(form).forEach((val, key) => {
      if (key in out) out[key] = [].concat(out[key], val);
      else out[key] = val;
    });
    return out;
  }

  async function send(type, data) {
    const endpoint = (CFG.forms || {})[type];
    if (!endpoint) {
      // No backend configured yet: hand the message to the visitor's email app.
      const body = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
      location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(`[RefactorsLife] ${SUBJECTS[type] || type}`)}&body=${encodeURIComponent(body)}`;
      return "mailto";
    }
    if (endpoint.includes("script.google.com")) {
      await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
      return "ok";
    }
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error("Request failed: " + res.status);
    return "ok";
  }

  function bindForms() {
    $$("form[data-form]").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const type = form.dataset.form;
        const data = formToObject(form);
        if (data._gotcha) return; // honeypot: bots fill hidden fields
        delete data._gotcha;
        data.form = type;
        data.page = location.pathname;
        data.submittedAt = new Date().toISOString();

        const btn = $('[type="submit"]', form);
        const label = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = "Sending…";
        try {
          const result = await send(type, data);
          const wrap = form.closest(".form-wrap");
          if (wrap) {
            if (result === "mailto") {
              const note = $(".form-success p", wrap);
              if (note) note.textContent = "Your email app should have opened with everything filled in — just hit send.";
            }
            wrap.classList.add("done");
          } else {
            toast(result === "mailto" ? "Opening your email app…" : "You're in! Check your inbox.");
          }
          form.reset();
        } catch (err) {
          console.error(err);
          toast("Couldn't send that. Please try again, or email " + CFG.email);
        } finally {
          btn.disabled = false;
          btn.innerHTML = label;
        }
      });
    });

    $$("[data-reset-form]").forEach((b) => b.addEventListener("click", () => b.closest(".form-wrap").classList.remove("done")));

    // Character counter for textareas with maxlength
    $$("textarea[maxlength]").forEach((ta) => {
      const hint = ta.parentElement.querySelector("[data-counter]");
      if (!hint) return;
      const upd = () => (hint.textContent = `${ta.value.length} / ${ta.maxLength}`);
      ta.addEventListener("input", upd);
      upd();
    });
  }

  /* ---------- Inline icons in static HTML: <i data-icon="name"></i> ---------- */
  function hydrateIcons() {
    $$("[data-icon]").forEach((el) => {
      const style = el.getAttribute("style");
      el.outerHTML = icon(el.dataset.icon, el.className).replace("<svg", style ? `<svg style="${style}"` : "<svg");
    });
  }

  /* ---------- Links from config: <a data-link="socials.telegram"> ---------- */
  function hydrateLinks() {
    $$("[data-link]").forEach((a) => {
      const val = a.dataset.link.split(".").reduce((o, k) => (o || {})[k], CFG);
      if (val) a.href = /^[^/:]+@/.test(val) ? `mailto:${val}` : val;
    });
  }

  /* ---------- Init ---------- */
  renderHeader();
  renderFooter();
  hydrateIcons();
  hydrateLinks();
  renderAll();
  bindVideoModal();
  bindResources();
  bindForms();
  observeReveals();
})();
