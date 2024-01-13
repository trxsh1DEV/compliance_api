"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginService_1 = require("../services/auth/loginService");
class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const client = (await (0, loginService_1.loginService)(email)) || "";
            const passwordIsValid = bcrypt_1.default.compareSync(password, client && client.password);
            if (!passwordIsValid || client == "")
                return res.status(404).json({ errors: ["Wrong credentials"] });
            if (!client || typeof client.isAdmin !== "boolean") {
                return res.status(404).json({ errors: ["Wrong credentials"] });
            }
            const token = (0, loginService_1.generateToken)(client.id, client.isAdmin);
            // res.cookie("token", token, { httpOnly: true, maxAge: ONEDAY_MILISSECONDS });
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(500).json({
                errors: [err.message]
            });
        }
    }
}
exports.default = new AuthController();
