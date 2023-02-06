import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import errorhandler from "errorhandler";
import responseTime from "response-time";
import httpContext from "express-http-context";

import logger, { PRODUCTION, configureLogger } from "./logger.js";

const middleware = (service) => {
    configureLogger();
    service.use(cors());
    service.use(morgan(((process.env.NODE_ENV !== PRODUCTION) ? "dev" : "short"), { stream: logger.stream() }));
    service.use(bodyParser.json());
    service.use(bodyParser.urlencoded({ extended: true }));
    service.use(compression());
    if (process.env.NODE_ENV !== PRODUCTION) {
        service.use(errorhandler());
    }
    service.use(httpContext.middleware);
    service.use(responseTime());
};

export { middleware as default };