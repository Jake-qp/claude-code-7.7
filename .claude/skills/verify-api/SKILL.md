---
name: API Verification
description: Verify external APIs before implementing - multiple methods available
trigger: Before implementing ANY external library or API
token_estimate: ~60 tokens metadata, ~400 full
---

# API Verification Skill

Verify every external API before writing implementation code.

**Why:** Claude can hallucinate APIs that don't exist, methods with wrong signatures, or deprecated features. Verification prevents shipping broken code.

## Verification Methods (Choose One)

### Method 1: Context7 MCP (Best)

If you have Context7 installed:

1. Search for the library
2. Fetch current API reference
3. Verify method signatures
4. Note version and deprecations

### Method 2: Official Documentation

If Context7 unavailable:

1. Search for `[library] official documentation`
2. Navigate to API reference
3. Verify method signatures manually
4. Check version compatibility

### Method 3: Type Definitions

For TypeScript/JavaScript:

1. Check `@types/[library]` or built-in types
2. Inspect type signatures
3. Verify parameters and return types

### Method 4: REPL/Playground Testing

When docs are unclear:

1. Create minimal test file
2. Import the library
3. Test the method exists
4. Verify return value shape

## Verification Process

### Step 1: List Dependencies

From your spec/design, list every external library:

```markdown
## Dependencies to Verify
- stripe (payments)
- @tanstack/react-query (data fetching)
- zod (validation)
```

### Step 2: Verify Each

For EACH dependency, verify:
- [ ] Library/method exists
- [ ] Parameters are correct
- [ ] Return type is correct
- [ ] No deprecation warnings
- [ ] Version is compatible

### Step 3: Document in SCRATCHPAD.md

```markdown
## API Verifications - [Feature Name]

### stripe v14.x (via Context7)
- ✅ stripe.paymentIntents.create(params) → PaymentIntent
- ✅ stripe.customers.retrieve(id) → Customer
- ⚠️ stripe.charges.create() deprecated → use paymentIntents

### @tanstack/react-query v5.x (via official docs)
- ✅ useQuery({ queryKey, queryFn }) → QueryResult
- ⚠️ v5 syntax differs from v4

### localStorage (via MDN)
- ✅ localStorage.setItem(key, value) → void
- ✅ localStorage.getItem(key) → string | null
```

## If Verification Fails

If you cannot verify an API:

1. **Note in SCRATCHPAD.md:**
   ```
   ❓ [library] - Could not verify (no docs found)
   ```

2. **Consider alternatives:**
   - Similar library with better docs?
   - Native solution available?
   - Simpler approach?

3. **If critical, mark for review:**
   ```
   [ ] Feature [REVIEW] - unverified API dependency
   ```

4. **Ask human for guidance** if blocked

## Important

```
Verification ≠ Blocking

The goal is confidence, not perfection.
- Verified via docs? ✅ Proceed
- Verified via types? ✅ Proceed  
- Verified via testing? ✅ Proceed
- Cannot verify at all? Ask for help or mark [REVIEW]
```

## Exit Criteria

- [ ] All major dependencies verified
- [ ] Verification method noted for each
- [ ] Documented in SCRATCHPAD.md
- [ ] Ready to proceed to BUILD

```bash
echo "verify" > .claude/state/phase
```
