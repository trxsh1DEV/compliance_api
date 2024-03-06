import { Request, Response } from "express";

class AuthController {
  async test(req: Request, res: Response) {
    try {
      // @ts-ignore
      const { clientEmail, clientId } = req.locals;
      console.log(clientEmail, clientId);
      return res.json({ stats: "ok" });
    } catch (err: any) {
      return res.json(err.message);
    }
  }
}

export default new AuthController();
