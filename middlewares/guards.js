function isAuthenticated() {
	return (req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.status(401).json({ message: 'NO_USER' });
		}
	};
}

module.exports = {
	isAuthenticated,
};
