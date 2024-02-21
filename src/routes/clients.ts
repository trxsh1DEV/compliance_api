import { Router } from "express";
import ClientsController from "../controllers/Clients";
import middlewareAuth from "../middlewares/middlewareAuth";
import keycloak from "../config/keycloak";

const router = Router();

router.post("/", keycloak.protect("realm:app-admin"), middlewareAuth, ClientsController.store);
router.get("", keycloak.protect("realm:app-admin"), middlewareAuth, ClientsController.findAllClients);
router.get("/:id", keycloak.protect("realm:app-admin"), middlewareAuth, ClientsController.show);
router.patch("/:id", keycloak.protect("realm:app-admin"), middlewareAuth, ClientsController.update);
router.delete("/:id", keycloak.protect("realm:app-admin"), middlewareAuth, ClientsController.delete);

export default router;
