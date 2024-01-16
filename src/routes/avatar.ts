import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import Avatar from "../controllers/Avatar";

const router = Router();

router.post("/", loginRequired, Avatar.store);
export default router;
