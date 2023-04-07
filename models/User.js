const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	app: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: false, unique: true },
	hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
	collation: {
		locale: 'en',
		strength: 2
	}
});

userSchema.index({ email: 1 }, {
	collation: {
		locale: 'en',
		strength: 2
	}
});

const User = model('User', userSchema);

module.exports = User;