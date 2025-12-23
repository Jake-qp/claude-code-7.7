---
name: integration
description: Third-party API integration (Stripe, Auth0, Supabase, etc.)
triggers:
  - Payment integration
  - Auth provider setup
  - External service integration
  - Third-party API connection
generates: Appends to docs/API-CONTRACTS.md
---

# Integration Skill

Connect to external services correctly.

## When This Skill Activates

- Integrating Stripe/payments
- Setting up Auth0/Clerk
- Connecting to Supabase
- Any third-party API

## Before Integration

1. **Invoke researcher agent** to verify current API
2. Check for official SDK (prefer SDK over raw API)
3. Review rate limits and quotas
4. Understand webhook requirements

## Common Integrations

### Stripe
```typescript
// Server-side only - NEVER expose secret key
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Checkout session
export async function createCheckoutSession(priceId: string, userId: string) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/canceled`,
    metadata: { userId },
  });
}

// ALWAYS verify webhooks
export async function handleWebhook(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body, 
    sig, 
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      break;
  }
}
```

### Supabase
```typescript
// Client (browser) - uses anon key
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server (API routes) - uses service role for admin ops
import { createClient } from '@supabase/supabase-js';
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### Resend (Email)
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'App <noreply@yourdomain.com>',
  to: user.email,
  subject: 'Welcome!',
  react: WelcomeEmail({ name: user.name }),
});
```

### OpenAI
```typescript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: prompt }],
});
```

## After Integration

**MUST** append to docs/API-CONTRACTS.md:

```markdown
## Third-Party Integrations

### [Service Name]

**SDK Version:** [version from package.json]
**Documentation:** [official docs link]

**Endpoints Used:**
- [endpoint]: [purpose]
- [endpoint]: [purpose]

**Webhooks:**
- [webhook event]: [handler location]

**Environment Variables:**
- `[VAR_NAME]`: [description, NOT the actual value]

**Rate Limits:**
- [limit info]

**Error Handling:**
- [how errors are handled]
```

## Environment Variables

```bash
# .env.example (commit this)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
```

## Webhook Best Practices

1. **Verify signatures** - Always validate webhook authenticity
2. **Idempotency** - Handle duplicate events gracefully
3. **Quick response** - Return 200 quickly, process async
4. **Logging** - Log all webhook events for debugging

```typescript
// Webhook handler pattern
export async function POST(req: Request) {
  try {
    const event = await verifyWebhook(req);
    
    // Quick response
    await queueEvent(event);
    
    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}
```

## Exit Criteria

- [ ] Official SDK used (if available)
- [ ] API verified with researcher agent
- [ ] Webhook signature verification
- [ ] Rate limit handling
- [ ] Error handling for service outages
- [ ] Test mode vs live mode handling
- [ ] Documented in API-CONTRACTS.md
- [ ] Environment variables in .env.example
