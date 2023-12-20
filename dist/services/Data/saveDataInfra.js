"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDataInfra = void 0;
const postDataInfra = async (infra, compliance, id) => {
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
    await compliance.save({ validateModifiedOnly: true });
    return compliance;
};
exports.postDataInfra = postDataInfra;
