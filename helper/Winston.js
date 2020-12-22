const appRoot = require('app-root-path');
var winston = require('winston');
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `${appRoot}/logger/error.log`, level: 'error' }),
    ]
});

// chỉ ghi log ra console nếu không phải là môi trường production
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
module.exports = { logger };