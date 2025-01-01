import { Schema } from "express-validator";

export const createLocationSchema: Schema = {
    title: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        isLength: {
            errorMessage: "Title is required and must be at least 3 characters long",
            options: { min: 3 }
        },
    }
}