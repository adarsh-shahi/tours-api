import express from "express";

import * as tourHanlders from "../controllers/tourController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// router.param("id", tourHanlders.checkId);

// '/top-5-cheap' to ?limit=5&sort=-ratingsAverage,price
router
	.route("/top-5-cheap")
	.get(tourHanlders.aliasTopTours, tourHanlders.getAllTours);

router
	.route("/")
	.get(authController.protect, tourHanlders.getAllTours)
	.post(tourHanlders.createTour);
router
	.route("/:id")
	.get(tourHanlders.getTour)
	.patch(tourHanlders.updateTour)
	.delete(
		authController.protect,
		authController.restrictTo("admin", "lead-guide"),
		tourHanlders.deleteTour
	);

export default router;
