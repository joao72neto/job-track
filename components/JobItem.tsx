import React from "react";
import { Job } from "./types";

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
    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
        {job.company}
      </td>
      <td className="px-6 py-4">{job.role}</td>
      <td className="px-6 py-4">{job.platform}</td>
      <td className="px-6 py-4">{job.date}</td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[job.status]}`}
        >
          {job.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs truncate" title={job.notes}>
          {job.notes}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onEdit(job)}
          className="mr-3 font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default JobItem;
