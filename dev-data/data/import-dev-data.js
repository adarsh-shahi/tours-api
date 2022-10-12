import dotenv from "dotenv";
import mongoose from "mongoose";
import Tour from "./../../models/tourModel.js";
import fs from "fs";
dotenv.config({ path: "./config.env" });

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
	})
	.then((con) => {
		console.log(`DB connected sucessfully`);
	});

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours.json", "utf-8"));

const importData = async function () {
	// tours.forEach(async tour => {
	//  try{
	//    await Tour.create(tour)
	//  }
	//  catch(err){
	//   console.log(err);
	//  }
	// })

	try {
		await Tour.create(tours); // passing the whole array create() will treat each object as new document
		console.log("data loaded");
	} catch (err) {
		console.log(err);
	}
};

const deleteData = async function () {
	try {
		await Tour.deleteMany(); // deleting all data
		console.log("data deleted");
	} catch (err) {
		console.log(err);
	}
};

importData()

