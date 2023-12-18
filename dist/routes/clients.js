"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const router = (0, express_1.Router)();
router.post('/', Clients_1.default.store);
router.get('/', Clients_1.default.index);
router.get('/:id', Clients_1.default.show);
exports.default = router;
