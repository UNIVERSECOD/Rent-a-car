import axiosInstance from "../axiosInstance";
import { getAllRentsResponse } from "../rent/types";
import { CreateReservationPayload, GetAllReservationsResponse } from "./types";

async function getAll() {
 
  return await axiosInstance.get<GetAllReservationsResponse>("/reservation");
 
}

// async function getById(id: string) {
//   return await axiosInstance.get<getRentByIdResponse>(`/rents/${id}`);
// }

async function create(data: CreateReservationPayload) {
  return await axiosInstance.post("/reservation", data);
}


const reservationService = {
  create,
  getAll,
};
export default reservationService;
