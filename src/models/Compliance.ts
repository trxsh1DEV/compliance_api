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
          policy: this.createPolicySchema(),
          frequency: this.createFrequencySchema(),
          storage: {
            local: this.createStorageSchema(),
            remote: this.createStorageSchema(),
          },
          restoration: this.createRestorationSchema(),
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
      enabled: { type: Boolean, required: true, default: false },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(6),
    };
  }

  createFrequencySchema(): SchemaDefinition {
    return {
      value: { type: Number, default: 0, required: true },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(8),
    };
  }

  createStorageSchema(): SchemaDefinition {
    return {
      enabled: { type: Boolean, required: true },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(9),
    };
  }

  createRestorationSchema(): SchemaDefinition {
    return {
      enabled: { type: Boolean, required: true, default: false },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(9),
    };
  }

  // Servers
  createServersSchema() {
    return {
      enabled: { type: Boolean, required: true, default: false },
      servers: [
        {
          server_name: { type: String, required: true },
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
      value: { type: String, enum: ['low', 'medium', 'high'], required: true },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(7),
    };
  }

  createMonitoringServer() {
    return {
      enabled: { type: Boolean, required: true },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(7),
    };
  }

  createSystemOperationSchema() {
    return {
      patching: {
        type: String,
        enum: ['Regular', 'Irregular'],
        required: true,
      },
      score: this.scoreTemplate(),
      weight: this.weightTemplate(3),
    };
  }
  // Servers

  // HA
  createHASchema() {
    return {
      enabled: { type: Boolean, required: true, default: false },
      solutions: {
        type: [String],
        enum: ['redundancy', 'load balance', 'failover', 'cluster', 'none'],
        default: ['none'],
      },
      tested: { type: Boolean, required: true },
      rto: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value >= 0,
          message:
            'O tempo deve ser um numero que será convertido em horas e não deve ser um numero negativo',
        },
      },
      score: this.scoreTemplate(),
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
}

export default new Compliance().ComplianceModel;
