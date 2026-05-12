export type JobStatus =
  | "Aplicado"
  | "Entrevista"
  | "Aprovado"
  | "Rejeitado"
  | "Sem resposta";

export interface Job {
  id: string;
  company: string;
  role: string;
  platform: string;
  date: string;
  status: JobStatus;
  notes: string;
  link?: string;
}
