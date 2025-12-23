---
description: Make a small change quickly. Usage: /quick "what to change"
---

# /quick - Quick Change Mode

**Change:** $ARGUMENTS

---

## Is This Actually Quick?

### Micro Change (skip everything)
- [ ] Less than 20 lines of code
- [ ] Single file only
- [ ] No new dependencies
- [ ] Not security-sensitive

**If all checked:** Just make the change, test, commit. Done.

### Quick Change (minimal process)
- [ ] Less than 50 lines of code
- [ ] 1-2 files maximum
- [ ] Dependencies are well-known (React, lodash, etc.) or already in project
- [ ] Not security-sensitive

**If all checked:** Proceed below.

### Not Quick → Use /build
- Touches 3+ files
- Requires new, unfamiliar dependencies
- Involves auth, payments, or PII
- Scope is unclear

---

## Quick Process

### Step 1: Verify Dependencies (if any new ones)

If adding a dependency you haven't used before:
- Check official docs exist
- Verify the method/API you need
- Document in SCRATCHPAD.md

Skip verification for:
- Dependencies already in package.json
- Very common libraries (React, Express, lodash, etc.)
- Built-in browser/Node APIs

### Step 2: Make the Change

Write the code. Keep it simple.

### Step 3: Run Tests (If They Exist)

```bash
npm test        # Node.js
pytest          # Python
go test ./...   # Go
cargo test      # Rust
```

**If no tests exist yet:** Skip this step. The pre-commit hook is smart:
- It only runs tests if YOUR project has test files
- It ignores test files inside node_modules/vendor
- It allows commits when no tests are detected

**For new Node.js projects:** Consider adding `--passWithNoTests` to your test script:
```json
{
  "scripts": {
    "test": "jest --passWithNoTests"
  }
}
```

### Step 4: Commit

```bash
git add .
git commit -m "quick: [brief description]"
```

---

## Done

No spec, no design checklist, no implementation plan for quick changes.

Optionally note in SCRATCHPAD.md:
```markdown
## Quick Change - [date]
- [what changed]
```
