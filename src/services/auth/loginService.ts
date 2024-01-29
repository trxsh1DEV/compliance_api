import Clients from "../../models/Clients";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const loginService = async (email: string) => {
  try {
    return Clients.findOne({ email: email }).select("+password");
  } catch (err: any) {
    console.error("Erro durante a consulta ao banco de dados:", err.message);
    throw err;
  }
};

const generateToken = async (id: string, isAdmin: boolean) => {
  try {
    const keyPath = process.env.TOKEN_SECRET_KEY;

    if (!keyPath) {
      throw new Error("Caminho da chave não especificado no ambiente.");
    }

    const keyPrivatePEM = await fs.readFile(keyPath, "utf-8");

    return jwt.sign({ id, isAdmin }, keyPrivatePEM, {
      algorithm: "RS256",
      expiresIn: process.env.TOKEN_EXPIRATION
    });
  } catch (err: any) {
    console.error("Erro ao gerar o token:", err.message);
    throw err;
  }
};

export { loginService, generateToken };
