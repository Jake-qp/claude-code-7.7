---
description: Fix a bug or issue. Usage: /fix "bug description"
---

# /fix - Fix a Bug

**Bug:** $ARGUMENTS

---

## Fixing Mode

```bash
echo "fixing" > .claude/state/phase
```

In fixing mode, you CAN modify tests (unlike /build).

---

## Process

Load skill: `.claude/skills/debugging.md`

### 1. Understand
```markdown
**Expected:** [What should happen]
**Actual:** [What happens instead]
```

Ask clarifying questions if vague:
- "What were you doing when this happened?"
- "Does it happen every time?"

### 2. Reproduce

Write a failing test that demonstrates the bug:
```typescript
it('should NOT do the buggy thing', () => {
  // Fails now, passes when fixed
});
```

Or document manual reproduction steps.

### 3. Investigate

- [ ] Input is what we expect?
- [ ] Environment variables set?
- [ ] Recent change broke it?
- Read the error message carefully

### 4. Fix

**Minimal fix only:**
- ✅ Fix what's broken
- ❌ Don't refactor
- ❌ Don't add features

### 5. Verify

- Failing test now passes
- All other tests still pass
- Manual check confirms fix

### 6. Commit

```bash
git add .
git commit -m "fix: [description]"
```

---

## Log the Fix

Add to `.log`:
```
[date] fix: [description]
- Root cause: [what was wrong]
- Solution: [what you did]
```

---

## Exit

```bash
echo "complete" > .claude/state/phase
```

Update `.tasks` if this was a tracked task.
