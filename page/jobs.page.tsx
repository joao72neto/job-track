"use client";

import clsx from "clsx";
import JobItem from "./components/JobItem";
import { useEffect, useState } from "react";
import { Job, JobStatus } from "./jobs.types";
import StatusFilter from "./components/StatusFilter";
import JobModal from "./components/JobModal";

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<JobStatus | "Todos">(
    "Todos",
  );

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error("Error loading jobs:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (job: Job) => {
    if (editingJob) {
      setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
    } else {
      setJobs([job, ...jobs]);
    }
    setEditingJob(null);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `job-track-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedJobs = JSON.parse(content);
        if (Array.isArray(importedJobs)) {
          if (
            confirm(
              "Deseja substituir as vagas atuais pelas do arquivo importado?",
            )
          ) {
            setJobs(importedJobs);
          }
        } else {
          alert(
            "Arquivo JSON inválido. Certifique-se de que é uma lista de vagas.",
          );
        }
      } catch (err) {
        console.error("Erro ao importar JSON:", err);
        alert("Erro ao ler o arquivo JSON.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const filteredJobs =
    filterStatus === "Todos"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  return (
    <main className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Job Track
          </h1>
          <div className="flex flex-wrap gap-2">
            <label
              className={clsx(
                "inline-flex cursor-pointer items-center rounded-lg border",
                "border-gray-300 bg-white px-4 py-2 text-sm font-medium",
                "text-gray-700 hover:bg-gray-50 dark:border-gray-600",
                "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
              )}
            >
              Importar JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className={clsx(
                "inline-flex items-center rounded-lg border border-gray-300 bg-white",
                "px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
                "dark:hover:bg-gray-700",
              )}
            >
              Exportar JSON
            </button>
            <button
              onClick={openAddModal}
              className={clsx(
                "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white",
                "hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300",
                "dark:focus:ring-blue-800",
              )}
            >
              Adicionar nova vaga
            </button>
          </div>
        </div>

        <StatusFilter
          currentStatus={filterStatus}
          onStatusChange={setFilterStatus}
        />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Empresa
                </th>
                <th scope="col" className="px-6 py-3">
                  Vaga
                </th>
                <th scope="col" className="px-6 py-3">
                  Plataforma
                </th>
                <th scope="col" className="px-6 py-3">
                  Data
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Observações
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobItem
                    key={job.id}
                    job={job}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                ))
              ) : (
                <tr className="bg-white dark:bg-gray-800">
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {jobs.length === 0
                      ? "Nenhuma vaga adicionada ainda."
                      : "Nenhuma vaga encontrada com este status."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddJob}
        editingJob={editingJob}
      />
    </main>
  );
};

export default JobsPage;
