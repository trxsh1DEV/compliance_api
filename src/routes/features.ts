import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import FeaturesController from "../controllers/Features";

const router = Router();

router.get("/infrastructure", loginRequired, FeaturesController.snapshots);

export default router;
