---
description: Review what happened in recent work. Usage: /review
---

# /review - Work Summary

---

## Recent Activity

```bash
# Show recent log entries
echo "=== Recent Log ==="
tail -30 .log 2>/dev/null || echo "No .log file"
```

---

## Task Status

```bash
echo ""
echo "=== Task Summary ==="

# Completed
echo "✅ Completed:"
grep '^\[x\]' .tasks 2>/dev/null | tail -5 || echo "  (none)"

# In Progress
echo ""
echo "🔄 In Progress:"
grep '^\[~\]' .tasks 2>/dev/null || echo "  (none)"

# Stuck
echo ""
echo "❌ Stuck:"
grep '^\[!\]' .tasks 2>/dev/null || echo "  (none)"

# Pending
echo ""
echo "📋 Pending:"
grep '^\[ \]' .tasks 2>/dev/null | head -5 || echo "  (none)"
PENDING=$(grep -c '^\[ \]' .tasks 2>/dev/null || echo "0")
if [ "$PENDING" -gt 5 ]; then
    echo "  ... and $((PENDING - 5)) more"
fi
```

---

## Issues

```bash
echo ""
echo "=== Issues ==="
if [ -f .issues ] && [ -s .issues ]; then
    cat .issues
else
    echo "(no issues logged)"
fi
```

---

## Progress Notes

```bash
echo ""
echo "=== SCRATCHPAD ==="
if [ -f SCRATCHPAD.md ]; then
    # Show current work section
    head -50 SCRATCHPAD.md
else
    echo "(no SCRATCHPAD.md)"
fi
```

---

## Recommendations

Based on the state:

- **Stuck tasks?** Check `.issues` for details, then `/fix`
- **Pending tasks?** Run `/build` on next item or `/batch` for all
- **Issues logged?** Address before continuing
- **All done?** 🎉 Deploy or add more tasks
