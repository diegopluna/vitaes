import { CVProps } from "@/types/cv-types"
import kendallRoyCV from "@/components/cv/example-cvs/kendall-roy";
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CVState {
  cv: CVProps
}

const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cv: kendallRoyCV,
    }),
    {
      name: 'vitaes-cv',
      storage: createJSONStorage(() => localStorage)
    }
  )
)