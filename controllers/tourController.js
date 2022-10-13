import Tour from "../models/tourModel.js";

const getAllTours = async (req, res) => {
	try {
		const tours = await Tour.find(req.query); // returns all list in DB filters applied
		res.status(200).json({
			status: "success",
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

const getTour = async (req, res) => {
	try {
		// Tour.findOne({_id: req.params.id})
		const tour = await Tour.findById(req.params.id);
		console.log(tour);
		res.status(200).json({
			status: "success",
			data: tour,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

const createTour = async (req, res) => {
	try {
		// const newTour = new Tour({})
		// wait newTour.save()

		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				tour: newTour,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		});
	}
};

const updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // new updated account will be returned
			runValidators: true, // will run the validators again on updated data
		});
		res.status(200).json({
			status: "success",
			data: {
				tour,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		});
	}
};

const deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		});
	}
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
