import { useState, useEffect, useCallback } from "react";
import { Job } from "../jobs.types";
import { autoUpdateJobs, autoUpdateJobStatus } from "../jobs.utils";
import { localStorageKeys } from "@/src/localStorage.utils";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedJobs = localStorage.getItem(localStorageKeys.jobs);
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
    localStorage.setItem(localStorageKeys.jobs, JSON.stringify(jobs));
  }, [jobs, isInitialized]);

  const addJob = useCallback((job: Job, editingJobId?: string) => {
    const processedJob = autoUpdateJobStatus(job);

    if (editingJobId) {
      setJobs((prev) =>
        prev.map((j) => (j.id === editingJobId ? processedJob : j)),
      );
    } else {
      setJobs((prev) => [processedJob, ...prev]);
    }
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const importJobs = useCallback((importedJobs: Job[]) => {
    setJobs(autoUpdateJobs(importedJobs));
  }, []);

  return {
    jobs,
    setJobs,
    isInitialized,
    addJob,
    deleteJob,
    importJobs,
  };
};
