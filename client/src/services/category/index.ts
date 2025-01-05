import axiosInstance from "../axiosInstance";
import { getAllCategoryResponse } from "./types";


async function getAll() {
  return await axiosInstance.get<getAllCategoryResponse>("/categories");
}


const categoryService = {
getAll
};
export default categoryService;
