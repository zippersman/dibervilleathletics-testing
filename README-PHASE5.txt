D'Iberville Athletics — Phase 5: Advanced Analytics

New page:
- advanced-analytics.html: interactive player comparison, team season analytics, scoring/allowed trend chart, recent game performance spotlight
- advanced-analytics.js: loads roster, schedule, and player game-log CSVs from the existing nine published Google Sheets
- advanced-analytics.css: responsive black/gold analytics interface

Integration:
- Added Analytics to the shared site navigation.
- Added an Advanced Analytics promotion on the homepage.
- Updated service worker cache to dhs-v7 and included the new page/assets in the offline shell.

Features and methodology:
- Player comparison is restricted to the same sport.
- Radar chart uses per-game values calculated from the published game-log totals and distinct game numbers. Each radar axis is normalized to the higher value of the two selected players, so it is a relative visual comparison, not a universal rating.
- Team analytics calculates W-L-T, games played, average scored, average allowed, score differential, win rate, and recent five-game form from completed schedule rows.
- Scored-vs-allowed trend chart uses completed games with published scores.
- Recent game spotlight selects the latest dated completed game with player log entries and highlights the player with the highest recorded points (basketball) or goals (soccer). It is explicitly not an official award or Player of the Week.
- Existing athlete profile pages provide shareable/printable season-stat cards. Recruiting details such as position, class year, height, academic information, and contact information are not fabricated or added without approved source data.
- Multi-season career timelines and school all-time records still require historical season sheets and a stable athlete identifier across seasons.

Validation performed:
- JavaScript syntax checks with Node.js.
- HTML parser checks.
- Local asset/link checks for the new page.
- ZIP archive integrity check.

Limitations:
- Live Google Sheets retrieval and rendering require a browser/network test after GitHub Pages deployment.
- Statistics depend on what is currently published in each team's sheets; missing values are not estimated.
