"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compliance_1 = __importDefault(require("../controllers/Compliance"));
const validationAuth_1 = __importDefault(require("../middlewares/validationAuth"));
const router = (0, express_1.Router)();
router.post("/", validationAuth_1.default, Compliance_1.default.store);
router.post("/latest/", Compliance_1.default.latestCompliance);
router.get("/calculate/:id", Compliance_1.default.complianceCalculate);
router.get("/:complianceId", validationAuth_1.default, Compliance_1.default.show);
router.patch("/:id", validationAuth_1.default, Compliance_1.default.update);
router.delete("/:id", validationAuth_1.default, Compliance_1.default.delete);
exports.default = router;
