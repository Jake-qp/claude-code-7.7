---
name: Verification Before Completion
description: Evidence before claims - verify before asserting success
trigger: Before any completion claim, commit, or PR
token_estimate: ~60 tokens metadata, ~400 full
---

# Verification Skill

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

"It should work" is not verification.
"I ran the tests earlier" is not verification.
Only output you just saw is verification.
```

## Forbidden Phrases

Never say these without fresh evidence:
- "should work"
- "probably works"
- "seems to be working"
- "I believe this fixes"
- "this should resolve"
- "I think it's ready"

Instead: Run the verification. Report what you observed.

---

## The Gate Function

BEFORE claiming ANY success:

```
1. IDENTIFY → What command proves this claim?
2. RUN      → Execute the command (fresh, complete)
3. READ     → Full output, check exit code
4. VERIFY   → Does output confirm the claim?
5. CLAIM    → Only now state the result
```

---

## Common Claims & Required Evidence

| Claim | Required Verification |
|-------|----------------------|
| "Tests pass" | Run `npm test` (or equivalent), see all green |
| "Build succeeds" | Run `npm run build`, exit code 0, no errors |
| "Bug is fixed" | Run reproduction steps, bug no longer occurs |
| "Feature works" | Run happy path, see expected behavior |
| "No regressions" | Run full test suite, all pass |
| "Type-safe" | Run `tsc --noEmit`, no errors |

---

## Agent Delegation Verification

When a subagent reports "success":

```
⚠️ DO NOT trust blindly.

Before reporting subagent success:
1. What specific command did they run?
2. What was the exact output?
3. Can you verify independently?

If unclear: Re-run the verification yourself.
```

---

## Red Flags

Stop and verify if you catch yourself:

- About to say "done" without running tests
- Trusting that code "looks right"
- Assuming a fix works because it compiles
- Reporting success based on partial output
- Skipping verification because "it's simple"

---

## Verification Output Format

When reporting completion:

```markdown
## Verification Report

**Claim:** [What you're asserting]

**Command:** `[exact command run]`

**Output:**
```
[actual output snippet]
```

**Exit code:** [0 or error code]

**Verdict:** ✅ Verified / ❌ Failed
```

---

## Exit Criteria

- [ ] Fresh verification command run
- [ ] Output observed and recorded
- [ ] Exit code checked
- [ ] Claim matches evidence
