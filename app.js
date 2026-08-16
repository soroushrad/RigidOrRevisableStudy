
const SCENARIO_BANK = [
  {
    key: "city",
    title: "Plan a City Day",
    names: {
      fixed1: "Appointment",
      fixed2: "Team Meeting",
      final: "Station",
      changed: "Museum",
      afterChanged: "Lunch",
      early: "Shopping",
      late: "Gym",
      beforeChanged: "Library",
      afterFixed: "Coffee",
      beforeFinal: "Park",
      free: "Bookstore"
    }
  },
  {
    key: "personal",
    title: "Plan a Personal Day",
    names: {
      fixed1: "Doctor",
      fixed2: "Project Meeting",
      final: "Train",
      changed: "Gallery",
      afterChanged: "Dinner",
      early: "Grocery",
      late: "Workout",
      beforeChanged: "Library",
      afterFixed: "Café",
      beforeFinal: "Walk",
      free: "Pharmacy"
    }
  },
  {
    key: "campus",
    title: "Plan a Campus Day",
    names: {
      fixed1: "Advisor Meeting",
      fixed2: "Seminar",
      final: "Bus Home",
      changed: "Research Lab",
      afterChanged: "Study Session",
      early: "Print Documents",
      late: "Sports Center",
      beforeChanged: "Computer Lab",
      afterFixed: "Coffee Break",
      beforeFinal: "Campus Walk",
      free: "Bookstore Visit"
    }
  },
  {
    key: "conference",
    title: "Plan a Conference Day",
    names: {
      fixed1: "Registration",
      fixed2: "Keynote",
      final: "Shuttle",
      changed: "Poster Session",
      afterChanged: "Networking",
      early: "Workshop Check-in",
      late: "Panel Discussion",
      beforeChanged: "Demo Hall",
      afterFixed: "Coffee Break",
      beforeFinal: "Sponsor Booths",
      free: "Exhibition"
    }
  },
  {
    key: "weekend",
    title: "Plan a Weekend Day",
    names: {
      fixed1: "Brunch Reservation",
      fixed2: "Cinema",
      final: "Last Train",
      changed: "Aquarium",
      afterChanged: "Dinner",
      early: "Market",
      late: "Evening Walk",
      beforeChanged: "Old Town",
      afterFixed: "Dessert",
      beforeFinal: "Riverside",
      free: "Souvenir Shop"
    }
  },
  {
    key: "errands",
    title: "Plan an Errand Day",
    names: {
      fixed1: "Bank Appointment",
      fixed2: "Car Service",
      final: "Pick-up",
      changed: "Post Office",
      afterChanged: "Lunch",
      early: "Bakery",
      late: "Gym",
      beforeChanged: "Copy Shop",
      afterFixed: "Coffee",
      beforeFinal: "Supermarket",
      free: "Electronics Store"
    }
  },
  {
    key: "travel",
    title: "Plan a Travel Day",
    names: {
      fixed1: "Hotel Check-out",
      fixed2: "Guided Tour",
      final: "Airport Transfer",
      changed: "Castle",
      afterChanged: "Lunch",
      early: "Local Market",
      late: "Observation Deck",
      beforeChanged: "Cathedral",
      afterFixed: "Coffee Stop",
      beforeFinal: "River Walk",
      free: "Gift Shop"
    }
  },
  {
    key: "workday",
    title: "Plan a Work Day",
    names: {
      fixed1: "Client Call",
      fixed2: "Team Review",
      final: "Commute Home",
      changed: "Prototype Review",
      afterChanged: "Documentation",
      early: "Prepare Slides",
      late: "Training Session",
      beforeChanged: "Data Check",
      afterFixed: "Coffee Break",
      beforeFinal: "Inbox Review",
      free: "Admin Task"
    }
  }
];

