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
    Aprovado:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    Rejeitado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Sem resposta":
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  return (
    <div
      onClick={() => onView(job)}
      className={clsx(
        "group grid grid-cols-1 gap-4 rounded-lg border border-black/20 bg-white p-4 transition-all hover:border-blue-500 shadow-sm cursor-pointer",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400",
        "sm:grid-cols-[1fr_120px_auto] md:grid-cols-[1fr_1fr_120px_auto] lg:grid-cols-[1.5fr_1.5fr_120px_120px_auto] sm:items-center",
      )}
    >
      <div className="min-w-0">
        <h3
          className="truncate text-lg font-bold text-gray-900 dark:text-white"
          title={job.company}
        >
          {job.company}
        </h3>
        <p
          className="truncate text-sm text-gray-500 dark:text-gray-400 md:hidden"
          title={job.role}
        >
          {job.role}
        </p>
      </div>

      <div className="hidden min-w-0 md:block">
        <p
          className="truncate font-medium text-gray-700 dark:text-gray-300"
          title={job.role}
        >
          {job.role}
        </p>
        <p
          className="truncate text-xs text-gray-500 dark:text-gray-400"
          title={job.platform}
        >
          {job.platform}
        </p>
      </div>

      <div className="hidden lg:block">
        <p className="text-sm text-gray-500 dark:text-gray-400">{job.date}</p>
      </div>

      <div className="flex items-center sm:justify-start">
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusColors[job.status],
          )}
        >
          {job.status}
        </span>
      </div>

      <div
        className={clsx(
          "flex items-center justify-end gap-1 border-t pt-3 space-x-3 sm:space-x-0 sm:border-t-0 sm:pt-0",
          "dark:border-gray-700 sm:w-25",
        )}
      >
        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
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
          className="cursor-pointer rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-900/30"
          title="Editar"
        >
          <HiPencil size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(job.id);
          }}
          className="cursor-pointer rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/30"
          title="Excluir"
        >
          <HiTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobItem;
