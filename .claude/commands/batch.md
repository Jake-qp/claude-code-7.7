---
description: Process all pending tasks in queue. Usage: /batch
---

# /batch - Batch Processing Mode

Process all `[ ]` tasks in `.tasks` file.

---

## Before Starting

```bash
# Check task count
grep -c "^\[ \]" .tasks 2>/dev/null || echo "0"
```

**Recommendations:**
- Keep batches to 5-7 tasks
- Put dependent tasks in order
- Mark sensitive features with `[REVIEW]`
- Maximum 10 tasks per batch

---

## Batch Rules

### For Each Task

1. **Check for [REVIEW] tag** → Skip, log, continue
2. **Mark in progress:**
   ```
   [ ] Task → [~] Task
   ```
3. **Run /build workflow** for this task
4. **Mark complete:**
   ```
   [~] Task → [x] Task (YYYY-MM-DD)
   ```
5. **Update SCRATCHPAD.md** with completion note
6. **Move to next task**

### Context Management

Between tasks:
- Write summary to SCRATCHPAD.md
- This preserves progress if session ends
- Each task gets fresh focus

### Stuck Task Handling

If stuck 3x on same error:
1. Log issue to `.issues`
2. Mark task: `[!] Task`
3. Continue to next task
4. Don't let one task block all progress

---

## Auto-Proceed Rules

**Keep going when:**
- Task completed successfully
- All tests pass

**Stop for:**
- `[REVIEW]` tag (log skip, continue to next)
- 3x stuck on same error (mark [!], continue)
- Security checklist fails
- Out of tasks

---

## After Batch

Write summary to `.log`:
```
[date] batch: completed N tasks
- ✅ [Task 1]
- ✅ [Task 2]
- ⏭️ [Task 3] - skipped [REVIEW]
- ❌ [Task 4] - stuck, see .issues
```

---

## Morning Review

After batch completes, run `/review` to see:
- What was completed
- What was skipped
- What needs attention
