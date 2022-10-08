import express from "express";

import * as userHanlders from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(userHanlders.getAllUsers).post(userHanlders.createUser);
router
	.route("/:id")
	.get(userHanlders.getUser)
	.patch(userHanlders.updateUser)
	.delete(userHanlders.deleteUser);

export default router;
