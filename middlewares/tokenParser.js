const { parseToken, banToken } = require('../service/tokenService');

module.exports = () => async (req, res, next) => {
	const token = req.headers['x-authorization'];

	if (token) {
		try {
			const payload = await parseToken(token);

			req.user = payload;
			req.token = token;
		} catch (error) {
			banToken(token);
			return res.status(401).json({ message: 'INVALID_TOKEN' });
		}
	}

	next();
};
