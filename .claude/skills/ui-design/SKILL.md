---
name: ui-design
description: Visual design, design systems, component patterns
triggers:
  - Any UI component creation
  - "make it look good/better/modern"
  - First frontend work on project
generates: DESIGN-SYSTEM.md
---

# UI Design Skill

Create professional, consistent user interfaces.

## When This Skill Activates

- Creating any UI component
- User mentions visual design
- First UI work (must create DESIGN-SYSTEM.md)

## First UI Work: Create Design System

If DESIGN-SYSTEM.md doesn't exist:

1. Detect existing styling (Tailwind, CSS Modules, etc.)
2. Use template from `.claude/templates/DESIGN-SYSTEM.template.md`
3. Fill in:
   - Color palette (with semantic tokens)
   - Typography scale
   - Spacing scale
   - Component library choice (default: shadcn/ui for Next.js)
   - Dark mode approach

## Component Creation Workflow

1. Check DESIGN-SYSTEM.md exists (create if not)
2. Follow design system tokens
3. Apply visual hierarchy principles:
   - Size/weight/color for importance
   - Consistent spacing (4, 8, 12, 16, 24, 32 scale)
   - Clear visual rhythm
4. Handle all states: default, hover, active, disabled, loading, error
5. Ensure accessibility: contrast ratios, focus indicators
6. After creation: append new component to DESIGN-SYSTEM.md

## Visual Principles

| Principle | Application |
|-----------|-------------|
| Hierarchy | Most important = most prominent |
| Consistency | Same patterns for same actions |
| Feedback | Every interaction has response |
| Breathing room | Generous whitespace |

## Component Defaults

- **Buttons:** Clear hierarchy (primary, secondary, ghost)
- **Forms:** Labels above, errors below, inline validation
- **Cards:** Consistent padding, clear sections
- **Tables:** Sticky headers, row hover, pagination
- **Modals:** Focus trap, escape to close

## State Handling

Every component must handle:
- Default state
- Hover state
- Active/pressed state
- Focus state (keyboard navigation)
- Disabled state
- Loading state (if applicable)
- Error state (if applicable)

## After Component Creation

**MUST** append to DESIGN-SYSTEM.md:

```markdown
### [ComponentName]

[Screenshot/description]

**Usage:**
\`\`\`tsx
<ComponentName variant="primary" />
\`\`\`

**Variants:** primary, secondary, ghost
**States:** default, hover, disabled, loading
```

## I Do NOT

- Add decorative animations without purpose
- Use trendy patterns that hurt usability
- Ignore mobile responsiveness
- Skip dark mode consideration
- Create components without documenting them

## Exit Criteria

- [ ] Component follows DESIGN-SYSTEM.md tokens
- [ ] All states handled
- [ ] Accessibility verified (contrast, focus)
- [ ] Component documented in DESIGN-SYSTEM.md
- [ ] Mobile responsive
