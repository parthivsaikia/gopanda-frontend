import { getProfile } from "services/profile";
import { Form } from "react-router";
import type { Route } from "./+types/travelagent-dashboard";
import { jwtDecode } from "jwt-decode";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      const userData = jwtDecode(token);
      const userId = userData.sub;
      if (userId) {
        const user = await getProfile(userId, token);
        return user;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function AgentDashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    <div>
      <Form method="post" action="/logout">
        <button>Log out</button>
      </Form>
      {user && <div>logged in as {user.username}</div>}
      {!user && <div>not logged in</div>}
    </div>
  );
}
