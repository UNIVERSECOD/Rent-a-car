import axiosInstance from "../axiosInstance";
import { CreateCategoryResponse, getAllCategoryResponse, getCategoryByIdResponse } from "./types";


async function getAll() {
  return await axiosInstance.get<getAllCategoryResponse>("/categories");
}

async function getById(id: string) {
  return await axiosInstance.get<getCategoryByIdResponse>(`/categories/${id}`);
}

async function create({ title }: { title: string }) {
  return await axiosInstance.post<CreateCategoryResponse>("/categories", {
    title,
  });
}

async function edit({ id, title }: { id: string; title: string }) {
console.log("edit", id, title);

  return await axiosInstance.put<CreateCategoryResponse>(`/categories/${id}`, {title});
}



async function remove(id: string) {
  return await axiosInstance.delete(`/categories/${id}`);
}

const categoryService = {
  getAll,
  create,
  getById,
  remove,
  edit
};
export default categoryService;