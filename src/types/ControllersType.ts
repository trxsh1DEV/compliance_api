export interface ClientType {
  name: string;
  social_reason?: string;
  email: string;
  avatar: string;
  id: string;
  feedback: number;
  isAdmin: boolean;
  contact?: string;
  cnpj?: string;
  criticalProblems: boolean;
  typeContract: "Fixo" | "Avulso";
}
