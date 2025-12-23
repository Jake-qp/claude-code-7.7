import Stripe from "stripe";

// Only create stripe instance on the server
let stripeInstance: Stripe | null = null;

export function getStripe() {
  if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}

// Re-export for backward compatibility (server-side only)
export const stripe = typeof window === "undefined" ? getStripe() : null;
