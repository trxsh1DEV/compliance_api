"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Definição da classe DevicesManualModel
class DevicesManualModel {
    constructor() {
        // Definição do Schema com a interface IDevicesManual
        this.DevicesManualSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                validate: {
                    validator: (value) => value.length > 4,
                    message: 'O titulo deve ser uma string e conter mais de 4 letras',
                },
            },
            type: {
                type: String,
            },
            capacity: {
                type: String,
            },
        }, { timestamps: true });
        // Definição do modelo com a interface IDevicesManual
        this.DevicesManualModel = (0, mongoose_1.model)('Devices', this.DevicesManualSchema);
    }
}
// Exportação da instância do modelo tipada
exports.default = new DevicesManualModel().DevicesManualModel;
