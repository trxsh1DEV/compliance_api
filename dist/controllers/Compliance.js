"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Compliance_1 = __importDefault(require("../models/Compliance"));
const operations_1 = require("../services/operations");
class ComplianceController {
    async index(req, res) {
        const devices = await Compliance_1.default.find();
        try {
            return res.status(200).json(devices);
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [err.message],
            });
        }
    }
    async store(req, res) {
        const compliance = new Compliance_1.default(req.body);
        try {
            const saveCompliance = await compliance.save();
            return res.status(200).json(saveCompliance);
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message],
            });
        }
    }
    async complianceCalculate(req, res) {
        try {
            const complianceId = req.params.id;
            // Encontrar o Compliance pelo ID
            const compliance = await Compliance_1.default.findOne({
                complianceId: complianceId,
            });
            if (!compliance) {
                return res.status(404).json({ errors: ['Compliance não encontrado'] });
            }
            const complianceCurrent = (0, operations_1.calculatePointing)(compliance);
            console.log(typeof complianceCurrent);
            return res.status(200).json(compliance);
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message],
            });
        }
    }
}
exports.default = new ComplianceController();
