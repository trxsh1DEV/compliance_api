import { Schema, model, Document, Model } from 'mongoose';

// Interface representando a estrutura do documento DevicesManual
interface IDevicesManual extends Document {
  name: string;
  type?: string;
  capacity?: string;
}

// Definição da classe DevicesManualModel
class DevicesManualModel {
  public DevicesManualSchema: Schema<IDevicesManual>; // Uso da interface IDevicesManual para tipar o Schema
  public DevicesManualModel: Model<IDevicesManual>; // Uso da interface IDevicesManual para tipar o modelo

  constructor() {
    // Definição do Schema com a interface IDevicesManual
    this.DevicesManualSchema = new Schema<IDevicesManual>(
      {
        name: {
          type: String,
          required: true,
          validate: {
            validator: (value: string) => value.length > 4,
            message: 'O titulo deve ser uma string e conter mais de 4 letras',
          },
        },
        type: {
          type: String,
        },
        capacity: {
          type: String,
        },
      },
      { timestamps: true },
    );

    // Definição do modelo com a interface IDevicesManual
    this.DevicesManualModel = model<IDevicesManual>(
      'Devices',
      this.DevicesManualSchema,
    );
  }
}

// Exportação da instância do modelo tipada
export default new DevicesManualModel().DevicesManualModel;
