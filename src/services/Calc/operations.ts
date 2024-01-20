import { IBackupItems, ICompliance, IServers } from "../../types/ModelTypesCompliance";
import { GenericType } from "../../types/TypesVariableCompliance";
import { postDataInfra } from "../data/saveDataInfra";

interface GenericInfraServerType extends GenericType {
  serverName: string;
}

interface TypeAllServers {
  serverName: string;
  scores: number;
  weights: number;
}

type averageInfraType = {
  averageBkp: number | string;
  averageHa: number | string;
  averageServer: {
    name: string;
    pointing: string | number;
  }[];
  averageAllServers: number | string;
  averageFirewall: number | string;
  averageInventory: number | string;
  averageSecurity: number | string;
  averageServices: number | string;
  totalScore: number;
};

export const calculatePointing = async (infra: ICompliance, complianceId: string) => {
  const serverArray = [infra.server];
  let bkp: GenericType = { scores: 0, weights: 0 };
  let servers: GenericInfraServerType[] | null = [];
  let ha: GenericType = { scores: 0, weights: 0 };
  let firewall: GenericType = { scores: 0, weights: 0 };
  let inventory: GenericType = { scores: 0, weights: 0 };
  let security: GenericType = { scores: 0, weights: 0 };
  let services: GenericType = { scores: 0, weights: 0 };

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

  const serverTotalScores = servers.reduce((ac, current) => ac + current.scores, 0);
  const serverTotalWeights = servers.reduce((ac, current) => ac + current.weights, 0);
  const averageAllServers = calculatePercentage(serverTotalScores, serverTotalWeights);

  if (
    typeof averageBkp !== "number" &&
    typeof averageHa !== "number" &&
    typeof averageServer !== "number" &&
    typeof averageFirewall !== "number" &&
    typeof averageInventory !== "number" &&
    typeof averageSecurity !== "number" &&
    typeof averageServices !== "number"
  )
    return;

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

  const averages: averageInfraType | any = {
    averageBkp,
    averageHa,
    averageServer,
    averageAllServers,
    averageFirewall,
    averageInventory,
    averageSecurity,
    averageServices,
    totalScore
  };

  try {
    const data = await postDataInfra(averages, infra, complianceId);
    // console.log(data);
    return data;
  } catch (err: any) {
    return err.message;
  }
};

const backupCalc = (itemsBackup: IBackupItems) => {
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
const ServersCalc = (itemsServer: IServers): TypeAllServers[] => {
  const { enabled } = itemsServer;
  let pointsAllServers: TypeAllServers[] = [];

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

    let maxPoints = maxPointing(
      obj.weight,
      obj.config.weight,
      obj.monitoringPerformance.weight,
      obj.systemOperation.weight
    );

    pointsAllServers.push({
      serverName: obj.serverName,
      scores: totalPoints,
      weights: maxPoints
    });

    // pointsAllServers.push({ name: obj.serverName, pointing: pointServer });
  }
  return pointsAllServers;
};

const defaultCalc = (infraObj: any) => {
  const totalPoints = pointTotalCalc(infraObj.score * infraObj.weight);
  const maxPoints = maxPointing(infraObj.weight);

  return { scores: totalPoints, weights: maxPoints };
};

const pointTotalCalc = (...points: Array<number>) => {
  const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
  return pointingTotal;
};

const maxPointing = (...weights: Array<number>) => {
  const pointingMax = weights.reduce((total, numbers) => total + numbers * 10, 0);
  return pointingMax;
};

const calculatePercentage = (pointingTotal: number, pointingMax: number) => {
  const porcentagem = (pointingTotal / pointingMax) * 100;
  return porcentagem.toFixed(2);
};

const averageTotalScore = (values: string[]) => {
  const valoresNumeros = values.map((valor: string) => parseFloat(valor));

  const total = valoresNumeros.reduce((acc: number, valor: number) => acc + valor, 0);
  const media = total / valoresNumeros.length;

  return media.toFixed(2);
};
