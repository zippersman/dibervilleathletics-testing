D'Iberville Athletics — Phase 3 additions

New files:
- athlete-profiles.html: searchable all-team athlete directory and shareable profile view
- athlete-profiles.js: reads the existing published roster/stat CSV sheets for all nine teams
- athlete-profiles.css: responsive athlete directory, profile, and print styles

Integration:
- Shared navigation now includes an Athletes link.
- Service worker cache version updated and includes the new athlete page assets.

Profile URLs use #player=TEAMID%3AJERSEY and can be copied/shared.
The printable athlete card uses the browser print dialog.

Data limitations:
Profiles show only fields present in the current published player sheet. No class year,
position, height, biography, headshot, awards, or career totals are fabricated. The current
source is a season snapshot; true multi-season career records require historical player data
with a stable athlete identifier across seasons.
