import * as yup from "yup";
import { JobStatus } from "./jobs.types";

export const JOB_STATUS_VALUES = [
  "Aplicado",
  "Entrevista",
  "Aprovado",
  "Rejeitado",
  "Sem resposta",
] as const;

export const jobSchema = yup.object().shape({
  company: yup.string().trim().required("Nome da empresa obrigatório"),
  role: yup.string().trim().required("Vaga obrigatória"),
  platform: yup.string().trim().required("Plataforma obrigatória"),

  date: yup
    .date()
    .typeError("Formato de data inválido")
    .required("Data obrigatória"),

  link: yup
    .string()
    .trim()
    .url("Insira uma URL válida")
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .ensure(),

  status: yup
    .mixed<JobStatus>()
    .oneOf(Object.values(JOB_STATUS_VALUES), "Status inválido")
    .required("Status obrigatório"),

  notes: yup.string().trim().optional().ensure(),
});

export type JobForm = yup.InferType<typeof jobSchema>;
