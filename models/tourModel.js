import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A tour must have a name"],
		unique: true,
	},
	duration: {
		type: Number,
		required: [true, "A tour must have a duration"],
	},
	maxGroupSize: {
		type: Number,
		required: [true, "A tour must have a group size"],
	},
	difficulty: {
		type: String,
		required: [true, "A tour must have a difficulty"],
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: [true, "A tour must have a price"],
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true,
		required: [true, "must have a summary"],
	},
	description: {
		type: String,
		trim: true,
	},
	imageCover: {
		type: String,
		required: [true, "must have a cover image"],
	},
	images: [String],
	createAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	startDates: [Date],
}, {
	toJSON: { virtuals: true},
	toObject: { virtuals: true},
});

/*
 * Vritual properties
 * fields that can we can define on our schema but will not be saved into database
 * get() - When we get data from DB this virtual property will be added to each document 
 * Cannot use virtual properties in a query (technically not a part of DB)
 */

tourSchema.virtual('durationWeeks').get(function(){
	return this.duration / 7;
})

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
