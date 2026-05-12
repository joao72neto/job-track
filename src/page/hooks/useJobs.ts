import { useState, useEffect, useCallback } from "react";
import { Job } from "../jobs.types";
import { autoUpdateJobs, autoUpdateJobStatus } from "../jobs.utils";

export const useJobs = (onSyncChange?: (isSynced: boolean) => void) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      try {
        const parsedJobs = JSON.parse(savedJobs);
        const updatedJobs = autoUpdateJobs(parsedJobs);
        setJobs(updatedJobs);
      } catch (e) {
        console.error("Error loading jobs:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs, isInitialized]);

  const addJob = useCallback(
    (job: Job, editingJobId?: string) => {
      const processedJob = autoUpdateJobStatus(job);
      onSyncChange?.(false);

      if (editingJobId) {
        setJobs((prev) =>
          prev.map((j) => (j.id === editingJobId ? processedJob : j)),
        );
      } else {
        setJobs((prev) => [processedJob, ...prev]);
      }
    },
    [onSyncChange],
  );

  const deleteJob = useCallback(
    (id: string) => {
      onSyncChange?.(false);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    },
    [onSyncChange],
  );

  const importJobs = useCallback(
    (importedJobs: Job[]) => {
      onSyncChange?.(false);
      setJobs(autoUpdateJobs(importedJobs));
    },
    [onSyncChange],
  );

  return {
    jobs,
    setJobs,
    isInitialized,
    addJob,
    deleteJob,
    importJobs,
  };
};
