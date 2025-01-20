import { Router } from "express";
import userController from "../controllers/user";
import { authorize } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

router.patch(
    "/",
    authorize({}),
    upload.single("image"),
    userController.update
  );

export default router;