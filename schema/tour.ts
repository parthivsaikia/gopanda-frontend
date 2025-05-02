import { type } from "arktype";

export const createTourDTO = type({
  minimumPeople: "string.integer > 0",
  price: "string.integer > 0",
  startDate: "string.date",
  endDate: "string.date",
});

export type createTourDTO = typeof createTourDTO.infer;
