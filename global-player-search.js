/* Cross-team player search for the home page. Reads the same published roster tabs
   used by team pages and links directly to the player's existing profile hash. */
(function(){
  "use strict";
  var teams = [
    ["Basketball · Girls Varsity","girls-varsity.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vTnya9kcfLmsGzYh4hxF0uiv9o9VyIRpfN__YCz3lgHZOuWrIiDbK8JMpCsz4o0VIMRQiDGF4SU_Swk/pubhtml"],
    ["Basketball · Girls JV","girls-jv.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vQ44GizEl-QSqMxkmIrr0jCHxqbbGOF8dzLUQXTZVxhVaxWu6gk31UGzuOw5an5gczQP83_i7Yv2mHI/pubhtml"],
    ["Basketball · Boys Varsity","boys-varsity.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vSpDXdB018lquHSr0fnhvg9S8P114LzLHDSDJHOcIZurwnKG_6W8zqaQJn2JniBDTOKt_pseFpCH5A1/pubhtml"],
    ["Basketball · Boys JV","boys-jv.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vQiF8TSkPAyRmv-hcX2HC8w8_jq39xUOc5-YJDlqsvDRUBf8svrZ7vD0_9lgypMF4vpFHbLPhDTKrMc/pubhtml"],
    ["Basketball · Boys Freshman","boys-freshman.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vSVQvdme6lwkdvL3yDPb8CUBxn3aXKHRHte6B581ujRndGD_ZEDk3wRvPQUvujGdcX4jC12nw5vXnsp/pubhtml"],
    ["Soccer · Girls Varsity","soccer-girls-varsity.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vQ04weNQhPndf6Sv4JCgfGW7-L4hZUCTcN9C7lO-8Vq27gXMT0CzOvj-Q5bYvjKSjfTS7BRkzbSpT5c/pubhtml"],
    ["Soccer · Girls JV","soccer-girls-jv.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vT63WlAxghdCtvfn71oRRCU3ShkME7l2b_VQdMRhl1yOSm9zQH8NpipkjErasM-TXnlUqzz_ewR-kDo/pubhtml"],
    ["Soccer · Boys Varsity","soccer-boys-varsity.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vRjVXjgqb56GLqtB-9yCqydGQPrzPW1dO1B9tq3h_bjJO6WJ-VTSgVc8B_0UO7agDzx06v6WFE-Bl6e/pubhtml"],
    ["Soccer · Boys JV","soccer-boys-jv.html","https://docs.google.com/spreadsheets/d/e/2PACX-1vTL-8f1n_1Y4KYfTTz6YYMjz70ig-oe0S-YFMnjhLryhxGIcKffwwT0VmKQUgmRSCMUQjiX0FzHC31i/pubhtml"]
  ];
  var host = document.getElementById("global-player-search");
  if (!host) return;
  var input = host.querySelector("input"), results = host.querySelector("[data-results]"), status = host.querySelector("[data-status]");
  var all = [], ready = false, loading = false;
  function csv(text){ var rows=[], row=[], field="", quoted=false; for(var i=0;i<text.length;i++){var c=text[i]; if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else quoted=false;}else field+=c;}else if(c==='"')quoted=true;else if(c===','){row.push(field);field='';}else if(c==='\n'){row.push(field);rows.push(row);row=[];field='';}else if(c!=='\r')field+=c;} if(field!==''||row.length){row.push(field);rows.push(row);} return rows; }
  function roster(rows){ var h=rows.findIndex(function(r){return r.some(function(c){return c.trim()==="Jersey";});}); if(h<0)return[];var heads=rows[h].map(function(x){return x.trim();});return rows.slice(h+1).map(function(r){var o={};heads.forEach(function(k,i){o[k]=(r[i]||"").trim();});return o;}).filter(function(p){return p.Player&&p.Jersey;}); }
  function load(){ if(loading||ready)return;loading=true; status.textContent="Loading player directory…";
    Promise.all(teams.map(function(t){var id=(t[2].match(/\/e\/([^/]+)/)||[])[1];var url="https://docs.google.com/spreadsheets/d/e/"+id+"/pub?gid=127058417&single=true&output=csv";return fetch(url).then(function(r){if(!r.ok)throw Error("Roster unavailable");return r.text();}).then(function(txt){return roster(csv(txt)).map(function(p){return {name:p.Player,jersey:p.Jersey,team:t[0],page:t[1]};});}).catch(function(){return[];});})).then(function(groups){all=groups.reduce(function(a,b){return a.concat(b);},[]);ready=true;loading=false;try{sessionStorage.setItem("dhs-player-directory",JSON.stringify(all));}catch(e){};status.textContent=all.length?all.length+" players indexed across nine teams.":"Player directory could not load. Try again in a moment."; host.querySelector("[data-retry]").hidden=!!all.length; if(input.value.trim())search();}).catch(function(){loading=false;status.textContent="Could not load player directory. Check your connection and try again.";host.querySelector("[data-retry]").hidden=false;});
  }
  function search(){var q=input.value.trim().toLowerCase();results.innerHTML="";if(!q){status.textContent=ready?"Search by player name or jersey number.":"Search all nine teams by player name.";return;}if(!ready){load();status.textContent="Searching player directory…";return;}var hits=all.filter(function(p){return p.name.toLowerCase().indexOf(q)>-1||String(p.jersey).toLowerCase()===q;}).slice(0,12);if(!hits.length){status.textContent="No matching players found.";return;}status.textContent=hits.length+" matching player"+(hits.length===1?"":"s")+".";results.innerHTML=hits.map(function(p){var a=document.createElement("a");a.href=p.page+"#p"+encodeURIComponent(p.jersey);a.className="gps-result";a.textContent=p.name+"  ·  #"+p.jersey+"  ·  "+p.team;return a.outerHTML;}).join("");}
  try{var cached=JSON.parse(sessionStorage.getItem("dhs-player-directory")||"null");if(Array.isArray(cached)&&cached.length){all=cached;ready=true;status.textContent=all.length+" players ready. Updating directory…";}}catch(e){}
  input.addEventListener("input",search);input.addEventListener("focus",function(){if(!ready)load();});
  host.querySelector("[data-retry]").addEventListener("click",function(){loading=false;ready=false;host.querySelector("[data-retry]").hidden=true;load();});
  if(!ready)load();
})();
