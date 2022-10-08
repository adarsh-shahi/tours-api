import fs from "fs";

const tours = JSON.parse(
	fs.readFileSync(`./dev-data/data/tours.json`, "utf-8")
);

const checkId = (req, res, next, val) => {
	if (val <= 0 || tours.length < val) {
		console.log(`check id ${val} middleware`);
		res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	} else next();
};

const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			tours
		},
	});
};

const getTour = (req, res) => {
	const id = Number(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			tour: tours[id - 1],
		},
	});
};

const createTour = (req, res) => {
	const newId = tours[tours.length - 1]._id + 1;

	const newTour = Object.assign({ _id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(`./dev-data/data/tours.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: "success",
			data: {
				tour: newTour,
			},
		});
	});
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
	tours.splice(id, 1);
	res.status(204).json({
		status: "success",
		data: null,
	});
};

export { checkId, getAllTours, getTour, createTour, updateTour, deleteTour };
