"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// enum WeightValue {
//   MIN = 1,
//   MAX = 10
// }
class Compliance {
    constructor() {
        this.ComplianceSchema = new mongoose_1.Schema({
            client: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Client",
                required: true
            },
            backup: this.createBackupSchema(),
            server: this.createServersSchema(),
            ha: this.createHASchema(),
            firewall: this.createFirewall(),
            inventory: this.createInventory(),
            security: this.createSecurity(),
            servicesOutsourcing: this.createServices(),
            totalScore: this.pointingTemplate()
        }, { timestamps: true });
        this.ComplianceModel = (0, mongoose_1.model)("Compliance", this.ComplianceSchema);
    }
    createBackupSchema() {
        return Object.assign({ enabled: this.isEnable(), frequency: this.createFrequencySchema(), restoration: this.createRestorationSchema(), policy: this.createPolicySchema(), storage: {
                local: this.createStorageSchema(),
                remote: this.createStorageSchema()
            }, weight: this.weightTemplate(9) }, this.templateObjectFather());
    }
    // Funções de criação de esquemas tipadas
    createPolicySchema() {
        return {
            enabled: this.isEnable(),
            score: this.scoreTemplate(),
            weight: this.weightTemplate(6)
        };
    }
    createFrequencySchema() {
        return {
            enabled: this.isEnable(),
            level: { type: String, enum: ["low", "medium", "high"] },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(8)
        };
    }
    createStorageSchema() {
        return {
            enabled: this.isEnable(),
            qtde: { type: Number, default: 0 },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(9)
        };
    }
    createRestorationSchema() {
        return {
            enabled: this.isEnable(),
            score: this.scoreTemplate(),
            weight: this.weightTemplate(9)
        };
    }
    // Servers
    createServersSchema() {
        return Object.assign({ enabled: this.isEnable(), servers: [
                Object.assign({ serverName: { type: String }, systemOperation: this.createSystemOperationSchema(), config: this.createConfigServerSchema(), monitoringPerformance: this.createMonitoringServer(), weight: this.weightTemplate(8) }, this.templateDefault())
            ], weight: this.weightTemplate(8) }, this.templateObjectFather());
    }
    createConfigServerSchema() {
        return {
            level: { type: String, enum: ["low", "medium", "high"] },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(7)
        };
    }
    createMonitoringServer() {
        return {
            enabled: this.isEnable(),
            score: this.scoreTemplate(),
            weight: this.weightTemplate(7)
        };
    }
    createSystemOperationSchema() {
        return {
            patching: {
                type: String,
                enum: ["Regular", "Irregular"]
            },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(3)
        };
    }
    // Servers
    // HA
    createHASchema() {
        return Object.assign({ enabled: this.isEnable(), solutions: {
                type: [String],
                enum: ["redundancy", "load balance", "failover", "cluster", "none"],
                default: ["none"]
            }, tested: this.isEnable(), rto: {
                type: Number,
                validate: {
                    validator: (value) => value >= 0,
                    message: "O tempo deve ser um numero que será convertido em horas e não deve ser um numero negativo"
                }
            }, weight: this.weightTemplate(7) }, this.templateDefault());
    }
    // HA
    // Firewall
    createFirewall() {
        return Object.assign({ enabled: this.isEnable(), manufacturer: {
                type: [String],
                enum: ["Sophos", "Fortigate", "Mikrotik", "Cisco", "SonicWall", "PFsense", "None"]
            }, rules: { type: String, enum: ["Fraco", "Ok", "Bom", "None"] }, segmentation: this.booleanDefault(), vpn: { type: String, enum: ["Fraco", "Ok", "Bom", "None"] }, ips: this.booleanDefault(), backup: this.booleanDefault(), restoration: this.booleanDefault(), monitoring: this.booleanDefault(), weight: this.weightTemplate(9) }, this.templateDefault());
    }
    // Inventory
    createInventory() {
        return Object.assign({ enabled: this.isEnable(), devices: {
                type: [String],
                enum: ["Computadores", "Notebooks", "Servidores", "Impressoras", "Equipamentos", "Nenhum"]
            }, contacts: { type: Boolean, default: false }, agentInventory: {
                type: String,
                enum: ["None", "Few", "Medium", "Many", "All"],
                default: "None"
            }, weight: this.weightTemplate(7) }, this.templateDefault());
    }
    createSecurity() {
        return Object.assign({ antivirus: {
                type: String,
                enum: ["None", "Few", "Medium", "Many", "All"],
                default: "None"
            }, policyPassword: this.booleanDefault(), accessAuditing: this.booleanDefault(), gpo: {
                type: String,
                enum: ["Nenhuma", "Basica", "Avançada"],
                default: "Nenhuma"
            }, lgpd: this.booleanDefault(), weight: this.weightTemplate(8) }, this.templateDefault());
    }
    createServices() {
        return Object.assign({ email: this.booleanDefault(), fileserver: this.booleanDefault(), intranet: this.booleanDefault(), sites: this.booleanDefault(), erp: this.booleanDefault(), database: this.booleanDefault(), servers: this.booleanDefault(), weight: this.weightTemplate(6) }, this.templateDefault());
    }
    // Templates
    scoreTemplate() {
        return {
            type: Number,
            enum: [...Array(11).keys()],
            required: true,
            default: 0
        };
    }
    weightTemplate(numb) {
        return {
            type: Number,
            default: Math.max(1, Math.min(10, numb))
        };
    }
    isEnable() {
        return {
            type: Boolean,
            required: true,
            default: false
        };
    }
    booleanDefault() {
        return {
            type: Boolean,
            required: true,
            default: false
        };
    }
    pointingTemplate() {
        return {
            type: Number,
            default: 0
        };
    }
    templateDefault(description = false) {
        return {
            score: this.scoreTemplate(),
            description: { type: String, required: false },
            points: this.pointingTemplate()
        };
    }
    templateObjectFather(description = false) {
        return {
            description: { type: String, required: description },
            points: this.pointingTemplate()
        };
    }
}
exports.default = new Compliance().ComplianceModel;
