"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Definição da classe Clients
class Clients {
    constructor() {
        // Definição do Schema com a interface IClients
        this.ClientsSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
            },
            social_reason: {
                type: String,
            },
            compliances: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Compliance',
                },
            ],
        }, { timestamps: true });
        this.ClientsModel = (0, mongoose_1.model)('Clients', this.ClientsSchema);
    }
}
exports.default = new Clients().ClientsModel;
