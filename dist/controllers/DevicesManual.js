"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DevicesManual_1 = __importDefault(require("../models/DevicesManual"));
class DeviceController {
    async index(req, res) {
        const devices = await DevicesManual_1.default.find();
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
        const device = new DevicesManual_1.default(req.body);
        console.log(req.body);
        try {
            const saveDevice = await device.save();
            return res.status(200).json(saveDevice);
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [err.message],
            });
        }
    }
}
exports.default = new DeviceController();
