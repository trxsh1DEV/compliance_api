"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDataInfra = void 0;
const postDataInfra = async (average, infra, id) => {
    if (!infra)
        return;
    infra.backup.points = average.averageBkp;
    infra.ha.points = average.averageHa;
    infra.server.points = average.averageAllServers;
    infra.server.servers.map((item, index) => {
        const scoreNumber = parseFloat(average.averageServer[index].pointing);
        if (!isNaN(scoreNumber) && scoreNumber)
            item.points = scoreNumber;
    });
    infra.totalScore = average.totalScore;
    infra.firewall.points = average.averageFirewall;
    console.log(average);
    console.log('----------------------------------------');
    await infra.save({ validateModifiedOnly: true });
    return infra;
};
exports.postDataInfra = postDataInfra;
