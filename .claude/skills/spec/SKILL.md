---
name: Specification
description: Define WHO uses the feature and WHAT success looks like
trigger: Starting any new feature with /build
token_estimate: ~80 tokens metadata, ~350 full
---

# Specification Skill

Define the feature before building it.

## If Coming From Brainstorm

If brainstorming just completed, **pull from that conversation**:
- Don't re-ask questions already answered
- Summarize the agreed approach
- Fill in any gaps

## Step 1: Define the User

**Not "users" — a specific person.**

```markdown
## User
**Who:** [Specific role - e.g., "Small business owner with 10 employees"]
**Context:** [Where/when - e.g., "At desk, reviewing weekly reports"]
**Goal:** [What they want to accomplish]
**Tech comfort:** [Novice / Intermediate / Expert]
```

## Step 2: Define Success

**Measurable criteria, not vague goals.**

```markdown
## Success Criteria
1. [User can do X in under Y seconds]
2. [Feature handles Z edge case]
3. [No more than N clicks to complete]
```

## Step 3: Map the Flow

```markdown
## User Flow
1. User starts at [entry point]
2. User sees [what]
3. User does [action]
4. System responds [how]
5. User achieves [goal]
```

## Step 4: List Dependencies

```markdown
## External Dependencies
- [ ] [library/API] - [purpose]
- [ ] [library/API] - [purpose]

(All must be verified before BUILD)
```

## Step 5: Create .spec File

Save to `.spec`:

```markdown
# Feature: [Name]

## User
[From Step 1]

## Success Criteria
[From Step 2]

## Flow
[From Step 3]

## Dependencies
[From Step 4]

---
Created: [date]
```

## Exit Criteria

- [ ] User is specific (not "users")
- [ ] Success criteria are measurable
- [ ] Flow has clear steps
- [ ] Dependencies listed
- [ ] .spec file created and committed

```bash
echo "spec" > .claude/state/phase
git add .spec && git commit -m "spec: [feature name]"
```
