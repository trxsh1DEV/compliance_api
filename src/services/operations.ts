import {
  IBackupItems,
  ICompliance,
  IHA,
  IServers,
} from '../types/ModelTypesCompliance';
import { GenericType } from '../types/TypesVariableCompliance';
import { postDataInfra } from './saveDataInfra';

interface GenericInfraServerType extends GenericType {
  serverName: string;
}

export const calculatePointing = (infra: ICompliance, complianceId: string) => {
  const infraArray = [infra];
  let bkp: GenericType = { scores: 0, weights: 0 };
  let servers: GenericInfraServerType[] = [];
  let ha: GenericType = { scores: 0, weights: 0 };

  infraArray.forEach((items) => {
    ha = haCalc(items.ha);
    bkp = backupCalc(items.backup);
    servers = ServersCalc(items.server) || [];
  });

  const averageHa = calculatePercentage(ha.scores, ha.weights);
  const averageBkp = calculatePercentage(bkp.scores, bkp.weights);
  const averageServer = servers.map((item) => {
    return {
      name: item.serverName,
      pointing: calculatePercentage(item.scores, item.weights),
    };
  });

  const serverTotalScores = servers.reduce(
    (ac, current) => ac + current.scores,
    0,
  );
  const serverTotalWeights = servers.reduce(
    (ac, current) => ac + current.weights,
    0,
  );
  const averageAllServers = calculatePercentage(
    serverTotalScores,
    serverTotalWeights,
  );

  const totalScores =
    servers.reduce((ac, currentValue) => ac + currentValue.scores, 0) +
    bkp.scores +
    ha.scores;

  const totalWeights =
    servers.reduce((total, item) => total + item.weights, 0) +
    bkp.weights +
    ha.weights;

  if (!averageBkp && !averageHa && !averageServer) return;
  const totalScore = calculatePercentage(totalScores, totalWeights);

  const averages: any = {
    averageBkp,
    averageHa,
    averageServer,
    averageAllServers,
    totalScore,
  };

  postDataInfra(averages, complianceId);
  return 'ok';
};

const backupCalc = (itemsBackup: IBackupItems) => {
  const { policy, frequency, restoration } = itemsBackup;
  const { local, remote } = itemsBackup.storage;

  let policyCalc = policy.score * policy.weight;
  let frequencyCalc = frequency.score * frequency.weight;
  let storageLocalCalc = local.score * local.weight;
  let storageRemoteCalc = remote.score * remote.weight;
  let restorationCalc = restoration.score * restoration.weight;

  let totalPoints = pointTotalCalc(
    policyCalc,
    frequencyCalc,
    storageLocalCalc,
    storageRemoteCalc,
    restorationCalc,
  );

  let maxPoints = maxPointing(
    policy.weight,
    frequency.weight,
    local.weight,
    remote.weight,
    restoration.weight,
  );

  // return calculatePercentage(totalPoints, maxPoints);
  return { scores: totalPoints, weights: maxPoints };
};

const ServersCalc = (itemsServer: IServers) => {
  const { enabled } = itemsServer;
  if (!enabled) return;

  // let pointsAllServers: PointsServer[] = [];
  let pointsAllServers: any = [];
  for (const obj of itemsServer.servers) {
    let pointGeneral = obj.score * obj.weight;
    let config = obj.config.score * obj.config.weight;
    let so = obj.systemOperation.score * obj.systemOperation.weight;
    let monitoring =
      obj.monitoringPerformance.score * obj.monitoringPerformance.weight;

    let totalPoints = pointTotalCalc(pointGeneral, config, so, monitoring);

    let maxPoints = maxPointing(
      obj.weight,
      obj.config.weight,
      obj.monitoringPerformance.weight,
      obj.systemOperation.weight,
    );

    pointsAllServers.push({
      serverName: obj.serverName,
      scores: totalPoints,
      weights: maxPoints,
    });

    // pointsAllServers.push({ name: obj.serverName, pointing: pointServer });
  }
  return pointsAllServers;
};

const haCalc = (itemsHA: IHA) => {
  let totalPoints = pointTotalCalc(itemsHA.score * itemsHA.weight);
  let maxPoints = maxPointing(itemsHA.weight);

  // return calculatePercentage(scores: totalPoints, maxPoints);
  return { scores: totalPoints, weights: maxPoints };
};

const pointTotalCalc = (...points: Array<number>) => {
  const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
  return pointingTotal;
};

const maxPointing = (...weights: Array<number>) => {
  const pointingMax = weights.reduce(
    (total, numbers) => total + numbers * 10,
    0,
  );
  return pointingMax;
};

const calculatePercentage = (pointingTotal: number, pointingMax: number) => {
  const porcentagem = (pointingTotal / pointingMax) * 100;
  return porcentagem.toFixed(2);
};
