import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/login";
import { login } from "services/login";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { redirectToDashboard } from "services/redirectToDashboard";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  try {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const user = await login(username, password);
    const data = jwtDecode(user.token);
    localStorage.setItem("loggedInUser", user.token);
    return redirect(redirectToDashboard(data.role));
  } catch (error) {
    return { error: "Wrong Credentials" };
  }
}

export async function clientLoader() {
  const token = localStorage.getItem("loggedInUser");
  if (token) {
    const data = jwtDecode(token);
    return redirect(redirectToDashboard(data.role));
  }
}

export default function LoginPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Login to use gopandas.</h1>
      <p className="text-red-500">{actionData?.error}</p>
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit">Log in</button>
      </Form>
    </div>
  );
}
