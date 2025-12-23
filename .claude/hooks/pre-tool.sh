#!/bin/bash
# Claude Code V7.6 - Pre-Tool Hook
# Runs before tool execution (especially git commit)
# Supports 15+ languages for test running

set -euo pipefail

# Read input from Claude Code
INPUT=$(cat)

# Check if we have jq
if ! command -v jq &>/dev/null; then
    # Can't parse input without jq, allow command
    exit 0
fi

# Extract tool and command info
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null) || true
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null) || true

# Only process Bash commands
if [ "$TOOL_NAME" != "Bash" ] && [ -z "$COMMAND" ]; then
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# DANGEROUS COMMAND PROTECTION
# ═══════════════════════════════════════════════════════════════

# Trim whitespace and get just the command
TRIMMED_CMD=$(echo "$COMMAND" | sed 's/^[[:space:]]*//')

# Block dangerous recursive delete - check if command STARTS with rm
if [[ "$TRIMMED_CMD" =~ ^rm[[:space:]]+-[rf] ]] || [[ "$TRIMMED_CMD" =~ ^rm[[:space:]]+--recursive ]]; then
    # Only block if targeting dangerous paths
    # IMPORTANT: ([[:space:]/]|$) matches trailing space, slash, OR end-of-string
    if [[ "$COMMAND" =~ [[:space:]]/(|home|usr|etc|var|tmp)([[:space:]/]|$) ]] || \
       [[ "$COMMAND" =~ [[:space:]]~([[:space:]/]|$) ]] || \
       [[ "$COMMAND" =~ [[:space:]]\.\.([[:space:]/]|$) ]] || \
       [[ "$COMMAND" =~ [[:space:]]\*([[:space:]]|$) ]]; then
        echo "" >&2
        echo "⛔ BLOCKED: Dangerous recursive delete" >&2
        echo "   Command: $COMMAND" >&2
        echo "   This could delete critical files." >&2
        echo "" >&2
        exit 2
    fi
fi

# Block secret exposure - only if actually running cat/less/etc on secret files
if [[ "$TRIMMED_CMD" =~ ^(cat|less|more|head|tail)[[:space:]] ]]; then
    if [[ "$COMMAND" =~ \.(env|pem|key|secret)[[:space:]]*$ ]] || \
       [[ "$COMMAND" =~ \.(env|pem|key|secret)[[:space:]] ]]; then
        echo "" >&2
        echo "⛔ BLOCKED: Potential secret exposure" >&2
        echo "   Command: $COMMAND" >&2
        echo "   Don't display secrets in terminal." >&2
        echo "" >&2
        exit 2
    fi
fi

# Block data exfiltration patterns - only actual curl with data
if [[ "$TRIMMED_CMD" =~ ^curl[[:space:]] ]]; then
    if [[ "$COMMAND" =~ (-d|--data)[[:space:]].*(\$|env|secret|key|token|password) ]]; then
        echo "" >&2
        echo "⛔ BLOCKED: Potential data exfiltration" >&2
        echo "   Command: $COMMAND" >&2
        echo "" >&2
        exit 2
    fi
fi

# ═══════════════════════════════════════════════════════════════
# GIT COMMIT - RUN TESTS FIRST
# ═══════════════════════════════════════════════════════════════

# Only run tests on git commit
if ! [[ "$TRIMMED_CMD" =~ ^git[[:space:]]+commit ]]; then
    exit 0
fi

echo "" >&2
echo "🔍 Pre-commit check..." >&2

# Helper function to find test files, excluding dependency directories
# This prevents false positives from node_modules, vendor, etc.
find_test_files() {
    local pattern="$1"
    find . \( -path ./node_modules -o -path ./.git -o -path ./vendor -o -path ./.venv -o -path ./venv -o -path ./__pycache__ -o -path ./dist -o -path ./build \) -prune -o -name "$pattern" -print 2>/dev/null | head -1 | grep -q .
}

# Helper to check for test directory (excluding dependencies)
has_test_dir() {
    local dir="$1"
    [ -d "$dir" ] && [ "$dir" != "./node_modules" ]
}

