"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const router = (0, express_1.Router)();
router.post("/", (0, middlewareAuth_1.default)("app-admin"), Clients_1.default.store);
router.get("", (0, middlewareAuth_1.default)("app-admin"), Clients_1.default.findAllClients);
router.get("/:id", (0, middlewareAuth_1.default)("app-admin"), Clients_1.default.show);
router.patch("/:id", (0, middlewareAuth_1.default)("app-admin"), Clients_1.default.update);
router.delete("/:id", (0, middlewareAuth_1.default)("app-admin"), Clients_1.default.delete);
exports.default = router;
