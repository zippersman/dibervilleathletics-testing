/* Plain-language definitions for common statistics used on team pages. */
(function(){
  var soccer = /soccer/i.test(location.pathname);
  var defs = soccer ? [
    ["G","Goals","A goal scored by the player."],["A","Assists","A pass or play credited as directly helping create a goal."],["G+A","Goals plus assists","The player's combined goals and assists."],["SOT","Shots on target","Shots that would enter the goal if not saved or stopped by a defender on the goal line."],["SV","Saves","Shots on target stopped by the goalkeeper."],["SV%","Save percentage","Saves divided by shots faced on target, expressed as a percentage."],["CS","Clean sheet","A game in which the team allows zero goals."],["TKL","Tackles","Defensive challenges credited to the player."],["YC / RC","Yellow / red cards","Disciplinary cards shown by the referee."]
  ] : [
    ["PTS","Points","Points scored by a player."],["REB","Rebounds","Recoveries of the ball after a missed shot."],["OREB / DREB","Offensive / defensive rebounds","Rebounds collected while the player's team is attacking or defending."],["AST","Assists","Passes that directly lead to a made basket."],["STL","Steals","Defensive plays that take possession from the opponent."],["BLK","Blocks","Shots legally deflected or stopped by a defender."],["FG%","Field-goal percentage","Made field goals divided by attempted field goals."],["3P%","Three-point percentage","Made three-pointers divided by three-point attempts."],["FT%","Free-throw percentage","Made free throws divided by free-throw attempts."],["GP","Games played","Number of games in which the player appeared."],["PPG / RPG / APG","Per-game averages","Points, rebounds, or assists per game."]
  ];
  var stamp=document.getElementById("stamp");
  if(!stamp||document.getElementById("stat-glossary"))return;
  var box=document.createElement("details");box.id="stat-glossary";box.innerHTML='<summary>Stat glossary <span aria-hidden="true">·</span> What do the abbreviations mean?</summary><dl>'+defs.map(function(d){return '<div><dt>'+d[0]+'</dt><dd>'+d[1]+' — '+d[2]+'</dd></div>';}).join('')+'</dl>';
  stamp.parentNode.insertBefore(box,stamp.nextSibling);
})();
