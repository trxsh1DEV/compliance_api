import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ClienteService from '../services/clients/clientService';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login is required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET || '');
    const { id, isAdmin } = tokenData;
    const client = await ClienteService.show(id);

    if (!client) {
      return res.status(401).json({
        errors: ['Token Client invalid'],
      });
    }

    req.body.clientId = id;
    req.body.isAdmin = isAdmin;
    req.body.isOwnProfile = true;

    if (!client.isAdmin) {
      // Se não for admin, verifique se está acessando seu próprio perfil || se ele n está mandando no body.data o seu próprio id do token, oq quer dizer q ele é o proprietario da conta
      req.body.isOwnProfile =
        req.params.id === id || id === req.body.data.client;
      if (!req.body.isOwnProfile) {
        return res.status(401).json({ errors: ['Unauthorized'] });
      }
    }

    return next();
  } catch (err) {
    return res.status(403).json({
      errors: ['Token expired or invalid'],
    });
  }
};
