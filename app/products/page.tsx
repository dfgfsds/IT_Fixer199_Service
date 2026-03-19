"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { products } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"

export default function AllProductsPage() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])
  const toggleWishlist = (id: string) => setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">All Products</h1>
            <p className="mt-1 text-muted-foreground">Essential tools and supplies for your home</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    {product.discount && (
                      <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-primary-foreground">-{product.discount}%</span>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
                      aria-label={`Wishlist ${product.name}`}
                    >
                      <Heart className={`h-4 w-4 transition-colors ${wishlist.includes(product.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="mb-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">{product.name}</h3>
                  </Link>
                  <div className="mb-3 flex items-center gap-2">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-foreground">{"₹"}{product.price.toLocaleString()}</p>
                      {product.originalPrice && <p className="text-sm text-muted-foreground line-through">{"₹"}{product.originalPrice.toLocaleString()}</p>}
                    </div>
                    <button
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, type: "product" })}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-90"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
