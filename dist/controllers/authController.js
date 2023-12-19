"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    async login(req, res) {
        try {
            return res.status(200).json({ ok: 'true' });
        }
        catch (err) {
            return res.status(err.response.status).json({
                errors: [err.message],
            });
        }
    }
}
exports.default = new AuthController();
