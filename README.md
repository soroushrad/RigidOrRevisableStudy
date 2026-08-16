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


## v2.11 — Revisable step/UI synchronization fix

- Fixed a Revisable-workflow state mismatch where the interface could show no available activities while Continue validated a different step.
- The application now stores the exact workflow step currently rendered on screen.
- Continue validates that rendered step, not a potentially stale numeric index.
- Activity cards and Continue validation now use the same `missingActivitiesForStep()` source of truth.
- If a stale UI is detected, Continue re-renders the current step and reveals the missing activities.
- On mobile, the page scrolls toward the missing activity list when Continue is blocked.


## v2.12 — Revisable workflow logic fix

- Fixed the root cause of the back-and-forth behavior after the unexpected task change.
- Revisable mode now renders the newly active workflow step before opening the revision editor.
- Resolve Conflicts no longer exposes activities from placement steps that have not yet been completed.
- If Resolve Conflicts is moved before Place Flexible Activities, flexible activities stay hidden until the Flexible step is actually reached.
- If Place Flexible Activities comes first, its activities appear there normally; Resolve then operates on the resulting schedule.
- Added explicit tracking of actually completed workflow steps, independent of reordered indexes.


## v2.13 — Submission status fix

- Removed the previous 3-second optimistic success fallback.
- The website no longer claims that Google definitely recorded a response.
- After the hidden Google Form request completes, the UI reports only that the submission request completed.
- If the Google Form navigation does not complete within 12 seconds, an error is shown.
- Participants can retry submission.
- Download Backup remains available as a safety mechanism.


## v2.9 data-collection schema / build v2.14

### Main changes
- Four main trials per participant: exactly 2 Rigid and 2 Revisable.
- Condition order is assigned from four counterbalanced sequences using a pseudonymous participant-ID hash.
- Four non-repeating semantic scenarios are selected within each session.
- A required four-item 7-point Likert questionnaire appears after every valid trial.
- Event logs now use `timestamp` exclusively for real ISO event time.
- Schedule slots use `scheduledTime`; swap events retain `from` and `to`.
- Active constraint-panel openings are logged as `constraints_opened` (and closes as `constraints_closed`).
- Failed verification attempts remain separate log records.
- Full placement / re-placement / swap history is retained.
- Trial objects include `initialWorkflow`, `finalWorkflow`, `ratings`, and `ratingsSubmittedAt`.
- Top-level JSON includes `conditionOrder`.
- Study data version is now `2.9`.

### Version compatibility
Version 2.8 pilot data uses:
- `time` instead of `timestamp` for some event timestamps,
- only two trials,
- no post-trial ratings,
- no `conditionOrder`.

Do not concatenate v2.8 and v2.9 rows without a normalization/migration step.


## v2.15 final UI cleanup

- Removed the non-interactive Rigid/Revisable cards from the start screen.
- The study explanation still describes both workflow conditions.
- Participants now proceed directly from the instructions to **Start Study**.
- Counterbalanced automatic condition assignment is unchanged.
- Study data schema/version remains `2.9`.
