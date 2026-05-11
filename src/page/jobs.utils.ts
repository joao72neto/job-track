import { Job } from "./jobs.types";

/**
 * Checks if a date is older than one month from now.
 * @param dateStr Date string in YYYY-MM-DD format.
 * @returns True if the date is older than one month.
 */
export const isOlderThanAMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();

  // Normalize dates to midnight to avoid time-of-day issues
  const checkDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );

  return checkDate < oneMonthAgo;
};

/**
 * Automatically updates job status to "Sem resposta" if it's "Aplicado"
 * and the application date is older than one month.
 */
export const autoUpdateJobStatus = (job: Job): Job => {
  if (job.status === "Aplicado" && isOlderThanAMonth(job.date)) {
    return { ...job, status: "Sem resposta" };
  }
  return job;
};

/**
 * Applies autoUpdateJobStatus to an array of jobs.
 */
export const autoUpdateJobs = (jobs: Job[]): Job[] => {
  return jobs.map(autoUpdateJobStatus);
};
