import { GenericType } from "./TypesVariableCompliance";

export interface GenericInfraServerType extends GenericType {
  serverName: string;
}

export interface TypeAllServers {
  serverName: string;
  scores: number;
  weights: number;
}

export type averageInfraType = {
  averageBkp: number;
  averageHa: number;
  averageServer: {
    name: string;
    pointing: string;
  }[];
  averageAllServers: number;
  averageFirewall: number;
  averageInventory: number;
  averageSecurity: number;
  averageServices: number;
  totalScore: number;
};

export interface TypesFieldsDefaultCalc {
  score: number;
  weight: number;
}
