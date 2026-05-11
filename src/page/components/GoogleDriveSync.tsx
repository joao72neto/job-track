import React from "react";
import Button from "@/src/components/Button";
import { FcGoogle } from "react-icons/fc";
import { HiLogout, HiCloudDownload } from "react-icons/hi";

interface GoogleDriveSyncProps {
  onSyncComplete?: (data: any) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const GoogleDriveSync: React.FC<GoogleDriveSyncProps> = ({
  isAuthenticated,
  login,
  logout,
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
        title="Sincronizar agora"
        className="w-full sm:w-auto"
      >
        <div className="flex items-center gap-2">
          <HiCloudDownload size={20} className="text-blue-500" />
          <span>Sincronizar</span>
        </div>
      </Button>
      <Button
        variant="secondary"
        onClick={logout}
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
