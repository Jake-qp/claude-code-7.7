---
name: frontend
description: React/Vue components, state management, data fetching
triggers:
  - Frontend component development
  - Client-side state management
  - Data fetching patterns
generates: null (follows DESIGN-SYSTEM.md)
---

# Frontend Skill

Build interactive, maintainable user interfaces.

## When This Skill Activates

- Creating React/Vue/Svelte components
- Setting up state management
- Implementing data fetching
- Client-side routing

## Prerequisites

- DESIGN-SYSTEM.md must exist (invoke ui-design skill if not)
- Follow design system tokens for all styling

## Component Patterns

### File Structure
```
components/
  [ComponentName]/
    index.tsx        # Main component
    [ComponentName].test.tsx  # Tests
    types.ts         # TypeScript types (if complex)
```

### State Management Decision Tree

| Scenario | Solution |
|----------|----------|
| Component-local | useState |
| Shared across few components | Lift state up |
| Global UI state (theme, sidebar) | Context or Zustand |
| Server state (API data) | TanStack Query |
| Complex forms | React Hook Form + Zod |

### Data Fetching Pattern

```typescript
// Always use TanStack Query for server state
function useFeatureData(id: string) {
  return useQuery({
    queryKey: ['feature', id],
    queryFn: () => fetchFeature(id),
  });
}

// Component handles all states
function Feature({ id }) {
  const { data, isLoading, error } = useFeatureData(id);
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!data) return <EmptyState />;
  
  return <FeatureContent data={data} />;
}
```

## Performance Patterns

- Use `React.memo` for expensive renders
- Use `useCallback` for stable function references
- Use `useMemo` for expensive calculations
- Lazy load routes with `React.lazy`
- Virtualize long lists with `react-virtual`

## Form Patterns

```typescript
// React Hook Form + Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('email')} />
      {form.formState.errors.email && (
        <ErrorMessage>{form.formState.errors.email.message}</ErrorMessage>
      )}
    </form>
  );
}
```

## Checklist Before Completion

- [ ] Follows DESIGN-SYSTEM.md tokens
- [ ] Handles loading, error, empty states
- [ ] Keyboard accessible
- [ ] Tests written (TDD)
- [ ] Mobile responsive
- [ ] No prop drilling (use composition or context)
- [ ] No unnecessary re-renders

## I Do NOT

- Use inline styles (follow design system)
- Fetch data in useEffect directly (use TanStack Query)
- Store server state in Redux/Zustand
- Create deeply nested component trees
- Skip TypeScript types

## Exit Criteria

- [ ] Component renders correctly
- [ ] All states handled
- [ ] Tests passing
- [ ] Follows design system
- [ ] Accessible
