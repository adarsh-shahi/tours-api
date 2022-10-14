import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({path: './config.env'})

import app from './app.js'

const DATABASE_URL = process.env.DATABASE_STRING.replace('<password>',process.env.DATABASE_PASSWORD)

mongoose.connect(DATABASE_URL, {
	useNewUrlParser: true
}).then(con => {
	console.log(`DB connected sucessfully`);
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on ${port}....`);
}); 