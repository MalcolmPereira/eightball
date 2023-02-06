import express from "express";
import httpContext from "express-http-context";
import { v4 as uuidv4 } from "uuid";
import boom from "@hapi/boom";

import logger, { REQUEST_ID, HOST } from "./logger.js";
import middleware from "./middleware.js";
import router from "./router.js";


let magic8service = () => {
    logger.debug("Reading ENV Configurations and Setting ENV ");

    //Express Service
    logger.debug("Starting Express Init ");
    const service = express();
    logger.debug("Done Starting Express Init ");

    //Set up Middleware
    logger.debug("Starting Express Middleware Init ");
    middleware(service);
    logger.debug("Done Starting Express Middleware Init ");

    //Set up Request ID for tracking
    service.use((req, res, next) => {
        httpContext.set(REQUEST_ID, uuidv4());
        httpContext.set(HOST, req.hostname + "(" + req.ip + ")");
        next();
    });

    //Routers
    service.use("/magic8", router);

    service.get("/", (req, res) => {
        res.redirect("/magic8/api");
    });

    //404 For Invalid Routes
    service.get("*", (req, res, next) => {
        logger.error("Invalid Request, Request cannot be processed, resource endpoint not found ");
        return next(boom.notFound("Request cannot be processed, resource endpoint not found"));
    });

    //Set up Error Handling
    service.use((err, req, res, next) => {
        console.log("Got Error ", err);
        if (err.isServer) {
            logger.error("Server Error: ", err);
        }
        return res.status(err.output.statusCode).json(err.output.payload);
    });


    return service;
};
export { magic8service as default };

