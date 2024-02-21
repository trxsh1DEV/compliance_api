import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ClienteService from "../services/clients/clientService";
import { sendErrorResponse } from "../services/utilities";
import fs from "fs/promises";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return sendErrorResponse(res, "Login required", 401);

  if (!authorization.startsWith("Bearer "))
    return sendErrorResponse(res, "Invalid or missing Authorization header", 400);

  const [, token] = authorization.split(" ");

  try {
    const keyPath = process.env.TOKEN_SECRET_KEY;

    if (!keyPath) {
      throw new Error("Caminho da chave não especificado no ambiente.");
    }

    const keyPrivatePEM = await fs.readFile(keyPath, "utf-8");

    const { id, isAdmin }: any = jwt.verify(token, keyPrivatePEM || "");
    const client = await ClienteService.show(id);

    if (!client) sendErrorResponse(res, "Not found", 404);

    req.body.clientId = id;
    req.body.clientIsAdmin = isAdmin;
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ["Token expired or invalid"]
    });
  }
};
