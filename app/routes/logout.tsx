import { redirect } from "react-router";

export async function clientAction() {
  localStorage.removeItem("loggedInUser");
  return redirect("/");
}
