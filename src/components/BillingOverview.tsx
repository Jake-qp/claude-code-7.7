import React from "react";
import { Plan, Subscription } from "@/types/billing";
import { getPlanOrDefault } from "@/lib/plans";

interface BillingOverviewProps {
  subscription: Subscription | null;
  onUpgrade: () => void;
}

export function BillingOverview({
  subscription,
  onUpgrade,
}: BillingOverviewProps) {
  // FIX: Use getPlanOrDefault to safely get plan with Free fallback
  const plan = getPlanOrDefault(subscription?.planId);

  return (
    <div className="billing-overview">
      <h2>Current Plan</h2>
      <div className="plan-card">
        <h3 className="plan-name">{plan.name}</h3>
        <p className="plan-price">${plan.price}/month</p>
        <ul className="plan-features">
          {plan?.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button onClick={onUpgrade} className="upgrade-button">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
