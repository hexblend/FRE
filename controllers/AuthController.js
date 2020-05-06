const login = (req, res, next) => {
	const user = req.user;
	res.json({ message: "Success! You've been logged in.", user });
};
const logout = (req, res, next) => {
	req.logout();
	res.json({ message: "Success! You've been logged out." });
};

module.exports = { login, logout };
