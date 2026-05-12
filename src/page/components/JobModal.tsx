import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Job } from "../jobs.types";
import { jobSchema, JobForm } from "../jobs.schema";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: yupResolver(jobSchema),
    mode: "onChange",
    defaultValues: {
      company: "",
      role: "",
      platform: "",
      date: new Date(),
      status: "Aplicado",
      notes: "",
      link: "",
    },
  });

  useEffect(() => {
    if (editingJob) {
      reset({
        ...editingJob,
        date: new Date(editingJob.date),
        link: editingJob.link || "",
        notes: editingJob.notes || "",
      });
    } else {
      reset({
        company: "",
        role: "",
        platform: "",
        date: new Date(),
        status: "Aplicado",
        notes: "",
        link: "",
      });
    }
  }, [editingJob, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: JobForm) => {
    onSave({
      ...data,
      id: editingJob?.id || crypto.randomUUID(),
      date: data.date.toISOString().split("T")[0],
      link: data.link || undefined,
      notes: data.notes || "",
    } as Job);
    onClose();
  };

  return (
    <ModalContainer close={onClose} size="sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        {editingJob ? "Editar Vaga" : "Adicionar Nova Vaga"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Empresa"
          placeholder="Ex: Google, Nubank..."
          error={errors.company?.message}
          {...register("company")}
        />
        <Input
          label="Vaga"
          placeholder="Ex: Front Junior, Fullstack..."
          error={errors.role?.message}
          {...register("role")}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Plataforma"
            placeholder="Ex: LinkedIn, Nerdin..."
            error={errors.platform?.message}
            {...register("platform")}
          />
          <Input
            label="Data"
            type="date"
            error={errors.date?.message}
            {...register("date")}
          />
        </div>
        <Input
          label="Link da vaga"
          type="url"
          placeholder="https://..."
          error={errors.link?.message}
          {...register("link")}
        />
        <Input
          label="Status"
          as="select"
          error={errors.status?.message}
          {...register("status")}
        >
          <option value="Aplicado">Aplicado</option>
          <option value="Entrevista">Entrevista</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Rejeitado">Rejeitado</option>
          <option value="Sem resposta">Sem resposta</option>
        </Input>
        <Input
          label="Observações"
          as="textarea"
          placeholder="..."
          error={errors.notes?.message}
          {...register("notes")}
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
