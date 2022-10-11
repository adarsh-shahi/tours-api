import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({path: './config.env'})

import app from './app.js'

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
}).then(con => {
	console.log(con.connections);
	console.log(`DB connected sucessfully`);
})


const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A tour must have a name'],
		unique: true
	},
	rating: {
		type: Number,
		default: 4.5
	},
	price: {
		type: Number,
		required: [true, 'A tour must have a price']
	}
})
const Tour = mongoose.model('Tour', tourSchema)


const port = process.env.PORT || 3000;



app.listen(port, () => {
	console.log(`Listening on ${port}....`);
});