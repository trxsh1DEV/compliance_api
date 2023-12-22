import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, loginService } from '../services/auth/loginService';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const client = (await loginService(email)) || '';

      const passwordIsValid = bcrypt.compareSync(
        password,
        client && client.password,
      );
      if (!passwordIsValid || client == '')
        return res.status(404).json({ errors: ['Wrong credentials'] });

      const token = generateToken(client.id, client.isAdmin);

      return res.status(200).json({ token });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }
}

export default new AuthController();
