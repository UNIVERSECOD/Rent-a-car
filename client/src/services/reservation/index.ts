import axiosInstance from "../axiosInstance";
import { GetAllRentPayload, getAllRentsResponse, RentPayload } from "../rent/types";
import { ChangeReservationStatusPayload, CreateReservationPayload, GetAllReservationsResponse } from "./types";

async function getAll() {
 
  return await axiosInstance.get<GetAllReservationsResponse>("/reservation");
 
}

// async function getById(id: string) {
//   return await axiosInstance.get<getRentByIdResponse>(`/rents/${id}`);
// }

async function create(data: CreateReservationPayload) {
  return await axiosInstance.post("/reservation", data);
}

async function changeStatus({
  id,
  data,
}: {
  id: string;
  data: ChangeReservationStatusPayload;
}) {
  return await axiosInstance.put(`/reservation/change-status/${id}`, data);
}

async function getPopularCars() {
  
const response = await axiosInstance.get<getAllRentsResponse>("/reservation/popular-cars")
console.log(response.data);
return response
}


const reservationService = {
  create,
  getAll,
  changeStatus,
  getPopularCars
};
export default reservationService;
