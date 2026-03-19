"use client"

import { useState, useCallback, useRef } from "react"

export interface GeocodedAddress {
  city: string
  state: string
  pincode: string
  street: string
  area: string
  fullAddress: string
}

const DEFAULT_ADDRESS: GeocodedAddress = {
  city: "",
  state: "",
  pincode: "",
  street: "",
  area: "",
  fullAddress: "",
}

export function useReverseGeocode() {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState<GeocodedAddress>(DEFAULT_ADDRESS)
  const abortRef = useRef<AbortController | null>(null)

  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<GeocodedAddress> => {
    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`,
        {
          headers: { "Accept-Language": "en" },
          signal: controller.signal,
        }
      )
      const data = await res.json()
      const addr = data.address || {}

      const result: GeocodedAddress = {
        city: addr.city || addr.town || addr.village || addr.county || addr.state_district || "Unknown",
        state: addr.state || "",
        pincode: addr.postcode || "",
        street: addr.road || addr.pedestrian || addr.footway || "",
        area: addr.neighbourhood || addr.suburb || addr.hamlet || "",
        fullAddress: data.display_name || "Unknown location",
      }

      setAddress(result)
      setLoading(false)
      return result
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // Silently ignore aborted requests
        return address
      }
      const fallback: GeocodedAddress = {
        city: "Unknown",
        state: "",
        pincode: "",
        street: "",
        area: "",
        fullAddress: "Could not determine address",
      }
      setAddress(fallback)
      setLoading(false)
      return fallback
    }
  }, [address])

  return { loading, address, reverseGeocode }
}
