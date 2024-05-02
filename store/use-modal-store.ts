import { create } from "zustand";

interface ModalStoreProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));
