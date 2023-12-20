import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Clients from '../models/Clients';
import ClienteService from '../services/clients/clientService';

interface typeId {
  id: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login is required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET || '');
    const client = await ClienteService.show(data.id);

    if (!client) {
      return res.status(401).json({
        errors: ['Client invalid'],
      });
    }

    req.body.clientId = data.id;
    return next();
  } catch (err) {
    return res.status(403).json({
      errors: ['Token expired or invalid'],
    });
  }
};
