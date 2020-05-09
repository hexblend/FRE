const login = (req, res, next) => {
	res.json({
		message: "Success! You've been logged in.",
		user: req.user,
	});
};
const logout = async (req, res, next) => {
	await req.logout();
	res.json({ message: "Success! You've been logged out." });
};

const checkSession = (req, res, next) => {
	if (req.user) {
		res.json({
			message: 'Success! Session found!',
			user: req.user,
		});
	} else {
		const error = new Error('Session not found');
		error.status = 404;
		return next(error);
	}
};

module.exports = { login, logout, checkSession };
