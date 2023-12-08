import {
  IBackupItems,
  ICompliance,
  IServers,
} from '../types/ModelTypesCompliance';

export const calculatePointing = (infra: ICompliance) => {
  const infraArray = [infra];
  let bkp: string = '';
  let servers: any;

  infraArray.forEach((items) => {
    bkp = backupCalc(items.backup);
    servers = ServersCalc(items.server);
  });
  console.log(bkp);
  console.log(servers);
  return null;
};

const backupCalc = (itemsBackup: IBackupItems) => {
  const { policy, frequency, restoration } = itemsBackup;
  const { local, remote } = itemsBackup.storage;

  let policyCalc = policy.score * policy.weight;
  let frequencyCalc = frequency.score * frequency.weight;
  let storageLocalCalc = local.score * local.weight;
  let storageRemoteCalc = remote.score * remote.weight;
  let restorationCalc = restoration.score * restoration.weight;

  let pointingTotal = pointTotalCalc(
    policyCalc,
    frequencyCalc,
    storageLocalCalc,
    storageRemoteCalc,
    restorationCalc,
  );

  let pointingMax = maxPointing(
    policy.weight,
    frequency.weight,
    local.weight,
    remote.weight,
    restoration.weight,
  );

  return calculatePercentage(pointingTotal, pointingMax);
};

const ServersCalc = (itemsServer: IServers) => {
  const { enabled } = itemsServer;
  if (!enabled) return;

  interface PointsServer {
    name: string;
    pointing: number | string;
  }

  let pointsAllServers: PointsServer[] = [];
  for (const obj of itemsServer.servers) {
    const score = obj.score * obj.weight;
    let totalPoint = pointTotalCalc(score);
    let maxPoints = maxPointing(obj.weight);

    const pointServer = calculatePercentage(totalPoint, maxPoints);

    pointsAllServers.push({ name: obj.server_name, pointing: pointServer });
  }
  // pointsAllServers.map((item) => console.log(item.name, item.pointing));
  return pointsAllServers;
};

const pointTotalCalc = (...points: Array<number>) => {
  // console.log('points', points);
  const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
  return pointingTotal;
};

const maxPointing = (...weights: Array<number>) => {
  // console.log('peso', weights);
  const pointingMax = weights.reduce(
    (total, numbers) => total + numbers * 10,
    0,
  );
  return pointingMax;
};

const calculatePercentage = (pointingTotal: number, pointingMax: number) => {
  // console.log('values final', pointingTotal, pointingMax);
  const porcentagem = (pointingTotal / pointingMax) * 100;
  return porcentagem.toFixed(2);
};
