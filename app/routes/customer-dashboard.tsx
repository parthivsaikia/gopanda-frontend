import { getProfile } from "services/profile";
import type { Route } from "./+types/customer-dashboard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { customerId } = params;
  if (customerId) {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      const user = await getProfile(customerId, token);
      console.log(user);
      return user;
    } else {
      console.log("token not found");
    }
  }
  return null;
}

export default function CustomerDashboard({
  loaderData,
}: Route.ComponentProps) {
  const user = loaderData;
  return (
    <div>
      {user && <div>you are logged in as {user.username}</div>}
      {!user && <div>you are not signed in</div>}
    </div>
  );
}
