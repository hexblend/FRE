const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const experienceSchema = mongoose.Schema({
	company_name: {
		type: String,
		minLength: 1,
	},
	job_title: {
		type: String,
		minLength: 1,
	},
	starting_date: {
		type: Date,
	},
	ending_date: {
		type: Date,
	},
	long_description: {
		type: String,
	},
});

const projectsSchema = mongoose.Schema({
	title: {
		type: String,
		minLength: 1,
	},
	description: {
		type: String,
	},
	accomplishments: {
		type: String,
	},
	link: {
		type: String,
		trim: true,
		validate: validate({
			validator: 'isURL',
			message: 'Link must be a valid URL',
		}),
	},
});

const availablePositionsSchema = mongoose.Schema({
	job_title: {
		type: String,
		minLength: 1,
	},
	type_of_worker: {
		type: String,
		enum: ['remote', 'office', 'any'],
	},
	years_of_experience: {
		type: Number,
	},
	skills: {
		type: String,
		minLength: 1,
	},
	benefits: {
		type: String,
	},
});

const sentMessagesSchema = mongoose.Schema(
	{
		to: {
			type: String,
			trim: true,
			minLength: 1,
		},
		body: {
			type: String,
			min: 1,
			minLength: 1,
		},
	},
	{ timestamps: true }
);

const receivedMessagesSchema = mongoose.Schema(
	{
		from: {
			type: String,
			trim: true,
			minLength: 1,
		},
		body: {
			type: String,
			min: 1,
			minLength: 1,
		},
	},
	{ timestamps: true }
);

const userSchema = mongoose.Schema(
	{
		full_name: {
			first_name: {
				type: String,
				required: true,
				minLength: 1,
				maxLength: 10,
			},
			last_name: {
				type: String,
				required: true,
				minLength: 1,
				maxLength: 10,
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
			minLength: 5,
			maxLength: 50,
			trim: true,
			validate: validate({
				validator: 'isEmail',
				message: 'Email is not valid',
			}),
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		type: {
			type: String,
			required: true,
			enum: ['admin', 'candidate', 'employer'],
		},
		company: {
			name: {
				type: String,
				minLength: 1,
			},
			type: {
				type: String,
				minLength: 1,
			},
			website: {
				type: String,
				validate: validate({
					validator: 'isURL',
					message: 'Company website must be a valid URL',
				}),
			},
		},
		inactiveAccount: {
			type: Boolean,
			default: true,
		},
		status: {
			type: String,
			enum: [
				'none',
				'waiting for offers',
				'interviewing',
				'employed',
				'hiring',
				'not hiring',
			],
			default: 'none',
		},
		job_title: {
			type: String,
			trim: true,
			minLength: 1,
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
				default: 'Point',
			},
			coordinates: {
				type: [Number],
				default: [],
			},
		},
		city: {
			type: String,
		},
		remote_worker: {
			type: Boolean,
		},
		years_of_activity: {
			type: Number,
		},
		higher_education: {
			type: Boolean,
		},
		description: {
			type: String,
		},
		avatar: {
			type: String,
			trim: true,
			validate: validate({
				validator: 'isURL',
				message: 'Your avatar must be a valid URL',
			}),
			default: 'https://vectorified.com/images/default-avatar-icon-40.png',
		},
		key_abilities: [
			{
				type: String,
				trim: true,
			},
		],
		experience: [experienceSchema],
		projects: [projectsSchema],
		available_positions: [availablePositionsSchema],
		social_media: {
			facebook: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			twitter: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			instagram: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			linkedin: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			github: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			behance: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
			personal_website: {
				type: String,
				trim: true,
				validate: validate({
					validator: 'isURL',
					message: 'URL is not valid',
				}),
			},
		},
		favourites: [
			{
				type: String,
				trim: true,
				minLength: 1,
			},
		],
		sent_messages: [sentMessagesSchema],
		received_messages: [receivedMessagesSchema],
	},
	{ timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
