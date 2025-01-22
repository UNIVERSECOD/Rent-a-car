import { Router } from "express";
import { authorize } from "../middlewares/auth";
import favoritesController from "../controllers/favorites";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/add/:rentId", authorize(), favoritesController.addFavorite);

router.post("/add/favorite-status", authorize(), favoritesController.updateFavoritesStatus);

router.delete("/remove/:rentId", authorize(), favoritesController.remove);

router.get("/", upload.none(), authorize(), favoritesController.getAll);


export default router;