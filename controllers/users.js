const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
	res.send('All users');
};

const getSingleUser = async (req, res, next) => {
	res.send('Single user');
};

const createUser = async (req, res, next) => {
	const { name, email, password, type } = req.body;
	const user = new User({ name, email, password, type });
	user.save(error => {
		if (error) {
			res.status(500);
			return res.json({
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
	deleteUser
};
