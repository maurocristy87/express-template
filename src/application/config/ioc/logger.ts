import { TYPES } from "./types";
import { Container } from "inversify";
import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { DEV, TEST } from "../environments";

export const loadLogger = (container: Container): void => {
    const logLevel = process.env.LOG_LEVEL ?? "debug";
    const logger = createLogger({
        format: format.combine(format.timestamp(), format.json()),
        transports: [new transports.Console({ level: logLevel })],
    });

    if (![DEV, TEST].includes(process.env.NODE_ENV || DEV) && process.env.DD_API_KEY && process.env.DD_SITE) {
        logger.add(
            new transports.File({
                filename: `${process.env.SERVICE_NAME}.log`,
                level: logLevel,
            })
        );
        logger.add(
            new DailyRotateFile({
                filename: `${process.env.SERVICE_NAME}-%DATE%.log`,
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxFiles: 2,
            })
        );
    }

    container.bind(TYPES.Logger).toConstantValue(logger);
};
