D'Iberville Athletics — Phase 8: Athlete Career Archive Foundation

New files:
- athlete-careers.html / .js / .css: career directory driven by permanent Athlete IDs
- career-archive-template.csv: header template for verified historical season statistics

How it works:
- The career page checks all nine existing published roster sheets for a column named exactly "Athlete ID".
- It lists only records with a nonblank Athlete ID; it never joins athletes by name or jersey number.
- It optionally loads career-archive.csv from the site root. Historical records are grouped by Athlete ID and Metric and can include season, sport, team, and jersey metadata.
- The archive CSV must use the header in career-archive-template.csv. Add verified rows; do not guess identities or historical statistics.

Important setup required:
- Add an "Athlete ID" column to each current team roster sheet and assign each athlete a unique, permanent school-approved identifier.
- Use the same identifier across team changes and seasons.
- Create career-archive.csv from the template and populate it with verified historical statistics. The template itself is intentionally empty; no past seasons or player identities have been fabricated.
- Archive values are summed by Athlete ID + Metric. Keep each statistic's rows additive and avoid duplicate records.

The current roster sheets do not themselves provide a verified cross-season identity key or complete historical season ledger. Therefore, this phase builds the system and data format but does not claim career totals are populated until the school supplies IDs and verified archive rows.

Testing: run JavaScript syntax checks, HTML parsing, local-reference checks, and ZIP integrity checks. Live Google Sheets retrieval still requires browser verification after deployment.
