"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    // async login(req: Request, res: Response) {
    //   try {
    //     const { email, password } = req.body;
    //     const client = (await loginService(email)) || "";
    //     const passwordIsValid = bcrypt.compareSync(password, client && client.password);
    //     if (!passwordIsValid || client == "") return res.status(404).json({ errors: ["Wrong credentials"] });
    //     if (!client || typeof client.isAdmin !== "boolean") {
    //       return res.status(404).json({ errors: ["Wrong credentials"] });
    //     }
    //     const token = await generateToken(client.id, client.isAdmin);
    //     return res.status(200).json({ token });
    //   } catch (err: any) {
    //     return res.status(500).json({
    //       errors: [err.message]
    //     });
    //   }
    // }
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