const TIME_TEMPLATES = [
  {
    fixed1:"12:00",
    fixed2:"14:00",
    final:"20:00",
    initialChangedBefore:"12:00",
    changedAfter:"16:00",
    earlyBefore:"12:00",
    lateAfter:"18:00"
  },
  {
    fixed1:"13:00",
    fixed2:"15:00",
    final:"20:00",
    initialChangedBefore:"12:00",
    changedAfter:"16:00",
    earlyBefore:"12:00",
    lateAfter:"18:00"
  },
  {
    fixed1:"12:00",
    fixed2:"15:00",
    final:"20:00",
    initialChangedBefore:"11:00",
    changedAfter:"16:00",
    earlyBefore:"12:00",
    lateAfter:"18:00"
  }
];

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateScenario(excludedKeys = []) {
  const available = SCENARIO_BANK.filter(s => !excludedKeys.includes(s.key));
  const theme = randomChoice(available.length ? available : SCENARIO_BANK);
  const times = randomChoice(TIME_TEMPLATES);
  const n = theme.names;

  const ids = {
    fixed1:"fixed1",
    fixed2:"fixed2",
    final:"final",
    changed:"changed",
    afterChanged:"afterChanged",
    early:"early",
    late:"late",
    beforeChanged:"beforeChanged",
    afterFixed:"afterFixed",
    beforeFinal:"beforeFinal",
    free:"free"
  };

  return {
    key: theme.key,
    title: theme.title,
    changeConstraintIndex: 3,
    changeTarget: ids.changed,
    changedNote: `Updated: Available only from ${times.changedAfter} onward`,
    change: `The ${n.changed} is no longer available at its original time. It can now only start at ${times.changedAfter} or later.`,
    activities: [
      {id:ids.fixed1, name:n.fixed1, group:"fixed", note:`Fixed at ${times.fixed1}`},
      {id:ids.fixed2, name:n.fixed2, group:"fixed", note:`Fixed at ${times.fixed2}`},
      {id:ids.final, name:n.final, group:"fixed", note:`Fixed at ${times.final} and must be last`},

      {id:ids.changed, name:n.changed, group:"constrained", note:`Initially must start before ${times.initialChangedBefore}`},
      {id:ids.afterChanged, name:n.afterChanged, group:"constrained", note:`Must be after ${n.changed}`},
      {id:ids.early, name:n.early, group:"constrained", note:`Must start before ${times.earlyBefore}`},
      {id:ids.late, name:n.late, group:"constrained", note:`Must start at ${times.lateAfter} or later`},
      {id:ids.beforeChanged, name:n.beforeChanged, group:"constrained", note:`Must be before ${n.changed}`},

      {id:ids.afterFixed, name:n.afterFixed, group:"flexible", note:`Must be after ${n.fixed2}`},
      {id:ids.beforeFinal, name:n.beforeFinal, group:"flexible", note:`Must be before ${n.final}`},
      {id:ids.free, name:n.free, group:"flexible", note:"Can be scheduled in any free slot"}
    ],
    constraints: [
      `${n.fixed1} is fixed at ${times.fixed1}.`,
      `${n.fixed2} is fixed at ${times.fixed2}.`,
      `${n.final} is fixed at ${times.final} and must be the final activity.`,
      `${n.changed} initially must start before ${times.initialChangedBefore}.`,
      `${n.afterChanged} must be scheduled after ${n.changed}.`,
      `${n.early} must start before ${times.earlyBefore}.`,
      `${n.late} must start at ${times.lateAfter} or later.`,
      `${n.beforeChanged} must be before ${n.changed}.`,
      `${n.afterFixed} must be after ${n.fixed2}.`,
      `${n.beforeFinal} must be before ${n.final}.`,
      `${n.free} may use any remaining free time slot.`
    ],
    validate(schedule, changed) {
      return validateCommon(schedule, changed, {
        fixed: {
          [ids.fixed1]: times.fixed1,
          [ids.fixed2]: times.fixed2,
          [ids.final]: times.final
        },
        before: [{id:ids.early, time:times.earlyBefore}],
        afterOrEqual: [{id:ids.late, time:times.lateAfter}],
        relations: [
          [ids.afterChanged,"after",ids.changed],
          [ids.beforeChanged,"before",ids.changed],
          [ids.afterFixed,"after",ids.fixed2],
          [ids.beforeFinal,"before",ids.final]
        ],
        changeTarget:ids.changed,
        initialRule: {type:"before", time:times.initialChangedBefore},
        changedRule: {type:"afterOrEqual", time:times.changedAfter},
        last:ids.final
      });
    }
  };
}

const BASE_STEPS = [
  {id:"review", label:"Review constraints"},
  {id:"fixed", label:"Place fixed activities"},
  {id:"constrained", label:"Place constrained activities"},
  {id:"flexible", label:"Place flexible activities"},
  {id:"resolve", label:"Resolve conflicts"},
  {id:"verify", label:"Verify schedule"}
];

const SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

const CONDITION_ORDERS = [
  ["rigid", "revisable", "revisable", "rigid"],
  ["revisable", "rigid", "rigid", "revisable"],
  ["rigid", "revisable", "rigid", "revisable"],
  ["revisable", "rigid", "revisable", "rigid"]
];

function participantHash(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function assignConditionOrder(participantId) {
  return [...CONDITION_ORDERS[participantHash(participantId) % CONDITION_ORDERS.length]];
}

function createParticipantId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0,14);
  const random = Math.random().toString(36).slice(2,8).toUpperCase();
  return `P-${stamp}-${random}`;
}

let state = freshState();

function freshState() {
  const participantId = createParticipantId();
  const conditionOrder = assignConditionOrder(participantId);

  return {
    firstCondition:conditionOrder[0],
    conditionOrder,
    currentCondition:null,
    completedConditions:[],
    currentTrialIndex:0,
    scenarioIndex:0,
    activeScenario:null,
    usedScenarioKeys:[],
    steps:BASE_STEPS.map(x=>({...x})),
    currentStepIndex:0,
    schedule:{},
    changed:false,
    changeSeen:false,
    revisionApplied:false,
    revisionOpen:false,
    canFinish:false,
    renderedStepId:null,
    completedStepIds:[],
    participantId,
    submitted:false,
    submissionPending:false,
    logs:[],
    allTrials:[],
    pendingTrial:null,
    finalPreference:null,
    finalComment:"",
    finalFeedbackSubmittedAt:null
  };
}

const $ = id => document.getElementById(id);

function showOnly(id) {
  ["startScreen","taskScreen","questionnaireScreen","betweenScreen","finalFeedbackScreen","endScreen"].forEach(x => $(x).classList.add("hidden"));
  $(id).classList.remove("hidden");
}

function log(action, extra={}) {
  state.logs.push({
    timestamp:new Date().toISOString(),
    condition:state.currentCondition,
    scenario:state.scenarioIndex,
    step:state.steps[state.currentStepIndex]?.id || null,
    action,
    ...extra
  });
}

function startStudy() {
  state.currentTrialIndex = 0;
  state.firstCondition = state.conditionOrder[0];
  startTrial(state.conditionOrder[0], 0);
}

