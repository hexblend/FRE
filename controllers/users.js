const bcrypt = require('bcryptjs');

const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
	res.send('All users');
};

const getSingleUser = async (req, res, next) => {
	res.send('Single user');
};

const registerUser = async (req, res, next) => {
	const { name, email, password, type } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	const user = new User({ name, email, password: hashedPassword, type });

	await user.save(error => {
		if (error) {
			return res.status(500).json({
				message: 'Error! User could not be created',
				error
			});
		}
		return res.json({
			message: 'Success! User added successfully',
			user
		});
	});
};

const loginUser = async (req, res, next) => {
	res.send('User logged in');
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
	registerUser,
	loginUser,
	updateUser,
	deleteUser
};
