"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Clock, ShoppingCart, CheckCircle2 } from "lucide-react"
// import { services } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useLocation } from "@/context/location-context"
import axios from "axios"
import Api from "@/api-endpoints/ApiUrls";
import axiosInstance from "@/configs/axios-middleware"
import { useCartItem } from "@/context/CartItemContext"

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [services, setServices] = useState<any[]>([]);
  const service = services.find((s) => s?.id === id)
  const { addItem } = useCart()
  const { location } = useLocation()
  const [loading, setLoading] = useState(true);
  const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjnAPBYyNW-vmruk_1DNqCUg7wjyrs_6g_6LuRm20yQ&s";

  const { cartItem: cartData, fetchCart } = useCartItem()

  const cartItem = cartData?.items?.find(
    (i: any) => i?.service?.id === service?.id
  )

  useEffect(() => {
    if (!location?.lat || !location?.lng) return
    fetchServices()
  }, [location?.lat, location?.lng])

  const addToCartApi = async () => {
    try {
      await axiosInstance.post(`${Api?.cartApi}/add/`, {
        type: "SERVICE",
        service_id: service.id,
        quantity: 1,
        zone_id: location?.zone?.id,
      })

      fetchCart() // 🔥 MUST
    } catch (err) {
      console.error(err)
    }
  }

  const increaseQty = async () => {
    try {
      await axiosInstance.patch(
        `${Api?.cartApi}/item/${cartItem?.id}/update/`,
        {
          type: "SERVICE",
          service_id: service.id,
          quantity: cartItem?.quantity + 1,
        }
      )

      fetchCart() // 🔥
    } catch (err) {
      console.error(err)
    }
  }

  const decreaseQty = async () => {
    try {
      await axiosInstance.post(
        `${Api?.cartApi}/item/${cartItem?.id}/decrease/`,
        {
          type: "SERVICE",
          service_id: service.id,
          quantity: cartItem?.quantity - 1,
        }
      )

      fetchCart() // 🔥
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${Api?.services}/?include_categories=true&include_media=true&include_pricing=true&lat=${location?.lat}&lng=${location?.lng}`);
      console.log(res?.data, "Services API response");
      setServices(res?.data?.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  if (!service) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">Service Not Found</h1>
            <Link href="/" className="text-sm text-primary hover:underline">Go back home</Link>
          </div>
        </main>
      </div>
    )
  }


  const currentCategoryIds = service?.categories?.map((c: any) => c.category);

  const related = services
    .filter((s) => {
      const serviceCategoryIds = s?.categories?.map((c: any) => c.category);

      const sameCategory = serviceCategoryIds?.some((id: any) =>
        currentCategoryIds?.includes(id)
      );

      return sameCategory && s.id !== service.id && s.status === "ACTIVE";
    })
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image src={service.media_files[0]?.image_url} alt={service.name} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-card"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">{service.name}</h1>
              {/* <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold text-primary">{service.rating}</span>
                  <span className="text-sm text-muted-foreground">({service.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{service.duration}</span>
                </div>
              </div> */}

              <p className="mb-8 text-base leading-relaxed text-muted-foreground">{service.description}</p>

              {/* Benefits */}
              {/* <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Benefits</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.benefits.map((b:any) => (
                    <div key={b} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Reviews placeholder */}
              {/* <div>
                <h2 className="mb-4 text-lg font-semibold text-foreground">Ratings & Reviews</h2>
                <div className="space-y-4">
                  {[
                    { name: "Anita M.", rating: 5, text: "Excellent service! The team was professional and thorough." },
                    { name: "Vikram S.", rating: 4, text: "Great value for money. Would recommend to others." },
                    { name: "Priya K.", rating: 5, text: "Very satisfied with the quality. Booking was super easy." },
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
              </div> */}
            </div>

            {/* Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
                <p className="mb-1 text-sm text-muted-foreground">Starting from</p>
                <p className="mb-5 text-3xl font-bold text-foreground">
                  {/* {"₹"}{service.price.toLocaleString()} */}
                  ₹{
                    service?.pricing_models
                      ?.find((price: any) => price?.pricing_type_name === "Selling Price")
                      ?.price ?? 0
                  }
                </p>
                {/* <button
                  onClick={() =>
                    addItem({ id: service.id, name: service.name, price: service.price, image: service.image, type: "service" })
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button> */}

                {!cartItem || cartItem.quantity === 0 ? (
                  <button
                    onClick={addToCartApi}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition hover:shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-muted p-2 rounded-xl">

                    <button
                      onClick={decreaseQty}
                      className="h-9 w-9 flex items-center justify-center rounded bg-white shadow text-lg font-bold"
                    >
                      -
                    </button>

                    <span className="font-semibold text-lg">
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={increaseQty}
                      className="h-9 w-9 flex items-center justify-center rounded bg-primary text-white shadow"
                    >
                      +
                    </button>

                  </div>
                )}


                {/* <Link
                  href="/cart"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Book Now
                </Link> */}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold text-foreground">Related Services</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/services/${r.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={r?.media_files[0]?.image_url ? r?.media_files[0]?.image_url : emptyImage} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                      <p className="mt-1 text-sm font-bold text-primary">
                        {/* {"₹"}{r.price.toLocaleString()} */}
                        {"₹"}{r?.pricing_models
                          ?.find((price: any) => price?.pricing_type_name === "Selling Price")
                          ?.price ?? 0}
                      </p>
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
