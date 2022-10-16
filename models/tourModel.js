import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A tour must have a name"],
		unique: true,
		trim: true,
		maxlength: [30, 'name too long must be less than 31 characters(spaces included)'],
		minlength: [5, 'name too short must be greater than 4 characters(spaces included)'],
		// validate: [validator.isAlpha, 'name should only contain characters']
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
		enum: {
			values: ['easy', 'medium', 'difficult'], // only string values that are allowed
			message: "must be either one of this 'easy', 'medium', 'difficult'"
		}
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
		min: [1, 'Rating must be above 1'],
		max: [5, 'Rating must be below 5.0']
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: [true, "A tour must have a price"],
	},
	priceDiscount:{
		type: Number,
		validate:{
			validator: function(val){
				// this is referencing to current document and will work only when new document is being created 
				return val < this.price
			},
			message: 'Discounted price({VALUE}) should be less than regular price'
		}
	}, 
	slug: String,
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
	secretTour:{
		type: Boolean,
		default: false
	}
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

// DOCUMENT MIDDLEWARE(Hooks) - 'save' runs for .save() and .create()
// tourSchema.pre('save', function(next) {
// 	console.log(this);
// 	this.slug = slugify(this.name, {lower: true});
// 	next()
// })

// have access to document that is just saved
// tourSchema.post('save', function(document, next){
// 	console.log(document);
// 	next();
// })

// QUERY MIDDLEWARE
// tourSchema.pre(/^find/, function(next){  // all the strings that start with find
	// this will point to current query object
// 	this.find({secretTour: {$ne: true}})
// 	this.start = Date.now();
// 	next()
// })

// tourSchema.post(/^find/, function(document, next){
// 	console.log(`Query took ${Date.now() - this.start} milliseconds`);
// 	next()
// })

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
