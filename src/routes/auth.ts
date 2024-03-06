// authRoutes.ts
import { Router } from "express";
import authController from "../controllers/authController";
import middlewareAuth from "../middlewares/middlewareAuth";

const router = Router();

// Chame imediatamente a função middlewareAuth e passe o resultado para a rota
router.get("/test", middlewareAuth("app-user"), authController.test);

export default router;
