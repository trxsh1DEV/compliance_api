"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Clients {
    constructor() {
        this.ClientsSchema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true
            },
            social_reason: {
                type: String
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            // password: {
            //   type: String,
            //   required: true,
            //   select: false,
            //   validate: {
            //     validator: (value: string) => value.length >= 8 && value.length <= 30,
            //     message: "A senha deve ter entre 8 e 30 caracteres"
            //   }
            // },
            avatar: {
                type: String,
                default: "https://cdn-icons-png.flaticon.com/512/747/747376.png"
            },
            isAdmin: {
                type: Boolean,
                default: false
            },
            contact: {
                type: String
            },
            cnpj: {
                type: String
            },
            criticalProblems: {
                type: Boolean,
                default: false
            },
            typeContract: {
                type: String,
                enum: ["Fixo", "Avulso"]
            },
            urls: {
                type: {
                    url_inventory: String,
                    url_runbook: String,
                    url_kickoff: String,
                    url_grafana: String,
                    url_sla: String,
                    url_agreement: String
                }
            },
            feedback: {
                type: Number,
                default: 0
            },
            compliances: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Compliance"
                }
            ]
        }, { timestamps: true });
        // this.ClientsSchema.pre("save", async function (next) {
        //   if (!this.isModified("password")) return next();
        //   try {
        //     this.password = await bcrypt.hash(this.password, 8);
        //     next();
        //   } catch (err: any) {
        //     return next(err);
        //   }
        // });
        this.ClientsModel = (0, mongoose_1.model)("Clients", this.ClientsSchema);
    }
}
exports.default = new Clients().ClientsModel;
