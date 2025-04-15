import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/login", "routes/login.tsx"),
  route("auth/signup", "routes/signup.tsx"),
  route("customer-dashboard/", "routes/customer-dashboard.tsx"),
  route("agent-dashboard/", "routes/travelagent-dashboard.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
