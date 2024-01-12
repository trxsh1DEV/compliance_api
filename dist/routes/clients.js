"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const authAdmin_1 = __importDefault(require("../middlewares/authAdmin"));
const router = (0, express_1.Router)();
router.post("/", authAdmin_1.default, Clients_1.default.store);
router.get("/show", authAdmin_1.default, Clients_1.default.findAllClients);
router.get("/show/:id", authAdmin_1.default, Clients_1.default.show);
router.get("/", loginRequired_1.default, Clients_1.default.show);
router.patch("/:id", authAdmin_1.default, Clients_1.default.update);
router.delete("/:id", authAdmin_1.default, Clients_1.default.delete);
exports.default = router;
