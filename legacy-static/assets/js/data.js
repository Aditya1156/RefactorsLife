/* ==========================================================================
   Site content — videos, team, open roles, blog posts, reviews, FAQs.
   Everything on the site is rendered from this file, so most updates
   are a one-line change here.
   ========================================================================== */

window.RL_DATA = {
  /* Video categories (used for filter chips on /videos.html) */
  categories: [
    { id: "podcast", label: "Podcast" },
    { id: "dev", label: "Dev Setup" },
    { id: "career", label: "Career" },
    { id: "genai", label: "GenAI & Cloud" },
    { id: "life", label: "Engineering Life" },
  ],

  /* Videos — newest first.
     `editor` is the id of a team member below; set it to credit who edited the video.
     `node scripts/sync-videos.mjs` refreshes this list from YouTube and keeps your edits. */
  videos: [
    // <videos>
    { id: "g9lypxza4wM", title: "The REAL Truth About Smart India Hackathon | 2× SIH Winner Speaks", cat: "podcast", views: 284, duration: "47:05", featured: true, editor: null },
    { id: "LTQYFCTHt9c", title: "Content Creator Journey 2026 — Learning, Editing, Researching Every Day", cat: "life", views: 90, duration: "4:23", editor: null },
    { id: "9nb-YxETdqo", title: "Git & GitHub Tutorial for Beginners | Setup + First Project Upload", cat: "dev", views: 160, duration: "9:47", editor: null },
    { id: "FJ_IQN_YFxs", title: "Complete C / C++ Setup for Beginners With VS Code", cat: "dev", views: 149, duration: "13:57", editor: null },
    { id: "iToAICeOxiA", title: "Git & GitHub Explained in Hindi | Beginners Guide 2026", cat: "dev", views: 273, duration: "4:57", editor: null },
    { id: "sV0Fvexp6AU", title: "I Switched to VS Code, and This Happened", cat: "dev", views: 333, duration: "25:43", editor: null },
    { id: "O_P4OJcrgRc", title: "GitHub Copilot in VS Code (FREE) + Developer Coupons Explained", cat: "dev", views: 1700, duration: "4:00", editor: null },
    { id: "VDwZmzesj0U", title: "How to Get GitHub Student Developer Pack in 2026 (Step-by-Step)", cat: "dev", views: 12000, duration: "8:05", popular: true, editor: null },
    { id: "D6phGbqQtYI", title: "How to Get 50+ LPA in Recession & AI Era | Zomato SE Strategy (Full Breakdown)", cat: "career", views: 133, duration: "8:06", editor: null },
    { id: "fZ9Jx0HpRnM", title: "The ChatGPT Crash: Why AI Will Change Society Forever", cat: "genai", views: 64, duration: "1:50", editor: null },
    { id: "5xYKkgmTu8E", title: "Rejected From 10 LPA Jobs! This Is the Reason", cat: "career", views: 156, duration: "3:32", editor: null },
    { id: "G81YQcQXCHo", title: "How to Claim ChatGPT For Free — Step-by-Step", cat: "genai", views: 407, duration: "3:23", editor: null },
    { id: "QVIUd4uE_cU", title: "LAB-2 GSP1210 — Multimodality with Gemini", cat: "genai", views: 266, duration: "6:38", editor: null },
    { id: "VSs9_z2EE_8", title: "LAB-1 GSP1209 — Explore Generative AI with the Gemini API in Vertex AI", cat: "genai", views: 504, duration: "7:13", editor: null },
    { id: "lmgo_hP_IZ0", title: "How to Plan Your Day — Restart", cat: "life", views: 115, duration: "10:06", editor: null },
    { id: "PX3kgpHe3og", title: "My Comeback Plan for Engineering", cat: "life", views: 134, duration: "14:54", editor: null },
    { id: "fqC0hee-QTM", title: "Google Gen AI Exchange Program — 'File Is Not Visible' Doubt Solving", cat: "genai", views: 241, duration: "2:11", editor: null },
    { id: "AehcnFXIyiM", title: "LAB-4 — Inspect Rich Documents with Gemini Multimodality & RAG (GSP520)", cat: "genai", views: 759, duration: "10:12", editor: null },
    { id: "U0GBfC5aPfE", title: "LAB-3 — Multimodal RAG using Gemini API in Vertex AI (GSP1231)", cat: "genai", views: 254, duration: "8:52", editor: null },
    { id: "3wcPuC6kVlY", title: "Build a Multi-Modal GenAI Application: Challenge Lab", cat: "genai", views: 1200, duration: "4:23", editor: null },
    { id: "fUd0bELI5Vc", title: "Gen AI Exchange Program 2025 — New Changes Explained", cat: "genai", views: 280, duration: "2:03", editor: null },
    { id: "a2m9KzbvEaw", title: "GSP1230 Lab-2 — Using Gemini for Multimodal Retail Recommendations", cat: "genai", views: 235, duration: "5:31", editor: null },
    { id: "txiFQQsUhvo", title: "Doubt & Discussion Session on Google Gen AI Exchange Program", cat: "genai", views: 234, duration: "50:29", editor: null },
    { id: "_RQB5ND2F8Q", title: "LAB-1 GSP1210 — Multimodality with Gemini", cat: "genai", views: 358, duration: "8:27", editor: null },
    { id: "5JzDKkDPf38", title: "Build AI-Powered Chef App with Gemini & Streamlit (GSP517)", cat: "genai", views: 1100, duration: "8:40", editor: null },
    { id: "zmEcqSP3elQ", title: "Streamlit + Cloud Run + Gemini API in Vertex AI — LAB-4 GSP1229", cat: "genai", views: 425, duration: "7:30", editor: null },
    { id: "UB2fD4hRznY", title: "GSP1209 LAB-3 — Develop GenAI Apps with Gemini and Streamlit", cat: "genai", views: 264, duration: "3:35", editor: null },
    { id: "RtQXE_tM9rY", title: "Top the Google Leaderboard — Get $100 Free Credit & 800 Points", cat: "genai", views: 501, duration: "4:02", editor: null },
    { id: "wpIfbgCyhng", title: "LAB-2 GSP1227 — Introduction to Function Calling with Gemini", cat: "genai", views: 247, duration: "3:51", editor: null },
    { id: "_H0NBELIXSg", title: "Lab-1 GSP1228 — Google Gen AI Exchange Program Course 3", cat: "genai", views: 367, duration: "8:17", editor: null },
    // </videos>
  ],

  /* Team. Set `placeholder: true` for open seats — they render as "this could be you" cards. */
  team: [
    {
      id: "aditya",
      name: "Aditya Kumar",
      role: "Founder & Host",
      photo: "assets/img/aditya.jpg",
      bio: "2× Smart India Hackathon winner. Makes videos about code, college and careers — and hosts the Refactoring Life podcast.",
      links: {
        linkedin: "https://www.linkedin.com/in/aditya-kumar-165911339",
        github: "https://github.com/Aditya1156",
        instagram: "https://www.instagram.com/refactorslife",
      },
    },
    // Example editor entry — copy, fill in, and remove `placeholder`:
    // { id: "rahul", name: "Rahul Sharma", role: "Video Editor", photo: "assets/img/team/rahul.jpg", bio: "Cuts the podcast and long-form tutorials.", links: { instagram: "…", portfolio: "…" } },
    { id: "seat-editor", placeholder: true, role: "Video Editor" },
    { id: "seat-design", placeholder: true, role: "Thumbnail Designer" },
    { id: "seat-shorts", placeholder: true, role: "Shorts & Social" },
  ],

  /* Open roles on /careers.html */
  roles: [
    {
      id: "video-editor",
      title: "Video Editing Intern",
      icon: "scissors",
      tone: "",
      type: "Remote · 8–10 hrs/week · 2–3 months",
      summary: "Cut long-form tutorials and the podcast into tight, watchable videos.",
      tasks: ["Edit 1–2 long-form videos a month from raw footage", "Add captions, b-roll, zooms and sound design", "Cut 3–5 Shorts from every long video"],
      need: ["Premiere Pro, DaVinci Resolve, CapCut or Final Cut", "A portfolio or 2–3 sample edits", "Eye for pacing and retention"],
    },
    {
      id: "thumbnail-designer",
      title: "Thumbnail & Graphic Design Intern",
      icon: "image",
      tone: "warm",
      type: "Remote · 5–6 hrs/week · 2–3 months",
      summary: "Design the thumbnails and banners that decide whether a video gets clicked.",
      tasks: ["Design 2–3 thumbnail variants per video for A/B testing", "Create Instagram / LinkedIn post graphics", "Maintain the RefactorsLife brand kit"],
      need: ["Photoshop, Figma or Canva Pro", "A few sample thumbnails", "Understanding of contrast, faces and big text"],
    },
    {
      id: "research-writer",
      title: "Content Research & Script Intern",
      icon: "pen",
      tone: "violet",
      type: "Remote · 6–8 hrs/week · 2–3 months",
      summary: "Research topics, write hooks and outlines, and turn videos into blog posts.",
      tasks: ["Research trending topics for engineering students", "Write video outlines, hooks and descriptions", "Turn videos into SEO-friendly blog posts for this site"],
      need: ["Clear writing in English (Hindi is a plus)", "Curiosity about tech and careers", "A writing sample or blog link"],
    },
    {
      id: "social-shorts",
      title: "Shorts & Social Media Intern",
      icon: "smartphone",
      tone: "green",
      type: "Remote · 5–6 hrs/week · 2–3 months",
      summary: "Grow RefactorsLife on Instagram, YouTube Shorts and LinkedIn.",
      tasks: ["Plan and post a weekly content calendar", "Reply to comments and run polls in the community", "Track what's working and report weekly"],
      need: ["You live on Instagram / Shorts already", "Basic editing in CapCut or similar", "Consistency"],
    },
    {
      id: "web-dev",
      title: "Web Development Intern",
      icon: "code",
      tone: "",
      type: "Remote · 4–6 hrs/week · 2–3 months",
      summary: "Maintain and extend this website — blog, forms, and new features.",
      tasks: ["Publish blog posts and keep video data fresh", "Build features like the questions board and newsletter", "Keep the site fast, accessible and SEO-friendly"],
      need: ["HTML, CSS, JavaScript", "Git & GitHub (we have a video for that)", "A GitHub profile with a project or two"],
    },
    {
      id: "campus-ambassador",
      title: "Campus Ambassador",
      icon: "megaphone",
      tone: "warm",
      type: "Remote / your college · flexible",
      summary: "Bring RefactorsLife to your college — events, clubs and Telegram community.",
      tasks: ["Share videos and resources with your college groups", "Help organise talks, workshops or hackathon sessions", "Bring student stories and questions to the channel"],
      need: ["Currently enrolled in college", "Active in a tech club or community", "Comfortable talking to people"],
    },
  ],

  perks: [
    { icon: "film", title: "Credit on every video", text: "Your name in the description and on this site's team page." },
    { icon: "trophy", title: "Certificate & LOR", text: "On successful completion, with a letter that says what you actually did." },
    { icon: "briefcase", title: "A real portfolio", text: "Public, published work you can show recruiters — not practice files." },
    { icon: "users", title: "Mentorship", text: "Direct feedback from Aditya on content, career and placements." },
  ],

  /* Blog posts — each needs a matching file in /blog/<slug>.html */
  posts: [
    {
      slug: "github-student-developer-pack-2026",
      title: "How to Get the GitHub Student Developer Pack in 2026",
      excerpt: "Free Copilot, domains, cloud credits and pro tools — a step-by-step guide to getting approved the first time.",
      date: "2026-10-15",
      read: "6 min read",
      tag: "Dev Setup",
      video: "VDwZmzesj0U",
    },
    {
      slug: "git-github-first-project",
      title: "Git & GitHub for Beginners: Set Up and Upload Your First Project",
      excerpt: "Install Git, connect GitHub, and push your first repository — the exact commands, explained.",
      date: "2026-10-15",
      read: "8 min read",
      tag: "Dev Setup",
      video: "9nb-YxETdqo",
    },
  ],

  /* Reviews shown on /ask.html#reviews. Add only real, approved reviews.
     { name: "Priya S.", meta: "B.Tech CSE, 2nd year", rating: 5, text: "…" } */
  reviews: [],

  /* "Already answered" — common questions that a video already covers. */
  answered: [
    { q: "How do I get the GitHub Student Developer Pack?", a: "The full step-by-step walkthrough — eligibility, documents and what to do if you get rejected.", video: "VDwZmzesj0U", tag: "Dev Setup" },
    { q: "How do I set up C / C++ in VS Code?", a: "Compiler install, PATH setup and your first program running in VS Code.", video: "FJ_IQN_YFxs", tag: "Dev Setup" },
    { q: "Is Smart India Hackathon worth it? How do I win?", a: "A full podcast episode with a 2× SIH winner on team building, problem statements and judging.", video: "g9lypxza4wM", tag: "Podcast" },
    { q: "How do people crack 50+ LPA roles right now?", a: "A breakdown of the strategy a Zomato software engineer used, in the AI era.", video: "D6phGbqQtYI", tag: "Career" },
    { q: "Why am I getting rejected from 10 LPA jobs?", a: "The common reasons — and what to fix before your next interview.", video: "5xYKkgmTu8E", tag: "Career" },
  ],

  /* Free resources on /resources.html.
     `file` is opened after the visitor enters their email. Set `soon: true` for ones still being made. */
  resources: [
    {
      id: "git-cheatsheet",
      title: "Git & GitHub Cheat Sheet",
      text: "Every command from the beginner tutorial on one printable page — setup, daily loop, branches and fixing mistakes.",
      kind: "Cheat sheet · 1 page",
      icon: "code",
      file: "resources/git-cheatsheet.html",
      video: "9nb-YxETdqo",
    },
    {
      id: "sih-checklist",
      title: "Smart India Hackathon Prep Checklist",
      text: "From forming the team to the final pitch — a stage-by-stage checklist from a 2× SIH winner.",
      kind: "Checklist · 2 pages",
      icon: "trophy",
      tone: "warm",
      file: "resources/sih-checklist.html",
      video: "g9lypxza4wM",
    },
    {
      id: "dev-setup",
      title: "New Laptop Dev Setup Checklist",
      text: "VS Code, Git, compilers, must-have extensions and free student tools — set up a coding laptop in one evening.",
      kind: "Checklist · 1 page",
      icon: "zap",
      tone: "violet",
      file: "resources/dev-setup-checklist.html",
      video: "sV0Fvexp6AU",
    },
    { id: "resume-template", title: "Fresher Resume Template", text: "A one-page, ATS-friendly resume layout for internships and placements — with examples of strong project bullets.", kind: "Template", icon: "briefcase", tone: "green", soon: true },
    { id: "roadmap", title: "4-Year Engineering Roadmap", text: "What to focus on in each year — DSA, development, projects, hackathons and internships — without burning out.", kind: "Roadmap", icon: "trending", soon: true },
    { id: "outreach", title: "Cold Email & LinkedIn Templates", text: "Copy-paste messages for reaching out to recruiters and engineers for internships and referrals.", kind: "Templates", icon: "mail", tone: "warm", soon: true },
  ],

  /* Hall of Fame on /hall-of-fame.html — only real, verified wins. */
  winTypes: [
    { id: "internship", label: "Internship" },
    { id: "placement", label: "Placement" },
    { id: "hackathon", label: "Hackathon" },
    { id: "opensource", label: "Open source" },
    { id: "other", label: "Other" },
  ],
  wins: [
    {
      name: "Aditya Kumar",
      meta: "Founder, RefactorsLife",
      photo: "assets/img/aditya.jpg",
      type: "hackathon",
      title: "Won Smart India Hackathon — twice",
      story: "Two national wins at India's biggest hackathon. The full story — team, problem statements and judging — is on the podcast.",
      video: "g9lypxza4wM",
      link: "https://www.linkedin.com/in/aditya-kumar-165911339",
    },
    // { name: "…", meta: "B.Tech CSE, 3rd year · XYZ College", type: "internship", title: "Summer intern at …", story: "…", video: "VIDEO_ID", link: "https://linkedin.com/…" },
  ],
};
