import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: "success",
			data: users,
		});
	} catch (err) {
		next()
	}
};

const createUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined",
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined",
	});
};

const updateUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined",
	});
};

const deleteUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined",
	});
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
