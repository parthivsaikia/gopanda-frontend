import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/login";
import { userLoginDTO } from "schema/user";
import { type } from "arktype";
import { login } from "services/login";

export async function clientAction({ request }: Route.ClientActionArgs) {
  try {
    const formData = await request.formData();
    const userInputData = userLoginDTO(Object.fromEntries(formData));
    if (userInputData instanceof type.errors) {
      return { error: userInputData.summary };
    }
    const userData = await login(
      userInputData.username,
      userInputData.password
    );
    return redirect(
      userData.role === "Customer" ? "/customer-dashboard" : "/agent-dashboard"
    );
  } catch (error) {
    return { error: error };
  }
}

export default function LoginPage() {
  return (
    <div>
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Username</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">Log In</button>
      </Form>
    </div>
  );
}