function startTrial(condition, trialIndex) {
  state.currentCondition = condition;
  state.currentTrialIndex = trialIndex;
  state.scenarioIndex = trialIndex;

  // Four different semantic scenarios are used within one participant session.
  state.activeScenario = generateScenario(state.usedScenarioKeys);
  state.usedScenarioKeys.push(state.activeScenario.key);

  state.steps = BASE_STEPS.map(x=>({...x}));
  state.currentStepIndex = 0;
  state.schedule = {};
  state.changed = false;
  state.changeSeen = false;
  state.revisionApplied = false;
  state.revisionOpen = false;
  state.canFinish = false;
  state.renderedStepId = null;
  state.completedStepIds = [];
  state.logs = [];
  state.pendingTrial = null;

  log("trial_started", {
    scenarioKey:state.activeScenario.key,
    scenarioTitle:state.activeScenario.title,
    trialIndex
  });

  showOnly("taskScreen");
  renderTrial();
}

function currentScenario(){ return state.activeScenario; }
function currentStep(){ return state.steps[state.currentStepIndex]; }

function renderTrial() {
  const sc = currentScenario();
  $("trialTitle").textContent = sc.title;
  $("conditionPill").textContent = state.currentCondition === "rigid" ? "Rigid Workflow" : "Revisable Workflow";
  $("progressPill").textContent = `Trial ${state.currentTrialIndex + 1} of 4`;

  $("workflowExplanation").textContent =
    state.currentCondition === "rigid"
      ? "The workflow order is fixed. The workspace changes according to the active strategy step."
      : "The workflow controls the workspace. After the unexpected change, you may reorganize the remaining steps.";

  renderWorkflow();
  renderConstraints();
  renderCurrentStep();
}

function renderWorkflow() {
  $("workflowList").innerHTML = "";
  state.steps.forEach((s, i) => {
    const d = document.createElement("div");
    d.className = "workflow-step";
    if (i === state.currentStepIndex) d.classList.add("current");
    if (state.completedStepIds.includes(s.id)) d.classList.add("done");
    d.innerHTML = `<div class="workflow-index">${i+1}</div><div class="workflow-label">${s.label}</div>`;
    $("workflowList").appendChild(d);
  });

  const unfinishedFromHere = state.steps
    .slice(state.currentStepIndex)
    .filter(s =>
      s.id !== "verify" &&
      (s.id === currentStep()?.id || !state.completedStepIds.includes(s.id))
    );

  const canReviseNow =
    state.currentCondition === "revisable" &&
    state.changed &&
    currentStep()?.id !== "verify" &&
    unfinishedFromHere.length >= 2;

  $("openRevisionBtn").classList.toggle("hidden", !canReviseNow || state.revisionOpen);

  if (!state.revisionOpen) {
    $("reorderArea").classList.add("hidden");
    $("reorderArea").classList.remove("highlight-attention");
  }
}

function renderConstraints() {
  const sc = currentScenario();
  $("constraintsList").innerHTML = "";
  sc.constraints.forEach((c,i) => {
    const li = document.createElement("li");
    if (state.changed && i === sc.changeConstraintIndex) {
      li.innerHTML = `<s>${c}</s> <strong>Updated: ${sc.change}</strong>`;
    } else {
      li.textContent = c;
    }
    $("constraintsList").appendChild(li);
  });
  $("constraintCount").textContent = `${sc.constraints.length} rules`;
  $("changeNotice").classList.toggle("hidden", !state.changed);
  if (state.changed) $("changeText").textContent = sc.change;
}

function renderCurrentStep() {
  const step = currentStep();
  state.renderedStepId = step.id;
  $("taskScreen").dataset.renderedStep = step.id;
  $("currentStepTitle").textContent = step.label;
  $("stepMessage").textContent = "";
  $("stepMessage").className = "step-message";
  if (step.id === "verify") {
    $("continueBtn").textContent = "Finish Test";
    $("continueBtn").classList.toggle("hidden", !state.canFinish);
  } else {
    $("continueBtn").textContent = "Continue";
    $("continueBtn").classList.remove("hidden");
  }

  const help = {
    review:"Read all constraints carefully before you begin placing activities.",
    fixed:"Only fixed activities are available in this step. Place them at their required times.",
    constrained:"Now place activities that have explicit time or ordering constraints.",
    flexible:"Place the remaining flexible activities. You can resolve conflicts in the next step.",
    resolve:"All scheduled activities are now editable. Reorganize the plan until the changed problem can be solved.",
    verify:"Check whether your final schedule satisfies every current constraint."
  };
  $("currentStepHelp").textContent = help[step.id];

  if (step.id === "review") renderReviewStep();
  else if (["fixed","constrained","flexible","resolve"].includes(step.id)) renderPlanningStep(step.id);
  else if (step.id === "verify") renderVerifyStep();

  renderWorkflow();
}

function renderReviewStep() {
  $("constraintsPanel").classList.remove("hidden");
  $("workspace").innerHTML = `
    <div class="review-box">
      <div class="review-inner">
        <h3>Before you begin</h3>
        <p class="support-text">
          The workflow is part of the task. Each strategy step exposes the actions relevant to that stage of problem solving.
          Read the constraints, then continue.
        </p>
        <ul>
          <li>There are 11 activities and several dependencies between them.</li>
          <li>Fixed activities have exact times and should be anchored first.</li>
          <li>Constrained activities depend on time windows or other activities.</li>
          <li>Flexible activities are placed later, but may still depend on earlier choices.</li>
          <li>The problem may change unexpectedly while you work.</li>
        </ul>
      </div>
    </div>`;
}

