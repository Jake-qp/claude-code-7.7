---
name: Implementation Plan
description: Break work into bite-sized tasks before coding
trigger: PLAN phase, after design and API verification
token_estimate: ~80 tokens metadata, ~350 full
---

# Implementation Plan Skill

Plan the work before doing it.

## Why Plan?

A good plan should be clear enough for "an enthusiastic junior engineer with no project context" to follow.

## Step 1: List What Needs to Be Built

From your spec and design:
- Components to create
- APIs to implement
- Tests to write
- Integrations to connect

## Step 2: Break Into Tasks

Each task should be:
- **5-15 minutes** of work
- **One clear action**
- **Independently testable**

### Task Format

```markdown
### Task N: [Name] (~X min)
**Files:** path/to/file.ts
**Do:** [Specific action]
**Verify:** [How to check it works]
**Depends on:** [Nothing / Task N]
```

### Example Plan

```markdown
## Implementation Plan: User Dashboard

### Task 1: Create Dashboard component (~10 min)
**Files:** src/components/Dashboard.tsx
**Do:** Create component shell with loading state
**Verify:** Component renders without errors
**Depends on:** Nothing

### Task 2: Add order list display (~10 min)
**Files:** src/components/OrderList.tsx
**Do:** Create OrderList with mock data
**Verify:** Shows list of 3 mock orders
**Depends on:** Task 1

### Task 3: Write API tests (~10 min)
**Files:** src/api/orders.test.ts
**Do:** Test GET /api/orders returns list
**Verify:** Test fails (no implementation yet)
**Depends on:** Nothing

### Task 4: Implement orders API (~15 min)
**Files:** src/api/orders.ts
**Do:** Implement GET endpoint
**Verify:** Task 3 tests pass
**Depends on:** Task 3

### Task 5: Connect UI to API (~10 min)
**Files:** src/components/Dashboard.tsx
**Do:** Replace mock data with API call
**Verify:** Real data displays
**Depends on:** Task 2, Task 4
```

## Step 3: Order by Dependencies

Put tasks in order so each task's dependencies are done first.

```
Task 1 (no deps)
    ↓
Task 2 (needs Task 1)
    ↓
Task 3 (no deps) ← Can run parallel with 1-2
    ↓
Task 4 (needs Task 3)
    ↓
Task 5 (needs Task 2 + 4)
```

## Step 4: Save to SCRATCHPAD.md

Add plan to SCRATCHPAD.md:

```markdown
## Implementation Plan - [Feature]

[Your task list here]

---
Started: [date]
```

## Exit Criteria

- [ ] Work broken into 5-15 min tasks
- [ ] Each task has files, action, verification
- [ ] Tasks ordered by dependency
- [ ] Plan saved to SCRATCHPAD.md

```bash
echo "planning" > .claude/state/phase
```

Now proceed to BUILD and execute the plan task by task.
