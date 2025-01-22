import axiosInstance from "../axiosInstance";
import { UpdateUserResponse, getUserByIdResponse } from "./types";


export async function updateUser({
    id,
    formData,
  }: {
    id: string;
    formData: FormData;
  }) {
    return await axiosInstance.put<UpdateUserResponse>(`/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }


async function getById(id: string) {
    return await axiosInstance.get<getUserByIdResponse>(`/user/${id}`);
  }

export const UserService = {
    updateUser,
    getById,
}