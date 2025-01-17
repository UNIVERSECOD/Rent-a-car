import { Router } from "express";
import { authorize } from "../middlewares/auth";
import favoritesController from "../controllers/favorites";

const router = Router();

router.post("/add/:rentId", authorize(), favoritesController.addFavorite);

router.post("/remove/:rentId", authorize(), favoritesController.remove);

router.get("/", authorize(), favoritesController.getAll);


export default router;