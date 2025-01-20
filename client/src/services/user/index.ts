import axiosInstance from "../axiosInstance";
import { UpdateUserPayload, UpdateUserResponse } from "./types";


export async function updateUser( formData: UpdateUserPayload){
// const formData = new FormData();

// formData.append("name", data.name);

// formData.append("surname", data.surname);

// if (data.avatar) formData.append("avatar", data.avatar);

    return await axiosInstance.put<UpdateUserResponse>(`/user`, formData);
} 

export const UserService = {
    updateUser,
}