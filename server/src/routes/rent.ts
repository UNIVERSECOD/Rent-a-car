import { Router } from "express";
import { authorize } from "../middlewares/auth";
import validateSchema from "../middlewares/validate";
import { createRentSchema, getAllRentsSchema } from "../validation/rent";
import rentController from "../controllers/rent";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", validateSchema(getAllRentsSchema),
   rentController.getAll);

router.post(
  "/",
  authorize({isAdmin: true}),
  upload.array("images", 10),
  validateSchema(createRentSchema),
  rentController.create
);
router.delete(
    "/:id",
    authorize(),
    rentController.remove
  );

export default router;
