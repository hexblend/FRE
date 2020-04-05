const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
	res.send('All users');
};

const getSingleUser = async (req, res, next) => {
	res.send('Single user');
};

const createUser = async (req, res, next) => {
	const { name, email, password, type } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = new User({ name, email, password: hashedPassword, type });

	await user.save((err) => {
		if (err) {
			const error = new Error('User could not be created');
			error.status = 406;
			return next(err, error);
		}
		return res.json({
			message: 'Success! User added successfully',
			user,
		});
	});
};

const updateUser = async (req, res, next) => {
	res.send('Update user');
};

const deleteUser = async (req, res, next) => {
	res.send('Delete user');
};

module.exports = {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
};
