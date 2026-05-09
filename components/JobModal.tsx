import React, { useState, useEffect } from "react";
import { Job } from "./types";
import { clsx } from "clsx";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  editingJob?: Job | null;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingJob,
}) => {
  const [formData, setFormData] = useState<Omit<Job, "id">>({
    company: "",
    role: "",
    platform: "",
    date: new Date().toISOString().split("T")[0],
    status: "Aplicado",
    notes: "",
  });

  const inputClasses = clsx(
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm",
    "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    "dark:border-gray-600 dark:bg-gray-700 dark:text-white",
  );

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        role: editingJob.role,
        platform: editingJob.platform,
        date: editingJob.date,
        status: editingJob.status,
        notes: editingJob.notes,
      });
    } else {
      setFormData({
        company: "",
        role: "",
        platform: "",
        date: new Date().toISOString().split("T")[0],
        status: "Aplicado",
        notes: "",
      });
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingJob?.id || crypto.randomUUID(),
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editingJob ? "Editar Vaga" : "Adicionar Nova Vaga"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Empresa
            </label>
            <input
              required
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Vaga
            </label>
            <input
              required
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Ex: Front Junior, Fullstack..."
              className={inputClasses}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Plataforma
              </label>
              <input
                required
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                placeholder="Ex: LinkedIn, Nerdin..."
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Data
              </label>
              <input
                required
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="Aplicado">Aplicado</option>
              <option value="Entrevista">Entrevista</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Sem resposta">Sem resposta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className={inputClasses}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={clsx(
                "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                "hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
              )}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={clsx(
                "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white",
                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              )}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
