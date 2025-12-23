---
description: Explore a vague idea through collaborative dialogue. Usage: /brainstorm "idea"
---

# /brainstorm - Explore Ideas

**Idea:** $ARGUMENTS

---

## When to Use

- Idea is vague ("I want to add analytics")
- Multiple approaches possible
- User wants help thinking through options
- Scope is unclear

---

## Process

```bash
echo "brainstorm" > .claude/state/phase
```

Load skill: `.claude/skills/brainstorm.md`

### 1. Understand Context
- Read CLAUDE.md
- Check existing code
- Note what's already there

### 2. Ask Questions (One at a Time)
- Purpose: What problem does this solve?
- Users: Who specifically uses this?
- Scope: What's the minimum viable version?
- Success: How will we know it works?

### 3. Propose Approaches
- Present 2-3 options with trade-offs
- Lead with your recommendation
- Explain reasoning

### 4. Apply YAGNI
- Actively cut scope
- Focus on MVP
- "Add later if users ask"

---

## Exit

When user confirms "Yes, build this":
- Proceed to `/build` to document and implement
- Or stay in exploration if more questions arise

---

## Output

After brainstorming, you have:
1. Clear understanding
2. Chosen approach
3. User confirmation

The conversation becomes input for spec.md.
