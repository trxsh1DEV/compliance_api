"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Devices_1 = __importDefault(require("../controllers/Devices"));
const router = (0, express_1.Router)();
router.post('/', Devices_1.default.index);
exports.default = router;
