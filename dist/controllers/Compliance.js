"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Compliance_1 = __importDefault(require("../models/Compliance"));
const operations_1 = require("../services/Calc/operations");
const Clients_1 = __importDefault(require("../models/Clients"));
class ComplianceController {
    // async index(req: Request, res: Response) {
    //   const devices = await Compliance.find();
    //   try {
    //     return res.status(200).json(devices);
    //   } catch (err: any) {
    //     return res.status(err.response.status).json({
    //       errors: [err.message],
    //     });
    //   }
    // }
    async show(req, res) {
        try {
            const { id } = req.params;
            const { complianceId } = req.params;
            const compliance = await Compliance_1.default.findById(complianceId);
            if (!compliance)
                return res.status(404).json({ errors: ['Compliance não encontrado'] });
            const client = await Clients_1.default.findById(id);
            if (!client)
                return res.status(404).json({ errors: ['Cliente não encontrado'] });
            for (const item of client === null || client === void 0 ? void 0 : client.compliances) {
                if (item._id.equals(complianceId)) {
                    return res.status(200).json(compliance);
                }
            }
            return res.status(404).json({
                errors: ['Compliance não encontrado nos (Compliances) desse cliente'],
            });
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message],
            });
        }
    }
    async complianceCalculate(req, res) {
        try {
            const { id } = req.params;
            // Encontrar o Compliance pelo ID
            const compliance = await Compliance_1.default.findOne({ _id: id });
            if (!compliance) {
                return res.status(404).json({ errors: ['Compliance não encontrado'] });
            }
            const test = (0, operations_1.calculatePointing)(compliance, id);
            console.log(test);
            return res.status(200).json(compliance);
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message],
            });
        }
    }
    async latestCompliance(req, res) {
        const { id } = req.params;
        try {
            const client = await Clients_1.default.findById(id);
            if (!client) {
                return res.status(404).json({ errors: 'Client not found' });
            }
            const latestCompliance = await Compliance_1.default.findOne({ client: id }).sort({
                createdAt: -1,
            });
            if (!latestCompliance) {
                return res
                    .status(404)
                    .json({ errors: 'None compliance found for there client' });
            }
            return res.status(200).json(latestCompliance);
        }
        catch (err) {
            return res.status(500).json({ errors: err.message });
        }
    }
    async store(req, res) {
        try {
            const client = await Clients_1.default.findOne({ id: req.body.client });
            if (!client) {
                return res.status(404).json({ error: 'Client not found' });
            }
            // Crie novas Compliances com base nos dados da solicitação
            const compliances = await Compliance_1.default.create(req.body.data);
            // Certifique-se de que `compliances` é uma array
            const complianceIds = Array.isArray(compliances)
                ? compliances.map((compliance) => compliance._id)
                : [compliances._id];
            // Associe as Compliances ao campo 'compliances' do Client
            client.compliances.push(...complianceIds);
            await client.save();
            res.status(201).json(compliances);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new ComplianceController();
