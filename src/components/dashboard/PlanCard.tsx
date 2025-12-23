"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Plan } from "@/types/database";

interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
  onSelect?: () => void;
  loading?: boolean;
}

export function PlanCard({
  plan,
  isCurrent = false,
  onSelect,
  loading = false,
}: PlanCardProps) {
  return (
    <Card className={`relative ${isCurrent ? "border-primary shadow-lg" : ""}`}>
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Current Plan
          </span>
        </div>
      )}

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <div className="mb-4">
          <span className="text-4xl font-bold">
            {formatCurrency(plan.price_cents, plan.currency)}
          </span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </div>

        <ul className="space-y-2 text-left">
          {(plan.features as string[]).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={isCurrent ? "outline" : "primary"}
          disabled={isCurrent || loading}
          loading={loading}
          onClick={onSelect}
        >
          {isCurrent ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}
