import axiosInstance from "../axiosInstance";
import { CreateRentPayload, CreateRentResponse, getAllRentsResponse } from "./types";


async function getAll() {
  return await axiosInstance.get<getAllRentsResponse>("/rents");
}

async function create(data: CreateRentPayload) {
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
    formData.append(`pickUpLocations[${index}]`, location)
  })
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location)
  })

  if(data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    })
  }


  return await axiosInstance.post<CreateRentResponse>("/rents", formData);
}


const rentService = {
create,
getAll
};
export default rentService;
