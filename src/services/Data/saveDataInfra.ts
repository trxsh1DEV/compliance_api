import { ICompliance } from '../../types/ModelTypesCompliance';

export type averageInfraType = {
  averageBkp: number;
  averageHa: number;
  averageServer: [
    {
      name: string;
      pointing: string;
    },
  ];
  averageAllServers: number;
  totalScore: number;
};

export const postDataInfra = async (
  infra: averageInfraType,
  compliance: ICompliance,
  id: string,
) => {
  if (!compliance) return;

  compliance.backup.points = infra.averageBkp;
  compliance.ha.points = infra.averageHa;
  compliance.server.points = infra.averageAllServers;
  compliance.totalScore = infra.totalScore;
  compliance.server.servers.map((item, index) => {
    const scoreNumber = parseFloat(infra.averageServer[index].pointing);
    if (!isNaN(scoreNumber) && scoreNumber) item.points = scoreNumber;
  });

  await compliance.save({ validateModifiedOnly: true });
  return compliance;
};
