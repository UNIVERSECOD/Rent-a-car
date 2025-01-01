import { Schema } from "express-validator";

export const createRentSchema: Schema = {
  images: {
    custom: {
      errorMessage: "At least 4 images are required",
      options: (_, { req }) => {
        return req.files && req.files.length >= 4;
      },
    },
  },
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isLength: {
      errorMessage: "Title is required and must be at least 3 characters long",
      options: { min: 3 },
    },
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  fuel: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  gear: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  capacity: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  discountPrice: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  category: {
    in: ["body"],
    isMongoId: true,
    notEmpty: true,
  },
  dropOffLocations: {
    in: ["body"],
    isArray: {
      errorMessage: "At least one drop-off location is required",
      options: { min: 1 },
    },
    notEmpty: true,
  },
  pickUpLocations: {
    in: ["body"],
    isArray: {
      errorMessage: "At least one drop-off location is required",
      options: { min: 1 },
    },
    notEmpty: true,
  },
};
