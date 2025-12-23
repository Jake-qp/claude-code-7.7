---
name: Debugging
description: Systematic approach to finding and fixing bugs
trigger: When using /fix or investigating unexpected behavior
token_estimate: ~60 tokens metadata, ~500 full
---

# Debugging Skill

Fix the root cause, not the symptom.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST

If you haven't completed investigation, you cannot propose fixes.
"Quick fix for now" = failure mode.
"Let me just try this" = failure mode.

Investigation is not optional. It's the job.
```

---

## The 3-Failure Rule

```
If 3+ fixes have failed, STOP.

Patterns indicating an architectural problem:
- Each fix reveals new problem in different place
- Fixes require "massive refactoring" to implement
- Each fix creates new symptoms elsewhere
- You're changing more and more files

Action: Question the architecture, not the symptoms.
Discuss with user before attempting more fixes.
```

---

## Root Cause Tracing

When bug appears deep in stack:

```
1. Find immediate cause (where does error occur?)
2. Ask: What called this with bad data?
3. Keep tracing UP until you find the SOURCE
4. Fix at source, not at symptom

Example:
  ❌ "API returns null, add null check"
  ✅ "API returns null because query is wrong. Fix query."
```

---

## Step 1: Understand

Before touching code:

```markdown
## Bug Report
**Expected:** [What should happen]
**Actual:** [What happens instead]
**Reproducible:** [Always / Sometimes / Rarely]
```

## Step 2: Reproduce

**No reproduction = no fix.**

Write a failing test:
```typescript
it('should NOT do the buggy thing', () => {
  // This test fails now, passes when fixed
});
```

Or document steps:
```markdown
## Reproduction
1. Go to /dashboard
2. Click "Export" with no items
3. See error: "Cannot read property 'map' of undefined"
```

## Step 3: Investigate

### Check the Obvious
- [ ] Is input what we expect?
- [ ] Environment variables set?
- [ ] Right version deployed?
- [ ] Recent change broke it?

### Read the Error
```
Error messages tell you:
- What failed (TypeError, 404)
- Where (file, line)
- Why (undefined, null)
```

### Trace Data Flow
```
Where does the bad data come from?
  → What function created it?
    → What input did that function receive?
      → Keep tracing until you find the SOURCE
```

## Step 4: Fix

### The Minimal Fix
```
✅ Fix only what's broken
❌ Don't refactor while fixing
❌ Don't add features while fixing
```

### Test Modification in /fix

During `/fix`, you CAN modify tests because:
- The test might be wrong
- Expected behavior might have changed

```bash
echo "fixing" > .claude/state/phase
```

## Step 5: Verify

1. Failing test now passes
2. All other tests still pass
3. Manual check confirms fix

## Step 6: Document

```bash
git commit -m "fix: [description]"
```

In `.log`:
```
[date] fix: [description]
- Root cause: [what was wrong]
- Solution: [what you did]
```

---

## Red Flags

Stop and return to investigation if you catch yourself:

- "Quick fix for now, investigate later"
- "Just try changing X and see"
- "I don't fully understand but this might work"
- Proposing solutions before tracing data flow
- "One more fix attempt" (when already tried 2+)
- Fixing symptoms deeper in the call stack

**All mean: STOP. Return to Step 3 (Investigate).**

---

## Common Bug Patterns

| Symptom | Likely Cause |
|---------|--------------|
| "undefined is not a function" | Wrong import, typo |
| "Cannot read property X of undefined" | Missing null check |
| "404 Not Found" | Wrong URL, missing route |
| "Works locally, fails in prod" | Env vars, CORS |
| "Sometimes works" | Race condition |
| "Works first time, fails after" | State not reset |
