#!/bin/bash
# Claude Code V7.6 - Session Start Hook
# Runs at the start of each Claude Code session

set -euo pipefail

echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "  Claude Code V7.6 - Session Start" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "" >&2

# Create state directory if needed
mkdir -p .claude/state

# Check prerequisites
echo "  📋 Prerequisites:" >&2

# Check jq
if command -v jq &>/dev/null; then
    echo "     ✅ jq installed" >&2
else
    echo "     ⚠️  jq not installed - some hooks may not work" >&2
    echo "        Install: brew install jq (Mac) or apt install jq (Linux)" >&2
fi

# Check git
if command -v git &>/dev/null; then
    if git rev-parse --git-dir &>/dev/null 2>&1; then
        echo "     ✅ git repository" >&2
    else
        echo "     ⚠️  Not a git repository - run 'git init'" >&2
    fi
else
    echo "     ❌ git not installed" >&2
fi

# Check hooks are executable
HOOKS_DIR=".claude/hooks"
if [ -d "$HOOKS_DIR" ]; then
    NON_EXEC=$(find "$HOOKS_DIR" -name "*.sh" ! -executable 2>/dev/null | wc -l)
    if [ "$NON_EXEC" -gt 0 ]; then
        echo "     ⚠️  Some hooks not executable - run: chmod +x .claude/hooks/*.sh" >&2
    else
        echo "     ✅ hooks executable" >&2
    fi
fi

# API Verification note
echo "" >&2
echo "  📦 API Verification:" >&2
echo "     Verify external APIs before implementing using:" >&2
echo "     Context7 MCP | Official docs | Type definitions | REPL testing" >&2

# Active hooks
echo "" >&2
echo "  🔧 Active Hooks:" >&2
echo "     pre-tool.sh    - Runs tests before git commit" >&2
echo "     protect-files  - Blocks .env edits, locks tests during impl" >&2
echo "     format.sh      - Auto-formats files on save (Prettier, Black, etc.)" >&2
echo "     checkpoint.sh  - Auto-saves work when Claude stops" >&2

# Current state with progress indicators
echo "" >&2
echo "  📊 Current State:" >&2

# Show current phase with emoji
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
    echo "     Phase: None (ready to start)" >&2
fi

# Show current task
if [ -f ".tasks" ]; then
    CURRENT=$(grep "^\[~\]" .tasks 2>/dev/null | head -1) || true
    if [ -n "$CURRENT" ]; then
        echo "     Task: $CURRENT" >&2
    else
        PENDING=$(grep -c "^\[ \]" .tasks 2>/dev/null) || PENDING=0
        echo "     Tasks pending: $PENDING" >&2
    fi
fi

# Show scratchpad summary
if [ -f "SCRATCHPAD.md" ]; then
    echo "     SCRATCHPAD.md: exists (check for context)" >&2
fi

# Workflow guidance (softer than V7)
echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "  💡 Workflow Guidance" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "" >&2
echo "  Skills are here to help. When relevant:" >&2
echo "  1. Load the skill (in .claude/skills/)" >&2
echo "  2. Follow its guidance" >&2
echo "  3. Keep moving forward" >&2
echo "" >&2
echo "  If stuck: make progress over perfection." >&2
echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2

# Quick reference
echo "" >&2
echo "  🚀 Commands:" >&2
echo "     /quick \"change\"  - Small changes (<50 lines)" >&2
echo "     /build \"feature\" - Full workflow" >&2
echo "     /fix \"bug\"       - Bug fixes" >&2
echo "     /brainstorm      - Explore vague ideas" >&2
echo "     /batch           - Process all tasks" >&2
echo "     /status          - Current state" >&2
echo "     /review          - Work summary" >&2
echo "" >&2
echo "═══════════════════════════════════════════════════════════════" >&2
echo "" >&2

exit 0
