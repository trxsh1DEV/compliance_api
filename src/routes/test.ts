import { Router } from "express";
import testController from "../controllers/Test";

const router = Router();

router.post("/", testController.store);

export default router;
