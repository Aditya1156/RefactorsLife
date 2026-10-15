/* ==========================================================================
   Site settings — edit this file to change links, stats and form endpoints.
   ========================================================================== */
window.RL_CONFIG = {
  siteName: "RefactorsLife",
  domain: "https://refactorslife.in",
  tagline: "Where Engineering Meets Life",
  email: "hello@refactorslife.in",

  channel: {
    id: "UCa3HtjxdgTmO2qruD4sEHdg",
    url: "https://www.youtube.com/@RefactorsLife",
    subscribe: "https://www.youtube.com/@RefactorsLife?sub_confirmation=1",
  },

  socials: {
    youtube: "https://www.youtube.com/@RefactorsLife",
    instagram: "https://www.instagram.com/refactorslife",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-165911339",
    github: "https://github.com/Aditya1156",
    telegram: "https://t.me/refactorslife",
    telegramGroup: "https://t.me/+H_pfNXCbt6w0Zjdl",
  },

  // Update these by hand, or run `node scripts/sync-videos.mjs` to refresh videos.
  stats: [
    { value: "600+", label: "Subscribers & growing" },
    { value: "148", label: "Videos published" },
    { value: "12K", label: "Views on our top guide" },
    { value: "2×", label: "SIH winner as host" },
  ],

  /* Form endpoints.
     Paste a Formspree URL (https://formspree.io/f/xxxx) or a Google Apps Script
     web-app URL (see scripts/google-apps-script.gs) for each form.
     Leave empty and the form falls back to opening an email to `email` above. */
  forms: {
    ask: "",
    review: "",
    apply: "",
    collab: "",
    newsletter: "",
    resources: "",
    win: "",
  },
};
