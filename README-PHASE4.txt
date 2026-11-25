D'Iberville Athletics — Phase 4 additions

New page:
- records-history.html: season record book, team season summaries, latest-game scoring spotlight
- records-history.js: reads existing published schedule and player game-log CSV sheets for all nine teams
- records-history.css: responsive dark/gold presentation

Integration:
- Added Records navigation link through the shared navigation script.
- Updated service worker cache version and shell list.

Data methodology and limitations:
- Basketball leaderboard categories: total points, assists, rebounds.
- Soccer leaderboard categories: total goals, assists, saves.
- Totals are summed from published player game-log rows and games played counts distinct game numbers.
- Team records are calculated from completed schedule scores.
- Latest-game spotlight is the highest scoring player in each sport/team's latest completed game among the current filter. It is not a weekly award and is not represented as one.
- The connected sources provide current season sheets. Multi-year career timelines and school all-time records cannot be calculated until historical season sheets and stable athlete identifiers are supplied.
- No stats, awards, player identities, or historical records are fabricated.
