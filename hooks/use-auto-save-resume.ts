import { useMutation } from 'convex/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import type { Resume } from '@/convex/resume/type'

type Options = {
  // How long to wait after the last change before saving
  debounceMs?: number
  // Try saving once more when the component unmounts
  flushOnUnmount?: boolean
  // Try saving when the tab becomes hidden (switching tabs, closing)
  saveOnVisibilityChange?: boolean
}

export function useAutoSaveResume(
  resume?: Resume,
  resumeId?: Id<'resumes'>,
  resumeName?: string,
  options: Options = {},
) {
  const {
    debounceMs = 1200,
    flushOnUnmount = true,
    saveOnVisibilityChange = true,
  } = options

  const updateResume = useMutation(api.resume.functions.update)

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  // Use number for browsers instead of NodeJS.Timeout
  const timerRef = useRef<number | null>(null)

  // Digest the last successfully saved snapshot
  const lastSavedDigestRef = useRef<string>('')

  // Always keep the latest values in a ref to avoid stale closures
  const latestRef = useRef({ resume, resumeId, resumeName })
  useEffect(() => {
    latestRef.current = { resume, resumeId, resumeName }
  }, [resume, resumeId, resumeName])

  // Compute a digest for current data to detect changes
  const digest = useMemo(() => {
    if (!resume || !resumeName) return ''
    return makeDigest(resume, resumeName)
  }, [resume, resumeName])

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // biome-ignore lint: ignore clearTimer as dependency because it changes on every render
  const saveNow = useCallback(async () => {
    const { resume: r, resumeId: id, resumeName: name } = latestRef.current
    if (!r || !id || !name) return

    const currentDigest = makeDigest(r, name)
    if (currentDigest === lastSavedDigestRef.current) return

    clearTimer()
    setIsSaving(true)
    setError(null)

    try {
      await updateResume({
        id,
        name,
        data: r,
      })
      lastSavedDigestRef.current = currentDigest
      setLastSavedAt(new Date())
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsSaving(false)
    }
  }, [updateResume])

  // Debounce whenever data differs from the last successful save
  // biome-ignore lint: ignore clearTimer as dependency because it changes on every render
  useEffect(() => {
    if (!resume || !resumeId || !resumeName) return

    if (digest === lastSavedDigestRef.current) {
      clearTimer()
      return
    }

    clearTimer()
    timerRef.current = window.setTimeout(() => {
      void saveNow()
    }, debounceMs)

    return clearTimer
  }, [digest, resume, resumeId, resumeName, debounceMs, saveNow])

  // Try to persist on tab hide/unmount for fewer lost changes
  useEffect(() => {
    if (!saveOnVisibilityChange && !flushOnUnmount) return

    const tryFlush = () => {
      void saveNow() // Fire and forget; may not complete before unload
    }

    if (saveOnVisibilityChange) {
      const onVis = () => {
        if (document.visibilityState === 'hidden') tryFlush()
      }

      document.addEventListener('visibilitychange', onVis)
      window.addEventListener('pagehide', tryFlush)
      return () => {
        document.removeEventListener('visibilitychange', onVis)
        document.removeEventListener('pagehide', tryFlush)
      }
    }

    return () => {
      if (flushOnUnmount) tryFlush()
    }
  }, [flushOnUnmount, saveOnVisibilityChange, saveNow])

  // biome-ignore lint: ignore clearTimer as dependency because it changes on every render
  const cancel = useCallback(() => {
    clearTimer()
  }, [])

  return {
    isSaving,
    error,
    lastSavedAt,
    hasUnsavedChanges:
      !!resume &&
      !!resumeName &&
      makeDigest(resume, resumeName) !== lastSavedDigestRef.current,
    saveNow, // Optional manual save button
    cancel,
  }
}

function makeDigest(resume: Resume, name: string): string {
  return `${name}|${djb2(stableStringify(resume))}`
}

function stableStringify(value: unknown): string {
  const seen = new WeakSet<object>()
  // biome-ignore lint: ignore the any
  return JSON.stringify(value, (_k, val: any) => {
    if (val && typeof val === 'object') {
      if (seen.has(val)) return
      seen.add(val)
      if (Array.isArray(val)) return val
      const out: Record<string, unknown> = {}
      for (const k of Object.keys(val).sort()) out[k] = val[k]
      return out
    }
    return val
  })!
}

function djb2(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i)
  }
  return h >>> 0
}
