"use client";

import JobItem from "./components/JobItem";
import { useEffect, useMemo, useState } from "react";
import { Job, JobStatus } from "./jobs.types";
import { autoUpdateJobs, autoUpdateJobStatus } from "./jobs.utils";
import StatusFilter from "./components/StatusFilter";
import SearchBar from "./components/SearchBar";
import JobModal from "./components/JobModal";
import JobViewModal from "./components/JobViewModal";
import Pagination from "@/src/components/Pagination";
import GoogleDriveSync from "./components/GoogleDriveSync";
import { useAuth } from "@/src/contexts/auth.context";
import { useGoogleDrive } from "./hooks/useGoogleDrive";
import { useModal } from "@/src/contexts/modal.context";
import { HiPlus } from "react-icons/hi";

import Button from "@/src/components/Button";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { isAuthenticated, login, logout } = useAuth();
  const { pushToDrive, pullFromDrive, isSyncing } = useGoogleDrive();
  const { showDanger, showWarning, showSuccess, showInfo } = useModal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const [filterStatus, setFilterStatus] = useState<JobStatus | "Todos">(
    "Todos",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery]);

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      try {
        const parsedJobs = JSON.parse(savedJobs);
        setJobs(autoUpdateJobs(parsedJobs));
      } catch (e) {
        console.error("Error loading jobs:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (job: Job) => {
    const processedJob = autoUpdateJobStatus(job);
    if (editingJob) {
      setJobs(jobs.map((j) => (j.id === processedJob.id ? processedJob : j)));
    } else {
      setJobs([processedJob, ...jobs]);
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

  const handleDeleteClick = (id: string) => {
    showDanger({
      title: "Excluir Vaga",
      message:
        "Tem certeza que deseja excluir esta vaga? Esta ação não poderá ser desfeita.",
      onConfirm: () => {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      },
    });
  };

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const triggerExport = () => {
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

  const handleExportClick = () => {
    showWarning({
      title: "Exportar Dados",
      message:
        "Deseja baixar um arquivo de backup (.json) com todas as suas vagas atuais?",
      onConfirm: triggerExport,
      confirmText: "Exportar",
    });
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
          showWarning({
            title: "Importar Dados",
            message:
              "Deseja substituir todas as vagas atuais pelas do arquivo importado? Esta ação sobrescreverá seus dados locais.",
            onConfirm: () => {
              setJobs(autoUpdateJobs(importedJobs));
            },
            confirmText: "Importar",
          });
        } else {
          showWarning({
            title: "Erro na Importação",
            message:
              "Arquivo JSON inválido. Certifique-se de que é uma lista de vagas.",
          });
        }
      } catch (err) {
        console.error("Erro ao importar JSON:", err);
        alert("Erro ao ler o arquivo JSON.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handlePush = async () => {
    try {
      await pushToDrive(jobs);
      showSuccess({
        title: "Backup Concluído",
        message: "Seus dados foram salvos com sucesso no Google Drive!",
      });
    } catch (err: any) {
      showDanger({
        title: "Erro no Backup",
        message: err.message,
      });
    }
  };

  const handlePull = async () => {
    showWarning({
      title: "Restaurar Dados",
      message:
        "Isso substituirá todas as suas vagas locais pelos dados do Google Drive. Deseja continuar?",
      onConfirm: async () => {
        try {
          const data = await pullFromDrive();
          if (data && Array.isArray(data)) {
            setJobs(autoUpdateJobs(data));
            showSuccess({
              title: "Restauração Concluída",
              message: "Seus dados foram restaurados com sucesso!",
            });
          }
        } catch (err: any) {
          showDanger({
            title: "Erro na Restauração",
            message: err.message,
          });
        }
      },
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      filterStatus === "Todos" || job.status === filterStatus;
    const matchesSearch = job.company
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="flex gap-3 items-center text-3xl font-bold text-gray-900 dark:text-white min-w-60">
            <Image
              src="/job-track.svg"
              alt="Job Track"
              width={32}
              height={32}
            />
            <span>Job Track</span>
          </h1>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-end">
            <GoogleDriveSync
              isAuthenticated={isAuthenticated}
              isSyncing={isSyncing}
              login={login}
              logout={logout}
              onPush={handlePush}
              onPull={handlePull}
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                as="label"
                className="w-full lg:w-auto"
              >
                Importar JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </Button>
              <Button
                onClick={handleExportClick}
                variant="secondary"
                className="w-full lg:w-auto"
              >
                Exportar JSON
              </Button>
            </div>
            <Button
              onClick={openAddModal}
              className="w-full sm:col-span-2 lg:w-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <HiPlus size={20} />
                <span>Adicionar nova vaga</span>
              </div>
            </Button>
          </div>
        </div>

        <StatusFilter
          currentStatus={filterStatus}
          onStatusChange={setFilterStatus}
          counts={statusCounts}
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-6 flex flex-col gap-4">
          {paginatedJobs.length > 0 ? (
            <>
              {paginatedJobs.map((job) => (
                <JobItem
                  key={job.id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteClick}
                  onView={handleViewJob}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-4"
              />
            </>
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
