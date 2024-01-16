import multer, { MulterError } from "multer";
import { extname, resolve } from "path";
import { Request } from "express";
import { random } from "../services/utilities";

const FIVE_MB = 5 * 1024 * 1024;

const multerConfig = {
  limits: {
    fileSize: FIVE_MB,
    fieldNameSize: 300
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
    }
  },
  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const newFilename = `${Date.now()}_${random}${extname(file.originalname)}`;
      cb(null, newFilename);
    }
  })
};

export default multerConfig;
