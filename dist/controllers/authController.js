"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    async test(req, res) {
        try {
            // @ts-ignore
            // const clientId = await ClienteService.getUserEmail(req.locals.clientEmail)
            return res.json({ stats: "ok" });
        }
        catch (err) {
            return res.json(err.message);
        }
    }
}
exports.default = new AuthController();
