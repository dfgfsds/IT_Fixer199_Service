"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocation } from "@/context/location-context"
import Api from "@/api-endpoints/ApiUrls"

export function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { location } = useLocation()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get(Api?.categories)
      setCategories(res?.data?.data || [])
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Explore Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Services available in{" "}
              <span className="font-semibold text-primary">
                {location?.city}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="relative">

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto pb-4"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 w-32 animate-pulse rounded-3xl bg-muted"
                />
              ))
              : categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group relative flex h-36 w-32 shrink-0 flex-col items-center justify-center rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Image */}
                  <div className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-muted shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={cat?.media?.[0]?.url || ""}
                      alt={cat?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <span className="relative z-10 text-center text-sm font-semibold text-foreground">
                    {cat?.name}
                  </span>
                </Link>
              ))}
          </div>

          {/* Gradient Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}