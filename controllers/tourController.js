import Tour from "../models/tourModel.js";

const getAllTours = async (req, res) => {
	try {
		const queryObj = { ...req.query };
		const excludeFields = ["page", "sort", "limit", "fields"];

		excludeFields.forEach((el) => {
			delete queryObj[el];
		});
		console.log(req.query, queryObj);

		/*
		 * Advance filtering (using <, >, <=, >= operators)
		 *	{ duration: { gte: '5' } }  req.query
		 *	add $ before (gte, lte, gt, lt)
		 *	{ duration: { $gte: '5' } } pass this object to mongoose find() method
		 */

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => {
			//   '\b' used for exact match of words not
			return `$${matched}`; // just subsets E.g lterr contains lt but we dont want this
		}); // '\g' to match all the operators not just one

		let query = Tour.find(JSON.parse(queryStr)); // returns query object

		// Sorting
		if(req.query.sort){
			const sortBy = req.query.sort.split(',').join(' ')
			console.log(sortBy);
			query = query.sort(sortBy)   // sort('price ratingsAverage')
		}else{
			query = query.sort('-createdAt')
		}

		// Field limiting
		if(req.query.fields){
			const fields = req.query.fields.split(',').join(' ')
			query = query.select(fields) //select('name duration price') 
		}
		else{
			query = query.select('-__v') // not sending back '__v' property
		}

		//Pagination
		// page=3&limit=10   1-10(page 1)    11-20(page 2)    21-30(page 3)
		
		const page = Number(req.query.page) || 1
		const limit = Number(req.query.limit) || 10
		const skip = (page - 1) * limit

		query = query.skip(skip).limit(limit)

		if(req.query.page){
			const numTours = await Tour.countDocuments();
			if(skip >= numTours) throw new Error("This page dosen't exist")
		}

		const tours = await query; //  excutes the query and come backs with the document

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
			message: err.message,
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
