import { Router } from "express";
import ClientsController from "../controllers/Clients";
import loginRequired from "../middlewares/loginRequired";
import Compliance from "../controllers/Compliance";

const router = Router();

router.get("/", loginRequired, ClientsController.show);
router.patch("/", loginRequired, ClientsController.update);

export default router;
