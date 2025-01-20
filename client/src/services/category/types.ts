import { Category } from "@/types";

export type getAllCategoryResponse = {
message: string,
items: Category[],
};


  export type CreateCategoryResponse = {
    message: string;
    item?: Category[];
  };

  export type getCategoryByIdResponse = {
    message: string;
    item: Category;
  };
  




