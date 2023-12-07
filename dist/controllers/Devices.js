"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class DeviceController {
    async index(req, res) {
        console.log(req.body);
        const url = 'https://apiintegracao.milvus.com.br/api/dispositivos/listagem';
        const token = '4ftDeuY2fGACB2JmjChNjF8AI8lDChLZriLLuVfFzgA04IJu54phOXimw95Vi4Hz6mGjxnTuwdcCPTfPUnstIImThfFlOwRM0MKtt';
        const config = {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        };
        try {
            const result = await axios_1.default.post(url, req.body, config);
            return res.status(200).json(result.data);
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [
                    'Falha ao buscar dispositivos',
                    err.message,
                    err.response.status,
                    err.data && err.data,
                ],
            });
        }
    }
}
exports.default = new DeviceController();
