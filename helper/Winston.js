const appRoot = require('app-root-path');
var winston = require('winston');

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logger/error.log`,
    handleExceptions: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
module.exports = { logger };
