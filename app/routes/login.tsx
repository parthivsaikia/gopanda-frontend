import { Form, Link } from "react-router";
import type { Route } from "./+types/login";
import axios from "axios";
import { login } from "services/login";
import { act, useEffect } from "react";

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  try {
    let error: string = "";
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const user = await login(username, password);
    console.log(username, password);
    console.log(user);
    return { user, error };
  } catch (error) {
    return { user: null, error: "Wrong credentials" };
  }
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  if (actionData?.user && typeof window !== undefined) {
    useEffect(() => {
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(actionData.user)
      );
    }, [actionData]);
  }

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
