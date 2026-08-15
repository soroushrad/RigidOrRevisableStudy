# Google Form setup

1. Create five questions:
   - Participant ID — Short answer
   - First Condition — Short answer
   - Rigid Scenario — Short answer
   - Revisable Scenario — Short answer
   - Study JSON — Paragraph
2. Link responses to Google Sheets.
3. Use Google Forms → More → Pre-fill form. Fill all five fields with dummy values and copy the generated link.
4. The URL contains `entry.XXXXXXXX` IDs. Put those IDs into `form-config.js`.
5. Change the responder URL ending `/viewform` to `/formResponse` for `actionUrl`, and set `enabled: true`.

Recommended: do not collect email addresses unless your study protocol requires them.
