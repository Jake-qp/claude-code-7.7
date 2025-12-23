"use client";

import { useState } from "react";
import { PlanCard } from "@/components/dashboard/PlanCard";
import type { Plan } from "@/types/database";

// Demo plans for initial UI
const demoPlans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    description: "Perfect for small businesses",
    price_cents: 900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_starter",
    features: ["Up to 5 team members", "Basic analytics", "Email support"],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Pro",
    description: "Best for growing businesses",
    price_cents: 2900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_pro",
    features: [
      "Unlimited team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Enterprise",
    description: "For large organizations",
    price_cents: 9900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_enterprise",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom SLA",
      "On-premise deployment",
      "SSO & SAML",
    ],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function PlansPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setLoading(true);
    setSelectedPlanId(planId);
    // Will integrate with Stripe Checkout in Phase 5
    setTimeout(() => {
      setLoading(false);
      alert("Stripe Checkout integration will be added in Phase 5");
      setSelectedPlanId(null);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Select the plan that best fits your needs. Cancel anytime.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {demoPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrent={false}
            loading={loading && selectedPlanId === plan.id}
            onSelect={() => handleSelectPlan(plan.id)}
          />
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. No credit card required.</p>
      </div>
    </div>
  );
}
