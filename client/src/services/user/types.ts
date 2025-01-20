import { User } from "@/types";

export type UpdateUserPayload = {
  name: string;
  username: string;
  avatar?: string | null;
};

export type UpdateUserResponse = {
  message: string;
  user?: User;
};
