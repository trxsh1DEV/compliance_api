"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDataInfra = void 0;
const Compliance_1 = __importDefault(require("../models/Compliance"));
const postDataInfra = async (infra, id) => {
    const compliance = await Compliance_1.default.findById(id);
    if (!compliance)
        return;
    compliance.backup.points = infra.averageBkp;
    compliance.ha.points = infra.averageHa;
    compliance.server.points = infra.averageAllServers;
    compliance.totalScore = infra.totalScore;
    compliance.server.servers.map((item, index) => {
        const scoreNumber = parseFloat(infra.averageServer[index].pointing);
        if (!isNaN(scoreNumber) && scoreNumber)
            item.points = scoreNumber;
    });
    await compliance.save();
    console.log(compliance.server.servers);
};
exports.postDataInfra = postDataInfra;
