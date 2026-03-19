"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react"
import { products } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">Product Not Found</h1>
            <Link href="/" className="text-sm text-primary hover:underline">Go back home</Link>
          </div>
        </main>
      </div>
    )
  }

  const similar = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="transition-colors hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              {product.discount && (
                <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1.5 text-xs font-bold text-primary-foreground">
                  -{product.discount}%
                </span>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
                aria-label="Toggle wishlist"
              >
                <Heart className={`h-5 w-5 transition-colors ${wishlisted ? "fill-destructive text-destructive" : "text-foreground"}`} />
              </button>
            </div>

            {/* Details */}
            <div>
              <h1 className="mb-3 text-3xl font-bold text-foreground">{product.name}</h1>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold text-primary">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">{"₹"}{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{"₹"}{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="mb-8 text-base leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() =>
                    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, type: "product" })
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <Link
                  href="/cart"
                  className="flex flex-1 items-center justify-center rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Buy Now
                </Link>
              </div>

              {/* Reviews */}
              <div className="mt-10">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Reviews</h2>
                <div className="space-y-3">
                  {[
                    { name: "Rahul D.", rating: 5, text: "Excellent quality! Worth every penny." },
                    { name: "Sneha P.", rating: 4, text: "Good product, fast delivery." },
                  ].map((review, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {review.name[0]}
                        </div>
                        <span className="text-sm font-medium text-foreground">{review.name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similar.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold text-foreground">Similar Products</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                      <p className="mt-1 text-sm font-bold text-primary">{"₹"}{p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
