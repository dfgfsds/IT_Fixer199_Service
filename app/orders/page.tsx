"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Package } from "lucide-react"
import { useOrders } from "@/context/order-context"
import { services } from "@/data/mock"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useEffect, useState } from "react"
import axiosInstance from "@/configs/axios-middleware"
import Api from "../../api-endpoints/ApiUrls";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-indigo-100 text-indigo-700",
  assigned: "bg-purple-100 text-purple-700",
  in_progress: "bg-blue-100 text-blue-700",
  in_transit: "bg-cyan-100 text-cyan-700",
  service_in_progress: "bg-sky-100 text-sky-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  refunded: "bg-gray-200 text-gray-700",
}

export default function OrdersPage() {
  // const { orders } = useOrders()

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(Api?.orders);
      console.log(res?.data?.orders)
      setOrders(res?.data?.orders)
      // setOrders(transformOrders(res.data));
    } finally {
      setLoading(false);
    }
  };

  const normalizeStatus = (status: string) => {
    return status?.toLowerCase();
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "assigned":
        return "Assigned";
      case "in_progress":
        return "In Progress";
      case "in_transit":
        return "In Transit";
      case "service_in_progress":
        return "Service In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      case "refunded":
        return "Refunded";
      default:
        return status;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <h1 className="mb-8 text-3xl font-bold text-foreground">My Orders</h1>

          {orders.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">No orders yet</h2>
              <p className="mb-6 text-sm text-muted-foreground">Book a service to see your orders here</p>
              <Link href="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25">
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders?.map((order: any, i: number) => {
                const service = services?.find((s) => s?.id === order?.serviceId)
                return (
                  <div
                    key={order?.id}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md animate-slide-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{order?.id}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[normalizeStatus(order?.order_status)] || "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {statusLabel(normalizeStatus(order?.order_status))}
                          </span>
                        </div>
                        {/* <p className="mb-1 text-sm text-foreground">{service?.name || "Service"}</p> */}
                        <p className="mb-1 text-sm text-foreground">{order?.items[0]?.item_details?.name || "Service"}</p>

                        <p className="text-xs text-muted-foreground">{new Date(order?.created_at)?.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                      <p className="text-lg font-bold text-foreground">{"₹"}{order?.total_price?.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground">{order?.slot_time}</p>
                      <Link
                        href={`/orders/${order?.id}`}
                        className="group/link flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
