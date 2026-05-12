"use client";

import JobItem from "./components/JobItem";
import { autoUpdateJobs } from "./jobs.utils";
import StatusFilter from "./components/StatusFilter";
import SearchBar from "./components/SearchBar";
import JobModal from "./components/JobModal";
import JobViewModal from "./components/JobViewModal";
import Pagination from "@/src/components/Pagination";
import GoogleDriveSync from "./components/GoogleDriveSync";
import { useAuth } from "@/src/contexts/auth.context";
import { useGoogleDrive } from "./hooks/useGoogleDrive";
import { useJobs } from "./hooks/useJobs";
import { useJobsModals } from "./hooks/useJobsModals";
import { useJobsFilter } from "./hooks/useJobsFilter";
import { useModal } from "@/src/contexts/modal.context";
import { HiPlus } from "react-icons/hi";

import Button from "@/src/components/Button";
import Image from "next/image";
import { useLocalBackup } from "./hooks/useLocalBackup";

const JobsPage = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { showDanger, showWarning, showSuccess } = useModal();

  const { jobs, setJobs, addJob, deleteJob, importJobs } = useJobs();

  const { pushToDrive, pullFromDrive, isSyncing, isSynced } =
    useGoogleDrive(jobs);

  const {
    isModalOpen,
    isViewModalOpen,
    editingJob,
    viewingJob,
    openAddModal,
    handleEditJob,
    handleViewJob,
    closeModal,
    closeViewModal,
  } = useJobsModals();

  const {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedJobs,
    totalPages,
    statusCounts,
  } = useJobsFilter(jobs);

  const { triggerExport, handleImport } = useLocalBackup({
    jobs,
    importJobs,
    showWarning,
    showDanger,
  });

  const handleDeleteClick = (id: string) => {
    showDanger({
      title: "Excluir Vaga",
      message:
        "Tem certeza que deseja excluir esta vaga? Esta ação não poderá ser desfeita.",
      onConfirm: () => deleteJob(id),
    });
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

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="flex gap-3 items-center text-3xl font-bold text-gray-900 dark:text-white min-w-50">
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
              isSynced={isSynced}
              login={login}
              logout={logout}
              onPush={handlePush}
              onPull={handlePull}
            />
            <div className="flex gap-2 sm:col-span-2">
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
        onClose={closeModal}
        onSave={(job) => addJob(job, editingJob?.id)}
        editingJob={editingJob}
      />

      <JobViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        job={viewingJob}
      />
    </main>
  );
};

export default JobsPage;
