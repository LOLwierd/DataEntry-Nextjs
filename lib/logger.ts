import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(),
    format: winston.format.simple(),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.colorize(),
        }),
        new winston.transports.File({ filename: './logs/logs.json', format: winston.format.json() }),
    ],
});

export const loggerClient = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize(),
        })
    ],
});

export default logger;
