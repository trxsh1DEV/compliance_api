"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePointing = void 0;
const calculatePointing = (infra) => {
    const infraArray = [infra];
    let bkp = '';
    let servers = [];
    let ha = '';
    infraArray.forEach((items) => {
        // ha = haCalc(items.ha);
        bkp = backupCalc(items.backup);
        // servers = ServersCalc(items.server) || [];
    });
};
exports.calculatePointing = calculatePointing;
const backupCalc = (itemsBackup) => {
    // TODO OK
    const { policy, frequency, restoration } = itemsBackup;
    const { local, remote } = itemsBackup.storage;
    let policyCalc = policy.score * policy.weight;
    let frequencyCalc = frequency.score * frequency.weight;
    let storageLocalCalc = local.score * local.weight;
    let storageRemoteCalc = remote.score * remote.weight;
    let restorationCalc = restoration.score * restoration.weight;
    let totalPoints = pointTotalCalc(policyCalc, frequencyCalc, storageLocalCalc, storageRemoteCalc, restorationCalc);
    let maxPoints = maxPointing(policy.weight, frequency.weight, local.weight, remote.weight, restoration.weight);
    // console.log(totalPoints, maxPoints);
    return calculatePercentage(totalPoints, maxPoints);
};
const ServersCalc = (itemsServer) => {
    const { enabled } = itemsServer;
    if (!enabled)
        return;
    let pointsAllServers = [];
    for (const obj of itemsServer.servers) {
        const score = obj.score * obj.weight;
        let totalPoints = pointTotalCalc(score);
        let maxPoints = maxPointing(obj.weight);
        // console.log(totalPoints, maxPoints);
        const pointServer = calculatePercentage(totalPoints, maxPoints);
        pointsAllServers.push({ name: obj.server_name, pointing: pointServer });
    }
    // pointsAllServers.map((item) => console.log(item.name, item.pointing));
    return pointsAllServers;
};
const haCalc = (itemsHA) => {
    let totalPoints = pointTotalCalc(itemsHA.score * itemsHA.weight);
    let maxPoints = maxPointing(itemsHA.weight);
    // console.log(totalPoints, maxPoints);
    return calculatePercentage(totalPoints, maxPoints);
};
const pointTotalCalc = (...points) => {
    // TODO OK
    const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
    return pointingTotal;
};
const maxPointing = (...weights) => {
    // TODO OK
    const pointingMax = weights.reduce((total, numbers) => total + numbers * 10, 0);
    return pointingMax;
};
const calculatePercentage = (pointingTotal, pointingMax) => {
    // console.log('values final', pointingTotal, pointingMax);
    const porcentagem = (pointingTotal / pointingMax) * 100;
    return porcentagem.toFixed(2);
};
