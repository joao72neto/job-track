"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import ConfirmationModal from "../components/modals/ConfirmationModal";

type ModalVariant = "danger" | "warning" | "info" | "success";

interface ShowModalProps {
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface ModalContextType {
  showDanger: (props: ShowModalProps) => void;
  showWarning: (props: ShowModalProps) => void;
  showInfo: (props: ShowModalProps) => void;
  showSuccess: (props: ShowModalProps) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<
    ShowModalProps & { variant: ModalVariant }
  >({
    title: "",
    message: "",
    variant: "info",
  });

  const hideModal = useCallback(() => setIsOpen(false), []);

  const showModal = useCallback(
    (variant: ModalVariant, props: ShowModalProps) => {
      setModalProps({ ...props, variant });
      setIsOpen(true);
    },
    [],
  );

  const showDanger = (props: ShowModalProps) => showModal("danger", props);
  const showWarning = (props: ShowModalProps) => showModal("warning", props);
  const showInfo = (props: ShowModalProps) => showModal("info", props);
  const showSuccess = (props: ShowModalProps) => showModal("success", props);

  return (
    <ModalContext.Provider
      value={{
        showDanger,
        showWarning,
        showInfo,
        showSuccess,
        hideModal,
      }}
    >
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={hideModal}
        variant={modalProps.variant}
        title={modalProps.title}
        message={modalProps.message}
        onConfirm={modalProps.onConfirm}
        confirmText={modalProps.confirmText}
        cancelText={modalProps.cancelText}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
