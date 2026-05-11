import { createContext, useContext } from "react";

export const ModalContext = createContext<any>(null);

export const ModalProvider = ({ children }: any) => {
  return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
