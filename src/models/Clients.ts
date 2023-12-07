import { Schema, model, Document, Types, Model } from 'mongoose';

// Interface representando a estrutura do documento Clients
interface IClients extends Document {
  name: string;
  social_reason?: string;
  complianceId: Types.ObjectId;
}

// Definição da classe Clients
class Clients {
  public ClientsSchema: Schema<IClients>; // Uso da interface IClients para tipar o Schema
  public ClientsModel: Model<IClients>; // Uso da interface IClients para tipar o modelo

  constructor() {
    // Definição do Schema com a interface IClients
    this.ClientsSchema = new Schema<IClients>(
      {
        name: {
          type: String,
          required: true,
        },
        social_reason: {
          type: String,
        },
        complianceId: {
          type: Schema.Types.ObjectId,
          ref: 'Compliance',
        },
      },
      { timestamps: true },
    );

    this.ClientsModel = model<IClients>('Clients', this.ClientsSchema);
  }
}

export default new Clients().ClientsModel;
