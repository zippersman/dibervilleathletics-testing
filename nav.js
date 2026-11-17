/* Shared top bar: Home link, Teams dropdown (all pages), Sections dropdown (team pages only) */
(function(){
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var TEAM_PAGES = {"girls-varsity.html":"Girls Varsity","girls-jv.html":"Girls JV","boys-varsity.html":"Boys Varsity","boys-jv.html":"Boys JV","soccer-girls-varsity.html":"Girls Varsity","soccer-girls-jv.html":"Girls JV","soccer-boys-varsity.html":"Boys Varsity","soccer-boys-jv.html":"Boys JV"};
  var isTeam = Object.prototype.hasOwnProperty.call(TEAM_PAGES, file);

  var P = {
    home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    ball:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.6 5.6c3 3 3 9.8 0 12.8M18.4 5.6c-3 3-3 9.8 0 12.8"/>',
    soccer:'<circle cx="12" cy="12" r="9"/><path d="M12 8l3.5 2.5-1.3 4H9.8l-1.3-4zM12 8V3M15.5 10.5l5-1.5M14.2 14.5l3 4M9.8 14.5l-3 4M8.5 10.5l-5-1.5"/>',
    overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    schedule:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    players:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2.2.7 3.5 2.6 3.5 5.6"/>',
    leaders:'<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4"/>',
    profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    box:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h6"/>'
  };
  var ic = function(k){ return '<svg class="nv-i" viewBox="0 0 24 24" aria-hidden="true">' + P[k] + '</svg>'; };

  var SPORTS = [
    {name:"Basketball", icon:"ball",   hub:"basketball.html", teams:[["Girls Varsity","girls-varsity.html"],["Girls JV","girls-jv.html"],["Boys Varsity","boys-varsity.html"],["Boys JV","boys-jv.html"]]},
    {name:"Soccer",     icon:"soccer", hub:"soccer.html",     teams:[["Girls Varsity","soccer-girls-varsity.html"],["Girls JV","soccer-girls-jv.html"],["Boys Varsity","soccer-boys-varsity.html"],["Boys JV","soccer-boys-jv.html"]]}
  ];
  var TABS = [["overview","Overview","overview"],["schedule","Schedule","schedule"],["players","Players","players"],["leaders","Leaders","leaders"],["profile","Profile","profile"],["box","Box score","box"]];

  function tabNow(){
    var h = location.hash.slice(1) || "overview";
    if (/^p\d+$/.test(h)) return "profile";
    if (/^g\d+$/.test(h)) return "box";
    return TABS.some(function(t){ return t[0] === h; }) ? h : "overview";
  }

  /* ---- Teams dropdown ---- */
  var teamLabel = isTeam ? TEAM_PAGES[file] : file === "basketball.html" ? "Basketball" : file === "soccer.html" ? "Soccer" : "Teams";
  var teamIcon = (file === "soccer.html" || file.indexOf("soccer-") === 0) ? "soccer" : "ball";
  var tm = '<a class="nv-item' + (file === "index.html" ? " on" : "") + '" role="menuitem" href="index.html">' + ic("home") + 'All sports</a>';
  SPORTS.forEach(function(s){
    tm += '<div class="nv-sep"></div><a class="nv-h" role="menuitem" href="' + s.hub + '">' + s.name + '</a>';
    s.teams.forEach(function(t){
      if (t[1]) tm += '<a class="nv-item' + (file === t[1] ? " on" : "") + '" role="menuitem" href="' + t[1] + '"' + (file === t[1] ? ' aria-current="page"' : "") + '>' + ic(s.icon) + t[0] + '</a>';
      else tm += '<span class="nv-item off" role="menuitem" aria-disabled="true">' + ic(s.icon) + t[0] + '<span class="nv-soon">Soon</span></span>';
    });
  });
  var teamsDD = '<div class="nv-dd" id="nv-teams"><button type="button" class="nv-btn" aria-haspopup="true" aria-expanded="false">' + ic(teamIcon) + '<span>' + teamLabel + '</span></button><div class="nv-menu" role="menu">' + tm + '</div></div>';

  /* ---- Sections dropdown (team pages only) ---- */
  var secDD = "";
  if (isTeam){
    secDD = '<div class="nv-dd" id="nv-sections"><button type="button" class="nv-btn" aria-haspopup="true" aria-expanded="false"><span id="nv-seclabel"></span></button><div class="nv-menu" role="menu">' +
      TABS.map(function(t){ return '<a class="nv-item" role="menuitem" data-tab="' + t[0] + '" href="#' + t[0] + '">' + ic(t[2]) + t[1] + '</a>'; }).join("") + '</div></div>';
  }

  var bar = document.createElement("div");
  bar.className = "nv";
  bar.setAttribute("role", "navigation");
  bar.setAttribute("aria-label", "Site menu");
  bar.innerHTML = '<div class="nv-in"><a class="nv-link" href="index.html" aria-label="Home">' + ic("home") + '<span>Home</span></a>' + teamsDD + secDD + '</div>';
  document.body.insertBefore(bar, document.body.firstChild);

  function syncSections(){
    if (!isTeam) return;
    var cur = tabNow(), t = TABS.filter(function(x){ return x[0] === cur; })[0];
    var btn = bar.querySelector("#nv-sections .nv-btn");
    btn.innerHTML = ic(t[2]) + '<span id="nv-seclabel">' + t[1] + '</span>';
    bar.querySelectorAll("#nv-sections .nv-item").forEach(function(a){
      var on = a.getAttribute("data-tab") === cur;
      a.classList.toggle("on", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  syncSections();
  addEventListener("hashchange", syncSections);

  /* ---- open / close ---- */
  function closeAll(except){
    bar.querySelectorAll(".nv-dd.open").forEach(function(d){
      if (d !== except){ d.classList.remove("open"); d.firstElementChild.setAttribute("aria-expanded", "false"); }
    });
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest(".nv-btn");
    var dd = b && b.parentNode;
    if (b && bar.contains(b)){
      var open = dd.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      closeAll(dd);
    } else {
      closeAll(null);
      var sec = e.target.closest && e.target.closest("#nv-sections .nv-item");
      if (sec) window.scrollTo(0, 0);
    }
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){
      var o = bar.querySelector(".nv-dd.open");
      if (o){ closeAll(null); o.firstElementChild.focus(); }
    }
  });
})();
