import { Schema, model, Document, Types, Model } from 'mongoose';

interface IClients extends Document {
  name: string;
  social_reason?: string;
  email: string;
  password: string;
  avatar: string;
  compliances: Types.ObjectId[];
}

class Clients {
  public ClientsSchema: Schema<IClients>;
  public ClientsModel: Model<IClients>;

  constructor() {
    this.ClientsSchema = new Schema<IClients>(
      {
        name: {
          type: String,
          required: true,
        },
        social_reason: {
          type: String,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
          select: false,
        },
        avatar: {
          type: String,
          required: true,
        },
        compliances: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Compliance',
          },
        ],
      },
      { timestamps: true },
    );

    this.ClientsModel = model<IClients>('Clients', this.ClientsSchema);
  }
}

export default new Clients().ClientsModel;
