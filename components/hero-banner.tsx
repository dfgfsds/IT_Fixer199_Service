"use client"

import Link from "next/link"
import { ArrowRight, Shield, Clock, Star } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <div className="mb-6 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">
              Trusted by 50,000+ customers
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Book Trusted Services
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Near You
            </span>
          </h1>

          {/* Subtext */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Verified professionals. Instant booking. Transparent pricing. Get premium home services delivered to your doorstep.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#services"
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg active:scale-95 transition"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/cart"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/30 hover:shadow-md active:scale-95 transition"
            >
              Book Now
            </Link>
          </div>

          {/* Trust cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-4xl">

            <div className="flex items-center gap-3 rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Verified Pros</p>
                <p className="text-xs text-muted-foreground">Background checked</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Instant Booking</p>
                <p className="text-xs text-muted-foreground">Same day service</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">4.8 Average</p>
                <p className="text-xs text-muted-foreground">10K+ reviews</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}