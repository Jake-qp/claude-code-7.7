#!/bin/bash
# Claude Code V7.6 - Checkpoint Hook
# Runs when Claude stops - auto-saves work and updates SCRATCHPAD

set -euo pipefail

echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "  💾 Checkpoint" >&2
echo "═══════════════════════════════════════════════════════════════" >&2

# ═══════════════════════════════════════════════════════════════
# AUTO-COMMIT WORK IN PROGRESS (optional)
# ═══════════════════════════════════════════════════════════════

# Check if auto-commit is disabled
# Set V7_NO_AUTO_COMMIT=1 to disable
if [ "${V7_NO_AUTO_COMMIT:-}" != "1" ]; then
    # Check if we're in a git repo with changes
    if command -v git &>/dev/null && git rev-parse --git-dir &>/dev/null 2>&1; then
        # Check for uncommitted changes
        if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
            echo "" >&2
            echo "  📝 Uncommitted changes detected" >&2
            
            # Stage all changes
            git add -A 2>/dev/null || true
            
            # Get current phase for commit message
            PHASE="checkpoint"
            if [ -f ".claude/state/phase" ]; then
                PHASE=$(cat .claude/state/phase)
            fi
            
            # Commit with --no-verify to avoid triggering pre-commit hooks
            TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
            git commit --no-verify -m "wip($PHASE): checkpoint $TIMESTAMP" 2>/dev/null && \
                echo "  ✅ Work saved to git" >&2 || \
                echo "  ℹ️  No changes to commit" >&2
        else
            echo "  ℹ️  No uncommitted changes" >&2
        fi
    fi
else
    echo "  ℹ️  Auto-commit disabled (V7_NO_AUTO_COMMIT=1)" >&2
fi

# ═══════════════════════════════════════════════════════════════
# UPDATE SCRATCHPAD
# ═══════════════════════════════════════════════════════════════

TIMESTAMP=$(date "+%Y-%m-%d %H:%M")

# Create SCRATCHPAD if it doesn't exist
if [ ! -f "SCRATCHPAD.md" ]; then
    cat > SCRATCHPAD.md << 'EOF'
# SCRATCHPAD

> This file persists across sessions. Update it frequently.

## Current Work

**Feature:** Not started
**Phase:** None
**Started:** Not started

## Progress Notes

- Session started

## Key Decisions

(None yet)

## API Verifications

(None yet)

## Blockers / Questions

(None)

## Next Steps

1. Start a task with /build or /fix

---
EOF
fi

# Append checkpoint note to SCRATCHPAD
echo "" >> SCRATCHPAD.md
echo "---" >> SCRATCHPAD.md
echo "**Checkpoint:** $TIMESTAMP" >> SCRATCHPAD.md

# ═══════════════════════════════════════════════════════════════
# SHOW CURRENT STATUS
# ═══════════════════════════════════════════════════════════════

echo "" >&2
echo "  📊 Current Status:" >&2

# Show phase with emoji
if [ -f ".claude/state/phase" ]; then
    PHASE=$(cat .claude/state/phase)
    case $PHASE in
        brainstorm) EMOJI="🔍" ;;
        spec) EMOJI="📝" ;;
        design) EMOJI="🎨" ;;
        verify) EMOJI="✅" ;;
        planning) EMOJI="📋" ;;
        testing) EMOJI="🧪" ;;
        implementing) EMOJI="🔨" ;;
        fixing) EMOJI="🔧" ;;
        complete) EMOJI="✓" ;;
        *) EMOJI="•" ;;
    esac
    echo "     Phase: $EMOJI $PHASE" >&2
else
    echo "     Phase: None" >&2
fi

# Show current task
if [ -f ".tasks" ]; then
    CURRENT=$(grep "^\[~\]" .tasks 2>/dev/null | head -1) || true
    if [ -n "$CURRENT" ]; then
        echo "     Task: $CURRENT" >&2
    fi
    
    # Count remaining
    PENDING=$(grep -c "^\[ \]" .tasks 2>/dev/null) || PENDING=0
    COMPLETE=$(grep -c "^\[x\]" .tasks 2>/dev/null) || COMPLETE=0
    echo "     Queue: $PENDING pending, $COMPLETE complete" >&2
fi

# Show any issues
if [ -f ".issues" ] && [ -s ".issues" ]; then
    ISSUE_COUNT=$(wc -l < .issues | tr -d ' ')
    echo "     ⚠️  Issues: $ISSUE_COUNT logged" >&2
fi

echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "  Resume with: /status or /build or /fix" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "" >&2

exit 0
