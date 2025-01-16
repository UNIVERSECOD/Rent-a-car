import axiosInstance from "../axiosInstance";
import { getAllCategoryResponse } from "./types";


async function getAll() {
  return await axiosInstance.get<getAllCategoryResponse>("/categories");
}

async function create({title}: {title: string}) {

  // const formData = new FormData();
  
  // formData.append("title", data.title);

  // const formy = formData.get("title")

  // console.log("get", formy);
  
  return await axiosInstance.post("/categories", {title});
}


const categoryService = {
getAll,
create
};
export default categoryService;
