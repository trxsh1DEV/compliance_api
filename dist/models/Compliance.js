"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Compliance {
    constructor() {
        this.ComplianceSchema = new mongoose_1.Schema({
            client: {
                type: mongoose_1.Schema.Types.ObjectId,
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
        }, { timestamps: true });
        this.ComplianceModel = (0, mongoose_1.model)('Compliance', this.ComplianceSchema);
    }
    // Funções de criação de esquemas tipadas
    createPolicySchema() {
        return {
            enabled: this.isEnable(),
            score: this.scoreTemplate(),
            weight: this.weightTemplate(6),
        };
    }
    createFrequencySchema() {
        return {
            enabled: this.isEnable(),
            level: { type: String, enum: ['low', 'medium', 'high'] },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(8),
        };
    }
    createStorageSchema() {
        return {
            enabled: this.isEnable(),
            qtde: { type: Number, default: 0 },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(9),
        };
    }
    createRestorationSchema() {
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
    createConfigServerSchema() {
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
                    validator: (value) => value >= 0,
                    message: 'O tempo deve ser um numero que será convertido em horas e não deve ser um numero negativo',
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
    weightTemplate(numb) {
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
exports.default = new Compliance().ComplianceModel;
