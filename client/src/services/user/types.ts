import { User } from "@/types";

export interface UpdateUserPayload {
  name: string;
  username: string;
  avatar?: File | null;
};

export type UpdateUserResponse = {
  message: string;
  user?: User;
};

export type getUserByIdResponse = {
  message: string;
  item: User;
};
