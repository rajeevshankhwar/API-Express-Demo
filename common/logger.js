const winston = require("winston");
const console = new winston.transports.Console();
const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.simple(),
	transports: [
		console
		//new winston.transports.File({ filename: 'error.log', level: 'error' }),
		//	new winston.transports.File({ filename: 'combined.log' })
	]
});
module.exports = logger;