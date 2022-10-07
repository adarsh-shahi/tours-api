import express from "express";
import fs from "fs";

const app = express();
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
			tours
		}
	});
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}....`);
});
