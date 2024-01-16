import { Schema, model, Document, Model, Types } from "mongoose";
import urlConfig from "../config/urlConfig";

export interface IAvatar extends Document {
  originalname: string;
  filename: string;
  clientId: Types.ObjectId;
  uploadedAt: Date;

  // Adicione o campo virtual à interface
  url: string;
}

class Avatar {
  public AvatarSchema: Schema<IAvatar>;
  public AvatarModel: Model<IAvatar>;

  constructor() {
    this.AvatarSchema = new Schema<IAvatar>(
      {
        originalname: {
          type: String,
          validate: {
            validator: (value: string) => {
              return value.length >= 1 && value.length <= 80;
            },
            message: "Campo precisa ser preenchido com no mínimo 3 e no máximo 80 caracteres."
          }
        },
        filename: {
          type: String,
          validate: {
            validator: (value: string) => {
              return value.length >= 3 && value.length <= 80;
            },
            message: "Campo precisa ser preenchido com no mínimo 3 e no máximo 80 caracteres."
          }
        },
        clientId: { type: Schema.Types.ObjectId, ref: "Clients" },
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      },
      { timestamps: true }
    );

    // Adicionando um campo virtual para a URL
    this.AvatarSchema.virtual("url").get(function (this: IAvatar) {
      return `${urlConfig.url}/images/${this.filename}`;
    });

    this.AvatarModel = model<IAvatar>("Avatar", this.AvatarSchema);
  }
}

export default new Avatar().AvatarModel;
