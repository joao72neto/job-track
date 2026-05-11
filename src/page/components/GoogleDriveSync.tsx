import React from "react";
import Button from "@/src/components/Button";
import { FcGoogle } from "react-icons/fc";
import {
  HiLogout,
  HiCloudDownload,
  HiCloudUpload,
  HiRefresh,
} from "react-icons/hi";

interface GoogleDriveSyncProps {
  isAuthenticated: boolean;
  isSyncing?: boolean;
  login: () => void;
  logout: () => void;
  onPush: () => void;
  onPull: () => void;
}

const GoogleDriveSync: React.FC<GoogleDriveSyncProps> = ({
  isAuthenticated,
  isSyncing,
  login,
  logout,
  onPush,
  onPull,
}) => {
  if (!isAuthenticated) {
    return (
      <Button variant="secondary" onClick={login} className="w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <FcGoogle size={20} />
          <span>Conectar Google Drive</span>
        </div>
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={onPush}
        disabled={isSyncing}
        title="Enviar backup para o Drive"
        className="w-full sm:w-auto"
      >
        <div className="flex items-center gap-2">
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
        className="w-full sm:w-auto"
      >
        <div className="flex items-center gap-2">
          {isSyncing ? (
            <HiRefresh size={20} className="animate-spin" />
          ) : (
            <HiCloudDownload size={20} className="text-green-500" />
          )}
          <span>Restaurar</span>
        </div>
      </Button>
      <Button
        variant="secondary"
        onClick={logout}
        disabled={isSyncing}
        title="Desconectar"
        className="w-full sm:w-auto"
      >
        <div className="flex items-center gap-2">
          <HiLogout size={20} className="text-red-500" />
          <span>Sair</span>
        </div>
      </Button>
    </div>
  );
};

export default GoogleDriveSync;
