import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import Avatar, { IAvatar } from "../models/Avatar"; // Certifique-se de utilizar o caminho real do seu modelo
import multerConfig from "../config/multer";
import Clients from "../models/Clients";

const upload = multer(multerConfig).single("avatar");

class AvatarController {
  static async store(req: Request, res: Response) {
    const { clientId } = req.body;
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code]
        });
      }

      try {
        const { originalname, filename } = req.file as Express.Multer.File;

        // Criar a foto usando o modelo Avatar
        const photo = await Avatar.create({ originalname, filename, clientId });

        // Encontrar o avatar (opcional, dependendo dos requisitos)
        const photoWithUrl = photo.toObject({ getters: true }) as IAvatar;
        // Atualizar o campo avatar no modelo Clients
        await Clients.findByIdAndUpdate(clientId, { avatar: photoWithUrl.url });

        return res.json(photoWithUrl);
      } catch (err) {
        if (err instanceof MulterError) {
          return res.status(400).json({
            errors: [err.code]
          });
        }

        return res.status(400).json({
          errors: ["Erro ao processar a requisição."]
        });
      }
    });
  }
}

export default AvatarController;
