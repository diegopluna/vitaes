import React, { createContext, useContext } from 'react'

type SectionContextProps = {
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  setSectionRef: (id: string, ref: HTMLDivElement | null) => void
}

const SectionsContext = createContext<SectionContextProps | null>(null)

export const SectionsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const sectionRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})

  const setSectionRef = (id: string, ref: HTMLDivElement | null) => {
    sectionRefs.current[id] = ref
  }

  return (
    <SectionsContext.Provider value={{ sectionRefs, setSectionRef }}>
      {children}
    </SectionsContext.Provider>
  )
}

export const useSections = () => {
  return useContext(SectionsContext)
}
