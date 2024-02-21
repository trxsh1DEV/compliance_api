import { Router } from "express";
import ClientsController from "../controllers/Clients";
import keycloak from "../config/keycloak";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

router.get("/", keycloak.protect("realm:app-user"), middlewareAuth, ClientsController.show);
router.patch("/", keycloak.protect("realm:app-user"), middlewareAuth, ClientsController.update);

export default router;
