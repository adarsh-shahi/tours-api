import express from "express";

import * as userHanlders from "../controllers/userController.js";
import * as authController from './../controllers/authController.js'

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassowrd', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassowrd)

router.route("/").get(userHanlders.getAllUsers).post(userHanlders.createUser);
router
	.route("/:id")
	.get(userHanlders.getUser)
	.patch(userHanlders.updateUser)
	.delete(userHanlders.deleteUser);

export default router;
