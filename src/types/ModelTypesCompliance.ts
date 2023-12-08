import { Types } from 'mongoose';

// export interface IScore {
//   score: number;
// }

// export interface IWeight {
//   weight: number;
// }

export interface IBackupItems {
  policy: IBackup;
  frequency: IFrequency;
  storage: {
    local: IBackup;
    remote: IBackup;
  };
  restoration: IBackup;
}

export interface IBackup {
  enabled: boolean;
  score: number;
  weight: number;
  description?: string;
}

export interface IFrequency {
  value: number;
  score: number;
  weight: number;
  description?: string;
}

export interface ISystemOperation {
  patching: 'Regular' | 'Irregular';
  score: number;
  weight: number;
}

export interface IServer {
  server_name: string;
  systemOperation: ISystemOperation;
  config: 'low' | 'medium' | 'high';
  monitoringPerformance: boolean;
  score: number;
  weight: number;
  description?: string;
}

export interface IServers {
  enabled: boolean;
  servers: IServer[];
}

export interface IHA {
  enabled: boolean;
  solution: 'redundancy' | 'load balance' | 'failover' | 'cluster' | 'none';
  tested: boolean;
  rto: number;
}

export interface ICompliance extends Document {
  client: Types.ObjectId;
  backup: IBackupItems;
  server: IServers;
  ha: IHA;
}
