import { NextResponse } from "next/server";
import type { Plan } from "@/types/database";

// Demo plans for development
// In production, these would come from the database
const demoPlans: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    description: "Perfect for small businesses",
    price_cents: 900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_starter_monthly",
    features: ["Up to 5 team members", "Basic analytics", "Email support"],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "plan_pro",
    name: "Pro",
    description: "Best for growing businesses",
    price_cents: 2900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_pro_monthly",
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
    id: "plan_enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price_cents: 9900,
    currency: "usd",
    interval: "month",
    stripe_price_id: "price_enterprise_monthly",
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

// GET /api/plans - List all active plans
export async function GET() {
  try {
    // In production:
    // const supabase = createClient();
    // const { data: plans, error } = await supabase
    //   .from('plans')
    //   .select('*')
    //   .eq('is_active', true)
    //   .order('price_cents', { ascending: true });

    const activePlans = demoPlans.filter((plan) => plan.is_active);

    return NextResponse.json({
      data: activePlans,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching plans:", message);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 },
    );
  }
}
