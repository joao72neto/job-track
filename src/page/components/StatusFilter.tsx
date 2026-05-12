import React from "react";
import { JobStatus } from "../jobs.types";
import { clsx } from "clsx";

interface StatusFilterProps {
  currentStatus: JobStatus | "Todos";
  onStatusChange: (status: JobStatus | "Todos") => void;
  counts: Record<string, number>;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  currentStatus,
  onStatusChange,
  counts,
}) => {
  const statuses: (JobStatus | "Todos")[] = [
    "Todos",
    "Aplicado",
    "Entrevista",
    "Aprovado",
    "Rejeitado",
    "Sem resposta",
  ];

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2 sm:justify-start">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={clsx(
            "flex items-center cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            currentStatus === status
              ? "bg-blue-600 text-white"
              : [
                  "bg-white text-gray-700 hover:bg-gray-100",
                  "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                  "border border-black/20 dark:border-gray-600",
                ],
          )}
        >
          <span>{status}</span>
          {counts[status] > 0 && (
            <span
              className={clsx(
                "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                currentStatus === status
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
              )}
            >
              {counts[status]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
