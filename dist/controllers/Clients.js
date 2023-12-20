"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Compliance from '../models/Compliance';
const clientService_1 = __importDefault(require("../services/clients/clientService"));
class ClientsController {
    async findAllClients(req, res) {
        try {
            const clients = await clientService_1.default.findAll();
            if (clients.length <= 0) {
                return res.status(404).json({
                    errors: 'There are no registered users',
                });
            }
            console.log(req.body.clientId);
            return res.status(200).json(clients);
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [err.message],
            });
        }
    }
    async show(req, res) {
        try {
            const client = req.response;
            return res.status(200).json(client);
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message],
            });
        }
    }
    async store(req, res) {
        try {
            const { name, social_reason, email, password, avatar } = req.body;
            if (!name || !email || !password || !avatar) {
                return res.status(400).json({
                    errors: 'Submit all fields for registration',
                });
            }
            const newClient = await clientService_1.default.create(req.body);
            if (!newClient)
                res.status(404).json({ errors: 'Error creating client' });
            return res
                .status(201)
                .json({ id: newClient._id, name, email, avatar, social_reason });
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message],
            });
        }
    }
    async update(req, res) {
        const { name, social_reason, email, password, avatar } = req.body;
        const { id } = req;
        if (!name && !email && !password && !avatar && !social_reason) {
            return res.status(400).json({
                errors: 'Submit at least one for update',
            });
        }
        const clientData = { id, name, social_reason, email, password, avatar };
        await clientService_1.default.update(clientData);
        res.status(200).json({ message: 'Client updated successfully' });
    }
}
exports.default = new ClientsController();
