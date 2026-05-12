import { useState, useMemo, useEffect } from "react";
import { Job, JobStatus } from "../jobs.types";

const ITEMS_PER_PAGE = 10;

export const useJobsFilter = (jobs: Job[]) => {
  const [filterStatus, setFilterStatus] = useState<JobStatus | "Todos">(
    "Todos",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus =
        filterStatus === "Todos" || job.status === filterStatus;
      const matchesSearch = job.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [jobs, filterStatus, searchQuery]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const statusCounts = useMemo(() => {
    const counts = {
      Todos: jobs.length,
      Aplicado: 0,
      Entrevista: 0,
      Rejeitado: 0,
      "Sem resposta": 0,
    };

    jobs.forEach((job) => {
      if (counts[job.status] !== undefined) {
        counts[job.status]++;
      }
    });

    return counts;
  }, [jobs]);

  return {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    filteredJobs,
    paginatedJobs,
    totalPages,
    statusCounts,
  };
};
