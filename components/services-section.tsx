"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, ArrowRight } from "lucide-react"
import { services } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { useLocation } from "@/context/location-context"
import { useEffect, useState } from "react"
import axios from "axios"
import Api from "@/api-endpoints/ApiUrls";
import axiosInstance from "@/configs/axios-middleware"
import { useCartItem } from "@/context/CartItemContext"
import { ServiceCard } from "./serviceCard"

export function ServicesSection() {
  const { addItem } = useCart()
  const { location, detecting, setShowLocationModal, zoneData } = useLocation()
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cartItem, fetchCart }: any = useCartItem();

  useEffect(() => {
    if (!location?.lat || !location?.lng) return
    fetchServices()
  }, [location?.lat, location?.lng])

  const fetchServices = async () => {
    try {
      setServices([]) // 🔥 IMPORTANT FIX
      setLoading(true)

      const res = await axios.get(
        `${Api?.services}/?include_categories=true&size=40&include_media=true&include_pricing=true&lat=${location?.lat}&lng=${location?.lng}`
      )
      setServices(res?.data?.services || [])
    } catch (err) {
      console.error(err)
      setServices([]) // fallback
    } finally {
      setLoading(false)
    }
  }

  const getServiceQty = (serviceId: string) => {
    const item = cartItem?.items?.find(
      (i: any) => i?.service?.id === serviceId
    )
    console.log(item)
    return item
  }


  return (
    <section id="services" className="bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">Popular Services</h2>
            <p className="mt-1 text-muted-foreground">Top-rated services trusted by thousands</p>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            See All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services?.slice(0, 8)?.filter((item: any) => item?.status === "ACTIVE")?.map((service, i) => {
            const cart = getServiceQty(service?.id)

            return (
              <ServiceCard cart={cart} service={service} i={i} fetchCart={fetchCart} zoneData={zoneData} />
           
            )
          })}
        </div>
      </div>
    </section>
  )
}
