import { Router } from "express";
import Avatar from "../controllers/Avatar";
import middlewareAuth from "../middlewares/middlewareAuth";
import keycloak from "../config/keycloak";

const router = Router();

router.post("/", keycloak.protect("realm:app-user"), middlewareAuth, Avatar.store);
export default router;
