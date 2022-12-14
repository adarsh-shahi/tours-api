import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from 'crypto'

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
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "user should have a name"],
		minlength: 8,
		select: false, // will never show up in any output but will be saved in DB
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
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date
});

// Encrypting passwords - if password was modified
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		this.passwordConfirm = undefined; // deleting a field before saving in DB
	}
	next();
});

// this instance method will work on a a specific document
userSchema.methods.correctPassword = async function (
	candidatePassowrd,
	userPassowrd
) {
	return await bcrypt.compare(candidatePassowrd, userPassowrd);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
	return (
		this.passwordChangedAt &&
		parseInt(this.passwordChangedAt.getTime() / 1000, 10) > JWTTimestamp
	);
};

userSchema.methods.createPasswordResetToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
	const EXPIRE_TIME = 10 * 60 * 1000 // 10 MINUTES
	this.passwordResetExpires = Date.now() + EXPIRE_TIME;
	console.log(resetToken, this.passwordResetToken);
	return resetToken;
}

const User = new mongoose.model("User", userSchema);

export default User;
