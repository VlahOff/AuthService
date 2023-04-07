const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout, changePassword, changeUsername, deleteAccount } = require('../service/userService');
const errorParser = require('../utils/errorParser');

authController.post('/register',
	body('email')
		.trim()
		.isEmail()
		.withMessage('INVALID_EMAIL'),
	body('username')
		.trim()
		.isLength({ min: 3, max: 30 })
		.withMessage('USERNAME_INVALID_LENGTH'),
	body('password')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
			if (errors.length > 0) {
				throw errors;
			}

			const token = await register(
				req.body.email,
				req.body.username,
				req.body.password,
				req.headers.origin
			);
			res.status(201).json(token);
		} catch (error) {
			res.status(400).json({
				message: errorParser(error)
			});
		}
	});

authController.post('/login',
	body('email')
		.trim()
		.isEmail()
		.withMessage('INVALID_EMAIL'),
	body('password')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
			if (errors.length > 0) {
				throw errors;
			}

			const token = await login(req.body.email, req.body.password);
			res.status(200).json(token);
		} catch (error) {
			res.status(401).json({
				message: errorParser(error)
			});
		}
	});

authController.get('/logout', async (req, res) => {
	try {
		if (req.token === '') {
			throw new Error('TOKEN_IS_NULL');
		}
		await logout(req.token);

		res.status(202).json({}).end();
	} catch (error) {
		res.status(401).json({
			message: errorParser(error)
		});
	}
});

authController.post('/changeUsername',
	body('newUsername')
		.trim()
		.isLength({ min: 3, max: 30 })
		.withMessage('USERNAME_INVALID_LENGTH'),
	body('password')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
			if (errors.length > 0) {
				throw errors;
			}

			if (!req.user) {
				throw new Error('NO_USER');
			}

			const result = await changeUsername(
				req.body.newUsername,
				req.body.password,
				req.user.userId,
				req.token
			);

			res.status(202).send(result).end();
		} catch (error) {
			res.status(401).json({
				message: errorParser(error)
			});
		}
	});

authController.post('/changePassword',
	body('oldPassword')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	body('newPassword')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
			if (errors.length > 0) {
				throw errors;
			}

			if (!req.user) {
				throw new Error('NO_USER');
			}

			await changePassword(
				req.body.oldPassword,
				req.body.newPassword,
				req.user.userId,
				req.token
			);
			res.status(202).json({ message: 'Done' });
		} catch (error) {
			res.status(401).json({
				message: errorParser(error)
			});
		}
	});

authController.post('/deleteAccount',
	body('password')
		.trim()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
		.withMessage('INVALID_PASSWORD'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
			if (errors.length > 0) {
				throw errors;
			}

			if (!req.user) {
				throw new Error('NO_USER');
			}

			await deleteAccount(req.body.password, req.user.userId, req.token);
			res.status(202).json({ message: 'Done' });
		} catch (error) {
			res.status(401).json({
				message: errorParser(error)
			});
		}
	});

module.exports = authController;