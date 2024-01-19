"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const complianceService_1 = __importDefault(require("../services/compliance/complianceService"));
const clientService_1 = __importDefault(require("../services/clients/clientService"));
const operations_1 = require("../services/calc/operations");
const infraDefault_1 = require("../services/data/infraDefault");
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
            const { complianceId } = req.params;
            // Se no body da requisição não especificar um cliente por padrão vou pegar o clientID q está no próprio token do user logado
            const id = req.body.client || req.body.clientId;
            const client = await clientService_1.default.show(id);
            if (!client)
                return res.status(404).json({ errors: ["Client Not Found"] });
            if (!complianceId) {
                const getLatestCompliance = await complianceService_1.default.latest(id);
                if (getLatestCompliance)
                    return res.status(200).json(getLatestCompliance);
                return res.status(200).json(infraDefault_1.infraDefault);
            }
            for (const item of client === null || client === void 0 ? void 0 : client.compliances) {
                if (item._id.equals(complianceId)) {
                    const compliance = await complianceService_1.default.show(complianceId);
                    if (!compliance)
                        return res.status(404).json({ errors: ["Compliance Not Found"] });
                    return res.status(200).json(compliance);
                }
            }
            return res.status(404).json({
                errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
            });
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
    async latestCompliance(req, res) {
        try {
            const id = req.body.client || req.body.clientId;
            const getLatestCompliance = await complianceService_1.default.latest(id);
            if (getLatestCompliance)
                return res.status(200).json(getLatestCompliance);
            return res.status(200).json(infraDefault_1.infraDefault);
        }
        catch (err) {
            return res.status(500).json({ errors: err.message });
        }
    }
    async complianceCalculate(req, res) {
        try {
            const { id } = req.params;
            // Encontrar o Compliance pelo ID
            const compliance = await complianceService_1.default.show(id);
            if (!compliance) {
                return res.status(404).json({ errors: ["Compliance não encontrado"] });
            }
            await (0, operations_1.calculatePointing)(compliance, id);
            return res.status(200).json(compliance);
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
    async store(req, res) {
        try {
            const client = await clientService_1.default.show(req.body.data.client);
            if (!client) {
                return res.status(404).json({ errors: ["Client not found"] });
            }
            const compliances = await complianceService_1.default.store(req.body.data);
            // Certifique-se de que `compliances` é uma array
            const complianceIds = Array.isArray(compliances)
                ? compliances.map((compliance) => compliance._id)
                : [compliances._id];
            // Associe as Compliances ao campo 'compliances' do Client
            client.compliances.push(...complianceIds);
            await client.save({ validateModifiedOnly: true });
            res.status(201).json(compliances);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json({ errors: [err.message] });
        }
    }
    async update(req, res) {
        try {
            const complianceId = req.params.id;
            const { client: id } = req.body;
            if (!(0, mongoose_1.isValidObjectId)(id) || !(0, mongoose_1.isValidObjectId)(complianceId))
                return res.status(400).json({ errors: "ID inválido" });
            const client = await clientService_1.default.show(id);
            if (!client)
                return res.status(404).json({ errors: ["Cliente não encontrado"] });
            for (const item of client === null || client === void 0 ? void 0 : client.compliances) {
                if (item._id.equals(complianceId)) {
                    const dataInfra = req.body;
                    if (!dataInfra.server &&
                        !dataInfra.ha &&
                        !dataInfra.backup &&
                        !dataInfra.firewall &&
                        !dataInfra.security &&
                        !dataInfra.inventory &&
                        !dataInfra.servicesOutsourcing) {
                        return res.status(400).json({
                            errors: ["Submit at least one for update"]
                        });
                    }
                    await complianceService_1.default.update(dataInfra, complianceId);
                    return res.status(200).json({ message: "Compliance updated successfully" });
                }
            }
            return res.status(404).json({
                errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
            });
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const { complianceId } = req.body;
            const client = await clientService_1.default.show(id);
            if (!client)
                return res.status(404).json({ errors: ["Client Not Found"] });
            for (const item of client === null || client === void 0 ? void 0 : client.compliances) {
                if (item._id.equals(complianceId)) {
                    const compliance = await complianceService_1.default.show(complianceId);
                    if (!compliance)
                        return res.status(404).json({ errors: ["Compliance Not Found or Removed"] });
                    const removeIndex = client.compliances.findIndex((item) => item._id.equals(complianceId));
                    if (removeIndex !== -1) {
                        client.compliances.splice(removeIndex, 1);
                        await client.save({ validateModifiedOnly: true });
                    }
                    return res.status(200).json(compliance);
                }
            }
            return res.status(404).json({
                errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
            });
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
}
exports.default = new ComplianceController();
