"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"
import axios from "axios"
import Api from "@/api-endpoints/ApiUrls";
import { useLocation } from "@/context/location-context"
import { ProductCard } from "./productCard"
import { useCartItem } from "@/context/CartItemContext"
export function ProductsSection() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation()
  const { cartItem, fetchCart }: any = useCartItem();

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]))
  }

  useEffect(() => {
    if (!location?.lat || !location?.lng) return
    fetchProducts()
  }, [location?.lat, location?.lng])


  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${Api?.products}?include_attribute=true&include_category=true&include_pricing=true&include_media=true&include_brand=true&lat=${location?.lat}&lng=${location?.lng}`);
      console.log(res)
      setProducts(res?.data?.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getProductCart = (productId: string) => {
    return cartItem?.items?.find(
      (i: any) => i?.product?.id === productId
    )
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Shop Products</h2>
            <p className="mt-1 text-muted-foreground">Essential tools and supplies for your home</p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            See All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.filter((item: any) => item?.status === "ACTIVE")?.slice(0, 6).map((product: any, i: number) => {
            const cart = getProductCart(product.id)
            // <ProductCard product={product} i={i}/>
            return (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                i={i}
                fetchCart={fetchCart}
              />
            )
            // <div
            //   key={product?.id}
            //   className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl animate-slide-up"
            //   style={{ animationDelay: `${i * 0.08}s` }}
            // >
            //   <Link href={`/products/${product?.id}`} className="block">
            //     <div className="relative aspect-[4/3] overflow-hidden">
            //       <Image
            //         src={product?.media[0]?.url ? product?.media[0]?.url : emptyImage}
            //         alt={product?.name}
            //         fill
            //         className="object-cover transition-transform duration-500 group-hover:scale-110"
            //         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            //       />
            //     </div>
            //   </Link>
            //   <div className="p-4">
            //     <Link href={`/products/${product?.id}`}>
            //       <h3 className="mb-2 capitalize text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            //         {product?.name}
            //       </h3>
            //     </Link>
            //     <p className="mb-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            //       {product?.description}
            //     </p>
            //     <div className="flex items-center justify-between">
            //       <div className="flex items-center gap-2">
            //         <p className="text-lg font-bold text-foreground">
            //           {/* {"₹"}{product.price.toLocaleString()} */}
            //           {"₹"}{product?.pricing[0]?.price?.toLocaleString()}
            //         </p>
            //       </div>
            //       <button
            //         onClick={() =>
            //           addItem({ id: product?.id, name: product?.name, price: product?.price, image: product?.image, type: "product" })
            //         }
            //         className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-90"
            //         aria-label={`Add ${product?.name} to cart`}
            //       >
            //         <ShoppingCart className="h-4 w-4" />
            //       </button>
            //     </div>
            //   </div>
            // </div>
          })}
        </div>
      </div>
    </section>
  )
}
