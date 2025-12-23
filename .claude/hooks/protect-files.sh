#!/bin/bash
# Claude Code V7.6 - Protect Files Hook
# Blocks modifications to sensitive files and locked tests

set -euo pipefail

# Read input from Claude Code
INPUT=$(cat)

# Check if we have jq
if ! command -v jq &>/dev/null; then
    exit 0
fi

# Extract file path
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null) || true

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# ALWAYS PROTECTED FILES
# ═══════════════════════════════════════════════════════════════

# Environment files
if [[ "$FILE_PATH" =~ \.env($|\..*) ]]; then
    echo "" >&2
    echo "⛔ BLOCKED: Cannot modify environment files" >&2
    echo "   File: $FILE_PATH" >&2
    echo "   Edit .env files manually, not through Claude Code." >&2
    echo "" >&2
    exit 2
fi

# Lock files
if [[ "$FILE_PATH" =~ (package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Gemfile\.lock|poetry\.lock|Cargo\.lock|composer\.lock)$ ]]; then
    echo "" >&2
    echo "⛔ BLOCKED: Cannot modify lock files directly" >&2
    echo "   File: $FILE_PATH" >&2
    echo "   Use package manager commands to update dependencies." >&2
    echo "" >&2
    exit 2
fi

# Git internals
if [[ "$FILE_PATH" =~ ^\.git/ ]]; then
    echo "" >&2
    echo "⛔ BLOCKED: Cannot modify .git internals" >&2
    echo "   File: $FILE_PATH" >&2
    echo "" >&2
    exit 2
fi

# ═══════════════════════════════════════════════════════════════
# PHASE-BASED TEST LOCKING
# ═══════════════════════════════════════════════════════════════

# Get current phase
PHASE="none"
if [ -f ".claude/state/phase" ]; then
    PHASE=$(cat .claude/state/phase)
fi

# Test file patterns
is_test_file() {
    local file="$1"
    [[ "$file" =~ \.(test|spec)\.(js|ts|jsx|tsx|mjs|cjs)$ ]] || \
    [[ "$file" =~ _test\.(go|py|rb)$ ]] || \
    [[ "$file" =~ test_.*\.py$ ]] || \
    [[ "$file" =~ /__tests__/ ]] || \
    [[ "$file" =~ /tests?/ ]] || \
    [[ "$file" =~ _spec\.rb$ ]] || \
    [[ "$file" =~ \.test\.ts$ ]]
}

# Lock tests during implementing phase
if [ "$PHASE" = "implementing" ]; then
    if is_test_file "$FILE_PATH"; then
        echo "" >&2
        echo "⛔ BLOCKED: Tests are locked during implementation" >&2
        echo "   File: $FILE_PATH" >&2
        echo "   Phase: implementing (tests locked)" >&2
        echo "" >&2
        echo "   The test modification trap: When tests fail, fix the CODE, not the test." >&2
        echo "" >&2
        echo "   If you need to fix a wrong test:" >&2
        echo "   1. echo \"testing\" > .claude/state/phase" >&2
        echo "   2. Fix the test" >&2
        echo "   3. echo \"implementing\" > .claude/state/phase" >&2
        echo "" >&2
        exit 2
    fi
fi

# ═══════════════════════════════════════════════════════════════
# WARN ON WORKFLOW FILES (but allow)
# ═══════════════════════════════════════════════════════════════

if [[ "$FILE_PATH" =~ ^\.claude/ ]] && [[ ! "$FILE_PATH" =~ ^\.claude/state/ ]]; then
    echo "" >&2
    echo "⚠️  WARNING: Modifying workflow file" >&2
    echo "   File: $FILE_PATH" >&2
    echo "   Make sure this is intentional." >&2
    echo "" >&2
    # Don't block, just warn
fi

exit 0
