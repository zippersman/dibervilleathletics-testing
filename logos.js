/* Shared opponent-logo loader.
   Instead of asking for exactly one file (logos/<slug>.png) and giving up, this tries the
   usual spellings/extensions of the school name, uses the first one that exists, and only
   then falls back to initials. Results are remembered so a refresh doesn't re-try 404s.

   Usage:  dhsLogo("St. Martin", {cls:"op", fb:"ini"})                    -> hub / results cards
           dhsLogo("Bay", {cls:"ol", w:26, h:26, fb:"remove"})            -> small logo on team pages */
(function(){
  var EXTS = ["png", "webp", "jpg", "jpeg", "svg"];
  var cache = {};                       /* name -> working src, or "" if nothing was found */

  function cap(w){ return w.charAt(0).toUpperCase() + w.slice(1); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function initials(n){ return String(n).replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).map(function(w){ return w[0]; }).join("").slice(0, 2).toUpperCase(); }

  function candidates(name){
    var raw = String(name).trim();
    var words = raw.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
    var caps = words.map(cap);
    var bases = [words.join("-"), words.join("_"), words.join(""), words.join(" "),
                 raw, raw.toLowerCase(),
                 caps.join("-"), caps.join("_"), caps.join(""), caps.join(" ")];
    var seen = {}, out = [];
    bases.forEach(function(b){
      if (!b || seen[b]) return; seen[b] = 1;
      EXTS.forEach(function(e){ out.push("logos/" + encodeURIComponent(b) + "." + e); });
    });
    return out;
  }

  function fallback(img){
    var fb = img.getAttribute("data-fb"), n = img.getAttribute("data-n");
    cache[n] = "";
    if (fb === "remove"){ img.remove(); return; }
    var d = document.createElement("div");
    d.className = "ini";
    d.textContent = initials(n);
    img.replaceWith(d);
  }

  window.dhsLogoErr = function(img){
    var n = img.getAttribute("data-n");
    var list = candidates(n), i = +img.getAttribute("data-i") + 1;
    if (i >= list.length){ fallback(img); return; }
    img.setAttribute("data-i", i);
    img.src = list[i];
  };
  window.dhsLogoOk = function(img){
    cache[img.getAttribute("data-n")] = img.getAttribute("src");
  };

  window.dhsLogo = function(name, o){
    o = o || {};
    var n = String(name);
    var attrs = ' class="' + esc(o.cls || "") + '" alt="" loading="lazy" data-n="' + esc(n) + '" data-i="0" data-fb="' + (o.fb || "ini") + '"' +
                (o.w ? ' width="' + o.w + '"' : "") + (o.h ? ' height="' + o.h + '"' : "") +
                ' onerror="dhsLogoErr(this)" onload="dhsLogoOk(this)"';
    if (cache[n] === "")                                  /* already known to have no logo */
      return o.fb === "remove" ? "" : '<div class="ini">' + esc(initials(n)) + '</div>';
    var first = cache[n] || candidates(n)[0];
    return '<img src="' + first + '"' + attrs + '>';
  };
})();
