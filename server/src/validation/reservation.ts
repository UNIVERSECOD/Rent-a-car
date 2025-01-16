import { Schema } from "express-validator";

export const createReservationSchema: Schema = {
"billing.name": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.phoneNumber": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.address": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  "billing.city": {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  pickUpDate: {
    in: ["body"],
    isISO8601: true,
    notEmpty: true,
  },
  dropOffDate: {
    in: ["body"],
    isISO8601: true,
    notEmpty: true,
  },
  pickUpLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  },
  dropOffLocation: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  },
  rent: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isMongoId: true,
  }
};
