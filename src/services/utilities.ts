import { Response } from 'express';

export const sendErrorResponse = (
  res: Response,
  message: string,
  errCode: number,
) => {
  return res.status(errCode).json({
    errors: [message],
  });
};
