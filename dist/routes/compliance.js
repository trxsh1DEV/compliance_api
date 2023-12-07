"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compliance_1 = __importDefault(require("../controllers/Compliance"));
const router = (0, express_1.Router)();
router.post('/', Compliance_1.default.store);
router.get('/:id', Compliance_1.default.complianceCalculate);
exports.default = router;