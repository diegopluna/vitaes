"use client";

import {
  CVProps,
} from "@/types/cv-types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import kendallRoyCV from "./example-cvs/kendall-roy";
import useLocalStorage from "./use-local-storage";

type CVContextData = {
  cv: CVProps;
  setCV: Dispatch<SetStateAction<CVProps>>;
};
const CVContext = createContext<CVContextData | undefined>(undefined);

export function useCV(): CVContextData {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}

export function CVContextProvider({ children }: { children: ReactNode }) {
  const [cv, setCV] = useLocalStorage<CVProps>('vitaes-cv', kendallRoyCV);

  const output = {
    cv,
    setCV: setCV,
  };
  return <CVContext.Provider value={output}>{children}</CVContext.Provider>;
}
