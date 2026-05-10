import React from "react";
import { Job } from "../jobs.types";
import { clsx } from "clsx";
import { HiExternalLink, HiPencil, HiTrash } from "react-icons/hi";

interface JobItemProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onView: (job: Job) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onEdit, onDelete, onView }) => {
  const statusColors = {
    Aplicado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Entrevista:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Rejeitado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Sem resposta":
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  return (
    <div
      onClick={() => onView(job)}
      className={clsx(
        "group flex flex-col gap-3 rounded-lg border border-black/20 p-4 transition-all bg-white",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400 cursor-pointer",
        "sm:flex-row sm:items-center sm:justify-between min-h-20 hover:border-blue-500",
      )}
    >
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-37.5 flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {job.company}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 md:hidden">
            {job.role}
          </p>
        </div>

        <div className="hidden flex-1 md:block">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {job.role}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {job.platform}
          </p>
        </div>

        <div className="hidden lg:block lg:w-32">
          <p className="text-sm text-gray-500 dark:text-gray-400">{job.date}</p>
        </div>

        <div className="flex items-center">
          <span
            className={clsx(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              statusColors[job.status],
            )}
          >
            {job.status}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "flex items-center justify-end dark:border-gray-700 border-t pt-2 sm:border-t-0 sm:pt-0",
        )}
      >
        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "rounded-lg p-2 text-emerald-600 hover:bg-emerald-50",
              "dark:text-emerald-400 dark:hover:bg-emerald-900/30",
            )}
            title="Ver vaga"
          >
            <HiExternalLink size={20} />
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(job);
          }}
          className={clsx(
            "rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-500 ",
            "dark:hover:bg-blue-900/30 cursor-pointer",
          )}
          title="Editar"
        >
          <HiPencil size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(job.id);
          }}
          className={clsx(
            "rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-500 ",
            "dark:hover:bg-red-900/30 cursor-pointer",
          )}
          title="Excluir"
        >
          <HiTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobItem;
