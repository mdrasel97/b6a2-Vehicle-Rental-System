import express from "express";
import { BookingController } from "./booking.controller";
// import auth from "../../middleware/Auth";
// import validateRequest from "../../middleware/ValidateRequest";
// import { BookingController } from "./booking.controller";
// import { BookingSchema } from "./booking.validation";

const router = express.Router();

router.post("/",BookingController.createBooking);
// router.get("/", auth("admin", "customer"), BookingController.getAllBookings);

export const BookingRoutes = router;