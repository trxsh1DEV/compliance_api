import { Router } from "express";
import Compliance from "../controllers/Compliance";
import middlewareAuth from "../middlewares/middlewareAuth";
import keycloak from "../config/keycloak";

const router = Router();

router.post("/", keycloak.protect("realm:app-admin"), middlewareAuth, Compliance.store);
router.post("/latest/", keycloak.protect("realm:app-user"), middlewareAuth, Compliance.latestCompliance);
router.get("/calculate/:id", keycloak.protect("realm:app-admin"), middlewareAuth, Compliance.complianceCalculate);
router.get("/:complianceId", keycloak.protect("realm:app-admin"), middlewareAuth, Compliance.show);
router.patch("/:id", keycloak.protect("realm:app-admin"), middlewareAuth, Compliance.update);
router.delete("/:id", keycloak.protect("realm:app-admin"), middlewareAuth, Compliance.delete);

export default router;
