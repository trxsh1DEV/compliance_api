import { Types } from 'mongoose';

export interface ClientType {
  name: string;
  social_reason?: string;
  email: string;
  password: string;
  avatar: string;
  id: string;
  isAdmin: boolean;
  contact?: string;
  cnpj?: string;
  criticalProblems: boolean;
  typeContract: 'Fixo' | 'Avulso';
}
