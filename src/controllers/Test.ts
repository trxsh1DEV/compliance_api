import { Request, Response } from "express";

class AvatarController {
  static async store(req: Request, res: Response) {
    try {
      const dataReceived = req.body;
      console.log(dataReceived);

      return res.json(dataReceived);
    } catch (err) {
      console.log(err);
    }
  }
}

export default AvatarController;
