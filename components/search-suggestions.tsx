"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MapPin, Search, X } from "lucide-react"

export interface SearchResult {
  id: string
  primary: string
  secondary: string
  lat: number
  lng: number
}

interface SearchSuggestionsProps {
  onSelect: (result: SearchResult) => void
  autoFocus?: boolean
}

/* 
  Debounced search using Nominatim API.
  Falls back to mock data if API fails.
*/
export function SearchSuggestions({ onSelect, autoFocus }: SearchSuggestionsProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [autoFocus])

  const searchPlaces = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setNoResults(false)
      return
    }

    setLoading(true)
    setNoResults(false)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=in&limit=6&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      )
      const data = await res.json()

      if (data.length === 0) {
        setResults([])
        setNoResults(true)
        setLoading(false)
        return
      }

      const mapped: SearchResult[] = data.map(
        (item: { place_id: number; display_name: string; lat: string; lon: string; address?: Record<string, string> }, idx: number) => {
          const addr = item.address || {}
          const primary =
            addr.neighbourhood ||
            addr.suburb ||
            addr.city ||
            addr.town ||
            addr.village ||
            item.display_name.split(",")[0]
          const parts = item.display_name.split(",").slice(0, 4).join(",")
          return {
            id: `${item.place_id}-${idx}`,
            primary: primary || "",
            secondary: parts,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          }
        }
      )

      setResults(mapped)
      setNoResults(false)
    } catch {
      setResults([])
      setNoResults(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchPlaces(value), 400)
  }

  return (
    <div className="flex flex-col">
      {/* Search input */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 rounded-full border border-border bg-muted/40 px-4 py-3 transition-all focus-within:border-primary/40 focus-within:bg-card focus-within:shadow-md focus-within:shadow-primary/5">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by street, city, or state..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("")
                setResults([])
                setNoResults(false)
              }}
              className="rounded-full p-0.5 transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 px-8 pt-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground">Searching...</span>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="px-5 pt-3">
          <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Results
          </p>
          <div className="flex flex-col">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelect(r)
                  setQuery("")
                  setResults([])
                }}
                className="group flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-primary/5 active:scale-[0.99]"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                  <MapPin className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{r.primary}</p>
                  <p className="text-xs text-muted-foreground truncate leading-relaxed">{r.secondary}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {noResults && !loading && (
        <div className="flex flex-col items-center gap-2 px-5 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No results found</p>
          <p className="text-xs text-muted-foreground/70">Try a different search term</p>
        </div>
      )}
    </div>
  )
}