function renderPlanningStep(stepId) {
  const sc = currentScenario();
  const scheduledIds = Object.values(state.schedule);

  let cards = "";
  let columnTitle = "Activities available in this step";
  let emptyMessage = "No activities available here.";

  if (stepId === "resolve") {
    // Resolve Conflicts can only use activity groups that have already been
    // introduced by completed placement steps. If Resolve is moved before
    // Flexible, flexible activities must stay hidden until Flexible is reached.
    const introducedGroups = new Set(
      state.completedStepIds.filter(id =>
        ["fixed", "constrained", "flexible"].includes(id)
      )
    );

    const unscheduled = sc.activities.filter(
      a => !scheduledIds.includes(a.id) && introducedGroups.has(a.group)
    );

    cards = unscheduled.map(a => activityCardHTML(a, true)).join("");
    columnTitle = "Unscheduled activities";
    emptyMessage = "All activities introduced so far are scheduled. Adjust them directly in the schedule.";
  } else {
    // Use the exact same source of truth as Continue validation.
    // This guarantees that anything reported as "missing" is also visible
    // in "Activities available in this step".
    const missingForThisStep = missingActivitiesForStep(stepId);
    cards = missingForThisStep
      .map(a => activityCardHTML(a, true))
      .join("");
  }

  $("workspace").innerHTML = `
    <div class="workspace-grid">
      <div class="activity-column">
        <h3>${columnTitle}</h3>
        <div class="activity-pool" id="activityPool">${cards || `<p class="support-text">${emptyMessage}</p>`}</div>
      </div>
      <div class="timeline-column">
        <h3>Schedule</h3>
        <div class="timeline" id="timeline"></div>
      </div>
    </div>`;

  renderTimeline(stepId);
  enableDrag(stepId);
}

function activityCardHTML(a, enabled) {
  const sc = currentScenario();
  const note =
    state.changed && a.id === sc.changeTarget
      ? sc.changedNote
      : a.note;

  return `<div class="activity ${enabled ? "" : "locked"}" draggable="${enabled}" data-activity="${a.id}">
    <strong>${a.name}</strong><span>${note}</span>
  </div>`;
}

function renderTimeline(stepId) {
  const tl = $("timeline");
  tl.innerHTML = "";
  const sc = currentScenario();

  SLOTS.forEach(time => {
    const id = state.schedule[time];
    const a = sc.activities.find(x=>x.id===id);
    let card = "";
    if (a) {
      const movable = stepId === "resolve" || a.group === stepId;
      card = activityCardHTML(a, movable);
    }

    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.time = time;
    slot.innerHTML = `<div class="slot-time">${time}</div><div class="slot-content">${card}</div>`;
    tl.appendChild(slot);
  });
}

function enableDrag(stepId) {
  document.querySelectorAll('.activity[draggable="true"]').forEach(el => {
    el.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", el.dataset.activity);
      log("drag_start",{activity:el.dataset.activity});
    });
  });

  document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", e => {
      e.preventDefault();
      slot.classList.add("active-drop");
    });
    slot.addEventListener("dragleave", ()=>slot.classList.remove("active-drop"));
    slot.addEventListener("drop", e => {
      e.preventDefault();
      slot.classList.remove("active-drop");
      const activityId = e.dataTransfer.getData("text/plain");
      if (!activityId) return;
      placeActivity(activityId, slot.dataset.time, stepId);
    });
  });
}

function placeActivity(activityId, time, stepId) {
  const sc = currentScenario();
  const activity = sc.activities.find(a => a.id === activityId);
  if (!activity) return;

  const allowed = stepId === "resolve" || activity.group === stepId;
  if (!allowed) return;

  const oldTime = Object.keys(state.schedule).find(t => state.schedule[t] === activityId) || null;
  const occupyingId = state.schedule[time] || null;

  // During the structured placement steps, never silently remove an
  // activity that is already in an occupied time slot. This previously
  // created hidden "missing activity" states.
  if (stepId !== "resolve" && occupyingId && occupyingId !== activityId) {
    const occupying = sc.activities.find(a => a.id === occupyingId);
    $("stepMessage").textContent =
      `${time} is already occupied by ${occupying?.name || "another activity"}. Choose an empty time slot.`;
    $("stepMessage").className = "step-message error";
    log("occupied_slot_rejected", {
      attemptedActivity:activityId,
      occupiedBy:occupyingId,
      scheduledTime:time
    });
    return;
  }

  // Resolve Conflicts is intentionally flexible. If a scheduled activity
  // is moved onto another scheduled activity, swap their time slots.
  if (stepId === "resolve" && occupyingId && occupyingId !== activityId && oldTime) {
    state.schedule[oldTime] = occupyingId;
    state.schedule[time] = activityId;

    log("activities_swapped", {
      activity:activityId,
      scheduledTime:time,
      from:oldTime,
      to:time,
      swappedWith:occupyingId
    });

    renderCurrentStep();
    return;
  }

  // If an unscheduled activity is placed on an occupied slot during
  // Resolve, the displaced activity becomes explicitly unscheduled and
  // therefore appears in the left-hand "Unscheduled activities" list.
  if (stepId === "resolve" && occupyingId && occupyingId !== activityId && !oldTime) {
    delete state.schedule[time];
    log("activity_displaced_to_unscheduled", {
      activity:occupyingId,
      scheduledTime:time
    });
  }

  if (oldTime) {
    delete state.schedule[oldTime];
  }

  state.schedule[time] = activityId;
  log("activity_placed", {
    activity:activityId,
    scheduledTime:time,
    ...(oldTime && oldTime !== time ? {from:oldTime, to:time, rePlacement:true} : {})
  });
  renderCurrentStep();
}

function missingActivitiesForStep(stepId) {
  const sc = currentScenario();
  if (!["fixed","constrained","flexible"].includes(stepId)) return [];

  const scheduledIds = Object.values(state.schedule);
  return sc.activities.filter(
    a => a.group === stepId && !scheduledIds.includes(a.id)
  );
}

function requiredPlacedForStep(stepId) {
  return missingActivitiesForStep(stepId).length === 0;
}

