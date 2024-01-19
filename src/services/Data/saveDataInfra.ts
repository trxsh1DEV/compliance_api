import { ICompliance } from "../../types/ModelTypesCompliance";

export type averageInfraType = {
  averageBkp: number;
  averageHa: number;
  averageServer: [
    {
      name: string;
      pointing: string;
    }
  ];
  averageAllServers: number;
  averageFirewall: number;
  averageInventory: number;
  averageSecurity: number;
  averageServices: number;
  totalScore: number;
};

export const postDataInfra = async (average: averageInfraType, infra: ICompliance, id: string) => {
  if (!infra) return;

  infra.backup.points = average.averageBkp;
  infra.ha.points = average.averageHa;
  infra.server.points = average.averageAllServers;
  infra.server.servers.map((item, index) => {
    const scoreNumber = parseFloat(average.averageServer[index].pointing);
    if (!isNaN(scoreNumber) && scoreNumber) item.points = scoreNumber;
  });
  infra.firewall.points = average.averageFirewall;
  infra.inventory.points = average.averageInventory;
  infra.security.points = average.averageSecurity;
  infra.servicesOutsourcing.points = average.averageServices;
  infra.totalScore = average.totalScore;

  await infra.save({ validateModifiedOnly: true });
  return infra;
};
