import { Router } from "express";
import Compliance from "../controllers/Compliance";
import authAdmin from "../middlewares/authAdmin";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", authAdmin, Compliance.store);
router.post("/latest/", loginRequired, Compliance.latestCompliance);
router.get("/calculate/:id", authAdmin, Compliance.complianceCalculate);
router.get("/:complianceId", authAdmin, Compliance.show);
router.patch("/:id", authAdmin, Compliance.update);
router.delete("/:id", authAdmin, Compliance.delete);

export default router;
