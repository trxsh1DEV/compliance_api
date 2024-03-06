"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Compliance_1 = __importDefault(require("../controllers/Compliance"));
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const router = (0, express_1.Router)();
router.post("/", (0, middlewareAuth_1.default)("app-admin"), Compliance_1.default.store);
router.post("/latest/", (0, middlewareAuth_1.default)("app-user"), Compliance_1.default.latestCompliance);
router.get("/calculate/:id", (0, middlewareAuth_1.default)("app-admin"), Compliance_1.default.complianceCalculate);
router.get("/:complianceId", (0, middlewareAuth_1.default)("app-admin"), Compliance_1.default.show);
router.patch("/:id", (0, middlewareAuth_1.default)("app-admin"), Compliance_1.default.update);
router.delete("/:id", (0, middlewareAuth_1.default)("app-admin"), Compliance_1.default.delete);
exports.default = router;
