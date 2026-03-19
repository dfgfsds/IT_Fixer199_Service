"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, ArrowRight } from "lucide-react"
import { services } from "@/data/mock"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useLocation } from "@/context/location-context"
import { useEffect, useState } from "react"
import axios from "axios"
import Api from "@/api-endpoints/ApiUrls";
export default function AllServicesPage() {
  const { addItem } = useCart()

  const { location } = useLocation()
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjnAPBYyNW-vmruk_1DNqCUg7wjyrs_6g_6LuRm20yQ&s";

  console.log(location)
  useEffect(() => {
    fetchServices();
  }, [location]);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${Api?.services}/?include_categories=true&include_media=true&include_pricing=true&lat=${location?.lat}&lng=${location?.lng}`);
      setServices(res?.data?.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">All Services</h1>
            <p className="mt-1 text-muted-foreground">Browse our complete catalog of professional services</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/services/${service.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service?.media_files[0]?.image_url || emptyImage} alt={service.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/services/${service.id}`}>
                    <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">{service?.name}</h3>
                  </Link>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{service?.description}</p>
                  {/* <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-xs font-semibold text-primary">{service.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({service.reviews.toLocaleString()})</span>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-foreground">
                      ₹{
                        service?.pricing_models
                          ?.find((price: any) => price?.pricing_type_name === "Selling Price")
                          ?.price ?? 0
                      }
                    </p>
                    <button
                      onClick={() =>
                        addItem({ id: service.id, name: service.name, price: service?.pricing_models?.find((price: any) => price?.pricing_type_name === "Selling Price")?.price ?? 0, image: service?.media_files[0]?.image_url, type: "service" })
                      }
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
