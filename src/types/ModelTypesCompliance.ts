import { Types } from 'mongoose';

// export interface IScore {
//   score: number;
// }

// export interface IWeight {
//   weight: number;
// }

// Backup
export interface IBackupItems {
  policy: IBackup;
  frequency: IFrequency;
  storage: {
    local: IBackup;
    remote: IBackup;
  };
  restoration: IBackup;
  description?: string;
  points: number;
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

// Backup

export interface ISystemOperation {
  patching: 'Regular' | 'Irregular';
  score: number;
  weight: number;
}

interface IConfigServerDocument {
  type: 'low' | 'medium' | 'high';
  score: number;
  weight: number;
}

interface IMonitoringPerformanceDocument {
  type: boolean;
  required: true;
  score: number;
  weight: number;
}

export interface IServer {
  serverName: string;
  systemOperation: ISystemOperation;
  config: IConfigServerDocument;
  monitoringPerformance: IMonitoringPerformanceDocument;
  score: number;
  weight: number;
  description?: string;
  points: number;
}

export interface IServers {
  enabled: boolean;
  servers: IServer[];
  points: number;
}

export interface IHA {
  enabled: boolean;
  solutions: (
    | 'redundancy'
    | 'load balance'
    | 'failover'
    | 'cluster'
    | 'none'
  )[];
  tested: boolean;
  rto: number;
  score: number;
  weight: number;
  points: number;
}

export interface ICompliance extends Document {
  client: Types.ObjectId;
  backup: IBackupItems;
  server: IServers;
  ha: IHA;
  totalScore: number;
}
