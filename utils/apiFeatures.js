class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludeFields = ["page", "sort", "limit", "fields"];

		excludeFields.forEach((el) => {
			delete queryObj[el];
		});

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

		this.query = this.query.find(JSON.parse(queryStr)); // returns query object
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			console.log(sortBy);
			this.query = this.query.sort(sortBy); // sort('price ratingsAverage')
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}

	limiting() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields); //select('name duration price')
		} else {
			this.query = this.query.select("-__v"); // not sending back '__v' property
		}
		return this;
	}

	pagination() {
		//Pagination
		// page=3&limit=10   1-10(page 1)    11-20(page 2)    21-30(page 3)

		const page = Number(this.queryString.page) || 1;
		const limit = Number(this.queryString.limit) || 10;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

export default APIFeatures