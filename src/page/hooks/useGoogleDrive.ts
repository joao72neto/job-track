import { useState, useCallback } from "react";
import { googleDriveService } from "@/src/services/googleDrive.service";
import { useAuth } from "@/src/contexts/auth.context";

export const useGoogleDrive = () => {
  const { googleToken } = useAuth();
  const [isSyncing, setIsSyncing] = useState(!!googleToken);
  const [isSynced, setIsSynced] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkSyncStatus = useCallback(
    async (localData: any) => {
      if (!googleToken) return;
      setIsSyncing(true);
      try {
        const fileId = await googleDriveService.findBackupFile(googleToken);
        if (!fileId) {
          setIsSynced(false);
          return;
        }
        const remoteData = await googleDriveService.downloadFile(
          googleToken,
          fileId,
        );
        const isSame = JSON.stringify(localData) === JSON.stringify(remoteData);
        setIsSynced(isSame);
      } catch (err) {
        console.error("Erro ao verificar sincronização:", err);
        setIsSynced(false);
      } finally {
        setIsSyncing(false);
      }
    },
    [googleToken],
  );

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
        setIsSynced(true);
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
      const data = await googleDriveService.downloadFile(googleToken, fileId);
      setIsSynced(true);
      return data;
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
    checkSyncStatus,
    setIsSynced,
    isSyncing,
    isSynced,
    error,
  };
};
