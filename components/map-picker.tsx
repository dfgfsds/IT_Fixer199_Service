"use client"

import { useEffect, useRef, useState } from "react"
import { Minus, Plus, LocateFixed } from "lucide-react"

interface MapPickerProps {
  lat: number
  lng: number
  onMove: (lat: number, lng: number) => void
  onRecenter?: () => void
}

/* 
  Interactive map picker using Leaflet loaded via CDN.
  Fixed center pin + draggable background (Swiggy-style UX).
*/
export function MapPicker({ lat, lng, onMove, onRecenter }: MapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [ready, setReady] = useState(false)

  // Load Leaflet CSS + JS
  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if already loaded
    if ((window as unknown as Record<string, unknown>).L) {
      setReady(true)
      return
    }

    // Load CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    // Load JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.onload = () => setReady(true)
    document.head.appendChild(script)

    return () => {
      // Don't remove - other components may need them
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!ready || !containerRef.current) return
    const L = (window as unknown as Record<string, typeof import("leaflet").default>).L
    if (!L) return

    // Destroy previous
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Fire move event on drag/zoom
    map.on("moveend", () => {
      const center = map.getCenter()
      onMove(center.lat, center.lng)
    })

    mapRef.current = map

    // Force resize after a tick (fixes grey tile issue in modals)
    setTimeout(() => map.invalidateSize(), 100)

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Pan to new coords when they change externally
  useEffect(() => {
    if (!mapRef.current) return
    const currentCenter = mapRef.current.getCenter()
    const dist = Math.abs(currentCenter.lat - lat) + Math.abs(currentCenter.lng - lng)
    if (dist > 0.0005) {
      mapRef.current.flyTo([lat, lng], mapRef.current.getZoom(), { duration: 0.8 })
    }
  }, [lat, lng])

  const handleZoomIn = () => mapRef.current?.zoomIn()
  const handleZoomOut = () => mapRef.current?.zoomOut()
  const handleRecenter = () => {
    if (onRecenter) onRecenter()
    mapRef.current?.flyTo([lat, lng], 16, { duration: 0.6 })
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
      {/* Map container */}
      <div ref={containerRef} className="h-full w-full" />

      {/* Fixed center pin */}
      <div className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center">
        <div className="flex flex-col items-center -translate-y-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="h-4 w-0.5 bg-primary/60" />
          <div className="h-2 w-2 rounded-full bg-primary/40 shadow-sm" />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-lg transition-all hover:bg-muted active:scale-90"
        >
          <Plus className="h-4 w-4 text-foreground" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-lg transition-all hover:bg-muted active:scale-90"
        >
          <Minus className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        className="absolute bottom-3 right-3 z-[1000] flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-lg transition-all hover:bg-muted active:scale-90"
      >
        <LocateFixed className="h-5 w-5 text-primary" />
      </button>

      {/* Loading overlay */}
      {!ready && (
        <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-xs text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
