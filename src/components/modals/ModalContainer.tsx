import clsx from "clsx";
import { useEffect } from "react";

const sizes = {
  sm: "max-w-md",
  md: "max-w-[600px]",
  lg: "max-w-[800px]",
};

const ModalContainer = ({
  children,
  className,
  size = "sm",
  close,
}: {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
  close?: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center z-50 bg-[#00000085] backdrop-blur-md",
      )}
      onClick={() => close?.()}
    >
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 p-6 rounded-xl w-full mx-4 relative max-h-[90vh]",
          "overflow-auto overscroll-contain animate-fade-in",
          className,
          sizes[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
