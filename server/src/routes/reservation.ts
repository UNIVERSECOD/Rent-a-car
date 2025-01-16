import { Router } from "express";
import reservationController from "../controllers/reservation";
import {  authorize } from "../middlewares/auth";
import { createReservationSchema } from "../validation/reservation";
import validateSchema from "../middlewares/validate";

const router = Router();

router.get("/", authorize({}), reservationController.getAll);
router.post("/", authorize({}), validateSchema(createReservationSchema), reservationController.create);



export default router;
