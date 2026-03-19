"use client"

import { useState, useCallback } from "react"

interface GeolocationState {
  loading: boolean
  error: string | null
  coords: { lat: number; lng: number } | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coords: null,
  })

  const detect = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        setState({ loading: false, error: "Geolocation not supported", coords: null })
        resolve(null)
        return
      }

      setState((prev) => ({ ...prev, loading: true, error: null }))

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setState({ loading: false, error: null, coords })
          resolve(coords)
        },
        (err) => {
          let error = "Could not detect location"
          if (err.code === 1) error = "Location permission denied"
          if (err.code === 2) error = "Location unavailable"
          if (err.code === 3) error = "Location request timed out"
          setState({ loading: false, error, coords: null })
          resolve(null)
        },
        { timeout: 10000, enableHighAccuracy: true }
      )
    })
  }, [])

  return { ...state, detect }
}
