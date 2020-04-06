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

const getSingleUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.body.id);
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
	const { name, email, password, type } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = new User({ name, email, password: hashedPassword, type });
		const savedUser = await user.save();
		return res.json({ message: 'Success! User added successfully', user });
	} catch (err) {
		const error = new Error('User could not be created.');
		error.error = err;
		return next(error);
	}
};

const updateUser = async (req, res, next) => {
	res.send('Update user');
};

const deleteUser = async (req, res, next) => {
	res.send('Delete user');
};

module.exports = {
	getAllUsers,
	getUsersByType,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
};
