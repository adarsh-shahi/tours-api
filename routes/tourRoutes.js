import express from "express";

import * as tourHanlders from "../controllers/tourController.js";

const router = express.Router();

router.route("/").get(tourHanlders.getAllTours).post(tourHanlders.createTour);
router
	.route("/:id")
	.get(tourHanlders.getTour)
	.patch(tourHanlders.updateTour)
	.delete(tourHanlders.deleteTour);

export default router;
