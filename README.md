# Rigid or Revisable?

Static HCI study website for GitHub Pages.

## Google Form fields
Create these five fields: Participant ID (short), First Condition (short), Rigid Scenario (short), Revisable Scenario (short), Study JSON (paragraph). Link the Form Responses to Google Sheets, then configure `form-config.js`.

## GitHub Pages
Publish the `main` branch from the repository root in Settings → Pages.


## Connected Google Form

This build is connected to the study Google Form.

Field mapping:

- Participant ID → `entry.2016068576`
- First Condition → `entry.1890343068`
- Rigid Scenario → `entry.9056781`
- Revisable Scenario → `entry.276774702`
- Study JSON → `entry.1163253334`

Form submission endpoint:

`https://docs.google.com/forms/d/e/1FAIpQLSfV1jRkeXix4dCeW58tMerj6zxvCmFLYoChLZnbMOkg19JBqg/formResponse`

Before collecting real participant data, run one complete test and confirm that a new row appears in the linked Google Sheet.


## v2.10 — Mobile and placement fixes

- Prevents activities from silently displacing other activities during Fixed, Constrained, and Flexible placement steps.
- If the participant tries to use an occupied slot, the UI asks them to choose an empty slot.
- If Continue is blocked, the UI now names the exact activity or activities that are still missing.
- Resolve Conflicts supports intuitive swapping when a scheduled activity is moved onto another scheduled activity.
- Added long-press touch reordering for Revisable workflow steps on iPhone/iOS Safari and other touch devices.
- Added a visible drag grip to workflow steps.
