---
name: Test-Driven Development
description: Write failing tests first, then make them pass
trigger: BUILD phase of any feature
token_estimate: ~80 tokens metadata, ~600 full
---

# Test-Driven Development Skill

Tests first. Always.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST

Write code before test? Delete it. Start over.
- Don't keep it as "reference"
- Don't "adapt" it while writing tests  
- Delete means delete

This is not negotiable. Code written before tests
cannot be trusted, even if it "looks right."
```

---

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is debt. |
| "TDD will slow me down" | TDD is faster than debugging. |

If you catch yourself thinking any of these: STOP. Delete code. Start with test.

---

## Testing Anti-Patterns

### 1. Testing Mock Behavior
```
❌ Assert that mock was called
✅ Assert on real component behavior
```
If your test passes with a broken implementation, it's testing the mock.

### 2. Test-Only Methods in Production
```
❌ Adding destroy() or resetState() just for tests
✅ Use dependency injection or separate test fixtures
```
Production code shouldn't know about tests. Instead:
- Pass dependencies as constructor/function arguments
- Create test-specific instances with fresh state
- Use factory functions that return clean instances

### 3. Mocking Without Understanding
```
❌ Mock returns empty, test passes
✅ Mock returns realistic data with side effects
```
Know what side effects your test depends on.

### 4. Incomplete Mocks
```
❌ Mock only methods you're calling
✅ Mirror real API structure completely
```
Partial mocks hide structural assumptions.

---

## Test Isolation

Each test must be independent. Tests that depend on each other are fragile.

### Reset State Between Tests

```typescript
describe('Feature', () => {
  let service: MyService;
  
  beforeEach(() => {
    // Create fresh instances - don't reuse
    service = new MyService();
    
    // Clear any global mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any subscriptions, timers, etc.
  });
});
```

### Common Isolation Problems

| Problem | Solution |
|---------|----------|
| Tests pass alone, fail together | State leaking between tests - add beforeEach cleanup |
| Tests fail in different order | Shared mutable state - use fresh instances |
| Flaky tests | Async timing issues - use proper waitFor/flush |
| Slow tests | Too much real I/O - mock external calls |

### Proper Dependency Injection

Instead of adding test-only reset methods:

```typescript
// ❌ Anti-pattern: test-only method in production
class TodoService {
  private todos: Todo[] = [];
  
  // Don't do this - production code for testing
  resetForTests() { this.todos = []; }
}

// ✅ Better: dependency injection
class TodoService {
  constructor(private repository: TodoRepository) {}
}

// In tests: create fresh instance with mock repository
const mockRepo = { getAll: jest.fn(), save: jest.fn() };
const service = new TodoService(mockRepo);
```

### In-Memory Test Databases

For database tests:
```typescript
beforeEach(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterEach(async () => {
  await db.migrate.rollback();
});
```

---

## The TDD Cycle

```
1. RED    → Write a failing test
2. GREEN  → Write minimal code to pass
3. REFACTOR → Clean up, tests still pass
4. REPEAT
```

## Phase: Testing (Write Tests)

```bash
echo "testing" > .claude/state/phase
```

In this phase:
- ✅ Create new test files
- ✅ Write test cases
- ✅ Run tests (they should fail)
- ⛔ Do NOT write implementation yet

### Test Structure

```typescript
describe('FeatureName', () => {
  describe('happy path', () => {
    it('should [expected behavior]', () => {
      // Arrange
      // Act  
      // Assert
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {});
    it('should handle maximum values', () => {});
  });

  describe('error cases', () => {
    it('should reject invalid input', () => {});
  });
});
```

### Commit Tests

```bash
git add .
git commit -m "test: [feature] failing tests"
```

## Phase: Implementing (Make Tests Pass)

```bash
echo "implementing" > .claude/state/phase
```

In this phase:
- ✅ Write implementation code
- ✅ Run tests until they pass
- ⛔ Do NOT modify tests (they're locked)

### The Test Modification Trap

**DANGER:** When tests fail, resist the urge to "fix" the test.

```
❌ "Test expected X but code returns Y, update the test"
✅ "Test expected X but code returns Y, fix the code"
```

Tests are the spec. Code matches tests, not vice versa.

### Emergency Test Unlock

Only if the TEST ITSELF is wrong (not just failing):

```bash
# Temporarily unlock
echo "testing" > .claude/state/phase

# Fix the test (with justification)
git commit -m "fix(test): [reason test was wrong]"

# Re-lock
echo "implementing" > .claude/state/phase
```

Log the reason if you do this.

---

## Red Flags

If you catch yourself thinking:
- "I'll write the test after this works"
- "This is too simple to need a test"
- "Let me just try this code first"
- "The test is wrong, not my code"

**STOP.** Return to RED phase. Write the test first.

---

## Test Commands

| Language | Command |
|----------|---------|
| Node.js | `npm test` |
| Python | `pytest` |
| Go | `go test ./...` |
| Rust | `cargo test` |
| Ruby | `bundle exec rspec` |

## Exit Criteria

- [ ] All tests passing
- [ ] No test modifications during implementing
- [ ] Implementation committed
- [ ] Ready for verification

```bash
echo "complete" > .claude/state/phase
git add .
git commit -m "feat: [feature] implementation"
```
