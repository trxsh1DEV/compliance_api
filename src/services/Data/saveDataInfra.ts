import Compliance from '../../models/Compliance';

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

export const postDataInfra = async (infra: averageInfraType, id: string) => {
  const compliance = await Compliance.findById(id);
  if (!compliance) return;

  compliance.backup.points = infra.averageBkp;
  compliance.ha.points = infra.averageHa;
  compliance.server.points = infra.averageAllServers;
  compliance.totalScore = infra.totalScore;
  compliance.server.servers.map((item, index) => {
    const scoreNumber = parseFloat(infra.averageServer[index].pointing);
    if (!isNaN(scoreNumber) && scoreNumber) item.points = scoreNumber;
  });

  await compliance.save();
  console.log(compliance.server.servers);
};
