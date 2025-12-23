#!/bin/bash
# Claude Code V7.6 - Format Hook
# Auto-formats files after edit

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

# Don't format if file doesn't exist
if [ ! -f "$FILE_PATH" ]; then
    exit 0
fi

# Get file extension
EXT="${FILE_PATH##*.}"

# ═══════════════════════════════════════════════════════════════
# JAVASCRIPT / TYPESCRIPT - Prettier
# ═══════════════════════════════════════════════════════════════

if [[ "$EXT" =~ ^(js|jsx|ts|tsx|mjs|cjs|json|css|scss|less|html|vue|svelte)$ ]]; then
    if [ -f "node_modules/.bin/prettier" ]; then
        ./node_modules/.bin/prettier --write "$FILE_PATH" 2>/dev/null || true
    elif command -v prettier &>/dev/null; then
        prettier --write "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# PYTHON - Black or autopep8
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "py" ]; then
    if command -v black &>/dev/null; then
        black "$FILE_PATH" 2>/dev/null || true
    elif command -v autopep8 &>/dev/null; then
        autopep8 --in-place "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# GO - gofmt
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "go" ]; then
    if command -v gofmt &>/dev/null; then
        gofmt -w "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# RUST - rustfmt
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "rs" ]; then
    if command -v rustfmt &>/dev/null; then
        rustfmt "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# RUBY - rubocop
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "rb" ]; then
    if command -v rubocop &>/dev/null; then
        rubocop --auto-correct "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# ELIXIR - mix format
# ═══════════════════════════════════════════════════════════════

if [[ "$EXT" =~ ^(ex|exs)$ ]]; then
    if command -v mix &>/dev/null; then
        mix format "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# PHP - php-cs-fixer
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "php" ]; then
    if [ -f "vendor/bin/php-cs-fixer" ]; then
        ./vendor/bin/php-cs-fixer fix "$FILE_PATH" 2>/dev/null || true
    elif command -v php-cs-fixer &>/dev/null; then
        php-cs-fixer fix "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# C# - dotnet format
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "cs" ]; then
    if command -v dotnet &>/dev/null; then
        dotnet format --include "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# KOTLIN - ktlint
# ═══════════════════════════════════════════════════════════════

if [[ "$EXT" =~ ^(kt|kts)$ ]]; then
    if command -v ktlint &>/dev/null; then
        ktlint -F "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# SWIFT - swift-format
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "swift" ]; then
    if command -v swift-format &>/dev/null; then
        swift-format -i "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# DART - dart format
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "dart" ]; then
    if command -v dart &>/dev/null; then
        dart format "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# SCALA - scalafmt
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "scala" ]; then
    if command -v scalafmt &>/dev/null; then
        scalafmt "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# MARKDOWN - prettier
# ═══════════════════════════════════════════════════════════════

if [ "$EXT" = "md" ]; then
    if [ -f "node_modules/.bin/prettier" ]; then
        ./node_modules/.bin/prettier --write "$FILE_PATH" 2>/dev/null || true
    elif command -v prettier &>/dev/null; then
        prettier --write "$FILE_PATH" 2>/dev/null || true
    fi
    exit 0
fi

exit 0
