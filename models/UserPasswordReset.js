const {
	Schema,
	model,
	Types: { ObjectId },
} = require('mongoose');

const userPasswordResetSchema = new Schema({
	userId: { type: ObjectId, ref: 'User' },
	issuedAt: { type: Date, default: Date.now },
	expiresIn: { type: Date, default: Date.now },
});

const UserPasswordReset = model('UserPasswordReset', userPasswordResetSchema);

module.exports = UserPasswordReset;
