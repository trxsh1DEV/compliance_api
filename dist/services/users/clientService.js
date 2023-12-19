"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clients_1 = __importDefault(require("../../models/Clients"));
class ClienteService {
    static create(body) {
        return Clients_1.default.create(body);
    }
    static findAll() {
        return Clients_1.default.find();
    }
    static show(id) {
        return Clients_1.default.findById(id);
    }
    static update(clientData) {
        const { avatar, email, id, name, password, social_reason } = clientData;
        return Clients_1.default.findOneAndUpdate({ _id: id }, {
            avatar,
            email,
            name,
            password,
            social_reason,
        });
    }
}
exports.default = ClienteService;
