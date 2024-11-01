'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type BuilderTabStore,
  createBuilderTabStore,
} from '@/stores/builder-tab-store'

export type BuilderTabStoreApi = ReturnType<typeof createBuilderTabStore>

export const BuilderTabStoreContext = createContext<
  BuilderTabStoreApi | undefined
>(undefined)

export interface BuilderTabStoreProviderProps {
  children: ReactNode
}

export const BuilderTabStoreProvider = ({
  children,
}: BuilderTabStoreProviderProps) => {
  const storeRef = useRef<BuilderTabStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createBuilderTabStore()
  }

  return (
    <BuilderTabStoreContext.Provider value={storeRef.current}>
      {children}
    </BuilderTabStoreContext.Provider>
  )
}

export const useBuilderTabStore = <T,>(
  selector: (store: BuilderTabStore) => T,
): T => {
  const builderTabStoreContext = useContext(BuilderTabStoreContext)
  if (!builderTabStoreContext) {
    throw new Error(
      'useBuilderTabStore must be used within a BuilderTabStoreProvider',
    )
  }
  return useStore(builderTabStoreContext, selector)
}
