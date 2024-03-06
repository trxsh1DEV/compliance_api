import { Router } from "express";
import ClientsController from "../controllers/Clients";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

router.get("/", middlewareAuth("app-user"), ClientsController.show);
router.patch("/", middlewareAuth("app-user"), ClientsController.update);

export default router;
