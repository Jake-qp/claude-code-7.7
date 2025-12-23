"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Plan, Subscription } from "@/types/database";

interface BillingOverviewProps {
  subscription: (Subscription & { plan: Plan }) | null;
  loading?: boolean;
  error?: string | null;
}

export function BillingOverview({
  subscription,
  loading,
  error,
}: BillingOverviewProps) {
  if (loading) {
    return <BillingOverviewSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">
              No Active Subscription
            </h3>
            <p className="text-muted-foreground mb-4">
              Choose a plan to get started with your subscription.
            </p>
            <Link href="/dashboard/plans">
              <Button>
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const nextBillingDate = new Date(subscription.current_period_end);
  const statusColors = {
    active: "text-green-600 bg-green-50",
    trialing: "text-yellow-600 bg-yellow-50",
    past_due: "text-red-600 bg-red-50",
    canceled: "text-gray-600 bg-gray-50",
    paused: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
              statusColors[subscription.status]
            }`}
          >
            {subscription.status}
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{subscription.plan.name}</div>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(
              subscription.plan.price_cents,
              subscription.plan.currency,
            )}
            /{subscription.plan.interval}
          </p>
          {subscription.cancel_at_period_end && (
            <p className="text-sm text-destructive mt-2">
              Cancels on {nextBillingDate.toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Next Invoice */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(
              subscription.plan.price_cents,
              subscription.plan.currency,
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Due {nextBillingDate.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">•••• 4242</div>
          <p className="text-sm text-muted-foreground">
            <Link
              href="/dashboard/billing"
              className="text-primary hover:underline"
            >
              Update payment method
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
