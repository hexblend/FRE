const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({
			type: ['jobseeker', 'employer'],
		});
		if (users.length === 0) throw err;
		return res.json({
			message: 'Success! All users have been queried',
			users,
		});
	} catch (err) {
		const error = new Error('There are no users in the database');
		error.status = 404;
		error.error = err;
		return next(error);
	}
};

const getUsersByType = async (req, res, next) => {
	try {
		const users = await User.find({ type: req.params.type });
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

const getUsersByJobAndCity = async (req, res, next) => {
	const job1 = req.params.job1;
	const job2 = req.params.job2;
	const job3 = req.params.job3;
	const city = req.params.location;
	try {
		const users = await User.find({ type: ['jobseeker'] });

		const matchUsers = [];
		users.forEach((user) => {
			const search = (job, city) => {
				if (
					user.job_title.toLowerCase().includes(job.toLowerCase()) &&
					user.city.toLowerCase().includes(city.toLowerCase())
				) {
					return true;
				} else {
					return false;
				}
			};

			let found;
			if (job2 && job3)
				found = search(job1, city) || search(job2, city) || search(job3, city);
			else if (job2 && !job3) found = search(job1, city) || search(job2, city);
			else found = search(job1, city);

			if (found) matchUsers.push(user);
		});

		if (matchUsers.length === 0) throw err;

		return res.json({
			message: 'Success! Users with the specified job title were found!',
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
		if (user === null) throw 'A user with the specified ID could not be found';
		res.json({
			message: 'Success! A user with the specified ID has been queried.',
			user,
		});
	} catch (err) {
		const error = new Error('A user with the specified ID could not be found');
		error.status = 404;
		error.error = err;
		next(error);
	}
};

const createUser = async (req, res, next) => {
	const { full_name, email, password, type } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = new User({
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
	const avatarURL = req.file.url;
	try {
		const user = await User.findOne({ _id: req.params.id });
		user.avatar = avatarURL;
		await user.save();

		return res.json({
			message: 'Success! The avatar has been successfully changed.',
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
		const userToBeAdded = await User.findById(req.body.profileID);

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

		const updateStringField = (field, specialValue = null) => {
			const reqValue = req['body'][field];
			if (reqValue.length !== 0) {
				if (specialValue) {
					user[field] = specialValue;
				} else {
					user[field] = reqValue;
				}
			} else {
				throw `${field} must not be empty!`;
			}
		};

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Single Object Fields
		updateStringField('email');
		updateStringField('password', hashedPassword);
		updateStringField('type');
		updateStringField('inactiveAccount');
		updateStringField('status');
		updateStringField('job_title');
		updateStringField('city');
		updateStringField('remote_worker');
		updateStringField('years_of_activity');
		updateStringField('higher_education');
		updateStringField('description');

		// Nested Objects Fields
		updateStringField('full_name');

		// Location
		const coordinates = req.body.location.coordinates;
		if (coordinates && coordinates.length !== 0) {
			user.location.coordinates = coordinates;
		} else {
			throw 'Your coordinates must not be empty';
		}

		// Key abilities
		const new_abilities = req.body.key_abilities;
		const old_abilities = user.key_abilities;
		if (new_abilities.length !== 0) {
			const final_abilities = [
				...new Set([...old_abilities, ...new_abilities]), // New array without duplicates
			];
			user.key_abilities = final_abilities;
		} else {
			throw 'Abilities array must not be empty';
		}

		// Company - BAD CODE
		// const company = req.body.company;
		// const { name, type, website } = company;
		// name && (user.company.name = name);
		// type && (user.company.type = type);
		// website && (user.company.website = website);

		// Social Media
		const socialMediaObj = req.body.social_media;
		const { facebook, twitter, instagram, linkedin, github } = socialMediaObj;
		facebook && (user.social_media.facebook = facebook);
		twitter && (user.social_media.twitter = twitter);
		instagram && (user.social_media.instagram = instagram);
		linkedin && (user.social_media.linkedin = linkedin);
		github && (user.social_media.github = github);

		// Fields with Subdocuments

		// Experiences
		const new_experience = req.body.experience;
		if (new_experience.length !== 0) {
			new_experience.forEach((exp) => {
				if (!exp.id) {
					// Add new experiences
					user.experience.unshift(exp);
				} else {
					// Update an existing one
					const singleExp = user.experience.id(exp.id);
					const {
						company_name,
						job_title,
						starting_date,
						ending_date,
						long_description,
					} = exp;
					company_name && (singleExp.company_name = company_name);
					job_title && (singleExp.job_title = job_title);
					starting_date && (singleExp.starting_date = starting_date);
					ending_date && (singleExp.ending_date = ending_date);
					long_description && (singleExp.long_description = long_description);
				}
			});
		} else {
			throw 'Experience array must not be empty';
		}

		// Projects
		const new_projects = req.body.projects;
		if (new_projects.length !== 0) {
			new_projects.forEach((proj) => {
				if (!proj.id) {
					// Add new experiences
					user.projects.unshift(proj);
				} else {
					// Update an existing one
					const singleProj = user.projects.id(proj.id);
					const { title, description, accomplishments, link } = proj;
					title && (singleProj.title = title);
					description && (singleProj.description = description);
					accomplishments && (singleProj.accomplishments = accomplishments);
					link && (singleProj.link = link);
				}
			});
		} else {
			throw 'Projects array must not be empty';
		}

		// Available Positions - BAD CODE
		// const availPos = req.body.available_positions;
		// if (availPos.length !== 0) {
		// 	availPos.forEach((pos) => {
		// 		if (!pos.id) {
		// 			user.available_positions.unshift(pos);
		// 		} else {
		// 			const singlePos = user.available_positions.id(pos.id);
		// 			const {
		// 				job_title,
		// 				type_of_worker,
		// 				years_of_experience,
		// 				skills,
		// 				benefits,
		// 			} = pos;

		// 			job_title && (singlePos.job_title = job_title);
		// 			type_of_worker && (singlePos.type_of_worker = type_of_worker);
		// 			years_of_experience &&
		// 				(singlePos.years_of_experience = years_of_experience);
		// 			skills && (singlePos.skills = skills);
		// 			benefits && (singlePos.benefits = benefits);
		// 		}
		// 	});
		// } else {
		// 	throw 'Available Positions array must not be empty';
		// }

		// Save
		await user.save();

		res.json({
			message: 'Success! The user details have been updated!',
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
		const user = await User.deleteOne({ _id: req.params.id });
		res.json({
			message: 'Success! A user with the specified ID has been DELETED.',
			user,
		});
	} catch (err) {
		const error = new Error('A user with the specified ID could not be found');
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
			sender.sent_messages.unshift({ to: receiver._id, body: message });
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
		const error = new Error('The message could not be send');
		error.error = err;
		next(error);
	}
};

const viewMessages = async (req, res, next) => {
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
		const sortedMessages = allMess.sort((a, b) => a.createdAt - b.createdAt);
		return res.json({
			success: `All messages between ${user1.full_name.first_name} ${user1.full_name.last_name} & ${user2.full_name.first_name} ${user2.full_name.last_name} have been queried.`,
			conversation: sortedMessages,
		});
	} catch (err) {
		const error = new Error('A user with the specified ID could not be found');
		error.status = 404;
		error.error = err;
		next(error);
	}
};

module.exports = {
	getAllUsers,
	getUsersByType,
	getUsersByJobAndCity,
	getSingleUser,
	createUser,
	updateUser,
	changeAvatar,
	addToFavourites,
	makeInactive,
	makeActive,
	deleteUser,
	sendMessage,
	viewMessages,
};
