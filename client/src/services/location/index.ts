import axiosInstance from "../axiosInstance";
import { getAllLocationsResponse } from "./types";


async function getAll() {
  return await axiosInstance.get<getAllLocationsResponse>("/locations");
}


const locationService = {
getAll
};
export default locationService;
