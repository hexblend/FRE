const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
	company_name: {
		type: String,
		trim: true,
		minLength: 5,
	},
	job_title: {
		type: String,
		trim: true,
		minLength: 5,
	},
	starting_date: {
		type: String,
		trim: true,
		minLength: 4, // "mmyy"
		maxLength: 4,
	},
	ending_date: {
		type: String,
		trim: true,
		minLength: 4, // "mmyy"
		maxLength: 4,
	},
	long_description: {
		type: String,
	},
});

const projectsSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
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
	},
});

const sentMessagesSchema = mongoose.Schema({
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
});

const receivedMessagesSchema = mongoose.Schema({
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
});

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
			trim: true,
			minLength: 6,
			maxLength: 50,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		type: {
			type: String,
			required: true,
			enum: ['admin', 'jobseeker', 'employer'],
		},
		inactiveAccount: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			enum: [
				'waiting for offers',
				'interviewing',
				'employed',
				'hiring',
				'not hiring',
			],
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
			},
			coordinates: {
				type: [Number],
			},
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
		},
		key_abilities: [
			{
				type: String,
				trim: true,
			},
		],
		experience: [experienceSchema],
		projects: [projectsSchema],
		social_media: {
			facebook: {
				type: String,
				trim: true,
			},
			twitter: {
				type: String,
				trim: true,
			},
			instagram: {
				type: String,
				trim: true,
			},
			linkedin: {
				type: String,
				trim: true,
			},
			github: {
				type: String,
				trim: true,
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
