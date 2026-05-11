import { useState, useCallback } from "react";
import { googleDriveService } from "@/src/googleDrive.service";
import { useAuth } from "@/src/contexts/auth.context";

export const useGoogleDrive = () => {
  const { googleToken } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pushToDrive = useCallback(
    async (data: any) => {
      if (!googleToken) return;
      setIsSyncing(true);
      setError(null);
      try {
        const fileId = await googleDriveService.findBackupFile(googleToken);
        await googleDriveService.uploadFile(
          googleToken,
          data,
          fileId || undefined,
        );
      } catch (err: any) {
        setError(err.message || "Erro ao enviar dados para o Drive");
        throw err;
      } finally {
        setIsSyncing(false);
      }
    },
    [googleToken],
  );

  const pullFromDrive = useCallback(async () => {
    if (!googleToken) return;
    setIsSyncing(true);
    setError(null);
    try {
      const fileId = await googleDriveService.findBackupFile(googleToken);
      if (!fileId) {
        throw new Error("Nenhum backup encontrado no Google Drive.");
      }
      return await googleDriveService.downloadFile(googleToken, fileId);
    } catch (err: any) {
      setError(err.message || "Erro ao baixar dados do Drive");
      throw err;
    } finally {
      setIsSyncing(false);
    }
  }, [googleToken]);

  return {
    pushToDrive,
    pullFromDrive,
    isSyncing,
    error,
  };
};
