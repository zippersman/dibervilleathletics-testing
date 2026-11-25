D'Iberville Athletics — Phase 6: Player Awards & Performance Recognition

New page:
- player-awards.html: weekly statistical spotlight for basketball and soccer
- player-awards.js: reads each team's published schedule and game-log CSV data
- player-awards.css: responsive black/gold awards presentation

How it works:
- For each sport, identifies the latest dated completed game in the published schedules.
- Defines the spotlight week as the seven calendar days ending on that latest game date.
- Aggregates player game-log rows that match completed games in that window.
- Basketball is ranked by total points; supporting assists and rebounds are shown.
- Soccer is ranked by total goals; supporting assists and shots on target are shown.
- Links each athlete to their existing shareable profile.
- Labels results as statistical standouts, not official school/coach/conference awards.
- Missing data is not estimated. If a team's published data cannot be fetched, the status reports partial source availability.

Integration:
- Added Awards to shared navigation and a Player Awards promotion on the homepage.
- Fixed a duplicate Analytics navigation item found in the Phase 5 shared nav.
- Bumped service-worker cache to dhs-v8 and added awards page/assets to offline shell.

Important limitations:
- This is an automatically calculated spotlight, not an official award decision.
- Window is anchored to the latest game date in each sport, not the current calendar week, so it remains useful between games.
- Career awards and all-time school records still require archived season sheets and stable athlete IDs across seasons.
- Live Google Sheets requests require browser/network verification after GitHub Pages deployment.
