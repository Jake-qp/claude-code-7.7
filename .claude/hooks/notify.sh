#!/bin/bash
# Claude Code V7.6 - Notification Hook
# Sends desktop notifications for important events

set -euo pipefail

# Read input from Claude Code
INPUT=$(cat)

# Extract notification info if available
MESSAGE=""
TITLE="Claude Code"

if command -v jq &>/dev/null; then
    MESSAGE=$(echo "$INPUT" | jq -r '.message // empty' 2>/dev/null) || true
    TITLE=$(echo "$INPUT" | jq -r '.title // "Claude Code"' 2>/dev/null) || true
fi

# Default message if none provided
if [ -z "$MESSAGE" ]; then
    MESSAGE="Task completed"
fi

# ═══════════════════════════════════════════════════════════════
# SEND NOTIFICATION
# ═══════════════════════════════════════════════════════════════

# macOS
if command -v osascript &>/dev/null; then
    osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\"" 2>/dev/null || true
    exit 0
fi

# Linux with notify-send
if command -v notify-send &>/dev/null; then
    notify-send "$TITLE" "$MESSAGE" 2>/dev/null || true
    exit 0
fi

# Windows (WSL or Git Bash)
if command -v powershell.exe &>/dev/null; then
    powershell.exe -Command "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null; \$template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02); \$template.GetElementsByTagName('text')[0].AppendChild(\$template.CreateTextNode('$TITLE')) | Out-Null; \$template.GetElementsByTagName('text')[1].AppendChild(\$template.CreateTextNode('$MESSAGE')) | Out-Null; [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('Claude Code').Show([Windows.UI.Notifications.ToastNotification]::new(\$template))" 2>/dev/null || true
    exit 0
fi

# Fallback: just echo
echo "🔔 $TITLE: $MESSAGE" >&2

exit 0
