import axiosInstance from "../axiosInstance";
import {
  CreateLocationResponse,
  getAllLocationsResponse,
  getLocationByIdResponse,
} from "./types";

async function getAll() {
  return await axiosInstance.get<getAllLocationsResponse>("/locations");
}

async function getById(id: string) {
  return await axiosInstance.get<getLocationByIdResponse>(`/locations/${id}`);
}

async function create({ title }: { title: string }) {
  return await axiosInstance.post<CreateLocationResponse>("/locations", {
    title,
  });
}

async function edit({ id, title }: { id: string; title: string }) {
  return await axiosInstance.put<CreateLocationResponse>(`/locations/${id}`, {
    title,
  });
}

async function remove(id: string) {
  return await axiosInstance.delete(`/locations/${id}`);
}

const locationService = {
  getAll,
  create,
  getById,
  remove,
  edit
};
export default locationService;
