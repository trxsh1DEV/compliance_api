import { Router } from "express";
import ClientsController from "../controllers/Clients";
import loginRequired from "../middlewares/loginRequired";
import authAdmin from "../middlewares/authAdmin";

const router = Router();

router.post("/", authAdmin, ClientsController.store);
router.get("/show", authAdmin, ClientsController.findAllClients);
router.get("/show/:id", authAdmin, ClientsController.show);
router.get("/", loginRequired, ClientsController.show);
router.patch("/:id", authAdmin, ClientsController.update);
router.delete("/:id", authAdmin, ClientsController.delete);

export default router;
