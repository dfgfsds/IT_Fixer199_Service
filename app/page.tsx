"use client"

import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { CategoriesSection } from "@/components/categories-section"
import { ServicesSection } from "@/components/services-section"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <HeroBanner />
        <CategoriesSection />
        <ServicesSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  )
}
