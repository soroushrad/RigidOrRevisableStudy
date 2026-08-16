Rigid or Revisable? — Prototype v2

HOW TO RUN
1. Extract the ZIP.
2. Open index.html in a modern browser.
3. No backend or installation is required.

WHAT CHANGED IN V2
- Removed the visible Interaction Log.
- Added an opening screen where the participant chooses Rigid or Revisable first.
- The participant completes both conditions sequentially.
- The second condition uses a different scheduling scenario.
- Strategy is now operational: the current workflow step controls which actions are available.
- Rigid = fixed workflow order.
- Revisable = after the unexpected task change, the participant can reorder the remaining actionable workflow steps.
- Increased task complexity to 8 activities and 8 constraints.
- Unexpected change happens after constrained activities have been placed.
- Internal interaction logging remains hidden from the participant.
- Final study data can be exported as JSON.

NOTE
This is still a concept prototype. The next step would be calibrating task difficulty,
balancing the two scenarios, and deciding the final experimental measures.


V2.1 FIX
--------
- Verification no longer traps the participant on an invalid solution.
- Verify Schedule now includes "Return to Resolve Conflicts".
- After returning, the participant can freely rearrange scheduled activities.
- The participant then proceeds back to Verify Schedule and checks again.
- This preserves the Rigid workflow structure: the sequence cannot be reordered,
  but correction loops between Resolve Conflicts and Verify are allowed.


V2.2 FIX
--------
- Fixed duplicate activities in Resolve Conflicts.
- Activities already placed in the schedule now appear only in the timeline.
- The left column in Resolve Conflicts now shows only genuinely unscheduled activities.
- If every activity is scheduled, the left side shows a short instruction instead of duplicate cards.
- If an activity is displaced from an occupied slot, it correctly returns to the Unscheduled activities area.


V2.3 FIXES
----------
1. Fixed second-test premature completion:
   - The Finish Test action no longer remains attached to the Continue button.
   - Each new trial resets its completion state.
   - A test can finish only after Verify Schedule reports a valid solution.

2. Revisable workflow can now be edited repeatedly:
   - After the unexpected change, a persistent "Revise workflow" button is available.
   - The participant may reopen the workflow editor multiple times.
   - Only the current and remaining actionable steps are reordered.
   - Completed steps stay fixed and Verify Schedule remains pinned last.
   - "Keep current order" closes the editor without applying changes.

3. Returning from Verify to Resolve resets the finish state, so the participant must verify again.


V2.4 — INCREASED TASK DIFFICULTY
--------------------------------
- Increased each scenario from 8 activities to 11 activities.
- Increased the number of constraints and dependencies to 11 rules per scenario.
- Added a third fixed activity.
- Added an additional constrained dependency (Library before Museum/Gallery).
- Added an additional flexible activity.
- Extended the timeline through 20:00.
- The activity affected by the unexpected change now shows its updated rule directly on the card.
- Both scenarios are structurally balanced but use different labels/times.


V2.5 — START-SCREEN STUDY GUIDE
-------------------------------
- Added a neutral explanation of the study goal.
- Added step-by-step participant instructions.
- Added clear explanations of Rigid and Revisable workflows.
- Clarified that both workflow styles will be completed.
- Clarified that the opening choice only determines condition order.
- Wording is intentionally neutral so one condition is not framed as better than the other.


V2.6 — RANDOMIZED BALANCED TASKS
--------------------------------
- Added a bank of 8 semantically different scheduling scenarios.
- Added 3 matched timing templates.
- Every new trial randomly generates a scenario from the bank.
- Rigid and Revisable conditions never use the same semantic scenario within one study session.
- Restarting the full prototype generates new randomized tasks again.
- The constraint structure remains matched across scenarios to keep difficulty comparable.
- Randomization changes activity names and timing templates without creating arbitrary or potentially unsolvable tasks.
- Scenario key/title are stored in the exported JSON for later analysis.


V2.7 — REVISION ATTENTION HIGHLIGHT
-----------------------------------
- Added a red highlighted box around "Revise the remaining workflow".
- Added a short guidance note inside the revision area.
- The highlight appears when the revision editor opens.
- The highlight is removed after applying or canceling the revision.


V2.8 — GitHub Pages + Google Forms submission added.


V2.9 — GOOGLE FORM CONNECTED
-----------------------------
The live Google Form endpoint and all five entry IDs are configured.
Submit Data now posts the completed two-test study payload to the linked Google Form/Google Sheet.


V2.10 — MOBILE + MISSING-ACTIVITY FIX
------------------------------------
- Fixed hidden missing-activity states caused by dropping onto occupied slots.
- Continue now reports the exact missing activity names.
- Added long-press touch drag for Revisable workflow steps on mobile/iPhone.


V2.11 — REVISABLE STEP SYNC FIX
-------------------------------
- Fixed mismatch between visible activity list and Continue validation after workflow revision.
- UI and validation now share one source of truth for missing activities.
- The exact rendered workflow step is tracked and validated.


V2.12 — WORKFLOW LOGIC FIX
--------------------------
- Fixed stale workspace after unexpected change in Revisable mode.
- Resolve Conflicts only exposes activities from completed placement steps.
- Flexible activities no longer appear early when Resolve is moved ahead of Flexible.
- Added actual completed-step tracking for reordered workflows.


V2.13 — SUBMISSION STATUS FIX
-----------------------------
- Removed false-positive automatic "Data Submitted" status.
- Submission can now be retried.
- A timeout now reports an error instead of success.


V2.14 BUILD / STUDY DATA VERSION 2.9
------------------------------------
- Standardized event timestamps.
- Added constraint-panel open/close logs.
- Added post-trial questionnaire after every trial.
- Expanded main study from 2 to 4 trials (2 Rigid + 2 Revisable).
- Added balanced condition-order assignment.
- Enforced four different scenarios per participant session.
- Added conditionOrder and questionnaire data to JSON.


V2.15 — FINAL UI CLEANUP
------------------------
- Removed non-interactive Rigid/Revisable cards from the start screen.
- Start Study now follows the study instructions directly.
- Experimental logic and data schema remain unchanged.
