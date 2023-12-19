"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Clients {
    constructor() {
        this.ClientsSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
            },
            social_reason: {
                type: String,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
                select: false,
            },
            avatar: {
                type: String,
                required: true,
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
