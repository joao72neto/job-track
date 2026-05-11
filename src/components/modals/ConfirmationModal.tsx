import React from "react";
import ModalContainer from "./ModalContainer";
import Button from "../Button";
import { HiExclamation, HiCheckCircle } from "react-icons/hi";
import clsx from "clsx";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const variantClasses = {
    danger: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
    warning:
      "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    info: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    success:
      "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  };

  const Icon = variant === "success" ? HiCheckCircle : HiExclamation;

  return (
    <ModalContainer close={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={clsx(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
            variantClasses[variant],
          )}
        >
          <Icon size={24} />
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="mb-6 text-gray-500 dark:text-gray-400">{message}</p>

        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          {onConfirm && (
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full sm:w-28"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={clsx(
              "w-full sm:w-28",
              variant === "danger" && "bg-red-600 hover:bg-red-700",
              variant === "success" && "bg-green-600 hover:bg-green-700",
            )}
          >
            {onConfirm ? confirmText : "Fechar"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmationModal;
