import { model, Schema, Model, SchemaDefinition } from 'mongoose';
import { ICompliance } from '../types/ModelTypesCompliance';

// enum WeightValue {
//   MIN = 1,
//   MAX = 10
// }

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
          weight: this.weightTemplate(9),
          ...this.templateObjectFather(),
        },
        server: this.createServersSchema(),
        ha: this.createHASchema(),
        firewall: this.createFirewall(),
        inventory: this.createInventory(),
        security: this.createSecurity(),
        servicesOutsourcing: this.createServices(),
        totalScore: this.pointingTemplate(),
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
          weight: this.weightTemplate(8),
          ...this.templateDefault(),
        },
      ],
      weight: this.weightTemplate(8),
      ...this.templateObjectFather(),
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
      weight: this.weightTemplate(7),
      ...this.templateDefault(),
    };
  }

  // HA

  // Firewall
  createFirewall() {
    return {
      enabled: this.isEnable(),
      manufacturer: {
        type: [String],
        enum: [
          'Sophos',
          'Fortigate',
          'Mikrotik',
          'Cisco',
          'SonicWall',
          'PFsense',
          'None',
        ],
      },
      rules: { type: String, enum: ['Fraco', 'Ok', 'Bom', 'None'] },
      segmentation: this.booleanDefault(),
      vpn: { type: String, enum: ['Fraco', 'Ok', 'Bom', 'None'] },
      ips: this.booleanDefault(),
      backup: this.booleanDefault(),
      restoration: this.booleanDefault(),
      monitoring: this.booleanDefault(),
      weight: this.weightTemplate(9),
      ...this.templateDefault(),
    };
  }

  // Inventory
  createInventory() {
    return {
      enabled: this.isEnable(),
      devices: {
        type: [String],
        enum: [
          'Computadores',
          'Notebooks',
          'Servidores',
          'Impressoras',
          'Equipamentos',
        ],
      },
      contacts: { type: Boolean, default: false },
      agentInventory: {
        type: String,
        enum: ['None', 'Few', 'Medium', 'Many', 'All'],
        default: 'None',
      },
      weight: this.weightTemplate(7),
      ...this.templateDefault(),
    };
  }

  createSecurity() {
    return {
      antivirus: {
        type: String,
        enum: ['None', 'Few', 'Medium', 'Many', 'All'],
        default: 'None',
      },
      policyPassword: this.booleanDefault(),
      accessAuditing: this.booleanDefault(),
      gpo: {
        type: String,
        enum: ['None', 'Basic', 'Advanced'],
        default: 'None',
      },
      lgpd: this.booleanDefault(),
      weight: this.weightTemplate(8),
      ...this.templateDefault(),
    };
  }

  createServices() {
    return {
      email: this.booleanDefault(),
      fileserver: this.booleanDefault(),
      intranet: this.booleanDefault(),
      sites: this.booleanDefault(),
      erp: this.booleanDefault(),
      database: this.booleanDefault(),
      servers: this.booleanDefault(),
      weight: this.weightTemplate(6),
      ...this.templateDefault(),
    };
  }

  // Templates
  scoreTemplate() {
    return {
      type: Number,
      enum: [...Array(11).keys()],
      required: true,
      default: 0,
    };
  }
  weightTemplate(numb: number) {
    return {
      type: Number,
      default: Math.max(1, Math.min(10, numb)),
    };
  }
  isEnable() {
    return {
      type: Boolean,
      required: true,
      default: false,
    };
  }
  booleanDefault() {
    return {
      type: Boolean,
      required: true,
      default: false,
    };
  }
  pointingTemplate() {
    return {
      type: Number,
      default: 0,
    };
  }
  templateDefault(description: boolean = false) {
    return {
      score: this.scoreTemplate(),
      description: { type: String, required: false },
      points: this.pointingTemplate(),
    };
  }
  templateObjectFather(description: boolean = false) {
    return {
      description: { type: String, required: description },
      points: this.pointingTemplate(),
    };
  }
}

export default new Compliance().ComplianceModel;
