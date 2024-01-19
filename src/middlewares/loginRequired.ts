import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ClienteService from "../services/clients/clientService";
import { sendErrorResponse } from "../services/utilities";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return sendErrorResponse(res, "Login required", 401);

  if (!authorization.startsWith("Bearer "))
    return sendErrorResponse(res, "Invalid or missing Authorization header", 400);

  const [, token] = authorization.split(" ");

  try {
    const { id, isAdmin }: any = jwt.verify(token, process.env.TOKEN_SECRET || "");
    const client = await ClienteService.show(id);

    if (!client) sendErrorResponse(res, "Not found", 404);

    req.body.clientId = id;
    req.body.clientIsAdmin = isAdmin;
    return next();
  } catch (err) {
    return res.status(403).json({
      errors: ["Token expired or invalid"]
    });
  }
};
