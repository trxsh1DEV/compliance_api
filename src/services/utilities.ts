import { Response } from "express";

export const sendErrorResponse = (res: Response, message: string, errCode: number) => {
  return res.status(errCode).json({
    errors: [message]
  });
};

export const random = Math.floor(Math.random() * 10000 + 10000);
