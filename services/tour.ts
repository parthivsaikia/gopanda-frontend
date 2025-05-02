import type { createTourDTO } from "schema/tour";
import { baseURL } from "utils/config";
import axios from "axios";

export const createTour = async (data: createTourDTO, token: string) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const tour = await axios.post(`${baseURL}/tours`, data, config);
  return tour;
};
