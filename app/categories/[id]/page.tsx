"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { categories, services } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useLocation } from "@/context/location-context"
import axios from "axios"
import Api from "../../../api-endpoints/ApiUrls";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { location, zoneData } = useLocation()
  const category = categories?.find((c) => c.id === id)
  const serviceData = services?.filter((s) => s?.categoryId === id)
  const filtered = services?.filter((s) => s?.categoryId === id)
  const { addItem } = useCart();



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
      // setLoading(false)
    }
  }


  useEffect(() => {
    if (!location?.lat || !location?.lng || !id) return

    fetchServices()
    fetchProducts()
  }, [location?.lat, location?.lng, id])

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `${Api.services}?category_id=${id}&page=1&size=20&lat=${location?.lat}&lng=${location?.lng}&include_categories=true&size=40&include_media=true&include_pricing=true`
      )
      setServices(res?.data?.services || [])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${Api.products}?category_id=${id}&page=1&size=20&lat=${location?.lat}&lng=${location?.lng}&include_attribute=true&include_category=true&include_pricing=true&include_media=true&include_brand=true`
      )
      console.log(res)
      setProducts(res?.data?.products || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-foreground">{category?.name || "Category"}</span>
            </nav>
            <h1 className="text-3xl font-bold text-foreground">{category?.name || "Category"}</h1>
            {/* <p className="mt-1 text-muted-foreground">{filtered.length} services available</p> */}
          </div>
        </div>
        {services.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-8">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🔧 Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service?.media_files?.[0]?.image_url}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">

                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {service?.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {service?.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">

                      <p className="text-lg font-bold text-indigo-600">
                        ₹{service?.pricing_models?.[0]?.price}
                      </p>

                      <button
                        onClick={() =>
                          addItem({
                            id: service.id,
                            name: service.name,
                            price: service?.pricing_models?.[0]?.price,
                            image: service?.media_files?.[0]?.image_url,
                            type: "service",
                          })
                        }
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:scale-110 transition"
                      >
                        <ShoppingCart size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-8">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🛒 Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product?.media?.[0]?.url}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">

                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product?.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">

                      <p className="text-lg font-bold text-green-600">
                        ₹{product?.pricing?.[0]?.price}
                      </p>

                      <button
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product?.pricing?.[0]?.price,
                            image: product?.media?.[0]?.url,
                            type: "product",
                          })
                        }
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-600 text-white hover:scale-110 transition"
                      >
                        <ShoppingCart size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No services found in this category.</p>
              <Link href="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Browse all services</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <div key={service.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <Link href={`/services/${service.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={service.image} alt={service.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/services/${service.id}`}>
                      <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">{service.name}</h3>
                    </Link>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{service.shortDescription}</p>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-xs font-semibold text-primary">{service.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-foreground">{"₹"}{service.price.toLocaleString()}</p>
                      <button
                        onClick={() => addItem({ id: service.id, name: service.name, price: service.price, image: service.image, type: "service" })}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-90"
                        aria-label={`Add ${service.name} to cart`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </main>
      <Footer />
    </div>
  )
}
