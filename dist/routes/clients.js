"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const loginAndAdmin_1 = __importDefault(require("../middlewares/loginAndAdmin"));
const router = (0, express_1.Router)();
router.post('/', Clients_1.default.store);
router.get('/', loginAndAdmin_1.default, Clients_1.default.findAllClients);
router.get('/:id', loginAndAdmin_1.default, Clients_1.default.show);
router.patch('/:id', Clients_1.default.update);
router.delete('/:id', Clients_1.default.delete);
exports.default = router;
('');
