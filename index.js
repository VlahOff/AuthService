require('dotenv').config();

const express = require('express');
const databaseConfig = require('./config/db');
const EXPRESS_PORT = process.env.EXPRESS_PORT;

const tokenParser = require('./middlewares/tokenParser');
const cors = require('./middlewares/cors');

const authController = require('./controllers/authController');

async function start() {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(tokenParser());
	await databaseConfig();

	app.use('/auth', authController);

	app.get('/', (req, res) => {
		res.status(200).send('It works!');
	});

	app.listen(EXPRESS_PORT, () => console.log('App listening on port: ' + EXPRESS_PORT));
}

start();