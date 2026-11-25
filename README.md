D’Iberville Athletics

Static website for D’Iberville athletics, published with GitHub Pages.

Current features
- Basketball and soccer team hubs and team statistics pages
- Latest results across teams
- Cross-team player search
- Statistics glossary on team pages
- Statistics Center with cross-team player comparisons
- Game Center with cross-team scoreboards, W-L records, recent form, scoring trends, player leaderboards, and shareable game breakdowns
- Shareable comparison URLs
- Service-worker caching for the app shell, Statistics Center, and Game Center

Data source
Team statistics are read from the published Google Sheets configured in the page scripts. Update those source sheets to update the site data.

Deployment
Upload the contents of this folder to the repository root and publish with GitHub Pages. Keep the HTML, JavaScript, CSS, images, and icons in their existing relative paths.


Athlete Directory
- `athlete-profiles.html` is the searchable all-team directory, with live roster data, sport/team filters, and shareable season-stat profile views.
- It is linked from the shared More navigation, the homepage, and Advanced Analytics.
- `athlete-careers.html` remains a separate multi-season career archive based on permanent Athlete IDs.
