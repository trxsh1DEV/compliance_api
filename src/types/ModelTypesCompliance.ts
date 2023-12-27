import { Document, Types } from 'mongoose';

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

export interface IFirewall {
  enabled: boolean;
  manufacturer: [
    'Sophos',
    'Fortigate',
    'Mikrotik',
    'Cisco',
    'SonicWall',
    'PFsense',
  ];
  rules: ['weak', 'medium', 'good'];
  segmentation: boolean;
  vpn: ['weak', 'medium', 'good'];
  ips: boolean;
  backup: boolean;
  restorarion: boolean;
  monitoring: boolean;
}

export interface IInventory {
  enabled: boolean;
  devices: (
    | 'Computadores'
    | 'Notebooks'
    | 'Servidores'
    | 'Impressoras'
    | 'Equipamentos'
  )[];
  contacts: boolean;
  agentInventory: ['None', 'Few', 'Medium', 'Many', 'All'];
}

export interface ISecurity {
  antivirus: ['None', 'Few', 'Medium', 'Many', 'All'];
  policyPassword: boolean;
  accessAuditing: boolean;
  gpo: ['None', 'Basic', 'Advanced'];
  lgpd: boolean;
}

export interface IServices {
  email: boolean;
  fileserver: boolean;
  intranet: boolean;
  sites: boolean;
  erp: boolean;
  database: boolean;
  servers: boolean;
}

export interface ICompliance extends Document {
  client: Types.ObjectId;
  backup: IBackupItems;
  server: IServers;
  ha: IHA;
  firewall: IFirewall;
  inventory: IInventory;
  security: ISecurity;
  servicesOutsourcing: IServices;
  totalScore: number;
}
