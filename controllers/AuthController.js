const login = (req, res, next) => {
	res.json({ message: "Success! You've been logged in." });
};
const logout = (req, res, next) => {
	req.logout();
	res.json({ message: "Success! You've been logged out." });
};

module.exports = { login, logout };
