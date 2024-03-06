import { Router } from "express";
import ClientsController from "../controllers/Clients";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

router.post("/", middlewareAuth("app-admin"), ClientsController.store);
router.get("", middlewareAuth("app-admin"), ClientsController.findAllClients);
router.get("/:id", middlewareAuth("app-admin"), ClientsController.show);
router.patch("/:id", middlewareAuth("app-admin"), ClientsController.update);
router.delete("/:id", middlewareAuth("app-admin"), ClientsController.delete);

export default router;
