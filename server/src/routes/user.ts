import { Router } from "express";
import userController from "../controllers/user";
import { authorize } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import validateSchema from "../middlewares/validate";
import { updateUserSchema } from "../validation/user";

const router = Router();

router.put(
    "/:id",
    authorize(),
    upload.single("avatar"),
    validateSchema(updateUserSchema),
    userController.update
  );

  router.get(
    "/:id",
    authorize(),
    userController.getById
  );

export default router;