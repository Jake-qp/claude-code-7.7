import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const changePlanSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  subscriptionId: z.string().optional(),
});

// POST /api/subscriptions/change - Change subscription plan
export async function POST(request: Request) {
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 },
    );
  }

  try {
    // Verify user is authenticated
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body = await request.json();
    const result = changePlanSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const { priceId, subscriptionId } = result.data;

    // If no existing subscription, redirect to checkout
    if (!subscriptionId) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard/plans`,
        metadata: {
          userId: user.id,
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Update existing subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Get the first subscription item (assuming single-product subscription)
    const subscriptionItemId = subscription.items.data[0]?.id;

    if (!subscriptionItemId) {
      return NextResponse.json(
        { error: "No subscription items found" },
        { status: 400 },
      );
    }

    // Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscriptionItemId,
            price: priceId,
          },
        ],
        proration_behavior: "always_invoice", // Immediately charge/credit the difference
      },
    );

    // Type assertion for Stripe subscription object
    const sub = updatedSubscription as unknown as {
      id: string;
      status: string;
      current_period_end: number;
    };

    return NextResponse.json({
      data: {
        subscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error changing subscription:", message);

    if (message.includes("No such subscription")) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to change subscription" },
      { status: 500 },
    );
  }
}
