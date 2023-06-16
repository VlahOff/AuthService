const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
	token: { type: String, unique: true },
});

tokenSchema.index(
	{ token: 1 },
	{
		collation: {
			locale: 'en',
			strength: 3,
		},
	}
);

const Token = model('Token', tokenSchema);

module.exports = Token;
