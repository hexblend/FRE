const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({
			type: ['jobseeker', 'employer'],
		});
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
			`'${req.params.type}' user type could not be ound.`
		);
		error.status = 404;
		next(error);
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
		const updatedUser = await User.updateOne(
			{ _id: req.params.id },
			{ inactiveAccount: true }
		);
		return res.json({
			message:
				'Success! User is now inactive and will not appear in the search results',
			updatedUser,
		});
	} catch (err) {
		const error = new Error('User could not be updated');
		error.error = err;
		next(err);
	}
};

const makeActive = async (req, res, next) => {
	try {
		const updatedUser = await User.updateOne(
			{ _id: req.params.id },
			{ inactiveAccount: false }
		);
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
		// General fields:
		// - email, password, type, inactiveAccount, status, job_title, remote_worker, years_of_activity, higher_education, description, avatar

		// Sub-object fields:
		// - full_name (first_name, last_name), location(type, coordinates), key_abilities(array with obj, same as favs), social_media(facebook, twitter, instagram, linkedin, github)

		// Fields with schemas:
		// - experience, projects, sent_messages, received_messages
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
		updateStringField('remote_worker');
		updateStringField('years_of_activity');
		updateStringField('higher_education');
		updateStringField('description');
		updateStringField('avatar');

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

		// Social Media
		const socialMediaObj = req.body.social_media;
		const { facebook, twitter, instagram, linkedin, github } = socialMediaObj;
		facebook && (user.social_media.facebook = facebook);
		twitter && (user.social_media.twitter = twitter);
		instagram && (user.social_media.instagram = instagram);
		linkedin && (user.social_media.linkedin = linkedin);
		github && (user.social_media.github = github);

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

module.exports = {
	getAllUsers,
	getUsersByType,
	getSingleUser,
	createUser,
	updateUser,
	addToFavourites,
	makeInactive,
	makeActive,
	deleteUser,
};