function continueStep() {
  // Always validate the step the participant is actually looking at.
  // Reordering the Revisable workflow can change indexes, so relying only
  // on currentStepIndex can produce UI/validation mismatches.
  const visibleStepId = state.renderedStepId || currentStep()?.id;
  const visibleIndex = state.steps.findIndex(s => s.id === visibleStepId);

  if (visibleIndex !== -1 && visibleIndex !== state.currentStepIndex) {
    state.currentStepIndex = visibleIndex;
  }

  const step = currentStep();
  if (!step) return;

  const missing = missingActivitiesForStep(step.id);

  if (missing.length > 0) {
    // Re-render first so a stale UI is repaired immediately.
    renderCurrentStep();

    const names = missing.map(a => a.name).join(", ");
    $("stepMessage").textContent =
      `Still missing in this step: ${names}. Please place ${missing.length === 1 ? "this activity" : "these activities"} before continuing.`;
    $("stepMessage").className = "step-message error";

    log("continue_blocked_missing_activities", {
      renderedStep: visibleStepId,
      validatedStep: step.id,
      missing: missing.map(a => a.id).join(",")
    });

    // On narrow/mobile screens, bring the available activities back into view.
    const activityPool = document.getElementById("activityPool");
    if (activityPool && activityPool.children.length > 0) {
      setTimeout(() => {
        activityPool.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
    return;
  }

  if (!state.completedStepIds.includes(step.id)) {
    state.completedStepIds.push(step.id);
  }

  log("step_completed", {
    step: step.id,
    renderedStep: visibleStepId,
    completedSteps: state.completedStepIds.join(">")
  });

  // Trigger unexpected change immediately after constrained activities are placed.
  if (step.id === "constrained" && !state.changed) {
    state.changed = true;
    showChangeModal();
    renderConstraints();
    return;
  }

  if (state.currentStepIndex < state.steps.length - 1) {
    state.currentStepIndex++;
    renderCurrentStep();
  }
}

function showChangeModal() {
  const sc = currentScenario();
  $("modalChangeText").textContent = sc.change;
  $("rigidModalCopy").classList.toggle("hidden", state.currentCondition !== "rigid");
  $("revisableModalCopy").classList.toggle("hidden", state.currentCondition !== "revisable");
  $("changeModal").classList.remove("hidden");
  log("unexpected_change_shown",{change:sc.change});
}

function afterChangeModal() {
  $("changeModal").classList.add("hidden");
  state.changeSeen = true;

  // Move to the next original step: flexible.
  state.currentStepIndex++;

  // Always render the newly active step before opening the revision editor.
  // This prevents the old constrained-step workspace from remaining visible.
  renderCurrentStep();

  if (state.currentCondition === "revisable") {
    showRevisionControls();
  }
}

function showRevisionControls() {
  if (
    state.currentCondition !== "revisable" ||
    !state.changed ||
    currentStep()?.id === "verify"
  ) return;

  state.revisionOpen = true;
  $("openRevisionBtn").classList.add("hidden");
  $("reorderArea").classList.remove("hidden");
  $("reorderArea").classList.add("highlight-attention");

  // Only the current step and unfinished future actionable steps can be revised.
  // Completed steps stay fixed; Verify remains pinned last.
  const remaining = state.steps
    .slice(state.currentStepIndex)
    .filter(s =>
      s.id !== "verify" &&
      (s.id === currentStep()?.id || !state.completedStepIds.includes(s.id))
    );

  $("reorderList").innerHTML = remaining.map(s =>
    `<div class="reorder-item" draggable="true" data-id="${s.id}">
      <span class="reorder-grip">☰</span>
      <span>${s.label}</span>
    </div>`
  ).join("");

  enableReorder();
  log("workflow_revision_opened", {
    currentStep: currentStep()?.id || null,
    remainingOrder: remaining.map(s => s.id).join(">")
  });
}

function enableReorder() {
  let dragged = null;

  document.querySelectorAll(".reorder-item").forEach(item => {
    // Desktop / mouse HTML5 drag.
    item.addEventListener("dragstart", () => {
      dragged = item;
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      dragged = null;
    });

    item.addEventListener("dragover", e => {
      e.preventDefault();
      if (!dragged || dragged === item) return;

      const list = $("reorderList");
      const rect = item.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height / 2;
      list.insertBefore(dragged, after ? item.nextSibling : item);
    });

    // Mobile / touch long-press drag. Native HTML5 drag is not reliable
    // on iPhone Safari, so touch reordering is handled explicitly.
    let longPressTimer = null;
    let touchDragging = false;
    let activeTouchId = null;

    const clearLongPress = () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    item.addEventListener("touchstart", e => {
      if (e.touches.length !== 1) return;

      activeTouchId = e.touches[0].identifier;
      const startX = e.touches[0].clientX;
      const startY = e.touches[0].clientY;

      clearLongPress();
      longPressTimer = setTimeout(() => {
        touchDragging = true;
        dragged = item;
        item.classList.add("dragging", "touch-dragging");
        document.body.classList.add("workflow-touch-drag-active");

        if (navigator.vibrate) {
          try { navigator.vibrate(20); } catch (_) {}
        }

        log("workflow_touch_drag_started", {
          step: item.dataset.id
        });
      }, 280);

      item.dataset.touchStartX = startX;
      item.dataset.touchStartY = startY;
    }, { passive: true });

    item.addEventListener("touchmove", e => {
      const touch = [...e.touches].find(t => t.identifier === activeTouchId);
      if (!touch) return;

      const startX = Number(item.dataset.touchStartX || touch.clientX);
      const startY = Number(item.dataset.touchStartY || touch.clientY);

      // If the finger clearly moves before long-press activates, interpret
      // it as normal page scrolling rather than a reorder gesture.
      if (!touchDragging) {
        const distance = Math.hypot(touch.clientX - startX, touch.clientY - startY);
        if (distance > 10) clearLongPress();
        return;
      }

      e.preventDefault();

      const list = $("reorderList");
      const candidates = [...list.querySelectorAll(".reorder-item")]
        .filter(el => el !== item);

      const target = candidates.find(el => {
        const r = el.getBoundingClientRect();
        return touch.clientY >= r.top && touch.clientY <= r.bottom;
      });

      if (!target) return;

      const rect = target.getBoundingClientRect();
      const after = touch.clientY > rect.top + rect.height / 2;
      list.insertBefore(item, after ? target.nextSibling : target);
    }, { passive: false });

    const finishTouchDrag = () => {
      clearLongPress();

      if (touchDragging) {
        log("workflow_touch_drag_finished", {
          step: item.dataset.id,
          remainingOrder: [...document.querySelectorAll(".reorder-item")]
            .map(x => x.dataset.id)
            .join(">")
        });
      }

      touchDragging = false;
      activeTouchId = null;
      item.classList.remove("dragging", "touch-dragging");
      document.body.classList.remove("workflow-touch-drag-active");
      dragged = null;
    };

    item.addEventListener("touchend", finishTouchDrag, { passive: true });
    item.addEventListener("touchcancel", finishTouchDrag, { passive: true });
  });
}

function applyRevision() {
  const ids = [...document.querySelectorAll(".reorder-item")].map(x => x.dataset.id);

  const prefix = state.steps.slice(0, state.currentStepIndex);
  const verify = state.steps.find(s => s.id === "verify");
  const editableSet = new Set(ids);

  const reordered = ids
    .map(id => state.steps.find(s => s.id === id))
    .filter(Boolean);

  // Preserve any completed/non-editable tail steps defensively.
  const preservedTail = state.steps
    .slice(state.currentStepIndex)
    .filter(s => s.id !== "verify" && !editableSet.has(s.id));

  state.steps = [...prefix, ...reordered, ...preservedTail, verify];

  // The first item in the revised remaining workflow becomes the active step.
  const nextId = ids[0];
  const nextIndex = state.steps.findIndex(s => s.id === nextId);
  if (nextIndex >= 0) {
    state.currentStepIndex = nextIndex;
  }

  state.revisionApplied = true;
  state.revisionOpen = false;

  log("workflow_revised", {
    remainingOrder: ids.join(">"),
    nextActiveStep: state.steps[state.currentStepIndex]?.id || null
  });

  $("reorderArea").classList.add("hidden");
  $("reorderArea").classList.remove("highlight-attention");
  renderCurrentStep();
}

function cancelRevision() {
  state.revisionOpen = false;
  $("reorderArea").classList.add("hidden");
  $("reorderArea").classList.remove("highlight-attention");
  log("workflow_revision_cancelled");
  renderWorkflow();
}

function renderVerifyStep() {
  $("workspace").innerHTML = `
    <div class="verify-box">
      <div class="verify-inner">
        <h3>Verify the final schedule</h3>
        <p class="support-text">
          Check the complete plan against all current constraints, including the unexpected change.
        </p>
        <div class="verify-actions">
          <button id="checkSolutionBtn">Check solution</button>
          <button id="returnResolveBtn" class="ghost-btn">← Return to Resolve Conflicts</button>
        </div>
        <div id="verifyResult" class="verify-result hidden"></div>
      </div>
    </div>`;
  $("checkSolutionBtn").addEventListener("click", checkSolution);
  $("returnResolveBtn").addEventListener("click", returnToResolve);
}

function checkSolution() {
  const errors = currentScenario().validate(state.schedule, state.changed);
  const box = $("verifyResult");
  box.classList.remove("hidden","ok","bad");

  if (errors.length === 0) {
    box.classList.add("ok");
    box.innerHTML = `<strong>Valid solution.</strong><br>Your schedule satisfies the current problem.`;
    state.canFinish = true;
    $("continueBtn").classList.remove("hidden");
    $("continueBtn").textContent = "Finish Test";
    log("solution_valid");
  } else {
    state.canFinish = false;
    $("continueBtn").classList.add("hidden");
    box.classList.add("bad");
    box.innerHTML = `
      <strong>Not valid yet.</strong><br>
      ${errors.map(e=>"• "+e).join("<br>")}
      <br><br>
      <span class="verify-help">Return to <strong>Resolve Conflicts</strong>, adjust the schedule, then verify again.</span>
    `;
    log("solution_invalid",{errorCount:errors.length});
  }
}

function returnToResolve() {
  const resolveIndex = state.steps.findIndex(s => s.id === "resolve");
  if (resolveIndex === -1) return;

  state.currentStepIndex = resolveIndex;
  state.canFinish = false;
  log("returned_to_resolve_from_verify");
  renderCurrentStep();

  $("stepMessage").textContent = "Adjust the schedule, then continue to Verify Schedule again.";
  $("stepMessage").className = "step-message success";
}

function buildPendingTrial() {
  return {
    condition:state.currentCondition,
    scenario:state.scenarioIndex,
    scenarioKey:currentScenario().key,
    scenarioTitle:currentScenario().title,
    trialIndex:state.currentTrialIndex,
    initialWorkflow:BASE_STEPS.map(s=>s.id),
    finalSchedule:{...state.schedule},
    finalWorkflow:state.steps.map(s=>s.id),
    logs:[...state.logs]
  };
}

function renderLikertScales() {
  document.querySelectorAll(".rating-question").forEach(question => {
    const key = question.dataset.rating;
    const scale = question.querySelector(".likert-scale");
    scale.innerHTML = "";
    question.querySelectorAll(".likert-labels").forEach(el => el.remove());

    for (let value = 1; value <= 7; value++) {
      const wrapper = document.createElement("div");
      wrapper.className = "likert-option";
      wrapper.innerHTML = `
        <input type="radio" id="${key}-${value}" name="${key}" value="${value}">
        <label for="${key}-${value}">${value}</label>
      `;
      scale.appendChild(wrapper);
    }

    const labels = document.createElement("div");
    labels.className = "likert-labels";
    labels.innerHTML = "<span>Strongly disagree</span><span>Strongly agree</span>";
    question.appendChild(labels);
  });
}

function openPostTrialQuestionnaire() {
  state.pendingTrial = buildPendingTrial();
  $("ratingsForm").reset();
  $("ratingsError").classList.add("hidden");
  renderLikertScales();
  showOnly("questionnaireScreen");
}

function completeTrial() {
  if (!state.canFinish) return;
  state.canFinish = false;
  openPostTrialQuestionnaire();
}

function submitPostTrialRatings(event) {
  event.preventDefault();

  const keys = ["control","constraint","helpfulness","difficulty","revisionNeed"];
  const ratings = {};
  let complete = true;

  keys.forEach(key => {
    const selected = document.querySelector(`input[name="${key}"]:checked`);
    if (!selected) {
      complete = false;
    } else {
      ratings[key] = Number(selected.value);
    }
  });

  if (!complete) {
    $("ratingsError").classList.remove("hidden");
    return;
  }

  const ratingsSubmittedAt = new Date().toISOString();
  const trial = {
    ...state.pendingTrial,
    ratings,
    ratingsSubmittedAt
  };

  state.allTrials.push(trial);
  state.completedConditions.push(state.currentCondition);
  state.pendingTrial = null;

  const completedCount = state.allTrials.length;

  if (completedCount < 4) {
    const nextIndex = completedCount;
    const next = state.conditionOrder[nextIndex];

    $("betweenTitle").textContent = `Trial ${completedCount} of 4 complete.`;
    $("betweenText").textContent =
      `Next you will complete Trial ${nextIndex + 1} of 4 using the ${next === "rigid" ? "Rigid" : "Revisable"} workflow with a different scheduling problem.`;
    $("nextConditionBtn").textContent =
      `Start Trial ${nextIndex + 1} — ${next === "rigid" ? "Rigid" : "Revisable"}`;
    $("nextConditionBtn").dataset.next = next;
    $("nextConditionBtn").dataset.trialIndex = String(nextIndex);
    showOnly("betweenScreen");
  } else {
    showOnly("finalFeedbackScreen");
  }
}


function submitFinalFeedback(event) {
  event.preventDefault();

  const selected = document.querySelector('input[name="finalPreference"]:checked');
  if (!selected) {
    $("finalFeedbackError").classList.remove("hidden");
    return;
  }

  state.finalPreference = selected.value;
  state.finalComment = $("finalComment").value.trim();
  state.finalFeedbackSubmittedAt = new Date().toISOString();

  showOnly("endScreen");
  $("participantIdDisplay").textContent = state.participantId;
  updateSubmissionUI();
}

function validateCommon(schedule, changed, rules) {
  const errors = [];
  const timesById = {};
  Object.entries(schedule).forEach(([t,id])=>timesById[id]=t);

  const sc = currentScenario();
  sc.activities.forEach(a=>{
    if (!timesById[a.id]) errors.push(`${a.name} is not scheduled.`);
  });
  if (errors.length) return errors;

  Object.entries(rules.fixed).forEach(([id,t])=>{
    if (timesById[id] !== t) errors.push(`${nameOf(id)} must be at ${t}.`);
  });

  rules.before.forEach(r=>{
    if (slotIndex(timesById[r.id]) >= slotIndex(r.time)) errors.push(`${nameOf(r.id)} must be before ${r.time}.`);
  });

  rules.afterOrEqual.forEach(r=>{
    if (slotIndex(timesById[r.id]) < slotIndex(r.time)) errors.push(`${nameOf(r.id)} must be at ${r.time} or later.`);
  });

  rules.relations.forEach(([a,rel,b])=>{
    if (rel==="after" && slotIndex(timesById[a]) <= slotIndex(timesById[b])) errors.push(`${nameOf(a)} must be after ${nameOf(b)}.`);
    if (rel==="before" && slotIndex(timesById[a]) >= slotIndex(timesById[b])) errors.push(`${nameOf(a)} must be before ${nameOf(b)}.`);
  });

  const targetRule = changed ? rules.changedRule : rules.initialRule;
  const targetTime = timesById[rules.changeTarget];
  if (targetRule.type==="before" && slotIndex(targetTime) >= slotIndex(targetRule.time)) {
    errors.push(`${nameOf(rules.changeTarget)} must be before ${targetRule.time}.`);
  }
  if (targetRule.type==="afterOrEqual" && slotIndex(targetTime) < slotIndex(targetRule.time)) {
    errors.push(`${nameOf(rules.changeTarget)} must be at ${targetRule.time} or later.`);
  }

  const ordered = Object.entries(schedule).sort((a,b)=>slotIndex(a[0])-slotIndex(b[0]));
  if (ordered[ordered.length-1]?.[1] !== rules.last) errors.push(`${nameOf(rules.last)} must be the final activity.`);

  return errors;
}

function slotIndex(t){ return SLOTS.indexOf(t); }
function nameOf(id){ return currentScenario().activities.find(a=>a.id===id)?.name || id; }

function buildStudyPayload() {
  return {
    study:"Rigid or Revisable",
    version:"2.9",
    participantId:state.participantId,
    startedAtClient:state.allTrials[0]?.logs?.[0]?.timestamp || null,
    completedAtClient:new Date().toISOString(),
    firstCondition:state.firstCondition,
    conditionOrder:[...state.conditionOrder],
    completedConditions:[...state.completedConditions],
    finalPreference:state.finalPreference,
    finalComment:state.finalComment,
    finalFeedbackSubmittedAt:state.finalFeedbackSubmittedAt,
    userAgent:navigator.userAgent,
    trials:state.allTrials
  };
}

function downloadData() {
  const payload=buildStudyPayload();
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a");
  a.href=url; a.download=`rigid-revisable-${state.participantId}.json`; a.click(); URL.revokeObjectURL(url);
}

function scenarioForCondition(condition){
  return state.allTrials
    .filter(t=>t.condition===condition)
    .map(t=>`${t.scenarioTitle||""} (${t.scenarioKey||""})`)
    .join(" | ");
}

function updateSubmissionUI(type="",message=""){
  const box=$("submissionStatus"), btn=$("submitDataBtn");
  box.className="submission-status hidden"; box.textContent="";
  if(type){box.classList.remove("hidden");box.classList.add(type);box.textContent=message;}
  if(state.submissionPending){btn.disabled=true;btn.textContent="Submitting…";}
  else{btn.disabled=false;btn.textContent="Submit Data";}
}

function submitStudyData(){
  if(state.submissionPending)return;
  if(state.allTrials.length!==4){updateSubmissionUI("error","All four trials must be completed before data can be submitted.");return;}
  const cfg=window.STUDY_FORM_CONFIG||{};
  if(!cfg.enabled||!cfg.actionUrl||!cfg.entries){updateSubmissionUI("error","Google Form is not connected yet. Configure form-config.js first.");return;}
  const payload=buildStudyPayload();
  const values={
    [cfg.entries.participantId]:state.participantId,
    [cfg.entries.firstCondition]:state.firstCondition,
    [cfg.entries.rigidScenario]:scenarioForCondition("rigid"),
    [cfg.entries.revisableScenario]:scenarioForCondition("revisable"),
    [cfg.entries.studyJson]:JSON.stringify(payload)
  };
  const form=document.createElement("form"); form.method="POST"; form.action=cfg.actionUrl; form.target="googleFormTarget"; form.style.display="none";
  Object.entries(values).forEach(([name,value])=>{if(!name||!name.startsWith("entry."))return;const input=document.createElement("input");input.type="hidden";input.name=name;input.value=value??"";form.appendChild(input);});
  document.body.appendChild(form); state.submissionPending=true; updateSubmissionUI("sending","Submitting your study data…"); log("data_submission_started",{participantId:state.participantId});
  const iframe = $("googleFormTarget");
  let handled = false;

  const finishRequest = () => {
    if (handled || !state.submissionPending) return;
    handled = true;
    state.submissionPending = false;

    log("data_submission_request_completed", {
      participantId: state.participantId
    });

    // Cross-origin Google Forms responses cannot be inspected from GitHub Pages.
    // Therefore we do NOT claim that Google recorded the row; we only know that
    // the browser completed the form-response navigation.
    updateSubmissionUI(
      "success",
      "Submission request completed. Keep this page open until you confirm the response appears in the study sheet."
    );

    $("submitDataBtn").disabled = false;
    $("submitDataBtn").textContent = "Submit Again";

    form.remove();
  };

  const failRequest = () => {
    if (handled || !state.submissionPending) return;
    handled = true;
    state.submissionPending = false;
    updateSubmissionUI(
      "error",
      "The submission could not be confirmed. Please use Download Backup and contact the study administrator."
    );
    $("submitDataBtn").disabled = false;
    $("submitDataBtn").textContent = "Try Submit Again";
    form.remove();
  };

  const onLoad = () => {
    iframe.removeEventListener("load", onLoad);
    setTimeout(finishRequest, 250);
  };

  iframe.addEventListener("load", onLoad);
  form.submit();

  // No optimistic "success after 3 seconds" fallback anymore.
  // If Google never completes the hidden form navigation, show an error.
  setTimeout(failRequest, 12000);
}

$("startStudyBtn").addEventListener("click", startStudy);

$("constraintsToggle").addEventListener("click",()=>{
  const panel = $("constraintsPanel");
  const wasHidden = panel.classList.contains("hidden");
  panel.classList.toggle("hidden");

  if (wasHidden) {
    log("constraints_opened");
  } else {
    log("constraints_closed");
  }
});

$("continueBtn").addEventListener("click", () => {
  if (currentStep()?.id === "verify" && state.canFinish) {
    completeTrial();
  } else {
    continueStep();
  }
});
$("changeModalBtn").addEventListener("click", afterChangeModal);
$("openRevisionBtn").addEventListener("click", showRevisionControls);
$("applyRevisionBtn").addEventListener("click", applyRevision);
$("cancelRevisionBtn").addEventListener("click", cancelRevision);

$("nextConditionBtn").addEventListener("click",()=>{
  startTrial(
    $("nextConditionBtn").dataset.next,
    Number($("nextConditionBtn").dataset.trialIndex)
  );
});

$("ratingsForm").addEventListener("submit", submitPostTrialRatings);
$("finalFeedbackForm").addEventListener("submit", submitFinalFeedback);
$("submitDataBtn").addEventListener("click", submitStudyData);
$("downloadDataBtn").addEventListener("click", downloadData);
$("restartBtn").addEventListener("click",()=>{
  state = freshState();
  showOnly("startScreen");
});
