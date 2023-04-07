const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

async function parseToken(token) {
	const data = await Token.findOne({ token });

	if (data) {
		throw new Error('BLACKLISTED_TOKEN');
	}

	try {
		const result = jwt.verify(token, JWT_SECRET_TOKEN);
		return result;
	} catch (error) {
		console.log('The ban hammer struck!');
		banToken(token);
	}
}

async function verifyToken(token) {
	const res = await parseToken(token);
	return res ? true : false;
}

function createToken(user) {
	const data = {
		userId: user._id,
		email: user.email,
		username: user.username,
		app: user.app
	};

	return {
		userId: user._id,
		email: user.email,
		username: user.username,
		accessToken: jwt.sign(data, JWT_SECRET_TOKEN),
		expiriesIn: '28800000'
	};
}

async function banToken(token) {
	return Token.create({ token });
}

module.exports = {
	parseToken,
	createToken,
	banToken,
	verifyToken
};