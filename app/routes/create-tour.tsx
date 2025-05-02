import { Form, redirect } from "react-router";
import type { Route } from "./+types/create-tour";
import { createTourDTO } from "schema/tour";
import { type } from "arktype";
import { createTour } from "services/tour";

export async function clientAction({ request }: Route.ClientActionArgs) {
  try {
    const formData = await request.formData();
    const tourData = createTourDTO(Object.fromEntries(formData));
    if (tourData instanceof type.errors) {
      return { error: tourData.summary };
    }
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      const tour = await createTour(tourData, token);
      console.log(tour);
      return { error: null };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in creating tour: ${error.message}`
        : `unknown error in creating tour.`;
    return { error: errorMessage };
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export async function clientLoader() {
  const token = localStorage.getItem("loggedInUser");
  if (!token) {
    return redirect("/auth/login");
  }
}

export default function CreateTour({ actionData }: Route.ComponentProps) {
  const error = actionData;
  return (
    <div>
      {error && <div>{error.error}</div>}
      <Form method="post">
        <div>
          <label htmlFor="minimum-people">Minimum People</label>
          <input
            type="number"
            placeholder="Minimum People"
            name="minimumPeople"
            id="minimum-people"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" placeholder="Price" id="price" name="price" />
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" name="startDate" />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" name="endDate" />
        </div>
        <button type="submit">Create Tour</button>
      </Form>
    </div>
  );
}
