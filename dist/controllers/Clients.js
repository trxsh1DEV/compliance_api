"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Compliance from '../models/Compliance';
const clientService_1 = __importDefault(require("../services/clients/clientService"));
const mongoose_1 = require("mongoose");
class ClientsController {
    async findAllClients(req, res) {
        try {
            const clients = await clientService_1.default.findAll();
            if (clients.length <= 0) {
                return res.status(404).json({
                    errors: ['There are no registered users'],
                });
            }
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
            const { id } = req.params;
            // const { isOwnProfile, isAdmin } = req.body;
            if (!(0, mongoose_1.isValidObjectId)(id))
                return res.status(400).json({ errors: ['ID inválido'] });
            const client = await clientService_1.default.show(id);
            if (!client)
                return res.status(404).json({
                    errors: 'Client not found',
                });
            // if (!isAdmin && !isOwnProfile)
            //   res.status(401).json({ errors: ['Unauthorized'] });
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
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    errors: ['Submit all fields for registration'],
                });
            }
            const newClient = await clientService_1.default.create(req.body);
            if (!newClient)
                res.status(404).json({ errors: 'Error creating client' });
            return res.status(201).json('User created successfully');
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message],
            });
        }
    }
    async update(req, res) {
        const { name, social_reason, email, password, avatar, isAdmin } = req.body;
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).json({ errors: 'ID inválido' });
        if (!name &&
            !email &&
            !password &&
            !avatar &&
            !social_reason &&
            typeof isAdmin !== 'boolean') {
            return res.status(400).json({
                errors: 'Submit at least one for update',
            });
        }
        try {
            const clientData = {
                id,
                name,
                social_reason,
                email,
                password,
                avatar,
                isAdmin,
            };
            const updatedClient = await clientService_1.default.update(clientData);
            if (!updatedClient) {
                return res.status(404).json({
                    errors: 'Cliente não encontrado',
                });
            }
            // res.status(200).json({ message: `Client updated successfully` });
            res.status(200).json(updatedClient);
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message],
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!(0, mongoose_1.isValidObjectId)(id))
                return res.status(400).json({ errors: ['ID inválido'] });
            const client = await clientService_1.default.delete(id);
            if (!client)
                return res.status(404).json({
                    errors: 'Client not found',
                });
            return res.status(200).json({ message: 'Client removed successfully' });
        }
        catch (err) {
            return res.status(400).json({
                errors: [err.message],
            });
        }
    }
}
exports.default = new ClientsController();
