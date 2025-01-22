import axiosInstance from "../axiosInstance";
import { getAllRentsResponse } from "../rent/types";
import { AddFavoriteRentPayload, AddFavoriteResponse, GetFavoriteRentPayload, RemoveFavoriteRentPayload } from "./types";

async function getAll(data: GetFavoriteRentPayload) {
  const params = new URLSearchParams();
  if (data.skip) params.append("skip", data.skip.toString());
  if (data.take) params.append("take", data.take.toString());
  if (data.search) params.append("search", data.search);

  const response = await axiosInstance.get<getAllRentsResponse>(
    `/favorites?${params.toString()}`
  );
  console.log("Backend Response:", response.data);
  return response;
}

async function addFavorite({ rentId }: AddFavoriteRentPayload): Promise<AddFavoriteResponse> {
    const response = await axiosInstance.post<AddFavoriteResponse>(
      `/favorites/add/${rentId}`
    );
    return response.data;
  }
  
  async function removeFavorite({ rentId }: RemoveFavoriteRentPayload): Promise<AddFavoriteResponse> {
    const response = await axiosInstance.delete<AddFavoriteResponse>(
      `/favorites/remove/${rentId}`
    );
    return response.data;
  }



const favoriteService = {
  getAll,
  addFavorite,
  removeFavorite
};
export default favoriteService;
