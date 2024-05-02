"use client";

import React, { createContext } from "react";

type ModalProviderProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

export const useModal = () => {
  const context = createContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const output = {
    open,
    setOpen,
  };

  return (
    <ModalContext.Provider value={output}>{children}</ModalContext.Provider>
  );
};
