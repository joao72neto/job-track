import { useState } from "react";
import { Job } from "../jobs.types";

export const useJobsModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleViewJob = (job: Job) => {
    setViewingJob(job);
    setIsViewModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeViewModal = () => setIsViewModalOpen(false);

  return {
    isModalOpen,
    isViewModalOpen,
    editingJob,
    viewingJob,
    openAddModal,
    handleEditJob,
    handleViewJob,
    closeModal,
    closeViewModal,
  };
};
