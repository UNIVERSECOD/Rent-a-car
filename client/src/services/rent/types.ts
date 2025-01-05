import { Rent } from "@/types";

export type CreateRentPayload = {
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
  images: File[] |null ;
};

export type CreateRentResponse = {
  message: string;
  item?: Rent[];
};

export type getAllRentsResponse = {
  message: string;
  items: Rent[];
};
