"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clients_1 = __importDefault(require("../models/Clients"));
class ClientsController {
    async index(req, res) {
        const clients = await Clients_1.default.find();
        try {
            return res.status(200).json(clients);
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [err.message],
            });
        }
    }
    async show(req, res) {
        const { id } = req.params;
        try {
            const client = await Clients_1.default.findById(id);
            if (!client) {
                return res.status(404).json({ errors: 'Client not found' });
            }
            res.status(200).json(client);
        }
        catch (err) {
            res.status(500).json({ errors: err.message });
        }
    }
    async store(req, res) {
        try {
            // Criar um novo cliente
            const newClient = new Clients_1.default(req.body);
            const savedClient = await newClient.save();
            return res.status(201).json(savedClient);
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message],
            });
        }
    }
}
exports.default = new ClientsController();
