import express from "express";
import fs from "fs";

const app = express();

app.use(express.json()); // adds body objet to request

const PORT = 3000;

const tours = JSON.parse(
	fs.readFileSync(`./dev-data/data/tours.json`, "utf-8")
);

const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			tours,
		},
	});
};

const getTour = (req, res) => {
	const id = Number(req.params.id);
	if (id > 0 && tours.length >= id) {
		res.status(200).json({
			status: "success",
			data: {
				tour: tours[id - 1],
			},
		});
	} else {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
};

const createTour = (req, res) => {
	const id = Number(req.params.id);
	if (id > 0 && tours.length >= id) {
		res.status(200).json({
			status: "success",
			data: {
				tour: tours[id - 1],
			},
		});
	} else {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
};

const updateTour = (req, res) => {
	const id = Number(req.params.id);
	if (id > 0 && tours.length >= id) {
		res.status(200).json({
			status: "success",
			data: {
				tour: "<Updated tour here>",
			},
		});
	} else {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
};

const deleteTour = (req, res) => {
	const id = Number(req.params.id);
	if (id > 0 && tours.length >= id) {
		tours.splice(id, 1);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} else {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
	.route("/api/v1/tours/:id")
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}....`);
});
