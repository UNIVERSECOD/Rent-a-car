import axiosInstance from "../axiosInstance";
import {
  RentPayload,
  CreateRentResponse,
  getAllRentsResponse,
  getRentByIdResponse,
  GetAllRentPayload,
} from "./types";

async function getAll(data: GetAllRentPayload) {
  const params = new URLSearchParams();
  if(data.skip) params.append('skip', data.skip.toString());
  if(data.take) params.append('take', data.take.toString());
  if(data.search) params.append('search', data.search);
  if(data.dropOffLocation)
    params.append('dropOffLocation', data.dropOffLocation);
  if(data.pickUpLocation)
    params.append('pickUpLocation', data.pickUpLocation);
  if(data.categories)
    data.categories.forEach((category) =>{
  params.append('categories', category);
  });
  if(data.capacities)
    data.capacities.forEach((capacity) => {
      params.append('capacities', capacity.toString());
    });
  if(data.maxPrice) params.append('maxPrice', data.maxPrice.toString());
  if(data.minPrice) params.append('minPrice', data.minPrice.toString());
  if (data.showInRecommendation)
    params.append('showInRecommendation', data.showInRecommendation.toString());
  return await axiosInstance.get<getAllRentsResponse>(`/rents?${params.toString()}`);
}

async function getById(id: string) {
  return await axiosInstance.get<getRentByIdResponse>(`/rents/${id}`);
}

async function create(data: RentPayload) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  if (data.discountPrice)
    formData.append("discountPrice", data.discountPrice.toString());
  formData.append("gear", data.gear);
  formData.append("fuel", data.fuel.toString());
  formData.append("category", data.category);
  formData.append("capacity", data.capacity.toString());
  formData.append("showInRecommendation", data.showInRecommendation.toString());
  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });

  if (data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.post<CreateRentResponse>("/rents", formData);
}

async function edit({ id, data }: { id: string; data: RentPayload }) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  if (data.discountPrice)
    formData.append("discountPrice", data.discountPrice.toString());
  formData.append("gear", data.gear);
  formData.append("fuel", data.fuel.toString());
  formData.append("category", data.category);
  formData.append("capacity", data.capacity.toString());
  formData.append("showInRecommendation", data.showInRecommendation.toString());
  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });

  if (data.images) {
   Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.put<CreateRentResponse>(`/rents/${id}`, formData);
}

const rentService = {
  create,
  edit,
  getById,
  getAll,
};
export default rentService;
