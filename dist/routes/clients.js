"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const keycloak_1 = __importDefault(require("../config/keycloak"));
const router = (0, express_1.Router)();
router.post("/", keycloak_1.default.protect("realm:app-admin"), middlewareAuth_1.default, Clients_1.default.store);
router.get("", keycloak_1.default.protect("realm:app-admin"), middlewareAuth_1.default, Clients_1.default.findAllClients);
router.get("/:id", keycloak_1.default.protect("realm:app-admin"), middlewareAuth_1.default, Clients_1.default.show);
router.patch("/:id", keycloak_1.default.protect("realm:app-admin"), middlewareAuth_1.default, Clients_1.default.update);
router.delete("/:id", keycloak_1.default.protect("realm:app-admin"), middlewareAuth_1.default, Clients_1.default.delete);
exports.default = router;