# Detect project type and run appropriate tests
run_tests() {
    # ─────────────────────────────────────────────────────────
    # NODE.JS / JAVASCRIPT / TYPESCRIPT
    # ─────────────────────────────────────────────────────────
    if [ -f "package.json" ]; then
        # Check if test script exists and there are test files
        if grep -q '"test"' package.json 2>/dev/null; then
            # Check for actual test files (EXCLUDING node_modules)
            if find . \( -path ./node_modules -o -path ./.git \) -prune -o \( -name "*.test.*" -o -name "*.spec.*" \) -print 2>/dev/null | grep -v "^$" | head -1 | grep -q . || \
               [ -d "__tests__" ] || [ -d "tests" ] || [ -d "test" ]; then
                echo "🧪 Running npm test..." >&2
                if ! npm test 2>&1; then
                    echo "" >&2
                    echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                    echo "   Fix failing tests before committing." >&2
                    exit 2
                fi
                echo "✅ Tests passed" >&2
                return 0
            fi
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # PYTHON
    # ─────────────────────────────────────────────────────────
    if [ -f "pyproject.toml" ] || [ -f "setup.py" ] || [ -f "requirements.txt" ]; then
        # Check for test directory or test files (EXCLUDING venv, .venv)
        if [ -d "tests" ] || [ -d "test" ] || \
           find . \( -path ./.venv -o -path ./venv -o -path ./__pycache__ -o -path ./.git \) -prune -o \( -name "test_*.py" -o -name "*_test.py" \) -print 2>/dev/null | grep -v "^$" | head -1 | grep -q .; then
            if command -v pytest &>/dev/null; then
                echo "🧪 Running pytest..." >&2
                if ! pytest 2>&1; then
                    echo "" >&2
                    echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                    exit 2
                fi
                echo "✅ Tests passed" >&2
                return 0
            elif command -v python &>/dev/null; then
                echo "🧪 Running python -m pytest..." >&2
                if ! python -m pytest 2>&1; then
                    echo "" >&2
                    echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                    exit 2
                fi
                echo "✅ Tests passed" >&2
                return 0
            fi
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # GO
    # ─────────────────────────────────────────────────────────
    if [ -f "go.mod" ]; then
        # Go test files (excluding vendor)
        if find . \( -path ./vendor -o -path ./.git \) -prune -o -name "*_test.go" -print 2>/dev/null | grep -v "^$" | head -1 | grep -q .; then
            echo "🧪 Running go test..." >&2
            if ! go test ./... 2>&1; then
                echo "" >&2
                echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                exit 2
            fi
            echo "✅ Tests passed" >&2
            return 0
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # RUST
    # ─────────────────────────────────────────────────────────
    if [ -f "Cargo.toml" ]; then
        echo "🧪 Running cargo test..." >&2
        if ! cargo test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # RUBY
    # ─────────────────────────────────────────────────────────
    if [ -f "Gemfile" ]; then
        if [ -d "spec" ]; then
            echo "🧪 Running rspec..." >&2
            if ! bundle exec rspec 2>&1; then
                echo "" >&2
                echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                exit 2
            fi
            echo "✅ Tests passed" >&2
            return 0
        elif [ -d "test" ]; then
            echo "🧪 Running minitest..." >&2
            if ! bundle exec rake test 2>&1; then
                echo "" >&2
                echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                exit 2
            fi
            echo "✅ Tests passed" >&2
            return 0
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # ELIXIR
    # ─────────────────────────────────────────────────────────
    if [ -f "mix.exs" ]; then
        if [ -d "test" ]; then
            echo "🧪 Running mix test..." >&2
            if ! mix test 2>&1; then
                echo "" >&2
                echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                exit 2
            fi
            echo "✅ Tests passed" >&2
            return 0
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # PHP
    # ─────────────────────────────────────────────────────────
    if [ -f "composer.json" ]; then
        if [ -d "tests" ] && [ -f "vendor/bin/phpunit" ]; then
            echo "🧪 Running phpunit..." >&2
            if ! ./vendor/bin/phpunit 2>&1; then
                echo "" >&2
                echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                exit 2
            fi
            echo "✅ Tests passed" >&2
            return 0
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # .NET / C#
    # ─────────────────────────────────────────────────────────
    if find . -name "*.csproj" -o -name "*.sln" 2>/dev/null | head -1 | grep -q .; then
        echo "🧪 Running dotnet test..." >&2
        if ! dotnet test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # JAVA / KOTLIN (Maven)
    # ─────────────────────────────────────────────────────────
    if [ -f "pom.xml" ]; then
        echo "🧪 Running mvn test..." >&2
        if ! mvn test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # JAVA / KOTLIN (Gradle)
    # ─────────────────────────────────────────────────────────
    if [ -f "build.gradle" ] || [ -f "build.gradle.kts" ]; then
        echo "🧪 Running gradle test..." >&2
        if ! ./gradlew test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # SWIFT
    # ─────────────────────────────────────────────────────────
    if [ -f "Package.swift" ]; then
        echo "🧪 Running swift test..." >&2
        if ! swift test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # DART / FLUTTER
    # ─────────────────────────────────────────────────────────
    if [ -f "pubspec.yaml" ]; then
        if [ -d "test" ]; then
            if command -v flutter &>/dev/null; then
                echo "🧪 Running flutter test..." >&2
                if ! flutter test 2>&1; then
                    echo "" >&2
                    echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                    exit 2
                fi
            else
                echo "🧪 Running dart test..." >&2
                if ! dart test 2>&1; then
                    echo "" >&2
                    echo "❌ COMMIT BLOCKED: Tests must pass" >&2
                    exit 2
                fi
            fi
            echo "✅ Tests passed" >&2
            return 0
        fi
    fi

    # ─────────────────────────────────────────────────────────
    # SCALA (sbt)
    # ─────────────────────────────────────────────────────────
    if [ -f "build.sbt" ]; then
        echo "🧪 Running sbt test..." >&2
        if ! sbt test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # ─────────────────────────────────────────────────────────
    # CLOJURE (Leiningen)
    # ─────────────────────────────────────────────────────────
    if [ -f "project.clj" ]; then
        echo "🧪 Running lein test..." >&2
        if ! lein test 2>&1; then
            echo "" >&2
            echo "❌ COMMIT BLOCKED: Tests must pass" >&2
            exit 2
        fi
        echo "✅ Tests passed" >&2
        return 0
    fi

    # No tests found - allow commit
    echo "ℹ️  No test configuration detected" >&2
    return 0
}

# Run the tests
run_tests

exit 0
