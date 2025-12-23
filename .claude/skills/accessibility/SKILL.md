---
name: accessibility
description: WCAG compliance, screen readers, keyboard navigation
triggers:
  - Accessibility audit request
  - "make accessible"
  - Screen reader support
  - Keyboard navigation
generates: null
---

# Accessibility Skill

Build apps everyone can use.

## When This Skill Activates

- Accessibility audit or review
- Adding screen reader support
- Keyboard navigation improvements
- WCAG compliance check

## WCAG Levels

| Level | Requirement | Target |
|-------|-------------|--------|
| A | Minimum | Required |
| AA | Standard | **Target for most apps** |
| AAA | Enhanced | Optional |

## Quick Audit

Run automated checks first:
```bash
# In browser
# Chrome DevTools > Lighthouse > Accessibility

# In code
npm install -D axe-core
# Use in tests
```

Then manual testing:
1. Tab through entire page
2. Use screen reader (VoiceOver/NVDA)
3. Zoom to 200%
4. Check color contrast

## Core Requirements

### 1. Semantic HTML
```tsx
// ❌ Div soup
<div onclick={...}>Click me</div>

// ✅ Semantic
<button onClick={...}>Click me</button>

// ❌ Generic structure
<div class="header">...</div>

// ✅ Landmarks
<header>...</header>
<main>...</main>
<nav>...</nav>
<footer>...</footer>
```

### 2. Color Contrast

| Text Size | Ratio Required (AA) |
|-----------|---------------------|
| Normal (< 18px) | 4.5:1 |
| Large (≥ 18px bold, ≥ 24px) | 3:1 |
| UI components | 3:1 |

Check with: Chrome DevTools > Inspect > Color picker

### 3. Keyboard Navigation
```tsx
// Focus visible
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

// Tab order (use native order when possible)
<input tabIndex={0} /> // Focusable
<div tabIndex={-1} />  // Programmatically focusable only

// Skip links
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### 4. Images & Icons
```tsx
// Informative image
<Image src="/chart.png" alt="Sales increased 50% in Q4" />

// Decorative image
<Image src="/decoration.png" alt="" aria-hidden="true" />

// Icon button
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

### 5. Forms
```tsx
// Labels always required
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-error" />
<p id="email-error" role="alert">Please enter valid email</p>

// Required fields
<input required aria-required="true" />

// Error states
<input aria-invalid={hasError} aria-describedby="error-msg" />
```

### 6. Dynamic Content
```tsx
// Live regions for updates
<div role="status" aria-live="polite">
  {message}
</div>

// Alert for important messages
<div role="alert">
  Error: Form submission failed
</div>

// Loading states
<div aria-busy={isLoading} aria-describedby="loading-text">
  <span id="loading-text" className="sr-only">Loading...</span>
</div>
```

## Component Patterns

### Modal Dialog
```tsx
<dialog
  open={isOpen}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
  onKeyDown={handleEscape}
>
  <h2 id="dialog-title">Confirm Delete</h2>
  <p id="dialog-desc">Are you sure?</p>
  {/* Focus trap inside */}
</dialog>
```

### Tab Panel
```tsx
<div role="tablist">
  <button role="tab" aria-selected={active} aria-controls="panel-1">Tab 1</button>
</div>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">
  Content
</div>
```

## Screen Reader Only Text
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

## Testing Checklist

- [ ] Tab through all interactive elements
- [ ] All focused elements visible
- [ ] Screen reader announces correctly
- [ ] Color contrast passes AA
- [ ] Works at 200% zoom
- [ ] No keyboard traps
- [ ] Form errors announced
- [ ] Skip link to main content

## Exit Criteria

- [ ] Lighthouse Accessibility > 90
- [ ] Manual keyboard test passes
- [ ] Screen reader test passes
- [ ] Color contrast AA compliant
- [ ] All images have appropriate alt text
