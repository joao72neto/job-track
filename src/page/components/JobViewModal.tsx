import React from "react";
import { Job } from "../jobs.types";
import ModalContainer from "@/src/components/modals/ModalContainer";
import Button from "@/src/components/Button";
import { clsx } from "clsx";
import { format } from "date-fns";

interface JobViewModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobViewModal: React.FC<JobViewModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  const statusColors = {
    Aplicado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Aprovado:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    Entrevista:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Rejeitado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Sem resposta":
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  return (
    <ModalContainer close={onClose} size="md">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {job.company}
          </h2>
          <span
            className={clsx(
              "inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium",
              statusColors[job.status],
            )}
          >
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Vaga
            </label>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {job.role}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Plataforma
            </label>
            <p className="mt-1 text-lg text-gray-900 dark:text-white">
              {job.platform}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Data de Candidatura
            </label>
            <p className="mt-1 text-gray-900 dark:text-white">
              {format(job.date, "dd/MM/yyyy")}
            </p>
          </div>
          {job.link && (
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Link da Vaga
              </label>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-blue-600 hover:underline dark:text-blue-400"
              >
                {job.link}
              </a>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Observações
          </label>
          <div className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {job.notes || "Nenhuma observação."}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default JobViewModal;
