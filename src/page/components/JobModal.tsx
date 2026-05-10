import React, { useState, useEffect } from "react";
import { Job } from "../jobs.types";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import ModalContainer from "@/src/components/modals/ModalContainer";

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
    link: "",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        company: editingJob.company,
        role: editingJob.role,
        platform: editingJob.platform,
        date: editingJob.date,
        status: editingJob.status,
        notes: editingJob.notes,
        link: editingJob.link || "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        platform: "",
        date: new Date().toISOString().split("T")[0],
        status: "Aplicado",
        notes: "",
        link: "",
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
    <ModalContainer close={onClose} size="sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        {editingJob ? "Editar Vaga" : "Adicionar Nova Vaga"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          required
          label="Empresa"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Ex: Google, Nubank..."
        />
        <Input
          required
          label="Vaga"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Ex: Front Junior, Fullstack..."
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            required
            label="Plataforma"
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            placeholder="Ex: LinkedIn, Nerdin..."
          />
          <Input
            required
            label="Data"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Link da vaga"
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://..."
        />
        <Input
          label="Status"
          as="select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Aplicado">Aplicado</option>
          <option value="Entrevista">Entrevista</option>
          <option value="Rejeitado">Rejeitado</option>
          <option value="Sem resposta">Sem resposta</option>
        </Input>
        <Input
          label="Observações"
          as="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="..."
        />
        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default JobModal;
