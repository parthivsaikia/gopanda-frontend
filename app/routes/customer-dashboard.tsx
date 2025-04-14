import type { Route } from "./+types/customer-dashboard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { customerId } = params;
  const;
}

export default function CustomerDashboard() {
  return (
    <div>
      <h1>Customer dashboard</h1>
    </div>
  );
}
