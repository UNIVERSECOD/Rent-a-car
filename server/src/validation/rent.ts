import { Schema } from "express-validator";

export const getAllRentsSchema: Schema = {
  skip: {
  in: ["query"],
    optional: true,
    isNumeric: true,
    default:{
      options: 0,
    },
  },
  take:{
    in: ["query"],
    optional: true,
    isNumeric: true,
    default:{
      options: 0,
    },
  },
  search: {
    in: ["query"],
    optional: true,
    isString: true,
  },
  dropOffLocation: {
    in: ["query"],
    optional: true,
    isMongoId: true,
  },
  pickUpLocation: {
    in: ["query"],
    optional: true,
    isMongoId: true,
  },
  categories: {
    in: ["query"],
    optional: true,
    isArray: true,
    custom: {
      errorMessage: "Categories should be an array of mongo identifiers",
      options: (value) => {
        return value && value.every((v:string) => v.match(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i));
      },
    }, 
  },
  capacities: {
    in: ["query"],
    optional: true,
    isArray: true,
    custom: {
      errorMessage: "Capacity should be an array of numbers",
      options: (value) => {
        return  value.every((v: string) => !isNaN(parseInt(v)));
      },
    }
  },
  maxPrice: {
    in: ["query"],
    optional: true,
    isNumeric: true,
  },
  minPrice: {
    in: ["query"],
    optional: true,
    isNumeric: true,
  },
  showInRecommendation:{
    in: ["query"],
    optional: true,
    isBoolean: true,
  }
}

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

export const editRentSchema: Schema = {
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
  showInRecommendation: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  }
};