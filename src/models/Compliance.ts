import { model, Schema, Model, SchemaDefinition } from 'mongoose';
import { ICompliance } from '../types/ModelTypesCompliance';

class Compliance {
  public ComplianceSchema: Schema<ICompliance>;
  public ComplianceModel: Model<ICompliance>;

  constructor() {
    this.ComplianceSchema = new Schema<ICompliance>(
      {
        client: {
          type: Schema.Types.ObjectId,
          ref: 'Client',
          required: true,
        },
        backup: {
          frequency: this.createFrequencySchema(),
          restoration: this.createRestorationSchema(),
          policy: this.createPolicySchema(),
          storage: {
            local: this.createStorageSchema(),
            remote: this.createStorageSchema(),
          },
          description: { type: String },
        },
        server: this.createServersSchema(),
        ha: this.createHASchema(),
      },
      { timestamps: true },
    );

    this.ComplianceModel = model<ICompliance>(
      'Compliance',
      this.ComplianceSchema,
    );
  }

  // Funções de criação de esquemas tipadas
  createPolicySchema(): SchemaDefinition {
    return {
      enabled: this.isEnable(),
      score: this.scoreTemplate(),
      weight: this.weightTemplate(6),
    };
  }

  createFrequencySchema(): SchemaDefinition {
    return {
      enabled: this.isEnable(),
      level: { type: String, enum: ['low', 'medium', 'high'] },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(8),
    };
  }

  createStorageSchema(): SchemaDefinition {
    return {
      enabled: this.isEnable(),
      qtde: { type: Number, default: 0 },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(9),
    };
  }

  createRestorationSchema(): SchemaDefinition {
    return {
      enabled: this.isEnable(),
      score: this.scoreTemplate(),
      weight: this.weightTemplate(9),
    };
  }

  // Servers
  createServersSchema() {
    return {
      enabled: this.isEnable(),
      servers: [
        {
          serverName: { type: String },
          systemOperation: this.createSystemOperationSchema(),
          config: this.createConfigServerSchema(),
          monitoringPerformance: this.createMonitoringServer(),
          score: this.scoreTemplate(),
          weight: this.weightTemplate(8),
          description: { type: String },
        },
      ],
    };
  }

  createConfigServerSchema(): SchemaDefinition {
    return {
      level: { type: String, enum: ['low', 'medium', 'high'] },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(7),
    };
  }

  createMonitoringServer() {
    return {
      enabled: this.isEnable(),
      score: this.scoreTemplate(),
      weight: this.weightTemplate(7),
    };
  }

  createSystemOperationSchema() {
    return {
      patching: {
        type: String,
        enum: ['Regular', 'Irregular'],
      },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(3),
    };
  }
  // Servers

  // HA
  createHASchema() {
    return {
      enabled: this.isEnable(),
      solutions: {
        type: [String],
        enum: ['redundancy', 'load balance', 'failover', 'cluster', 'none'],
        default: ['none'],
      },
      tested: this.isEnable(),
      rto: {
        type: Number,
        validate: {
          validator: (value: number) => value >= 0,
          message:
            'O tempo deve ser um numero que será convertido em horas e não deve ser um numero negativo',
        },
      },
      score: this.scoreTemplate(),
      description: { type: String },
      weight: this.weightTemplate(7),
    };
  }

  // HA

  // Templates
  scoreTemplate() {
    return {
      type: Number,
      enum: [...Array(11).keys()],
      default: 0,
    };
  }
  weightTemplate(numb: number) {
    return {
      type: Number,
      default: numb,
    };
  }
  isEnable() {
    return {
      type: Boolean,
      required: true,
      default: false,
    };
  }
}

export default new Compliance().ComplianceModel;
