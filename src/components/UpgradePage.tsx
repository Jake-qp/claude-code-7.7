"use client";

import React, { useEffect, useState } from "react";
import { Plan, Subscription } from "@/types/billing";
import { PLANS, getPlanOrDefault, getDisplayPlanName } from "@/lib/plans";
import { getSubscriptionPlanId } from "@/lib/subscription";

interface UpgradePageProps {
  userId: string;
}

export function UpgradePage({ userId }: UpgradePageProps) {
  const [currentPlanId, setCurrentPlanId] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentPlan() {
      // BUG: getSubscriptionPlanId returns undefined for users without subscription
      // This undefined value is passed to getPlanById which returns undefined
      // The plan name is then displayed as "undefined" in the UI
      const planId = await getSubscriptionPlanId(userId);
      setCurrentPlanId(planId);
      setLoading(false);
    }
    loadCurrentPlan();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // FIX: Use getPlanOrDefault to safely get plan with Free fallback
  const currentPlan = getPlanOrDefault(currentPlanId);

  return (
    <div className="upgrade-page">
      <h1>Upgrade Your Plan</h1>

      <div className="current-plan-info">
        <p>
          Your current plan:{" "}
          <strong className="current-plan-name">{currentPlan.name}</strong>
        </p>
      </div>

      <div className="plan-options">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`plan-option ${plan.id === currentPlanId ? "current" : ""}`}
          >
            <h3>{plan.name}</h3>
            <p className="price">${plan.price}/month</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              disabled={plan.id === currentPlanId}
              onClick={() => console.log(`Upgrade to ${plan.id}`)}
              aria-label={
                plan.id === currentPlanId
                  ? `${plan.name} is your current plan`
                  : `Upgrade to ${plan.name} plan for $${plan.price} per month`
              }
            >
              {plan.id === currentPlanId ? "Current Plan" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
