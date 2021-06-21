// TODO make this a singelton. Maybe not needed but do not know for sure.
// Doin dis stoneage coding becauz of next custom server
const winston = require('winston')

module.exports = {
    logger: winston.createLogger({
        level: 'info',
        format: winston.format.simple(),
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({ filename: './logs/error.log', level: 'error', }),
            new winston.transports.File({ filename: './logs/combined.log', }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                ),
            }),
            new winston.transports.File({
                filename: './logs/logs.json',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                ),
            }),
        ],
    }),
    loggerClient: winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.Console({})
        ],
    })
}
