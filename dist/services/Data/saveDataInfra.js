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
    infra.firewall.points = average.averageFirewall;
    infra.inventory.points = average.averageInventory;
    infra.security.points = average.averageSecurity;
    infra.servicesOutsourcing.points = average.averageServices;
    infra.totalScore = average.totalScore;
    console.log(average);
    console.log('----------------------------------------');
    await infra.save({ validateModifiedOnly: true });
    return infra;
};
exports.postDataInfra = postDataInfra;
