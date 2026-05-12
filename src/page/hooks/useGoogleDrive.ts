import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { googleDriveService } from "@/src/services/googleDrive.service";
import { useAuth } from "@/src/contexts/auth.context";
import { Job } from "../jobs.types";

export const useGoogleDrive = (localJobs: Job[]) => {
  const { googleToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: remoteData,
    isLoading: isFetchingRemote,
    refetch: refetchRemote,
  } = useQuery({
    queryKey: ["google-drive-data"],
    queryFn: async () => {
      const fileId = await googleDriveService.findBackupFile();
      if (!fileId) return null;
      return await googleDriveService.downloadFile(fileId);
    },
    enabled: !!googleToken,
    retry: 1,
  });

  const isSynced = useMemo(() => {
    if (!googleToken || isFetchingRemote) return null;
    if (!remoteData && localJobs.length === 0) return true;
    if (!remoteData) return false;

    return JSON.stringify(localJobs) === JSON.stringify(remoteData);
  }, [localJobs, remoteData, googleToken, isFetchingRemote]);

  const pushMutation = useMutation({
    mutationFn: async (data: any) => {
      const fileId = await googleDriveService.findBackupFile();
      await googleDriveService.uploadFile(data, fileId || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-drive-data"] });
    },
  });

  const pullMutation = useMutation({
    mutationFn: async () => {
      const fileId = await googleDriveService.findBackupFile();
      if (!fileId) {
        throw new Error("Nenhum backup encontrado no Google Drive.");
      }
      return await googleDriveService.downloadFile(fileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-drive-data"] });
    },
  });

  return {
    pushToDrive: pushMutation.mutateAsync,
    pullFromDrive: pullMutation.mutateAsync,
    checkSyncStatus: refetchRemote,
    isSyncing:
      isFetchingRemote || pushMutation.isPending || pullMutation.isPending,
    isSynced,
  };
};
