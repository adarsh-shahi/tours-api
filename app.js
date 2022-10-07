import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	// console.log(req);
	res.status(200).json({ messgae: "Hello from server side", app: "Tour" });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint')
})

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}....`);
});
