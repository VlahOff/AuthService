require('dotenv').config();

const express = require('express');
const databaseConfig = require('./config/db');

const tokenParser = require('./middlewares/tokenParser');
const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');

const EXPRESS_PORT = process.env.EXPRESS_PORT;

async function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(tokenParser());
  const connectToDB = databaseConfig();

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
