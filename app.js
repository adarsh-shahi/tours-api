import express from "express";
import fs from "fs";

const app = express();

app.use(express.json()); // adds body objet to request

const PORT = 3000;

// app.get("/", (req, res) => {
// 	// console.log(req);
// 	res.status(200).json({ messgae: "Hello from server side", app: "Tour" });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint')
// })
const tours = JSON.parse(
	fs.readFileSync(`./dev-data/data/tours.json`, "utf-8")
);

app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			tours,
		},
	});
});

app.get("/api/v1/tours/:id", (req, res) => {
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
});

app.post("/api/v1/tours", (req, res) => {
	// console.log(req.body)
	const newId = tours[tours.length - 1]._id + 1;
	// const newTour = {
	//   newId,
	//   name: req.body.name,
	//   duration: req.body.duration,
	//   maxGroupSize: req.body.maxGroupSize,
	//   difficulty: req.body.difficulty
	// }

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
});

app.patch("/api/v1/tours/:id", (req, res) => {
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
});

app.delete("/api/v1/tours/:id", (req, res) => {
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
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}....`);
});
