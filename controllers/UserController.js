const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({
			type: ['candidate', 'employer'],
		});
		if (users.length === 0) throw err;
		return res.json({
			message: 'Success! All users have been queried',
			users,
		});
	} catch (err) {
		const error = new Error(
			'There are no users in the database'
		);
		error.status = 404;
		error.error = err;
		return next(error);
	}
};

const getUsersByType = async (req, res, next) => {
	try {
		const users = await User.find({
			type: req.params.type,
		});
		if (users.length === 0) throw err;
		res.json({
			message: `Success! All users with the type of '${req.params.type}' have been queried.`,
			users,
		});
	} catch (err) {
		const error = new Error(
			`'${req.params.type}' user type could not be found.`
		);
		error.status = 404;
		next(error);
	}
};

const search = async (req, res, next) => {
	const job1 = req.params.job1;
	const job2 = req.params.job2;
	const job3 = req.params.job3;
	const city = req.params.location;
	try {
		const users = await User.find({
			type: ['candidate'],
			inactiveAccount: false,
		});

		const matchUsers = [];
		users.forEach((user) => {
			const search = (job, city) => {
				if (
					user.job_title
						.toLowerCase()
						.includes(job.toLowerCase()) &&
					user.city
						.toLowerCase()
						.includes(city.toLowerCase())
				) {
					return true;
				} else {
					return false;
				}
			};

			let found;
			if (job2 && job3)
				found =
					search(job1, city) ||
					search(job2, city) ||
					search(job3, city);
			else if (job2 && !job3)
				found = search(job1, city) || search(job2, city);
			else found = search(job1, city);

			if (found) matchUsers.push(user);
		});

		if (matchUsers.length === 0) throw err;

		return res.json({
			message:
				'Success! Users with the specified job title were found!',
			users: matchUsers,
		});
	} catch (err) {
		const error = new Error(
			'There are no users in the database with that job title'
		);
		error.status = 404;
		error.error = err;
		return next(error);
	}
};

const getSingleUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (user === null)
			throw 'A user with the specified ID could not be found';
		res.json({
			message:
				'Success! A user with the specified ID has been queried.',
			user,
		});
	} catch (err) {
		const error = new Error(
			'A user with the specified ID could not be found'
		);
		error.status = 404;
		error.error = err;
		next(error);
	}
};

const createUser = async (req, res, next) => {
	const {
		full_name,
		email,
		password,
		type,
		company,
	} = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		let user;
		if (company)
			user = new User({
				full_name,
				email,
				password: hashedPassword,
				type,
				company,
			});
		else
			user = new User({
				full_name,
				email,
				password: hashedPassword,
				type,
			});

		const savedUser = await user.save();
		return res.json({
			message: 'Success! User added successfully',
			savedUser,
		});
	} catch (err) {
		const error = new Error('User could not be created.');
		error.error = err;
		return next(error);
	}
};
const changeAvatar = async (req, res, next) => {
	const avatarURL = req.file.secure_url;
	try {
		const user = await User.findOne({ _id: req.params.id });
		user.avatar = avatarURL;
		await user.save();

		return res.json({
			message:
				'Success! The avatar has been successfully changed.',
			user: {
				id: user._id,
				newAvatar: user.avatar,
			},
		});
	} catch (err) {
		const error = new Error('Avatar could not be changed.');
		error.error = err;
		next(err);
	}
};

const addToFavourites = async (req, res, next) => {
	try {
		const currUser = await User.findById(req.params.id);
		const userToBeAdded = await User.findById(
			req.body.profileID
		);

		if (!currUser || !userToBeAdded)
			throw 'One of the IDs is not in the datbase.';
		if (currUser.favourites.includes(req.body.profileID))
			throw 'User already at favourites';

		const updatedUser = await User.updateOne(
			{ _id: req.params.id },
			{ $addToSet: { favourites: req.body.profileID } }
		);

		return res.json({
			message: 'Success! User added to favourites',
			updatedUser,
		});
	} catch (err) {
		const error = new Error('Could not add to favourites');
		error.error = err;
		next(error);
	}
};

const makeInactive = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		user.inactiveAccount = true;
		await user.save();

		return res.json({
			message:
				'Success! User is now inactive and will not appear in the search results',
			user,
		});
	} catch (err) {
		const error = new Error('User could not be updated');
		error.error = err;
		next(err);
	}
};

