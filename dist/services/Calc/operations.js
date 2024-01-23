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
    let inventory = { scores: 0, weights: 0 };
    let security = { scores: 0, weights: 0 };
    let services = { scores: 0, weights: 0 };
    serverArray.forEach((items) => {
        servers = ServersCalc(items);
    });
    ha = defaultCalc(infra.ha);
    bkp = backupCalc(infra.backup);
    firewall = defaultCalc(infra.firewall);
    inventory = defaultCalc(infra.inventory);
    security = defaultCalc(infra.security);
    services = defaultCalc(infra.servicesOutsourcing);
    const averageHa = calculatePercentage(ha.scores, ha.weights);
    const averageBkp = calculatePercentage(bkp.scores, bkp.weights);
    const averageFirewall = calculatePercentage(firewall.scores, firewall.weights);
    const averageInventory = calculatePercentage(inventory.scores, inventory.weights);
    const averageSecurity = calculatePercentage(security.scores, security.weights);
    const averageServices = calculatePercentage(services.scores, services.weights);
    const averageServer = servers.map((item) => {
        return {
            name: item.serverName,
            pointing: calculatePercentage(item.scores, item.weights)
        };
    });
    try {
        const serverTotalScores = servers.reduce((ac, current) => ac + current.scores, 0);
        const serverTotalWeights = servers.reduce((ac, current) => ac + current.weights, 0);
        const averageAllServers = calculatePercentage(serverTotalScores, serverTotalWeights);
        if (typeof averageBkp !== "string" &&
            typeof averageHa !== "string" &&
            typeof averageAllServers !== "string" &&
            typeof averageFirewall !== "string" &&
            typeof averageInventory !== "string" &&
            typeof averageSecurity !== "string" &&
            typeof averageServices !== "string") {
            throw new Error("Erro em uma das médias/score dos campos");
        }
        const arrayAverages = [
            averageBkp,
            averageHa,
            averageAllServers,
            averageFirewall,
            averageInventory,
            averageSecurity,
            averageServices
        ];
        const totalScore = averageTotalScore(arrayAverages);
        const averages = {
            averageBkp: Number(averageBkp),
            averageHa: Number(averageHa),
            averageServer,
            averageAllServers: Number(averageAllServers),
            averageFirewall: Number(averageFirewall),
            averageInventory: Number(averageInventory),
            averageSecurity: Number(averageInventory),
            averageServices: Number(averageServices),
            totalScore: Number(totalScore)
        };
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
    let pointsAllServers = [];
    if (!enabled) {
        pointsAllServers.push({
            serverName: "",
            scores: 0,
            weights: 10
        });
    }
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
            weights: maxPoints
        });
        // pointsAllServers.push({ name: obj.serverName, pointing: pointServer });
    }
    return pointsAllServers;
};
const defaultCalc = (infraObj) => {
    const totalPoints = pointTotalCalc(infraObj.score * infraObj.weight);
    const maxPoints = maxPointing(infraObj.weight);
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
const averageTotalScore = (values) => {
    const valoresNumeros = values.map((valor) => parseFloat(valor));
    const total = valoresNumeros.reduce((acc, valor) => acc + valor, 0);
    const media = total / valoresNumeros.length;
    return media.toFixed(2);
};
