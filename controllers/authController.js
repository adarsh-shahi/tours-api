import User from "../models/userModel.js";

const signup = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);
		res.status(201).json({
			status: "success",
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
