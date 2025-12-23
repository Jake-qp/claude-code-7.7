---
description: Build a new feature with full workflow. Usage: /build "feature description"
---

# /build - Build a Feature

**Feature:** $ARGUMENTS

---

## Before Starting

### Check for Project Initialization (V7.7)

```bash
# Check if ARCHITECTURE.md exists
if [ ! -f "ARCHITECTURE.md" ]; then
    echo "Project not initialized - invoking initializer agent"
fi
```

**If ARCHITECTURE.md doesn't exist:**
1. Invoke the **initializer agent** (`.claude/agents/initializer.md`)
2. Wait for project setup to complete
3. Review detected stack
4. Continue with build

### Check for Interrupted Work

```bash
PHASE=$(cat .claude/state/phase 2>/dev/null || echo "none")
SCRATCHPAD_EXISTS=$(test -f SCRATCHPAD.md && echo "yes" || echo "no")
```

### If Previous Work Exists

If `$PHASE` is not "none" or "complete", show:

```
📋 Interrupted work detected:

**Phase:** [phase from file]
**Feature:** [read from SCRATCHPAD.md if exists]

Options:
1. Resume where we left off
2. Start fresh (will clear state)

Which would you prefer?
```

Wait for user response before proceeding.

To start fresh:
```bash
echo "none" > .claude/state/phase
rm -f .spec
```

### If Starting Fresh

Continue to Phase 0.

---

## Skill Loading (V7.7)

Throughout this workflow, load skills on-demand based on the feature:

| Feature Type | Skills to Load |
|--------------|----------------|
| UI component | ui-design, frontend |
| API endpoint | backend, (database if needed) |
| Auth feature | backend, security |
| Database work | database |
| Payment integration | integration, security |
| Mobile app | mobile |

Skills automatically generate/update documentation as they work.

---

## Phase 0: BRAINSTORM (Optional)

**Skip brainstorm when request has ALL of:**
- Specific user mentioned ("for admin users", "for customers")
- Clear success criteria ("show last 30 days", "export as CSV")  
- Defined scope ("just the widget", "only the API endpoint")

**Examples that SKIP brainstorm:**
- "Add a button to export orders as CSV"
- "Show user's last login date on their profile page"
- "Add pagination to the products list, 20 per page"

**Examples that NEED brainstorm:**
- "Add analytics" → What kind? For whom? What metrics?
- "Make it faster" → What's slow? How fast is enough?
- "Add a dashboard" → What data? What actions?

If brainstorm needed:
```bash
echo "brainstorm" > .claude/state/phase
```
Load skill: `.claude/skills/brainstorm.md`

Exit when: User confirms "Yes, build this"

---

## Phase 1: SPEC

```bash
echo "spec" > .claude/state/phase
```
Load skill: `.claude/skills/spec.md`

Define:
- **WHO** is the user (specific person, not "users")
- **WHAT** success looks like (measurable)
- User flow steps
- External dependencies

### ⛔ STOP: User Definition Required

**Cannot proceed without a specific user.** If the request doesn't specify who uses this feature, ask:

```
I need to understand who will use this feature.

Examples of specific users:
- "A store manager checking inventory levels"
- "A customer trying to track their order"  
- "An admin reviewing user reports"

Who is the primary user for this feature?
```

Wait for user response before continuing.

Exit: `.spec` file created with specific user, committed

---

## Phase 2: DESIGN

```bash
echo "design" > .claude/state/phase
```
Load skill: `.claude/skills/design.md`

**For UI work:** Also load `.claude/skills/ui-design.md`
- If DESIGN-SYSTEM.md doesn't exist, create it
- Follow design tokens
- Document new components

Create:
- UI with mock data OR API contract
- All states (loading, empty, error, success)
- Pass self-verification checklist

Exit: Design committed

---

## Phase 3: VERIFY APIs

```bash
echo "verify" > .claude/state/phase
```
Load skill: `.claude/skills/verify-api.md`

**For third-party APIs:** Invoke **researcher agent** (`.claude/agents/researcher.md`)

Verify all external dependencies:
- Use researcher agent for web docs
- Use Context7, official docs, or type definitions
- Document verifications in SCRATCHPAD.md

Exit: All APIs verified and documented

---

## Phase 4: PLAN

```bash
echo "planning" > .claude/state/phase
```
Load skill: `.claude/skills/implementation-plan.md`

Break work into 5-15 minute tasks with:
- Files to create/modify
- What to do
- How to verify

Exit: Plan saved to SCRATCHPAD.md

---

## Phase 5: BUILD

```bash
echo "testing" > .claude/state/phase
# Write tests first

echo "implementing" > .claude/state/phase  
# Make tests pass (tests locked)
```
Load skill: `.claude/skills/tdd.md`

**Load domain skills based on work:**
- API work → `.claude/skills/backend.md` (updates API-CONTRACTS.md)
- Database work → `.claude/skills/database.md` (updates DATA-MODELS.md)
- Frontend → `.claude/skills/frontend.md`
- UI → `.claude/skills/ui-design.md` (updates DESIGN-SYSTEM.md)

Execute plan task by task.

Exit: All tests pass, implementation committed

---

## Phase 6: REVIEW

Before marking complete, invoke **reviewer agent** (`.claude/agents/reviewer.md`):

1. Spec compliance check
2. Code quality check
3. Documentation check (V7.7)

If review fails: Fix issues before proceeding.

---

## Phase 7: FINISH

### 1. Verify All Tests Pass
```bash
npm test  # or project equivalent
```
If tests fail: fix before proceeding. Do NOT skip this.

### 2. Run Build Check
```bash
npm run build  # or project equivalent
```
If build fails: fix before proceeding.

### 3. Present Completion Options
```
Implementation complete. Options:
1. Commit and continue to next task
2. Create PR for review  
3. Keep changes uncommitted (I'll handle it)
```

Wait for user selection (or default to option 1 in batch mode).

### 4. Execute Chosen Path

**Option 1 (default):**
```bash
git add .
git commit -m "feat: [feature name]"
```

**Option 2:**
```bash
git add .
git commit -m "feat: [feature name]"
git push origin HEAD
# Create PR via gh cli or suggest manual creation
```

**Option 3:**
Leave changes staged but uncommitted.

### 5. Update Tracking

```bash
echo "complete" > .claude/state/phase
```

1. Log to `.log`:
   ```
   [date] feat: [feature name]
   ```

2. Update `.tasks`:
   ```
   [ ] Feature → [x] Feature (YYYY-MM-DD)
   ```

3. Update SCRATCHPAD.md with completion note

4. Check for next task

---

## Security Check

If feature involves auth, payments, PII, or admin:
- Load skill: `.claude/skills/security.md`
- Complete checklist
- If ANY item fails → Add [REVIEW] tag

---

## Auto-Proceed Rules

**Keep going when:**
- Phase completed successfully
- Tests pass

**Stop only when:**
- Cannot define specific user
- Security checklist fails
- Task has [REVIEW] tag
- Stuck 3x on same error
- Review agent blocks

---

## Document Generation Summary (V7.7)

Skills automatically generate docs as they work:

| Skill | Creates/Updates |
|-------|-----------------|
| initializer agent | ARCHITECTURE.md, .env.example |
| ui-design | DESIGN-SYSTEM.md |
| backend | docs/API-CONTRACTS.md |
| database | docs/DATA-MODELS.md |
| security | docs/AUTH-FLOWS.md, docs/SECURITY.md |
| devops | docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/MONITORING.md |
| integration | Appends to docs/API-CONTRACTS.md |
