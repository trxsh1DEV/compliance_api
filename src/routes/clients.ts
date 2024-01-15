import { Router } from "express";
import ClientsController from "../controllers/Clients";
import authAdmin from "../middlewares/authAdmin";

const router = Router();

router.post("/", authAdmin, ClientsController.store);
router.get("", authAdmin, ClientsController.findAllClients);
router.get("/:id", authAdmin, ClientsController.show);
router.patch("/:id", authAdmin, ClientsController.update);
router.delete("/:id", authAdmin, ClientsController.delete);

export default router;
