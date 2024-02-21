"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const keycloak_1 = __importDefault(require("../config/keycloak"));
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const router = (0, express_1.Router)();
// router.post("/login", authController.login);
router.get("/test", keycloak_1.default.protect("realm:app-user"), middlewareAuth_1.default, authController_1.default.test);
exports.default = router;
