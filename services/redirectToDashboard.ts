export const redirectToDashboard = (role: string) => {
  if (role === "Customer") {
    return "/customer-dashboard";
  } else if (role === "TravelAgent") {
    return "/agent-dashboard";
  }
};
