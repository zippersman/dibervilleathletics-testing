D'Iberville Athletics — Phase 7: Season Milestones & Achievement Cards

New page:
- milestones.html: searchable/filterable season statistical milestone directory
- milestones.js: reads current published roster sheets for all nine teams
- milestones.css: responsive black/gold presentation and print styling

Features:
- Filters by sport, team, statistical category, athlete name, and jersey number.
- Basketball thresholds: points (100/250/500), rebounds (50/100/200), assists (25/50/100), steals (15/30/50), blocks (10/25/50).
- Soccer thresholds: goals (5/10/20), assists (5/10/20), shots on target (10/25/50), saves (10/25/50), tackles (10/25/50).
- Athlete links open the existing shareable athlete profile.
- Print achievement card opens a print-friendly recognition graphic.
- Shows source availability and last checked time.

Important data limitations:
- Thresholds are site-defined recognition levels, not official school awards or records.
- Values are taken from the current published team roster sheets. They are season-sheet values, not career totals.
- No player identity is inferred across teams or seasons. The existing team + jersey profile key is used only to link to the current team roster profile.
- A milestone appears only if the relevant statistic column exists and contains a numeric value. Missing data is not estimated.
- Live Google Sheets requests require browser/network verification after GitHub Pages deployment.

Integration:
- Added Milestones to shared navigation.
- Added page assets to service-worker shell and bumped cache to dhs-v9.
- Preserved prior Phase 1–6 pages and assets.
