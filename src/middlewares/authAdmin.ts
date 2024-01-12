import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ClienteService from "../services/clients/clientService";
import { isValidObjectId } from "mongoose";
import { sendErrorResponse } from "../services/utilities";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const paramsId = req.params.id;

  if (!isValidObjectId(paramsId) && paramsId !== undefined) {
    return sendErrorResponse(res, "ID inválido", 400);
  }

  if (!authorization) {
    return sendErrorResponse(res, "Login required", 401);
  }
  if (!authorization.startsWith("Bearer ")) {
    return sendErrorResponse(res, "Invalid or missing Authorization header", 400);
  }

  const [, token] = authorization.split(" ");

  try {
    const { id, isAdmin }: any = jwt.verify(token, process.env.TOKEN_SECRET || "");

    req.body.clientId = id;
    req.body.isAdmin = isAdmin;

    // Se não for admin, verifique se está acessando seu próprio perfil || se ele n está mandando no body.data o seu próprio id do token, oq quer dizer q ele é o proprietario da conta
    if (!isAdmin) {
      return sendErrorResponse(res, "Unauthorized", 401);
    }

    return next();
  } catch (err) {
    return sendErrorResponse(res, "Token invalid or Expired", 403);
  }
};
