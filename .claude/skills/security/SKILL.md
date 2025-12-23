---
name: Security
description: Security checklist for sensitive features
trigger: Features involving auth, payments, PII, or admin
token_estimate: ~80 tokens metadata, ~400 full
---

# Security Skill

For features involving sensitive data or operations.

## When This Applies

- Authentication / Authorization
- Payments / Financial data
- Personal data (PII)
- Admin functionality
- API keys / Secrets

## Security Checklist

### 1. Secrets Management
- [ ] No secrets in code (use env vars)
- [ ] No secrets in logs
- [ ] No secrets in error messages
- [ ] .env in .gitignore

### 2. Input Validation
- [ ] All user input validated
- [ ] Type checking enforced
- [ ] Length limits set
- [ ] Dangerous characters escaped

### 3. Output Security
- [ ] XSS prevention (escape HTML)
- [ ] No sensitive data in responses
- [ ] Proper error messages (no stack traces)

### 4. Database Security
- [ ] Parameterized queries (no SQL injection)
- [ ] Minimum necessary permissions
- [ ] Sensitive fields encrypted

### 5. API Security
- [ ] Authentication required
- [ ] Authorization checked
- [ ] Rate limiting enabled
- [ ] CORS properly configured

### 6. Session/Auth Security
- [ ] Secure session tokens
- [ ] HTTPS only
- [ ] Session timeout
- [ ] Logout invalidates session

### 7. Logging & Monitoring
- [ ] Security events logged
- [ ] No PII in logs
- [ ] Alerts for anomalies

## Checklist Result

```
If ALL items checked → Proceed with implementation
If ANY item fails → Mark task [REVIEW]
```

## Document in .spec

Add security section to your spec:

```markdown
## Security Considerations
- Authentication: [method]
- Authorization: [rules]
- Data handling: [what PII, how protected]
- Audit logging: [what's logged]
```

## Exit Criteria

- [ ] All applicable checklist items pass
- [ ] Security considerations documented
- [ ] If any fails: task marked [REVIEW]

```bash
# Only after checklist passes
echo "implementing" > .claude/state/phase
```
