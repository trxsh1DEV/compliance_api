import { Router } from "express";
import authController from "../controllers/authController";
import keycloak from "../config/keycloak";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

// router.post("/login", authController.login);
router.get("/test", keycloak.protect("realm:app-user"), middlewareAuth, authController.test);

export default router;
