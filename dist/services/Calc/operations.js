"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePointing = void 0;
const saveDataInfra_1 = require("../data/saveDataInfra");
const calculatePointing = async (infra, complianceId) => {
    const serverArray = [infra.server];
    let bkp = { scores: 0, weights: 0 };
    let servers = [];
    let ha = { scores: 0, weights: 0 };
    let firewall = { scores: 0, weights: 0 };
    serverArray.forEach((items) => {
        servers = ServersCalc(items);
    });
    ha = haCalc(infra.ha);
    bkp = backupCalc(infra.backup);
    firewall = backupFirewall(infra.firewall);
    const averageHa = calculatePercentage(ha.scores, ha.weights);
    const averageBkp = calculatePercentage(bkp.scores, bkp.weights);
    const averageServer = servers.map((item) => {
        return {
            name: item.serverName,
            pointing: calculatePercentage(item.scores, item.weights),
        };
    });
    const averageFirewall = calculatePercentage(firewall.scores, firewall.weights);
    const serverTotalScores = servers.reduce((ac, current) => ac + current.scores, 0);
    const serverTotalWeights = servers.reduce((ac, current) => ac + current.weights, 0);
    const averageAllServers = calculatePercentage(serverTotalScores, serverTotalWeights);
    const totalScores = servers.reduce((ac, currentValue) => ac + currentValue.scores, 0) +
        bkp.scores +
        ha.scores +
        firewall.scores;
    const totalWeights = servers.reduce((total, item) => total + item.weights, 0) +
        bkp.weights +
        ha.weights +
        firewall.weights;
    console.log(averageBkp, averageHa, averageServer, averageFirewall);
    if (!averageBkp && !averageHa && !averageServer && !averageFirewall)
        return;
    const totalScore = parseFloat(calculatePercentage(totalScores, totalWeights));
    const averages = {
        averageBkp,
        averageHa,
        averageServer,
        averageAllServers,
        averageFirewall,
        totalScore,
    };
    try {
        const data = await (0, saveDataInfra_1.postDataInfra)(averages, infra, complianceId);
        // console.log(data);
        return data;
    }
    catch (err) {
        return err.message;
    }
};
exports.calculatePointing = calculatePointing;
const backupCalc = (itemsBackup) => {
    const { policy, frequency, restoration } = itemsBackup;
    const { local, remote } = itemsBackup.storage;
    let policyCalc = policy.score * policy.weight;
    let frequencyCalc = frequency.score * frequency.weight;
    let storageLocalCalc = local.score * local.weight;
    let storageRemoteCalc = remote.score * remote.weight;
    let restorationCalc = restoration.score * restoration.weight;
    let totalPoints = pointTotalCalc(policyCalc, frequencyCalc, storageLocalCalc, storageRemoteCalc, restorationCalc);
    let maxPoints = maxPointing(policy.weight, frequency.weight, local.weight, remote.weight, restoration.weight);
    // return calculatePercentage(totalPoints, maxPoints);
    return { scores: totalPoints, weights: maxPoints };
};
// IServers
const ServersCalc = (itemsServer) => {
    const { enabled } = itemsServer;
    if (!enabled)
        return null;
    let pointsAllServers = [];
    for (const obj of itemsServer.servers) {
        let pointGeneral = obj.score * obj.weight;
        let config = obj.config.score * obj.config.weight;
        let so = obj.systemOperation.score * obj.systemOperation.weight;
        let monitoring = obj.monitoringPerformance.score * obj.monitoringPerformance.weight;
        let totalPoints = pointTotalCalc(pointGeneral, config, so, monitoring);
        let maxPoints = maxPointing(obj.weight, obj.config.weight, obj.monitoringPerformance.weight, obj.systemOperation.weight);
        pointsAllServers.push({
            serverName: obj.serverName,
            scores: totalPoints,
            weights: maxPoints,
        });
        // pointsAllServers.push({ name: obj.serverName, pointing: pointServer });
    }
    return pointsAllServers;
};
const haCalc = (itemsHA) => {
    const totalPoints = pointTotalCalc(itemsHA.score * itemsHA.weight);
    const maxPoints = maxPointing(itemsHA.weight);
    // return calculatePercentage(scores: totalPoints, maxPoints);
    return { scores: totalPoints, weights: maxPoints };
};
const backupFirewall = (firewall) => {
    const totalPoints = pointTotalCalc(firewall.score * firewall.weight);
    const maxPoints = maxPointing(firewall.weight);
    return { scores: totalPoints, weights: maxPoints };
};
const pointTotalCalc = (...points) => {
    const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
    return pointingTotal;
};
const maxPointing = (...weights) => {
    const pointingMax = weights.reduce((total, numbers) => total + numbers * 10, 0);
    return pointingMax;
};
const calculatePercentage = (pointingTotal, pointingMax) => {
    const porcentagem = (pointingTotal / pointingMax) * 100;
    return porcentagem.toFixed(2);
};
