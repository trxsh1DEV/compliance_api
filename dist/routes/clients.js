"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Clients_1 = __importDefault(require("../controllers/Clients"));
const validates_1 = require("../middlewares/validates");
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = (0, express_1.Router)();
router.post('/', Clients_1.default.store);
router.get('/', loginRequired_1.default, Clients_1.default.findAllClients);
router.get('/:id', validates_1.validId, validates_1.validResponse, Clients_1.default.show);
router.patch('/:id', validates_1.validId, validates_1.validResponse, Clients_1.default.update);
exports.default = router;
