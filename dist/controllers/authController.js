"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    async test(req, res) {
        try {
            // @ts-ignore
            const { clientEmail, clientId } = req.locals;
            console.log(clientEmail, clientId);
            return res.json({ stats: "ok" });
        }
        catch (err) {
            return res.json(err.message);
        }
    }
}
exports.default = new AuthController();
