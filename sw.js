/* D'Iberville Athletics service worker.
   - Pages and scripts: always try the network first, so updates show up right away. If the
     phone is offline, fall back to the last copy it saw, so the app still opens.
   - Stats come from Google Sheets (another origin). Those requests are never touched or cached here,
     so scores are always live and never stale. If offline, the page's own "Try again" message shows. */
const CACHE = "dhs-v11";
const SHELL = ["./", "index.html", "basketball.html", "soccer.html", "nav.js", "nav.css",
               "loader.js", "loader.css", "logos.js", "global-player-search.js", "player-search.css",
               "stats-glossary.js", "stats-glossary.css", "stats-center.html", "stats-center.js", "stats-center.css", "game-center.html", "game-center.js", "game-center.css", "records-history.html", "records-history.js", "records-history.css", "advanced-analytics.html", "advanced-analytics.js", "advanced-analytics.css", "player-awards.html", "player-awards.js", "player-awards.css", "milestones.html", "milestones.js", "milestones.css", "athlete-careers.html", "athlete-careers.js", "athlete-careers.css", "athlete-profiles.html", "athlete-profiles.js", "athlete-profiles.css", "career-archive-template.csv", "icon-192-v2.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          /* Google Sheets, fonts, etc. */
  e.respondWith(
    fetch(req, {cache: "no-cache"})
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() =>
        caches.match(req, {ignoreSearch: true}).then(hit =>
          hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error())))
  );
});
