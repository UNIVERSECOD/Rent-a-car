import { Schema } from "express-validator";

export const updateUserSchema: Schema = {
  name: {
    in: ["body" as const], 
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
  username: {
    in: ["body" as const], 
    isString: {
      errorMessage: "Username must be a string",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
};
