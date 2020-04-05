const login = (req, res, next) => {
	res.json(req.next);
};
const logout = (req, res, next) => {
	req.logout();
	res.status(200).json({ message: "You've been logged out." });
};

module.exports = { login, logout };
