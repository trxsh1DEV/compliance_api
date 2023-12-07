import { Types } from 'mongoose';

export interface IScore {
  score: number;
}

export interface IWeight {
  weight: number;
}

export interface IBackup {
  enabled: boolean;
  score: IScore;
  weight: IWeight;
  description?: string;
}

export interface IFrequency {
  value: number;
  score: IScore;
  weight: IWeight;
  description?: string;
}

export interface ISystemOperation {
  patching: 'Regular' | 'Irregular';
  score: IScore;
  weight: IWeight;
}

export interface IServer {
  server_name: string;
  systemOperation: ISystemOperation;
  config: 'low' | 'medium' | 'high';
  monitoringPerformance: boolean;
  score: IScore;
  weight: IWeight;
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
  complianceId: Types.ObjectId;
  backup: {
    policy: IBackup;
    frequency: IBackup;
    storage: {
      local: IBackup;
      remote: IBackup;
    };
    restoration: IBackup;
  };
  server: IServers;
  ha: IHA;
}
