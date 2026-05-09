import React from "react";
import { Job } from "../jobs.types";
import { clsx } from "clsx";
import { HiExternalLink, HiPencil, HiTrash } from "react-icons/hi";

interface JobItemProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onEdit, onDelete }) => {
  const statusColors = {
    Aplicado: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Entrevista:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Rejeitado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Sem resposta":
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  return (
    <tr
      className={clsx(
        "border-b bg-white hover:bg-gray-50",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/10",
      )}
    >
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
        {job.company}
      </td>
      <td className="px-6 py-4">{job.role}</td>
      <td className="px-6 py-4">{job.platform}</td>
      <td className="px-6 py-4">{job.date}</td>
      <td className="px-6 py-4">
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusColors[job.status],
          )}
        >
          {job.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs truncate" title={job.notes}>
          {job.notes}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end space-x-3">
          {job.link && (
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              title="Ver vaga"
            >
              <HiExternalLink size={20} />
            </a>
          )}
          <button
            onClick={() => onEdit(job)}
            className="cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
            title="Editar"
          >
            <HiPencil size={20} />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="cursor-pointer text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
            title="Excluir"
          >
            <HiTrash size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobItem;
