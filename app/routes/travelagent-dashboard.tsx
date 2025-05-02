import { getCurrentUser } from "services/profile";
import { Form } from "react-router";
import type { Route } from "./+types/travelagent-dashboard";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const user = await getCurrentUser();
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
