import { Router } from "express";
import { authorize } from "../middlewares/auth";
import validateSchema from "../middlewares/validate";
import { createLocationSchema } from "../validation/location";
import categoryController from "../controllers/category";
import { createCategorySchema } from "../validation/category";

const router = Router();

router.get("/", categoryController.getAll);

router.get("/:id", categoryController.getById);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(createLocationSchema),
  categoryController.create
);
router.delete(
    "/:id",
    authorize({ isAdmin: true }),
    categoryController.remove
  );

  router.put(
    "/:id",
    authorize({ isAdmin: true }),
    categoryController.edit
  );


export default router;
