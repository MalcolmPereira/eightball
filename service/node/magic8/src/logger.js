import bunyan from "bunyan";


import httpContext from "express-http-context";

const REQUEST_ID = "REQUESTID";
const HOST = "HOSTNAME";
const PRODUCTION = "production";
const LOG_LEVEL_ERROR = "error";
const LOG_LEVEL_WARN = "warn";
const LOG_LEVEL_INFO = "info";
const LOG_LEVEL_VERBOSE = "verbose";
const LOG_LEVEL_DEBUG = "debug";
const LOG_LEVEL_SILLY = "silly";

var bunyanLogger = bunyan.createLogger(
    {
        name: "magic8service",
        level: "debug",
        stream: process.stdout,
    }
);
const configureLogger = () => {
    bunyanLogger = bunyan.createLogger(
        {
            name: "magic8service",
            level: "debug",
            streams: [{
                level: "debug",
                stream: process.stdout
            }]
        }
    );
};

const logger = {
    log: (level, message) => {
        bunyanLogger.log(level, message);
        return true;
    },
    error: (message) => {
        bunyanLogger.error(message);
        return true;
    },
    warn: (message) => {
        bunyanLogger.warn(message);
        return true;
    },
    info: (message) => {
        bunyanLogger.info(message);
        return true;
    },
    verbose: (message) => {
        bunyanLogger.verbose(message);
        return true;
    },
    debug: (message) => {
        bunyanLogger.debug(message);
        return true;
    },
    stream: () => {
        return bunyanLogger.stream;
    }
};

const formatMessage = (message) => {
    let reqId = httpContext.get(REQUEST_ID);
    let host = httpContext.get(HOST);
    if (!host) {
        host = "";
    }
    let logmessage = {};
    logmessage.timestamp = new Date().toISOString();
    logmessage.requestId = reqId;
    logmessage.host = host;
    logmessage.logmessage = message;
    return JSON.stringify(logmessage);
};

export {
    logger as default,
    configureLogger,
    REQUEST_ID,
    HOST,
    PRODUCTION,
    LOG_LEVEL_ERROR,
    LOG_LEVEL_WARN,
    LOG_LEVEL_INFO,
    LOG_LEVEL_VERBOSE,
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_SILLY
};