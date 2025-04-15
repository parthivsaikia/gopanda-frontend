import { getProfile } from "services/profile";
import type { Route } from "./+types/customer-dashboard";
import { Form } from "react-router";
import { jwtDecode } from "jwt-decode";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      const userData = jwtDecode(token);
      const userId = userData.sub;
      if (userId) {
        const user = await getProfile(userId, token);
        return { user };
      }
    }
    return { error: "token not found" };
  } catch (error) {
    return { error };
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function CustomerDashboard({
  loaderData,
}: Route.ComponentProps) {
  const { user, error } = loaderData;
  return (
    <div>
      <Form method="post" action="/logout">
        <button>log out</button>
      </Form>
      {user && <div>you are logged in as {user.username}</div>}
      {!user && <div>you are not signed in</div>}
      {error && <div>{"some error happened"}</div>}
    </div>
  );
}
