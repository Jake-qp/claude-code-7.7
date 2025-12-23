---
name: Brainstorming
description: Explore vague ideas through collaborative dialogue
trigger: When ideas are vague, /brainstorm command, or user asks for help thinking
token_estimate: ~80 tokens metadata, ~450 full
---

# Brainstorming Skill

Turn vague ideas into clear designs through conversation.

## When to Use

- User says "I want to build..." without details
- User asks "help me think through..."
- `/brainstorm` command invoked
- Request is clearly under-specified

## Step 1: Check Context First

Before asking anything:
- Read CLAUDE.md for stack/conventions
- Check what already exists
- Note relevant patterns

## Step 2: Ask Questions (One at a Time)

**Rules:**
- ⚠️ ONE question per message
- Prefer multiple choice when possible
- Keep exploring until clear

**Good:**
```
Which users will use this feature?

A) Logged-in customers only
B) Anyone (including guests)
C) Admin users only
D) Other (describe)
```

**Bad:**
```
Who will use this, what will they do, and what 
should happen when done? Also, what errors?
```

**Question flow:**
1. **Purpose** — "What problem does this solve?"
2. **Users** — "Who specifically will use this?"
3. **Scope** — "What's the minimum viable version?"
4. **Success** — "How will we know it works?"

## Step 3: Propose Approaches

After understanding, propose 2-3 options:

```markdown
I see two approaches:

**A) [Name] — RECOMMENDED**
- ✅ [Pro]
- ✅ [Pro]
- ⚠️ [Con]

**B) [Name]**
- ✅ [Pro]
- ⚠️ [Con]

I recommend A because [reason]. What do you think?
```

## Step 4: Apply YAGNI

Before finalizing, cut scope:

```markdown
I'd suggest cutting for v1:
- [Feature X] — add later if users ask
- [Feature Y] — adds complexity without clear value

This leaves a focused MVP. Agree?
```

## Exit Criteria

Before proceeding:
- [ ] Purpose is clear
- [ ] User is specific (not "users")
- [ ] Scope is minimal
- [ ] User confirms: "Yes, build this"

## Output

After brainstorming, you have:
1. Clear understanding of what to build
2. Chosen approach with rationale
3. User confirmation

Now proceed to **spec.md** to document formally.

---

## Anti-Patterns

❌ Multiple questions at once
❌ Skip to building without understanding
❌ Accept scope creep ("and also...")
❌ Present one option as the only option

✅ One question at a time
✅ Multiple choice when possible
✅ 2-3 approaches with trade-offs
✅ Cut scope aggressively
