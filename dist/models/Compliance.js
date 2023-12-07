"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Compliance {
    constructor() {
        this.ComplianceSchema = new mongoose_1.Schema({
            complianceId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
            },
            server: this.createServersSchema(),
            ha: this.createHASchema(),
        }, { timestamps: true });
        this.ComplianceModel = (0, mongoose_1.model)('Compliance', this.ComplianceSchema);
    }
    // Funções de criação de esquemas tipadas
    createPolicySchema() {
        return {
            enabled: { type: Boolean, required: true, default: false },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(6),
            description: { type: String },
        };
    }
    createFrequencySchema() {
        return {
            value: { type: Number, default: 0, required: true },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(8),
            description: { type: String },
        };
    }
    createStorageSchema() {
        return {
            enabled: { type: Boolean, required: true },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(9),
            description: { type: String },
        };
    }
    createRestorationSchema() {
        return {
            enabled: { type: Boolean, required: true, default: false },
            score: this.scoreTemplate(),
            weight: this.weightTemplate(9),
            description: { type: String },
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
                    config: { type: String, enum: ['low', 'medium', 'high'] },
                    monitoringPerformance: { type: Boolean, required: true },
                    score: this.scoreTemplate(),
                    weight: this.weightTemplate(8),
                    description: { type: String },
                },
            ],
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
                score: this.scoreTemplate(),
                weight: this.weightTemplate(8),
            },
            tested: { type: Boolean, required: true },
            rto: {
                type: Number,
                required: true,
                validate: {
                    validator: (value) => value >= 0,
                    message: 'O tempo deve ser um numero que será convertido em horas e não deve ser um numero negativo',
                },
            },
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
}
exports.default = new Compliance().ComplianceModel;