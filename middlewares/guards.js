const { corsWhiteList } = require('../corsWhiteList');

function isCorrectOrigin() {
	return (req, res, next) => {
		if (corsWhiteList.indexOf(req.headers.origin) !== -1) {
			next();
		} else {
			res.status(401).json({ message: 'NO_USER' });
		}
	};
}

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
	isCorrectOrigin,
	isAuthenticated
};