import { Request, Response } from "express";
import ClienteService from "../services/clients/clientService";

class AuthController {
  async test(req: Request, res: Response) {
    try {
      // @ts-ignore
      // const clientId = await ClienteService.getUserEmail(req.locals.clientEmail)
      return res.json({ stats: "ok" });
    } catch (err: any) {
      return res.json(err.message);
    }
  }
}

export default new AuthController();
