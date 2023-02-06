import express from "express";
import swaggerui from "swagger-ui-express";
import yaml from "yamljs";

import { prediction } from "./controller.js";

//Express Router
let router = express.Router();

router.use("/api", swaggerui.serve);
router.get("/api", swaggerui.setup(yaml.load("api.yaml")));
router.post("/predict", prediction);

export { router as default };