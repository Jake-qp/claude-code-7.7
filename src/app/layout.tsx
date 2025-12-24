export const metadata = {
  title: "Billing Dashboard",
  description: "SaaS billing dashboard with Stripe integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
