"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, FileText, ExternalLink } from "lucide-react";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handleManagePayment = async () => {
    setLoading(true);
    // Will redirect to Stripe Customer Portal
    // For now, show a placeholder
    setTimeout(() => {
      setLoading(false);
      alert("Stripe Customer Portal integration will be added in Phase 5");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your payment methods and view invoice history.
        </p>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-muted p-3">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleManagePayment}
              loading={loading}
            >
              Update
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invoices yet</p>
              <p className="text-sm">
                Your invoices will appear here once you subscribe to a plan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
