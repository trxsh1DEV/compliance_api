"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compliance_1 = __importDefault(require("../controllers/Compliance"));
const router = (0, express_1.Router)();
// router.get('/:id', Compliance.complianceCalculate);
router.post('/', Compliance_1.default.store);
router.get('/latest/:id', Compliance_1.default.latestCompliance);
router.get('/calculate/:id', Compliance_1.default.complianceCalculate);
router.get('/:id/:complianceId', Compliance_1.default.show);
// router.get('/', Compliance.index);
exports.default = router;
