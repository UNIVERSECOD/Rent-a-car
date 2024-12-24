import { NextFunction, Request, Response } from "express";
import { checkSchema, matchedData, validationResult, Schema } from "express-validator";

const validateSchema = (schema: Schema) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    req.matchedData = matchedData(req);
    next();
  };
};

export default validateSchema;
