import { Location } from "@/types";

export type getAllLocationsResponse = {
message: string,
items: Location[],
};

// export type LocationPayload = {
//     title: string;
//   };



  export type CreateLocationResponse = {
    message: string;
    item?: Location[];
  };

  export type getLocationByIdResponse = {
    message: string;
    item: Location;
  };
  


