import { Router } from "express";
import {  authorize } from "../middlewares/auth";
import { changeReservationStatusSchema, createReservationSchema } from "../validation/reservation";
import validateSchema from "../middlewares/validate";
import reservationController from "../controllers/reservation";

const router = Router();

router.get("/", reservationController.getAll);
router.post("/", authorize({}), validateSchema(createReservationSchema), reservationController.create);
router.put(
    "/change-status/:id",
    authorize({}),
    validateSchema(changeReservationStatusSchema),
    reservationController.changeStatus
  );

router.get("/popular-cars", reservationController
.getPopularRents);



export default router;
