import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "user should have a name"],
		trim: true,
		maxlength: [
			20,
			"name too long must be less than 21 characters(spaces included)",
		],
		minlength: [
			3,
			"name too short must be greater than 2 characters(spaces included)",
		],
	},
	email: {
		type: String,
		required: [true, "user should have a email"],
		unique: true,
		lowercase: true,
		validate: {
			validator: validator.isEmail,
			message: `Enter a valid email`,
		},
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, "user should have a name"],
		minlength: 8,
	},
	passwordConfirm: {
		type: String,
		required: [true, "user should have a name"],
		minlength: 8,
		validate: {
			// This only works on CREATE and SAVE
			validator: function (passConfirm) {
				return passConfirm === this.password;
			},
			message: `Passwords dosen't match`,
		},
	},
});

// Encrypting passwords - if password was modified
userSchema.pre("save", async function(next) {
	console.log(`through hashing`);
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		this.passwordConfirm = undefined; // deleting a field before saving in DB
	}
	next();
});

const User = new mongoose.model("User", userSchema);



export default User;
