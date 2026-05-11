import React from "react";
import Image from "next/image";
import { HiRefresh } from "react-icons/hi";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="relative mb-6">
        <div className="h-24 w-24 animate-pulse rounded-full bg-blue-500/10 dark:bg-blue-500/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/job-track.svg"
            alt="Job Track Logo"
            width={48}
            height={48}
            className="drop-shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
        <HiRefresh size={24} className="animate-spin text-blue-500" />
        <span className="text-lg font-medium tracking-wide">Iniciando...</span>
      </div>

      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
        Preparando suas vagas
      </p>
    </div>
  );
};

export default LoadingScreen;
