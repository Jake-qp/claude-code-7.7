"use client";

import { BillingOverview } from "@/components/dashboard/BillingOverview";

// Demo data for initial UI
const demoSubscription = null; // No subscription to show empty state

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your subscription.
        </p>
      </div>

      <BillingOverview subscription={demoSubscription} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">
            No recent activity to show.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/dashboard/billing"
                className="text-primary hover:underline"
              >
                Update payment method
              </a>
            </li>
            <li>
              <a
                href="/dashboard/plans"
                className="text-primary hover:underline"
              >
                Change subscription plan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
