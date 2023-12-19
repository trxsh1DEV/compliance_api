import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      return res.status(200).json({ ok: 'true' });
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }
}

export default new AuthController();
