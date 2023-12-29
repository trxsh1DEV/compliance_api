"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compliance_1 = __importDefault(require("../controllers/Compliance"));
const loginAndAdmin_1 = __importDefault(require("../middlewares/loginAndAdmin"));
const router = (0, express_1.Router)();
router.post('/', loginAndAdmin_1.default, Compliance_1.default.store);
router.post('/latest/', Compliance_1.default.latestCompliance);
router.get('/calculate/:id', Compliance_1.default.complianceCalculate);
router.get('/:complianceId', loginAndAdmin_1.default, Compliance_1.default.show);
router.patch('/:id', loginAndAdmin_1.default, Compliance_1.default.update);
router.delete('/:id', loginAndAdmin_1.default, Compliance_1.default.delete);
exports.default = router;
