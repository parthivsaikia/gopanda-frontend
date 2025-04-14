import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/login", "routes/login.tsx"),
  route("auth/signup", "routes/signup.tsx"),
  route("customer-dashboard/:customerId", "routes/customer-dashboard.tsx"),
  route("agent-dashboard/:agentId", "routes/travelagent-dashboard.tsx"),
] satisfies RouteConfig;
