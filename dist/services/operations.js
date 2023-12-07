"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePointing = void 0;
const calculatePointing = (infra) => {
    console.log('cheguei \n');
    const infraArray = [infra];
    console.log(infraArray);
    let pointsDone = 0;
    infraArray.forEach((items) => {
        // pointsDone = backupCalc(items.backup);
    });
    return pointsDone;
};
exports.calculatePointing = calculatePointing;
const backupCalc = (itemsBackup) => {
    const { policy, frequency, restoration } = itemsBackup;
    const { local, remote } = itemsBackup.storage;
    let policyCalc = (policy === null || policy === void 0 ? void 0 : policy.score) * (policy === null || policy === void 0 ? void 0 : policy.weight);
    let frequencyCalc = (frequency === null || frequency === void 0 ? void 0 : frequency.score) * (frequency === null || frequency === void 0 ? void 0 : frequency.weight);
    let storageLocalCalc = (local === null || local === void 0 ? void 0 : local.score) * (local === null || local === void 0 ? void 0 : local.weight);
    let storageRemoteCalc = (remote === null || remote === void 0 ? void 0 : remote.score) * (remote === null || remote === void 0 ? void 0 : remote.weight);
    let restorationCalc = (restoration === null || restoration === void 0 ? void 0 : restoration.score) * (restoration === null || restoration === void 0 ? void 0 : restoration.weight);
    let pointingTotal = pointTotalCalc(policyCalc, frequencyCalc, storageLocalCalc, storageRemoteCalc, restorationCalc);
    let pointingMax = maxPointing(policy.weight, frequency.weight, local.weight, remote.weight, restoration.weight);
    return calculatePercentage(pointingTotal, pointingMax);
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
