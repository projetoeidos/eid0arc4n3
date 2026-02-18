"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type UserLevel, LEVEL_INDEX, LEVELS } from "./mock-data"

interface ProgressionState {
  level: UserLevel
  completedDocs: string[]
  bookmarks: string[]
  ritualsCompleted: number
}

interface ProgressionContextType {
  state: ProgressionState
  setLevel: (level: UserLevel) => void
  completeDoc: (docId: string) => void
  toggleBookmark: (docId: string) => void
  canAccess: (requiredLevel: UserLevel) => boolean
  incrementRituals: () => void
}

const ProgressionContext = createContext<ProgressionContextType | null>(null)

export function ProgressionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressionState>({
    level: "VISITANTE",
    completedDocs: [],
    bookmarks: [],
    ritualsCompleted: 0,
  })

  const setLevel = useCallback((level: UserLevel) => {
    setState((prev) => ({ ...prev, level }))
  }, [])

  const completeDoc = useCallback((docId: string) => {
    setState((prev) => ({
      ...prev,
      completedDocs: prev.completedDocs.includes(docId) ? prev.completedDocs : [...prev.completedDocs, docId],
    }))
  }, [])

  const toggleBookmark = useCallback((docId: string) => {
    setState((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(docId)
        ? prev.bookmarks.filter((id) => id !== docId)
        : [...prev.bookmarks, docId],
    }))
  }, [])

  const canAccess = useCallback(
    (requiredLevel: UserLevel) => {
      return LEVEL_INDEX[state.level] >= LEVEL_INDEX[requiredLevel]
    },
    [state.level]
  )

  const incrementRituals = useCallback(() => {
    setState((prev) => ({ ...prev, ritualsCompleted: prev.ritualsCompleted + 1 }))
  }, [])

  return (
    <ProgressionContext.Provider value={{ state, setLevel, completeDoc, toggleBookmark, canAccess, incrementRituals }}>
      {children}
    </ProgressionContext.Provider>
  )
}

export function useProgression() {
  const context = useContext(ProgressionContext)
  if (!context) {
    throw new Error("useProgression must be used within a ProgressionProvider")
  }
  return context
}

export { LEVELS, LEVEL_INDEX }
