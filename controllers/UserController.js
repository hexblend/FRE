const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({ type: ['jobseeker', 'employer'] });
		return res.json({ message: 'Success! All users have been queried', users });
	} catch (err) {
		const error = new Error('There are no users in the database');
		error.status = 404;
		error.error = err;
		return next(error);
	}
};

const getUsersByType = async (req, res, next) => {
	try {
		const users = await User.find({ type: req.body.type });
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

const getSingleUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.body.id);
		console.log(user.favourites);
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
		const user = new User({ full_name, email, password: hashedPassword, type });
		const savedUser = await user.save();
		return res.json({ message: 'Success! User added successfully', savedUser });
	} catch (err) {
		const error = new Error('User could not be created.');
		error.error = err;
		return next(error);
	}
};

const addToFavourites = async (req, res, next) => {
	const { currentUserID, profileID } = req.body;
	try {
		const currUser = await User.findById(currentUserID);
		const userToBeAdded = await User.findById(profileID);

		if (currUser.favourites.includes(profileID))
			throw 'User already at favourites';

		const updatedUser = await User.updateOne(
			{ _id: currUser._id },
			{ $addToSet: { favourites: userToBeAdded._id } }
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
			{ _id: req.body.id },
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
			{ _id: req.body.id },
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
	const { id, name, email, password, type } = req.body;

	const updatedFields = {};
	if (name) updatedFields.name = name;
	if (email) updatedFields.email = email;
	if (password) updatedFields.password = password;
	if (type) updatedFields.type = type;

	try {
		const updatedUser = await User.updateOne({ _id: id }, updatedFields);
		return res.json({
			message: 'Success! The specified user has been updated',
			updatedFields,
			updatedUser,
		});
	} catch (err) {
		const error = new Error('A user with the specified ID could not be found');
		error.status = 404;
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const user = await User.deleteOne({ _id: req.body.id });
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
