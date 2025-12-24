import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

/**
 * Billing Screen - View Current Plan
 * Displays plan details and upgrade option
 */
export default function BillingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.planCard}>
          <Text style={styles.label}>Current Plan</Text>
          <Text style={styles.planName}>Pro</Text>
          <Text style={styles.planPrice}>$29/month</Text>

          <View style={styles.features}>
            <FeatureItem text="10,000 API calls/month" />
            <FeatureItem text="50GB storage" />
            <FeatureItem text="5 team members" />
            <FeatureItem text="Priority support" />
          </View>

          <Text style={styles.renewalInfo}>Renews on January 1, 2025</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.upgradeButton,
            pressed && styles.upgradeButtonPressed,
          ]}
          onPress={() => router.push("/upgrade")}
          accessibilityRole="button"
          accessibilityLabel="Upgrade to Enterprise plan"
        >
          <Text style={styles.upgradeButtonText}>Upgrade to Enterprise</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.manageButton,
            pressed && styles.manageButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Manage subscription in Stripe portal"
        >
          <Text style={styles.manageButtonText}>Manage Subscription</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.checkmark}>✓</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 16,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
    marginTop: 4,
    marginBottom: 16,
  },
  features: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkmark: {
    fontSize: 14,
    color: "#22C55E",
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#374151",
  },
  renewalInfo: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 16,
  },
  upgradeButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    // Touch target: minimum 44pt
    minHeight: 52,
    justifyContent: "center",
  },
  upgradeButtonPressed: {
    backgroundColor: "#2563EB",
  },
  upgradeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  manageButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    // Touch target: minimum 44pt
    minHeight: 52,
    justifyContent: "center",
  },
  manageButtonPressed: {
    backgroundColor: "#F9FAFB",
  },
  manageButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },
});
