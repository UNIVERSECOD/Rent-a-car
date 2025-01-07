import { Rent } from "@/types";

export type RentPayload = {
  title: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  fuel: number;
  gear: string;
  pickUpLocations: string[];
  dropOffLocations: string[];
  capacity: number;
  showInRecommendation: boolean;
  images: File[] | null;
};

export type CreateRentResponse = {
  message: string;
  item?: Rent[];
};

export type getAllRentsResponse = {
  message: string;
  items: Rent[];
};

export type getRentByIdResponse = {
  message: string;
  item: Rent;
};

export type GetAllRentPayload = {
  skip?: number;
  take?: number;
  search?: string;
  dropOffLocation?: string;
  pickUpLocation?: string;
  categories?: string[] ;
  capacities?:string[] ;
  maxPrice?: number;
  minPrice?: number;
  showInRecommendation?: boolean;
};
