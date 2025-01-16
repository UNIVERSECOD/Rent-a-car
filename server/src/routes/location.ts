import { Router } from "express";
import { authorize } from "../middlewares/auth";
import locationController from "../controllers/location";
import validateSchema from "../middlewares/validate";
import { createLocationSchema } from "../validation/location";

const router = Router();

router.get("/", locationController.getAll);

router.get("/:id", locationController.getById);

router.post(
  "/",
  authorize({ isAdmin: true }),
  validateSchema(createLocationSchema),
  locationController.create
);
router.delete(
    "/:id",
    authorize({ isAdmin: true }),
    locationController.remove
  );

  router.put(
    "/:id",
    authorize({ isAdmin: true }),
    locationController.edit
  );

  

export default router;
