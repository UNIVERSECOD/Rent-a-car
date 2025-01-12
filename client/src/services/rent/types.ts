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
  count: number;
  skip: number;
  take: number;
  items: Rent[];
};

export type getRentByIdResponse = {
  message: string;
  item: Rent;
};

export type GetAllRentPayload = {
  skip?: number;
  take?: number;
  search?: string | null;
  dropOffLocation?: string | null;
  pickUpLocation?: string | null;
  categories?: string[] ;
  capacities?:string[] ;
  maxPrice?: number | null;
  minPrice?: number | null;
  showInRecommendation?: boolean;
};
