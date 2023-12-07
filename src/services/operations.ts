export const calculatePointing = (infra) => {
  let pointsDone = 0;

  infra.forEach((items) => {
    pointsDone = backupCalc(items.backup);
  });
  return pointsDone;
};

const backupCalc = (itemsBackup) => {
  const { policy, frequency, restoration } = itemsBackup;
  const { local, remote } = itemsBackup.storage;

  let policyCalc = policy?.score * policy?.weight;
  let frequencyCalc = frequency?.score * frequency?.weight;
  let storageLocalCalc = local?.score * local?.weight;
  let storageRemoteCalc = remote?.score * remote?.weight;
  let restorationCalc = restoration?.score * restoration?.weight;

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

const pointTotalCalc = (...points) => {
  const pointingTotal = points.reduce((total, numbers) => total + numbers, 0);
  return pointingTotal;
};

const maxPointing = (...weights) => {
  const pointingMax = weights.reduce(
    (total, numbers) => total + numbers * 10,
    0,
  );
  return pointingMax;
};

const calculatePercentage = (pointingTotal, pointingMax) => {
  const porcentagem = (pointingTotal / pointingMax) * 100;

  return porcentagem.toFixed(2);
};
