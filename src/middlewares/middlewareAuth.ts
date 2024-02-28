import { NextFunction, Request, Response } from "express";
// import jwt, { JwtHeader, JwtPayload, VerifyCallback, VerifyErrors } from "jsonwebtoken";
// import jwksClient from "jwks-rsa";
import { sendErrorResponse } from "../services/utilities";
import ClientService from "../services/clients/clientService";

// function getKey(header: JwtHeader, callback: jwt.SigningKeyCallback): void {
//   const jwksUri = "http://localhost:8080/realms/Demo-Realm/protocol/openid-connect/certs" || "";
//   const client = jwksClient({ jwksUri, timeout: 30000 });

//   client
//     .getSigningKey(header.kid)
//     .then((key) => callback(null, key.getPublicKey()))
//     .catch(callback);
// }

// // Função para verificar e decodificar o token JWT
// export function verify(token: string) {
//   return new Promise((resolve, reject) => {
//     const verifyCallback: VerifyCallback<JwtPayload | string> = (error: VerifyErrors | null, decoded: any) => {
//       if (error) {
//         return reject(error);
//       }
//       const { user_id, email } = decoded;
//       return resolve({ user_id, email });
//     };

//     jwt.verify(token, getKey, verifyCallback);
//   });
// }

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    // console.log("oi", req?.kauth);
    // @ts-ignore
    const tokenDataUser = req?.kauth?.grant?.access_token?.content || req.headers?.authorization?.split(" ")[1];

    if (!tokenDataUser) {
      return sendErrorResponse(res, "Login required", 401);
    }
    const { email, realm_access } = tokenDataUser;
    const client = (await ClientService.getUserEmail(email)) || "";
    if (!client) return sendErrorResponse(res, "Not Found", 404);

    // @ts-ignore
    req.locals = {
      clientId: client.id,
      clientEmail: email,
      clientRole: realm_access.roles
    };
    // @ts-ignore
    // console.log(req.locals);
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ["Token expired or invalid"]
    });
  }
};
