import React from "react";
import { JobStatus } from "./types";

interface StatusFilterProps {
  currentStatus: JobStatus | "Todos";
  onStatusChange: (status: JobStatus | "Todos") => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const statuses: (JobStatus | "Todos")[] = [
    "Todos",
    "Aplicado",
    "Entrevista",
    "Rejeitado",
    "Sem resposta",
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
