const cors = process.env.CORS_WHITELIST;
const corsWhiteList = cors.split(' ');

const corsConfig = {
	origin: (origin, cb) => {
		if (corsWhiteList.indexOf(origin) !== -1) {
			cb(null, true);
		} else {
			cb(new Error());
		}
	},
	methods: ['GET, POST, PUT, DELETE'],
	allowedHeaders: ['Content-Type', 'X-Authorization'],
	preflightContinue: false,
};

module.exports = corsConfig;
