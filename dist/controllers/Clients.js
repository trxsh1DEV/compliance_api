"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientService_1 = __importDefault(require("../services/clients/clientService"));
const mongoose_1 = require("mongoose");
const clientService_2 = __importDefault(require("../services/clients/clientService"));
class ClientsController {
    async findAllClients(req, res) {
        try {
            const clients = await clientService_1.default.findAll();
            if (clients.length <= 0) {
                return res.status(404).json({
                    errors: ["There are no registered users"]
                });
            }
            return res.status(200).json(clients);
        }
        catch (err) {
            return res.status(404).json({
                errors: ["There are no registered users"]
            });
        }
    }
    async show(req, res) {
        try {
            let { id } = req.params;
            if (!id) {
                // Aqui estou pegando o id q está no token e eu seto somente no middlewareAuth
                id = await clientService_2.default.getUserEmail(req.locals.clientEmail);
            }
            if (!(0, mongoose_1.isValidObjectId)(id))
                return res.status(400).json({ errors: "ID inválido" });
            const client = await clientService_1.default.show(id);
            if (!client)
                return res.status(404).json({
                    errors: "Client not found"
                });
            return res.status(200).json(client);
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message]
            });
        }
    }
    async store(req, res) {
        try {
            const { name, email, isAdmin } = req.body;
            if (!name || !email || typeof isAdmin !== "boolean") {
                return res.status(400).json({
                    errors: ["Submit all fields for registration"]
                });
            }
            const newClient = await clientService_1.default.create(req.body);
            if (!newClient)
                res.status(404).json({ errors: "Error creating client" });
            return res.status(201).json("User created successfully");
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
    async update(req, res) {
        const { name, social_reason, email, avatar, isAdmin, contact, cnpj, criticalProblems, typeContract, feedback } = req.body;
        let { id } = req.params;
        if (!id) {
            id = await clientService_2.default.getUserEmail(req.locals.clientEmail);
        }
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).json({ errors: "ID inválido" });
        if (!name &&
            !email &&
            !avatar &&
            !social_reason &&
            !contact &&
            !cnpj &&
            !criticalProblems &&
            feedback <= 0 &&
            typeof isAdmin !== "boolean" &&
            typeContract !== "Fixo" &&
            typeContract !== "Avulso") {
            return res.status(400).json({
                errors: "Submit at least one for update"
            });
        }
        try {
            const clientData = {
                id,
                name,
                social_reason,
                email,
                avatar,
                isAdmin: !!isAdmin,
                contact,
                cnpj,
                criticalProblems,
                feedback,
                typeContract
            };
            const updatedClient = await clientService_1.default.update(clientData);
            if (!updatedClient) {
                return res.status(404).json({
                    errors: "Cliente não encontrado"
                });
            }
            res.status(200).json({ message: `Client updated successfully` });
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
            if (!(0, mongoose_1.isValidObjectId)(id))
                return res.status(400).json({ errors: ["ID inválido"] });
            const client = await clientService_1.default.delete(id);
            if (!client)
                return res.status(404).json({
                    errors: "Client not found"
                });
            return res.status(200).json({ message: "Client removed successfully" });
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message]
            });
        }
    }
}
exports.default = new ClientsController();
