"use client";

import JobItem from "./components/JobItem";
import { useEffect, useState } from "react";
import { Job, JobStatus } from "./jobs.types";
import StatusFilter from "./components/StatusFilter";
import SearchBar from "./components/SearchBar";
import JobModal from "./components/JobModal";
import JobViewModal from "./components/JobViewModal";
import { HiPlus } from "react-icons/hi";

import Button from "@/src/components/Button";

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<JobStatus | "Todos">(
    "Todos",
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleViewJob = (job: Job) => {
    setViewingJob(job);
    setIsViewModalOpen(true);
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

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      filterStatus === "Todos" || job.status === filterStatus;
    const matchesSearch = job.company
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Job Track
          </h1>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
            <Button variant="secondary" as="label" className="w-full sm:w-auto">
              Importar JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </Button>
            <Button
              onClick={handleExport}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Exportar JSON
            </Button>
            <Button
              onClick={openAddModal}
              className="col-span-2 w-full sm:w-auto"
            >
              <div className="flex items-center gap-2">
                <HiPlus size={20} />
                <span>Adicionar nova vaga</span>
              </div>
            </Button>
          </div>
        </div>

        <StatusFilter
          currentStatus={filterStatus}
          onStatusChange={setFilterStatus}
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-6 flex flex-col gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobItem
                key={job.id}
                job={job}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onView={handleViewJob}
              />
            ))
          ) : (
            <div className="border border-black/20 dark:border-gray-700 rounded-lg bg-white p-12 text-center dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                {jobs.length === 0
                  ? "Nenhuma vaga adicionada ainda."
                  : "Nenhuma vaga encontrada com estes filtros."}
              </p>
            </div>
          )}
        </div>
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddJob}
        editingJob={editingJob}
      />

      <JobViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        job={viewingJob}
      />
    </main>
  );
};

export default JobsPage;
