const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 4
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
			min: 6
		},
		type: {
			type: String,
			required: true,
			enum: ['admin', 'jobseeker', 'employer']
		}
	},
	{ timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
