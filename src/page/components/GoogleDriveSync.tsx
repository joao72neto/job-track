import React from "react";
import Button from "@/src/components/Button";
import { FcGoogle } from "react-icons/fc";
import {
  HiLogout,
  HiCloudDownload,
  HiCloudUpload,
  HiRefresh,
  HiCheckCircle,
} from "react-icons/hi";
import clsx from "clsx";

interface GoogleDriveSyncProps {
  isAuthenticated: boolean;
  isSyncing?: boolean;
  isSynced?: boolean | null;
  login: () => void;
  logout: () => void;
  onPush: () => void;
  onPull: () => void;
}

const GoogleDriveSync: React.FC<GoogleDriveSyncProps> = ({
  isAuthenticated,
  isSyncing,
  isSynced,
  login,
  logout,
  onPush,
  onPull,
}) => {
  if (!isAuthenticated) {
    return (
      <Button variant="secondary" onClick={login} className="sm:col-span-2">
        <div className="flex items-center justify-center gap-2">
          <FcGoogle size={20} />
          <span>Conectar Google Drive</span>
        </div>
      </Button>
    );
  }

  return (
    <>
      {isSynced && !isSyncing ? (
        <div
          className={clsx(
            "flex w-full items-center justify-center gap-2",
            "rounded-lg border border-green-200 bg-green-50 px-4",
            "py-2 text-sm font-medium text-green-700 dark:border-green-900/30",
            "dark:bg-green-900/20 dark:text-green-400 sm:w-auto",
          )}
        >
          <HiCheckCircle size={20} />
          <span>Sincronizado</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={onPush}
            disabled={isSyncing}
            title="Enviar backup para o Drive"
            className="w-full lg:w-auto"
          >
            <div className="flex items-center justify-center gap-2">
              {isSyncing ? (
                <HiRefresh size={20} className="animate-spin" />
              ) : (
                <HiCloudUpload size={20} className="text-blue-500" />
              )}
              <span>Backup</span>
            </div>
          </Button>
          <Button
            variant="secondary"
            onClick={onPull}
            disabled={isSyncing}
            title="Restaurar backup do Drive"
            className="w-full lg:w-auto"
          >
            <div className="flex items-center justify-center gap-2">
              {isSyncing ? (
                <HiRefresh size={20} className="animate-spin" />
              ) : (
                <HiCloudDownload size={20} className="text-green-500" />
              )}
              <span>Restaurar</span>
            </div>
          </Button>
        </div>
      )}
      <Button
        variant="secondary"
        onClick={logout}
        disabled={isSyncing}
        title="Desconectar"
        className="w-full sm:w-auto"
      >
        <div className="flex items-center justify-center gap-2">
          <HiLogout size={20} className="text-red-500" />
          <span className="sm:hidden lg:inline">Sair</span>
        </div>
      </Button>
    </>
  );
};

export default GoogleDriveSync;
