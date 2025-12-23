---
description: Check current state. Usage: /status
---

# /status - Current State

---

## Quick Check

```bash
# Current phase
echo "Phase: $(cat .claude/state/phase 2>/dev/null || echo 'none')"

# Current task
echo "Task: $(grep '^\[~\]' .tasks 2>/dev/null | head -1 || echo 'none')"

# Task counts
echo "Pending: $(grep -c '^\[ \]' .tasks 2>/dev/null || echo '0')"
echo "Complete: $(grep -c '^\[x\]' .tasks 2>/dev/null || echo '0')"
echo "Stuck: $(grep -c '^\[!\]' .tasks 2>/dev/null || echo '0')"

# Issues
if [ -f .issues ] && [ -s .issues ]; then
    echo "Issues: $(wc -l < .issues) logged"
fi
```

---

## SCRATCHPAD Summary

```bash
# Show recent progress
head -40 SCRATCHPAD.md 2>/dev/null || echo "No SCRATCHPAD.md"
```

---

## What Next?

| Current State | Action |
|---------------|--------|
| No phase | Start with `/build "feature"` or `/quick "change"` |
| In progress | Resume current phase |
| Stuck | Check `.issues`, then `/fix` or ask for help |
| Complete | Check `.tasks` for next item |

---

## Resume Options

- **Continue current work:** Pick up where you left off
- **Start fresh:** `rm .claude/state/phase` then new command
- **Review what happened:** `/review`