const makeActive = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		user.inactiveAccount = false;
		await user.save();

		return res.json({
			message:
				'Success! User is now active and will appear in the search results',
			updatedUser,
		});
	} catch (err) {
		const error = new Error('User could not be updated');
		error.error = err;
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.params.id });

		const updateStringField = (
			field,
			specialValue = null
		) => {
			const reqValue = req['body'][field];
			if (reqValue !== '') {
				if (specialValue) {
					user[field] = specialValue;
				} else {
					user[field] = reqValue;
				}
			} else {
				throw `${field} must not be empty!`;
			}
		};

		// Single Object Fields
		req.body.email && updateStringField('email');
		if (req.body.password) {
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				10
			);
			updateStringField('password', hashedPassword);
		}
		req.body.type && updateStringField('type');
		req.body.inactiveAccount &&
			updateStringField('inactiveAccount');
		req.body.status && updateStringField('status');
		req.body.job_title && updateStringField('job_title');
		req.body.city && updateStringField('city');
		req.body.remote_worker &&
			updateStringField('remote_worker');
		req.body.years_of_activity &&
			updateStringField('years_of_activity');
		req.body.higher_education &&
			updateStringField('higher_education');
		req.body.description &&
			updateStringField('description');

		// Nested Objects Fields
		if (req.body.full_name) {
			updateStringField('full_name');
		}

		// Location
		if (req.body.location) {
			const coordinates = req.body.location.coordinates;
			if (coordinates.length !== 0) {
				user.location.coordinates = coordinates;
			} else {
				throw 'Your coordinates must not be empty';
			}
		}

		// Key abilities
		if (req.body.key_abilities) {
			user.key_abilities = req.body.key_abilities;
		}

		// Company
		if (req.body.company) {
			updateStringField('company');
		}

		// Social Media
		if (req.body.social_media) {
			const socialMediaObj = req.body.social_media;
			user.social_media.facebook = socialMediaObj.facebook
				? socialMediaObj.facebook
				: user.social_media.facebook;
			user.social_media.twitter = socialMediaObj.twitter
				? socialMediaObj.twitter
				: user.social_media.twitter;
			user.social_media.instagram = socialMediaObj.instagram
				? socialMediaObj.instagram
				: user.social_media.instagram;
			user.social_media.linkedin = socialMediaObj.linkedin
				? socialMediaObj.linkedin
				: user.social_media.linkedin;
			user.social_media.github = socialMediaObj.github
				? socialMediaObj.github
				: user.social_media.github;
			user.social_media.personal_website = socialMediaObj.personal_website
				? socialMediaObj.personal_website
				: user.social_media.personal_website;
		}

		// Fields with Subdocuments
		// Experiences
		if (req.body.experience) {
			user.experience = req.body.experience;
		}

		// Projects
		if (req.body.projects) {
			user.projects = req.body.projects;
		}

		// Available positions
		if (req.body.available_positions) {
			user.available_positions =
				req.body.available_positions;
		}

		// Save
		await user.save();

		res.json({
			message:
				'Success! The user details have been updated!',
			user,
		});
	} catch (err) {
		const error = new Error('User could not be updated');
		error.error = err;
		return next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const user = await User.deleteOne({
			_id: req.params.id,
		});
		res.json({
			message:
				'Success! A user with the specified ID has been DELETED.',
			user,
		});
	} catch (err) {
		const error = new Error(
			'A user with the specified ID could not be found'
		);
		error.status = 404;
		error.error = err;
		next(error);
	}
};

const sendMessage = async (req, res, next) => {
	const to = req.params.id;
	const from = req.body.from;
	const message = req.body.message;
	try {
		const receiver = await User.findOne({ _id: to });
		const sender = await User.findOne({ _id: from });

		if (message.length !== 0) {
			receiver.received_messages.unshift({
				from: sender._id,
				body: message,
			});
			sender.sent_messages.unshift({
				to: receiver._id,
				body: message,
			});
			await receiver.save();
			await sender.save();

			return res.json({
				message: 'Success! Message succesfully sent.',
				text: { sent_to: to, sent_by: from, body: message },
			});
		} else {
			throw 'You cannot send an empty message';
		}
	} catch (err) {
		const error = new Error(
			'The message could not be send'
		);
		error.error = err;
		next(error);
	}
};

const viewConversation = async (req, res, next) => {
	const { id1, id2 } = req.params;
	try {
		const user1 = await User.findOne({ _id: id1 });
		const user2 = await User.findOne({ _id: id2 });

		const sentMess = user1.sent_messages.filter(
			(message) => message.to === id2
		);
		const recMess = user1.received_messages.filter(
			(message) => message.from === id2
		);
		const allMess = [...sentMess, ...recMess];
		const sortedMessages = allMess.sort(
			(a, b) => a.createdAt - b.createdAt
		);
		return res.json({
			success: `All messages between ${user1.full_name.first_name} ${user1.full_name.last_name} & ${user2.full_name.first_name} ${user2.full_name.last_name} have been queried.`,
			conversation: sortedMessages,
		});
	} catch (err) {
		const error = new Error(
			'A user with the specified ID could not be found'
		);
		error.status = 404;
		error.error = err;
		next(error);
	}
};

module.exports = {
	getAllUsers,
	getUsersByType,
	search,
	getSingleUser,
	createUser,
	updateUser,
	changeAvatar,
	addToFavourites,
	makeInactive,
	makeActive,
	deleteUser,
	sendMessage,
	viewConversation,
};
