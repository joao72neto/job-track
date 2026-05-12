import { Job } from "../jobs.types";

export const useLocalBackup = ({
  jobs,
  importJobs,
  showWarning,
  showDanger,
}: {
  jobs: Job[];
  importJobs: Function;
  showWarning: Function;
  showDanger: Function;
}) => {
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
            onConfirm: () => importJobs(importedJobs),
            confirmText: "Importar",
          });
        } else {
          showDanger({
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

  return { triggerExport, handleImport };
};
