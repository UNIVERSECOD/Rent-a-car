import { Router } from "express";
import reservationController from "../controllers/reservation";
import {  authorize } from "../middlewares/auth";
import { changeReservationStatusSchema, createReservationSchema } from "../validation/reservation";
import validateSchema from "../middlewares/validate";

const router = Router();

router.get("/", authorize({}), reservationController.getAll);
router.post("/", authorize({}), validateSchema(createReservationSchema), reservationController.create);
router.get("/popular_cars", authorize({}), reservationController.getPopularCars);
router.put(
    "/change-status/:id",
    authorize({}),
    validateSchema(changeReservationStatusSchema),
    reservationController.changeStatus
  );



export default router;
