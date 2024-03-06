"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// authRoutes.ts
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const router = (0, express_1.Router)();
// Chame imediatamente a função middlewareAuth e passe o resultado para a rota
router.get("/test", (0, middlewareAuth_1.default)("app-user"), authController_1.default.test);
exports.default = router;
