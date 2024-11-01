import { createStore } from 'zustand/vanilla'

type Tab = 'resume' | 'settings' | 'chat'

export type BuilderTabState = {
  activeTab: Tab
}

export type BuilderTabActions = {
  setActiveTab: (tab: Tab) => void
}

export type BuilderTabStore = BuilderTabState & BuilderTabActions

export const defaultInitState: BuilderTabState = {
  activeTab: 'resume',
}

export const createBuilderTabStore = (
  initialState: BuilderTabState = defaultInitState,
) => {
  return createStore<BuilderTabStore>()((set) => ({
    ...initialState,
    setActiveTab: (tab: Tab) => set({ activeTab: tab }),
  }))
}
