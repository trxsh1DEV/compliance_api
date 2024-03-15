// middlewareAuth.js
import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { sendErrorResponse } from "../services/utilities";
import ClienteService from "../services/clients/clientService";

export default function middlewareAuth(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return sendErrorResponse(res, ["Login required", "Tente fazer o login"], 401);
      }

      const tokenDataUser: any = decode(token || "");
      const { email, realm_access } = tokenDataUser;
      if (!email || !realm_access) return sendErrorResponse(res, ["Fail get data of Token"], 400);
      // const client = (await ClienteService.getUserEmail(email)) || "";
      // if (!client) return sendErrorResponse(res, ["Not Found"], 404);

      // Verificar se o usuário tem a função necessária
      if (!realm_access?.roles.includes(role)) {
        return sendErrorResponse(res, ["Unauthorized", "Sem permissão para acessar o recurso"], 403);
      }

      // @ts-ignore
      req.locals = {
        clientEmail: email,
        // clientId: client.id,
        clientRole: realm_access.roles
      };

      next();
    } catch (err) {
      return res.status(401).json({
        errors: ["Token expired or invalid"]
      });
    }
  };
}
