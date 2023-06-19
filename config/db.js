const mongoose = require('mongoose');

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

module.exports = async () => {
	try {
		mongoose.set('strictQuery', true);
		await mongoose.connect(DB_CONNECTION_STRING, { dbName: 'vlahoffAuth' });
		console.log('Database connected');
	} catch (error) {
		console.error('Error initializing database');
		console.error(error.message);
		process.exit(1);
	}
};
