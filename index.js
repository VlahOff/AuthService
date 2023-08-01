require('dotenv').config();

const express = require('express');
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
const databaseConfig = require('./config/db');

const tokenParser = require('./middlewares/tokenParser');
const authController = require('./controllers/authController');

const EXPRESS_PORT = process.env.EXPRESS_PORT;

async function start() {
	const app = express();
	const connectToDB = databaseConfig();

	app.use(cors(corsConfig));
	app.use(express.json());
	app.use(tokenParser());
	app.use('/auth', authController);

	app.get('/', (req, res) => {
		res.status(200).send('It works!');
	});

	connectToDB.then(() => {
		app.listen(EXPRESS_PORT, () =>
			console.log('Auth service listening on port: ' + EXPRESS_PORT)
		);
	});
}

start();
