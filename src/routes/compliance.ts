import { Router } from "express";
import Compliance from "../controllers/Compliance";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

router.post("/", middlewareAuth("app-admin"), Compliance.store);
router.post("/latest/", middlewareAuth("app-user"), Compliance.latestCompliance);
router.get("/calculate/:id", middlewareAuth("app-admin"), Compliance.complianceCalculate);
router.get("/:complianceId", middlewareAuth("app-admin"), Compliance.show);
router.patch("/:id", middlewareAuth("app-admin"), Compliance.update);
router.delete("/:id", middlewareAuth("app-admin"), Compliance.delete);

export default router;
