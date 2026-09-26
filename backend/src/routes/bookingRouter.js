import express from "express";
const bookingRouter = express.Router();

import {
    getBookingDetails, getUserBookings,createrOrder,verifyPayment
} from "../controllers/bookingController.js"

import { protect } from  "../controllers/authController.js"

bookingRouter.get("/",protect,getUserBookings);
bookingRouter.get("/:bookingId",protect, getBookingDetails);
bookingRouter.post("/create-order", protect, createrOrder);
bookingRouter.post("/verify-payment", protect, verifyPayment)

export {bookingRouter};