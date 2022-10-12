import Tour from '../models/tourModel.js'


const checkBody = (req, res, next) => {
	if (Object.hasOwn(req.body, "name") && Object.hasOwn(req.body, "price"))
		next();
	else {
		res.status(400).json({
			status: "fail",
			message: "must include property name and price",
		});
	}
};

const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		// results: tours.length,
		// data: {
		// 	tours,
		// },
	});
};

const getTour = (req, res) => {
	const id = Number(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			// tour: tours[id - 1],
		},
	});
};

const createTour = (req, res) => {

};

const updateTour = (req, res) => {
	const id = Number(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			tour: "<Updated tour here>",
		},
	});
};

const deleteTour = (req, res) => {
	const id = Number(req.params.id);

	res.status(204).json({
		status: "success",
		data: null,
	});
};

export {
	checkBody,
	getAllTours,
	getTour,
	createTour,
	updateTour,
	deleteTour,
};
