import { isValidObjectId } from 'mongoose';
import ClienteService from '../services/clients/clientService';
import { NextFunction, Request, Response } from 'express';

interface responseType {
  id: string;
  response: any;
}

export const validId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ errors: 'ID inválido' });

  next();
};

export const validResponse = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const response = await ClienteService.show(id);

  if (!response)
    return res.status(404).json({
      errors: 'Client not found',
    });

  req.id = id;
  req.response = response;

  next();
};
