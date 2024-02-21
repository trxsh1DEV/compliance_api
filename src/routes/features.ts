import { Router } from "express";
import FeaturesController from "../controllers/Features";
import middlewareAuth from "../middlewares/middlewareAuth";
import keycloak from "../config/keycloak";

const router = Router();

router.get("/infrastructure", keycloak.protect("realm:app-user"), middlewareAuth, FeaturesController.dashboards);

export default router;
