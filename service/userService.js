const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createToken, banToken, verifyToken } = require('./tokenService');

async function register(email, username, password, origin) {
	const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
	const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

	if (existingEmail) {
		throw new Error('EMAIL_TAKEN');
	}

	if (existingUsername) {
		throw new Error('USERNAME_TAKEN');
	}

	const appList = {
		'http://localhost:4200': 'Aniline',
		'https://aniline.vercel.app': 'Aniline',
		'http://localhost:3000': 'BulgarianDrivers',
		'https://bulgarian-drivers.vercel.app': 'BulgarianDrivers',
	};

	const appIndex = appList[origin];
	const user = await User.create({
		app: appIndex,
		email,
		username,
		hashedPassword: await bcrypt.hash(password, 10)
	});

	return createToken(user);
}

async function login(email, password) {
	const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

	if (!user) {
		throw new Error('INVALID_CREDENTIALS');
	}

	const match = await bcrypt.compare(password, user.hashedPassword);

	if (!match) {
		throw new Error('INVALID_CREDENTIALS');
	}

	return createToken(user);
}

async function logout(token) {
	if (token === '') {
		throw new Error('TOKEN_IS_NULL');
	}
	banToken(token);
}

async function verifyUserPassword(password, userId, token) {
	const isValid = await verifyToken(token);
	const user = await User.findById(userId);
	const match = await bcrypt.compare(password, user.hashedPassword);

	if (!match || !isValid) {
		throw new Error('INVALID_CREDENTIALS');
	}

	return match;
}

async function changeUsername(newUsername, password, userId, token) {
	const user = await User.findById(userId);
	await verifyUserPassword(password, userId, token);

	await User.findByIdAndUpdate(userId,
		{
			email: user.email,
			username: newUsername,
			hashedPassword: user.hashedPassword
		}
	);
	const updatedUser = await User.findById(userId);
	return updatedUser;
}

async function changePassword(oldPassword, newPassword, userId, token) {
	const user = await User.findById(userId);
	await verifyUserPassword(oldPassword, userId, token);

	await User.findByIdAndUpdate(userId,
		{
			email: user.email,
			username: user.username,
			hashedPassword: await bcrypt.hash(newPassword, 10)
		}
	);
}

async function deleteAccount(password, userId, token) {
	await verifyUserPassword(password, userId, token);

	await User.findByIdAndRemove(userId);
}

module.exports = {
	register,
	login,
	logout,
	changeUsername,
	changePassword,
	verifyUserPassword,
	deleteAccount
};