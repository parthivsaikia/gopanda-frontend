import { getProfile } from "services/profile";
import type { Route } from "./+types/travelagent-dashboard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { agentId } = params;
  if (!agentId) {
    return null;
  }
  const token = localStorage.getItem("loggedInUser");
  if (!token) {
    return null;
  }
  const user = await getProfile(agentId, token);
  console.log(user);
  return user;
}

export default function AgentDashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    <div>
      {user && <div>logged in as {user.username}</div>}
      {!user && <div>not logged in</div>}
    </div>
  );
}
