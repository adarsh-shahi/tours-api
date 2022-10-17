import express from "express";

import * as tourHanlders from "../controllers/tourController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

// router.param("id", tourHanlders.checkId);

// '/top-5-cheap' to ?limit=5&sort=-ratingsAverage,price
router.route('/top-5-cheap').get(tourHanlders.aliasTopTours, tourHanlders.getAllTours);

router.route("/").get(protect, tourHanlders.getAllTours).post(tourHanlders.createTour);
router
	.route("/:id")
	.get(tourHanlders.getTour)
	.patch(tourHanlders.updateTour)
	.delete(tourHanlders.deleteTour);

export default router;
