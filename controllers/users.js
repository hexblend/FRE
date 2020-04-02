const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
	res.send('All users');
};

const getSingleUser = async (req, res, next) => {
	res.send('Single user');
};

const createUser = async (req, res, next) => {
	res.send('Create user');
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
