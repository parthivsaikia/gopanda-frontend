import { Form, redirect } from "react-router";
import type { Route } from "./+types/signup";
import { signup } from "services/signup";
import { userSignupDTO } from "schema/user";
import { type } from "arktype";
import { login } from "services/login";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  try {
    const data = userSignupDTO(Object.fromEntries(formData));
    if (data instanceof type.errors) {
      return { error: data.summary };
    } else {
      const user = await signup(data);

      const loginData = await login(
        formData.get("username") as string,
        formData.get("password") as string
      );

      localStorage.setItem("loggedInUser", loginData.token);
      return redirect(
        data.role === "Customer"
          ? `/customer-dashboard/${user.id}`
          : `/agent-dashboard/${user.id}`
      );
    }
  } catch (error) {
    return { error };
  }
}

export default function Signup({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <div className="text-red-500">{actionData?.error}</div>
      <Form method="post">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            placeholder="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input type="text" placeholder="State" id="state" name="state" />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
          />
        </div>
        <div>
          <label>Role</label>
          <div>
            <input type="radio" id="customer" value={`Customer`} name="role" />
            <label htmlFor="customer">Customer</label>
          </div>
          <div>
            <input
              type="radio"
              id="travel-agent"
              value={`TravelAgent`}
              name="role"
            />
            <label htmlFor="travel-agent">Travel Agent</label>
          </div>
        </div>
        <button type="submit">Sign up</button>
      </Form>
    </div>
  );
}
