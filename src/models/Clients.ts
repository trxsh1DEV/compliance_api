import { Schema, model, Document, Types, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IClients extends Document {
  name: string;
  social_reason?: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin?: boolean;
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
          validate: {
            validator: (value: string) => value.length < 8 && value.length > 30,
            message: 'A senha deve ter entre 8 e 30 caracteres',
          },
        },
        avatar: {
          type: String,
          default: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
        },
        isAdmin: {
          type: Boolean,
          default: false,
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
    this.ClientsSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();

      try {
        this.password = await bcrypt.hash(this.password, 8);
        next();
      } catch (err: any) {
        return next(err);
      }
    });

    this.ClientsModel = model<IClients>('Clients', this.ClientsSchema);
  }
}

export default new Clients().ClientsModel;
