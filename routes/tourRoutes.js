import express from "express";

import * as tourHanlders from "../controllers/tourController.js";

const router = express.Router();

router.param("id", tourHanlders.checkId);

router.route("/").get(tourHanlders.getAllTours).post(tourHanlders.checkBody, tourHanlders.createTour);
router
	.route("/:id")
	.get(tourHanlders.getTour)
	.patch(tourHanlders.updateTour)
	.delete(tourHanlders.deleteTour);

export default router;
