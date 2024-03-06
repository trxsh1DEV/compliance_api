import { Router } from "express";
import Avatar from "../controllers/Avatar";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

router.post("/", middlewareAuth("app-user"), Avatar.store);

export default router;
