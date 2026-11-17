/* "Latest results" strip for the main menu (index.html).
   Pulls the newest finished games from all 8 team sheets (basketball + soccer) and shows them
   as cards. It places itself between the "Pick your sport" cards and the "Get the app" section.
   Needs logos.js loaded first. */
(function(){
  var MAX = 6;                                     /* how many cards to show */
  var GID = {sched:1598752444, log:1696552548};

  var BB = {
    PUB_V:  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnya9kcfLmsGzYh4hxF0uiv9o9VyIRpfN__YCz3lgHZOuWrIiDbK8JMpCsz4o0VIMRQiDGF4SU_Swk/pubhtml",
    PUB_JV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ44GizEl-QSqMxkmIrr0jCHxqbbGOF8dzLUQXTZVxhVaxWu6gk31UGzuOw5an5gczQP83_i7Yv2mHI/pubhtml",
    PUB_BV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpDXdB018lquHSr0fnhvg9S8P114LzLHDSDJHOcIZurwnKG_6W8zqaQJn2JniBDTOKt_pseFpCH5A1/pubhtml",
    PUB_BJV:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQiF8TSkPAyRmv-hcX2HC8w8_jq39xUOc5-YJDlqsvDRUBf8svrZ7vD0_9lgypMF4vpFHbLPhDTKrMc/pubhtml"
  };
  var SC = {
    PUB_V:  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ04weNQhPndf6Sv4JCgfGW7-L4hZUCTcN9C7lO-8Vq27gXMT0CzOvj-Q5bYvjKSjfTS7BRkzbSpT5c/pubhtml",
    PUB_JV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT63WlAxghdCtvfn71oRRCU3ShkME7l2b_VQdMRhl1yOSm9zQH8NpipkjErasM-TXnlUqzz_ewR-kDo/pubhtml",
    PUB_BV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRjVXjgqb56GLqtB-9yCqydGQPrzPW1dO1B9tq3h_bjJO6WJ-VTSgVc8B_0UO7agDzx06v6WFE-Bl6e/pubhtml",
    PUB_BJV:"https://docs.google.com/spreadsheets/d/e/2PACX-1vTL-8f1n_1Y4KYfTTz6YYMjz70ig-oe0S-YFMnjhLryhxGIcKffwwT0VmKQUgmRSCMUQjiX0FzHC31i/pubhtml"
  };

  /* pog = how the "player of the game" is scored and shown, per sport (same rules as the hub pages) */
  var num = function(v){ var n = parseFloat(String(v == null ? "" : v)); return isNaN(n) ? NaN : n; };
  var bbScore = function(p){ var n = function(k){ return num(p[k]) || 0; };
    return n("PTS") + .4*n("FGM") - .7*n("FGA") - .4*(n("FTA") - n("FTM")) + .7*n("OREB") + .3*n("DREB") + n("STL") + .7*n("AST") + .7*n("BLK") - .4*n("PF") - n("TOV"); };
  var bbLine = function(p){ return ["PTS","AST","REB","STL","BLK"].filter(function(k){ return num(p[k]) >= 3; }).map(function(k){ return num(p[k]) + " " + k; }).join(" · "); };
  var scScore = function(p){ var n = function(k){ return num(p[k]) || 0; };
    return 3*n("G") + 2*n("A") + .2*n("SOT") + .3*n("SAV") + .3*n("TKL") + 1.5*n("CS") - .5*n("YC") - 2*n("RC"); };
  var scLine = function(p){ return ["G","A","SAV","TKL"].filter(function(k){ return num(p[k]) >= 1; }).map(function(k){ return num(p[k]) + " " + k; }).join(" · ") + (num(p.CS) >= 1 ? " · CS" : ""); };

  var SPORTS = [
    {label:"Basketball", pubs:BB, score:bbScore, line:bbLine, teams:[["Girls Varsity","girls-varsity.html","PUB_V"],["Girls JV","girls-jv.html","PUB_JV"],["Boys Varsity","boys-varsity.html","PUB_BV"],["Boys JV","boys-jv.html","PUB_BJV"]]},
    {label:"Soccer",     pubs:SC, score:scScore, line:scLine, teams:[["Girls Varsity","soccer-girls-varsity.html","PUB_V"],["Girls JV","soccer-girls-jv.html","PUB_JV"],["Boys Varsity","soccer-boys-varsity.html","PUB_BV"],["Boys JV","soccer-boys-jv.html","PUB_BJV"]]}
  ];

  /* ---------- styles (self-contained, so it looks right whatever index.html's CSS has) ---------- */
  var css = [
    "#latest-results{margin:44px 0 0}",
    "#latest-results .lr-eye{font:700 13px 'Barlow Condensed',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f9a71f;margin:0 0 4px;text-shadow:0 0 14px rgba(249,167,31,.5)}",
    "#latest-results h2{font:800 30px/1 'Barlow Condensed',sans-serif;text-transform:uppercase;color:#f1f2f4;margin:0 0 14px;text-shadow:0 0 30px rgba(249,167,31,.22)}",
    ".lr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px}",
    ".lr-msg{background:#181b21;border:1px solid #2b2f36;border-radius:12px;padding:18px;color:#9aa1ad}",
    "a.lr-card{position:relative;display:block;background:#181b21;border:1px solid rgba(249,167,31,.3);border-radius:12px;padding:14px;color:inherit;text-decoration:none;box-shadow:0 0 0 1px rgba(249,167,31,.1),0 8px 30px rgba(249,167,31,.08);transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease,background .25s ease}",
    "a.lr-card:hover,a.lr-card:focus-visible{transform:translateY(-4px);border-color:#f9a71f;background:linear-gradient(160deg,#2a2314,#1a1c21);box-shadow:0 0 0 1px #f9a71f,0 0 30px rgba(249,167,31,.45),0 14px 44px rgba(249,167,31,.2);outline:none}",
    ".lr-m{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;font-size:13px;color:#9aa1ad}",
    ".lr-m b{color:#f1f2f4;font:700 15px 'Barlow Condensed',sans-serif;letter-spacing:.05em;text-transform:uppercase}",
    ".lr-tl{width:18px;height:18px;border-radius:4px;vertical-align:-4px;margin-right:6px}",
    ".lr-r{text-align:right;line-height:1.25}",
    ".lr-fin{display:block;color:#3fb871;font-weight:700}",
    ".lr-vs{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;text-align:center;margin:12px 0}",
    ".lr-t img,.lr-t .ini{width:44px;height:44px;border-radius:11px;margin:0 auto 4px;display:block}",
    ".lr-t img.op{object-fit:contain;border-radius:0}",
    ".lr-t .ini{background:#2a2e35;display:grid;place-items:center;font:800 18px 'Barlow Condensed',sans-serif;color:#9aa1ad}",
    ".lr-t .n{font:700 14px 'Barlow Condensed',sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#9aa1ad}",
    ".lr-t .s{font:800 40px/1 'Barlow Condensed',sans-serif}",
    ".lr-t.w .s{color:#f1f2f4}.lr-t.l .s{color:#9aa1ad}",
    ".lr-dash{color:#9aa1ad}",
    ".lr-ts{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;border-top:1px solid #2b2f36;padding-top:9px;font:700 14px 'Barlow Condensed',sans-serif;letter-spacing:.08em;text-transform:uppercase}",
    ".lr-ts>span:first-child{color:#f9a71f}",
    ".lr-pg{display:flex;flex-direction:column;align-items:flex-end;gap:1px;text-align:right;text-transform:none;letter-spacing:0}",
    ".lr-pg b{font:600 15px Barlow,system-ui,sans-serif;color:#f1f2f4}",
    ".lr-pg i{font:600 13px Barlow,system-ui,sans-serif;font-style:normal;color:#f9a71f;letter-spacing:.02em}",
    "@media (prefers-reduced-motion:reduce){a.lr-card{transition:none}a.lr-card:hover{transform:none}}"
  ].join("\n");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- helpers ---------- */
  var esc = function(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  function csv(t){
    var rows = [], r = [], f = "", q = false;
    for (var i = 0; i < t.length; i++){
      var c = t[i];
      if (q){ if (c === '"'){ if (t[i+1] === '"'){ f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ","){ r.push(f); f = ""; }
      else if (c === "\n"){ r.push(f); rows.push(r); r = []; f = ""; }
      else if (c !== "\r") f += c;
    }
    if (f !== "" || r.length){ r.push(f); rows.push(r); }
    return rows;
  }
  function objs(rows, key){
    var h = rows.findIndex(function(r){ return r.some(function(c){ return c.trim() === key; }); });
    if (h < 0) return [];
    var head = rows[h].map(function(x){ return x.trim(); });
    return rows.slice(h + 1).map(function(r){ var o = {}; head.forEach(function(k, i){ o[k] = (r[i] == null ? "" : r[i]).trim(); }); return o; });
  }
  function grab(pub, gid){
    var id = (pub.match(/\/e\/([^\/]+)/) || [, pub])[1];
    return fetch("https://docs.google.com/spreadsheets/d/e/" + id + "/pub?gid=" + gid + "&single=true&output=csv&t=" + Date.now(), {cache:"no-store"})
      .then(function(res){ if (!res.ok) throw new Error(res.status); return res.text(); }).then(csv);
  }
  var dateStr = function(s){ var p = String(s).split("/"), d = new Date(+p[2], p[0] - 1, +p[1]); return isNaN(d) ? s : d.toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"}); };
  var dayKey = function(d){ var p = String(d).split("/"); return Math.floor(Date.UTC(+p[2], p[0] - 1, +p[1]) / 86400000) || 0; };

  function loadTeam(sp, t){
    var pub = sp.pubs[t[2]];
    return Promise.all([grab(pub, GID.sched), grab(pub, GID.log)]).then(function(ab){
      var G = objs(ab[0], "Game #").filter(function(g){ return g.Opponent && g["Our Score"] !== "" && !isNaN(num(g["Our Score"])); });
      var L = objs(ab[1], "Game #").filter(function(x){ return x.Player; });
      return G.map(function(g){
        var pog = L.filter(function(x){ return x["Game #"] === g["Game #"]; }).sort(function(p, q){ return sp.score(q) - sp.score(p); })[0];
        return {sp:sp, team:t[0], page:t[1], g:g, pog:pog, k:dayKey(g.Date) * 1000 + (num(g["Game #"]) || 0)};
      });
    });
  }

  function card(it){
    var g = it.g, win = g.Result === "W", tie = g.Result === "T";
    var line = it.pog ? it.sp.line(it.pog) : "";
    return '<a class="lr-card" href="' + it.page + '#g' + esc(g["Game #"]) + '">' +
      '<div class="lr-m"><span><img class="lr-tl" src="icon-192-v2.png" alt=""><b>' + esc(it.team) + '</b> · ' + it.sp.label + '</span>' +
        '<span class="lr-r"><span class="lr-fin">FINAL</span>' + esc(dateStr(g.Date)) + '</span></div>' +
      '<div class="lr-vs">' +
        '<div class="lr-t ' + (win || tie ? "w" : "l") + '"><img src="icon-192-v2.png" alt=""><div class="n">D’Iberville</div><div class="s">' + esc(g["Our Score"]) + '</div></div>' +
        '<div class="lr-dash">–</div>' +
        '<div class="lr-t ' + (win ? "l" : "w") + '">' + window.dhsLogo(g.Opponent, {cls:"op", fb:"ini"}) + '<div class="n">' + esc(g.Opponent) + '</div><div class="s">' + esc(g["Opp Score"]) + '</div></div>' +
      '</div>' +
      (it.pog ? '<div class="lr-ts"><span>Player of the game</span><span class="lr-pg"><b>' + esc(it.pog.Player) + '</b>' + (line ? '<i>' + line + '</i>' : "") + '</span></div>' : "") +
    '</a>';
  }

  /* ---------- placement ---------- */
  function findAnchor(){
    var txt = function(e){ return (e.textContent || "").replace(/\s+/g, " ").trim().toLowerCase(); };
    var app = null, menu = null, all = document.body.querySelectorAll("*");
    for (var i = 0; i < all.length; i++){
      var e = all[i]; if (/^(SCRIPT|STYLE)$/.test(e.tagName) || e.closest("#latest-results")) continue;
      var t = txt(e);
      if (!app && t === "get the app") app = e;
      if (!menu && t === "main menu") menu = e;
    }
    if (!app) return null;
    var a = app;
    while (a.parentElement && a.parentElement !== document.body && !(menu ? a.parentElement.contains(menu) : a.parentElement.children.length > 1)) a = a.parentElement;
    return a;
  }
  function mount(){
    var host = document.getElementById("latest-results");
    if (!host){
      host = document.createElement("section"); host.id = "latest-results";
      var a = findAnchor();
      if (a && a.parentNode) a.parentNode.insertBefore(host, a);
      else { var w = document.querySelector(".wrap") || document.body, f = w.querySelector("footer"); w.insertBefore(host, f || null); }
    }
    host.innerHTML = '<div class="lr-eye">Around the teams</div><h2>Latest results</h2><div class="lr-grid" id="lr-grid"><div class="lr-msg">Loading…</div></div>';
  }

  function load(first){
    var grid = document.getElementById("lr-grid"); if (!grid) return;
    var jobs = [];
    SPORTS.forEach(function(sp){ sp.teams.forEach(function(t){ jobs.push(loadTeam(sp, t).catch(function(){ return null; })); }); });
    Promise.all(jobs).then(function(out){
      var items = [].concat.apply([], out.filter(Boolean)).sort(function(x, y){ return y.k - x.k; }).slice(0, MAX);
      if (!items.length){ if (first) grid.innerHTML = '<div class="lr-msg">No results yet. Check back after the next game.</div>'; return; }
      grid.innerHTML = items.map(card).join("");
    });
  }

  function start(){ mount(); load(true); setInterval(function(){ load(false); }, 120000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
