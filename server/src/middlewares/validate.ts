import { NextFunction, Request, Response } from "express";
import {
  checkSchema,
  matchedData,
  validationResult,
  Schema,
} from "express-validator";
import fs from "fs";

const validateSchema = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        files.forEach((file: Express.Multer.File) => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(err);
            }
            console.log("File deleted");
          });
        });
      }

      res.status(400).json({ errors: errors.array() });
      return;
    }
    req.matchedData = matchedData(req);
    next();
  };
};

export default validateSchema;
