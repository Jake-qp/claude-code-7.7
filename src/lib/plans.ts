import { Plan } from "@/types/billing";

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "monthly",
    features: ["100 API calls/month", "1GB storage", "1 team member"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "monthly",
    features: [
      "10,000 API calls/month",
      "50GB storage",
      "5 team members",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "monthly",
    features: [
      "Unlimited API calls",
      "500GB storage",
      "Unlimited team members",
      "24/7 support",
      "Custom integrations",
    ],
  },
];

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((plan) => plan.id === planId);
}

export function getPlanName(planId: string): string {
  const plan = getPlanById(planId);
  return plan?.name ?? "Unknown";
}

/**
 * Safe display name for plan - returns "Free" for undefined/null planId
 * Use this in UI components to prevent showing "undefined"
 */
export function getDisplayPlanName(planId: string | undefined | null): string {
  if (!planId) return "Free";
  const plan = getPlanById(planId);
  return plan?.name ?? "Free";
}

/**
 * Get plan with fallback to Free plan for users without subscription
 */
export function getPlanOrDefault(planId: string | undefined | null): Plan {
  if (!planId) return PLANS[0]; // Free plan
  return getPlanById(planId) ?? PLANS[0];
}
