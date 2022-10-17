import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const signup = async (req, res, next) => {
	try {
		
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm
		});

		const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

		res.status(201).json({
			status: "success",
			token,
			user: newUser,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err.message
		});
	}
};


export { signup }
