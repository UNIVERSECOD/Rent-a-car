import { Rent } from "@/types";

export type GetFavoriteRentPayload = {
    skip?: number;
    take?: number;
    search?: string | null;
  };

  export type GetFavoriteRentResponse = {
    message: string;
    items: Rent[];
  };

  export type AddFavoriteRentPayload = {
    rentId: string;
  };

  export type RemoveFavoriteRentPayload = {
    rentId: string;
  };

  export interface AddFavoriteResponse {
    message: string;
    item?: Rent[];
  }

