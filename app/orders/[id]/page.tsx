// "use client"

// import { use, useEffect, useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, MapPin, Clock, CreditCard, Phone, Star, X, User } from "lucide-react"
// import { useOrders } from "@/context/order-context"
// import { services } from "@/data/mock"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { LoginModal } from "@/components/login-modal"
// import { LiveMap } from "@/components/live-map"
// import axiosInstance from "@/configs/axios-middleware"
// import Api from "../../../api-endpoints/ApiUrls";

// const statusStyles: Record<string, string> = {
//   ongoing: "bg-blue-100 text-blue-700",
//   completed: "bg-emerald-100 text-emerald-700",
//   cancelled: "bg-red-100 text-red-700",
// }

// const timelineSteps = [
//   { key: "booked", label: "Booked" },
//   { key: "assigned", label: "Assigned" },
//   { key: "onTheWay", label: "On the Way" },
//   { key: "completed", label: "Completed" },
// ]

// export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params)
//   const { getOrder, cancelOrder } = useOrders()
//   // const order = getOrder(id)

//   const [order, setOrders] = useState<any>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, [id]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`${Api?.orders}${id}/`);
//       console.log(res)
//       console.log(res?.data?.orders)
//       setOrders(res?.data?.order)
//       // setOrders(transformOrders(res.data));
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!order) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <Header />
//         <main className="flex flex-1 items-center justify-center">
//           <div className="text-center">
//             <h1 className="mb-2 text-2xl font-bold text-foreground">Order Not Found</h1>
//             <Link href="/orders" className="text-sm text-primary hover:underline">View all orders</Link>
//           </div>
//         </main>
//       </div>
//     )
//   }

//   const service = services.find((s) => s.id === order.serviceId)
//   const isActive = order.status === "ongoing"

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <LoginModal />
//       <main className="flex-1">
//         <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
//           <Link href="/orders" className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30">
//             <ArrowLeft className="h-3.5 w-3.5" />
//             All Orders
//           </Link>

//           {/* Header */}
//           <div className="mb-6 flex items-start justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl font-bold text-foreground">{order.id}</h1>
//                 <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[order.status]}`}>
//                   {order.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-muted-foreground">
//                 {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//               </p>
//             </div>
//             {/* <p className="text-2xl font-bold text-foreground">{"₹"}{order.amount.toLocaleString()}</p> */}
//           </div>

//           {/* Live Map for active orders */}
//           {isActive && order.timeline.onTheWay && (
//             <div className="mb-6 animate-fade-in">
//               <LiveMap technicianName={order.technician.name} />
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* Order Summary */}
//             <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
//               <h2 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
//                     <Clock className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground">Service</p>
//                     <p className="text-sm font-medium text-foreground">{service?.name || "Service"}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
//                     <MapPin className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground">Address</p>
//                     <p className="text-sm font-medium text-foreground">{order.address}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
//                     <Clock className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground">Slot</p>
//                     <p className="text-sm font-medium text-foreground">{order.slot}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
//                     <CreditCard className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-muted-foreground">Payment</p>
//                     <p className="text-sm font-medium text-foreground">{order.paymentMethod}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Technician */}
//             <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
//               <h2 className="mb-4 text-lg font-semibold text-foreground">Technician</h2>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                     <User className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-foreground">{order.technician.name}</p>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-3.5 w-3.5 fill-primary text-primary" />
//                       <span className="text-xs font-medium text-foreground">{order.technician.rating}</span>
//                     </div>
//                   </div>
//                 </div>
//                 {isActive && (
//                   <a
//                     href={`tel:${order.technician.phone}`}
//                     className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-all hover:bg-accent/20"
//                     aria-label={`Call ${order.technician.name}`}
//                   >
//                     <Phone className="h-5 w-5" />
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
//               <h2 className="mb-4 text-lg font-semibold text-foreground">Status Timeline</h2>
//               <div className="space-y-0">
//                 {timelineSteps.map((step, i) => {
//                   const time = order.timeline[step.key as keyof typeof order.timeline]
//                   const isCompleted = !!time
//                   const isLast = i === timelineSteps.length - 1

//                   return (
//                     <div key={step.key} className="flex gap-4">
//                       <div className="flex flex-col items-center">
//                         <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${isCompleted ? "border-primary bg-primary" : "border-border bg-card"}`}>
//                           {isCompleted && (
//                             <svg className="h-3.5 w-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                             </svg>
//                           )}
//                         </div>
//                         {!isLast && <div className={`h-10 w-0.5 ${isCompleted ? "bg-primary" : "bg-border"}`} />}
//                       </div>
//                       <div className="pb-6">
//                         <p className={`text-sm font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
//                         {time && <p className="text-xs text-muted-foreground">{time}</p>}
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* Actions */}
//             {isActive && (
//               <div className="flex gap-3">
//                 <a
//                   href={`tel:${order.technician.phone}`}
//                   className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
//                 >
//                   <Phone className="h-4 w-4" />
//                   Call Technician
//                 </a>
//                 <button
//                   onClick={() => cancelOrder(order.id)}
//                   className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/30 py-3.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive/5"
//                 >
//                   <X className="h-4 w-4" />
//                   Cancel Order
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }


// "use client"

// import { use, useEffect, useState } from "react"
// import Link from "next/link"
// import {
//   ArrowLeft,
//   MapPin,
//   Clock,
//   Phone,
//   User,
//   X,
// } from "lucide-react"

// import axiosInstance from "@/configs/axios-middleware"
// import Api from "../../../api-endpoints/ApiUrls"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { LoginModal } from "@/components/login-modal"
// // import { LiveMap } from "@/components/live-map"
// import dynamic from "next/dynamic"

// const LiveMap = dynamic(() => import("@/components/live-map").then(mod => mod.LiveMap), {
//   ssr: false,
// })

// // ✅ Status styles
// const statusStyles: Record<string, string> = {
//   pending: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-indigo-100 text-indigo-700",
//   assigned: "bg-purple-100 text-purple-700",
//   in_progress: "bg-blue-100 text-blue-700",
//   in_transit: "bg-cyan-100 text-cyan-700",
//   service_in_progress: "bg-sky-100 text-sky-700",
//   completed: "bg-emerald-100 text-emerald-700",
//   cancelled: "bg-red-100 text-red-700",
//   refunded: "bg-gray-200 text-gray-700",
// }

// // ✅ Transform API
// const transformOrder = (order: any) => ({
//   id: order.id,
//   status: order.order_status?.toLowerCase(),
//   date: order.created_at,
//   slot: order.slot_time,
//   address: order.address,
//   amount: Math.abs(Number(order.total_price || 0)),
//   payment: order.payment_status,
//   fullData: order,
//   items: order.items || [],

//   agent: order.agent_details
//     ? {
//       name: order.agent_details.user_details?.name,
//       phone: order.agent_details.user_details?.mobile_number,
//     }
//     : null,
// })

// export default function OrderDetailPage({ params }: any) {
//   const { id }: any = use(params)

//   const [order, setOrder] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   console.log(order?.fullData?.latitude)
//   console.log(order?.fullData?.longitude)
//   // tracking
//   const [showTracking, setShowTracking] = useState(false)
//   const [location, setLocation] = useState<any>(null)
//   const [liveStatus, setLiveStatus] = useState("")
//   console.log(location)
//   useEffect(() => {
//     fetchOrder()
//   }, [id])

//   const fetchOrder = async () => {
//     try {
//       setLoading(true)
//       const res = await axiosInstance.get(`${Api?.orders}${id}/`)
//       setOrder(transformOrder(res.data.order))
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ WebSocket tracking
//   useEffect(() => {
//     if (!showTracking) return

//     const token = localStorage.getItem("token")

//     const ws = new WebSocket(
//       `wss://api.itfixer199.com/ws/order-tracking/${id}/?token=${token}`
//     )

//     ws.onopen = () => {
//       console.log("✅ WS CONNECTED")
//     }

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data)
//       console.log("📩 WS DATA:", data)

//       setLiveStatus(data.status)

//       if (data.order_details?.partner_location) {
//         setLocation(data.order_details.partner_location)
//       }
//     }

//     ws.onerror = (err) => {
//       console.error("❌ WS ERROR:", err)
//     }

//     ws.onclose = (e) => {
//       console.log("🔌 WS CLOSED", e)
//     }

//     return () => ws.close()
//   }, [showTracking])



//   if (loading) return <p className="p-10 text-center">Loading...</p>
//   if (!order) return <p className="p-10 text-center">Order Not Found</p>

//   const isTrackable = ["assigned", "in_transit", "in_progress", "confirmed"].includes(order.status)

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <LoginModal />

//       <main className="flex-1">
//         <div className="max-w-3xl mx-auto p-4 space-y-6">

//           {/* 🔙 Back */}
//           <Link href="/orders" className="flex items-center gap-2 text-sm">
//             <ArrowLeft className="h-4 w-4" /> Back
//           </Link>

//           {/* 🔝 Header */}
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="font-bold text-lg">{order.id}</h1>
//               <span className={`px-2 py-1 text-xs rounded ${statusStyles[order.status]}`}>
//                 {order.status}
//               </span>
//             </div>
//             <p className="font-bold">₹{order.amount}</p>
//           </div>

//           {/* 🕒 Slot */}
//           <div className="border rounded-xl p-4">
//             <h2 className="font-semibold mb-2">Slot Details</h2>
//             <p className="text-sm flex items-center gap-2">
//               <Clock className="h-4 w-4" /> {order.slot}
//             </p>
//             <p className="text-sm flex items-center gap-2">
//               <MapPin className="h-4 w-4" /> {order.address}
//             </p>
//           </div>

//           {/* 👨‍🔧 Agent */}
//           <div className="border rounded-xl p-4">
//             <h2 className="font-semibold mb-2">Technician</h2>

//             {order.agent ? (
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <User />
//                   <p>{order.agent.name}</p>
//                 </div>

//                 <div className="flex gap-2">
//                   <a
//                     href={`tel:${order.agent.phone}`}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Call
//                   </a>

//                   {isTrackable && (
//                     <button
//                       onClick={() => setShowTracking(true)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Track
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">Not Assigned</p>
//             )}
//           </div>

//           {/* 📦 Items */}
//           <div className="border rounded-xl p-4">
//             <h2 className="font-semibold mb-2">Items</h2>

//             {order.items.map((item: any) => (
//               <div key={item.id} className="flex justify-between text-sm mb-2">
//                 <p>{item.item_details?.name}</p>
//                 <p>₹{item.price}</p>
//               </div>
//             ))}
//           </div>

//           {/* ⚡ Actions */}
//           <div className="flex gap-3">
//             <button className="flex-1 border border-red-400 text-red-500 py-2 rounded">
//               Cancel Order
//             </button>

//             <button className="flex-1 border border-yellow-400 text-yellow-600 py-2 rounded">
//               Change Slot
//             </button>

//             <button className="flex-1 border border-gray-400 text-gray-600 py-2 rounded">
//               Request Refund
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       {/* 🗺️ Tracking Modal */}
//       {showTracking && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-lg p-4 rounded-xl">

//             <h2 className="font-semibold mb-3">Live Tracking</h2>

//             <div className="h-64 bg-gray-100 rounded">
//               <LiveMap
//                 agentLat={location?.lat}
//                 agentLng={location?.lng}
//                 customerLat={order?.fullData?.latitude}
//                 customerLng={order?.fullData?.longitude}
//                 technicianName={order.agent?.name}
//               />
//             </div>

//             <p className="mt-2 text-sm">
//               Status: <b>{liveStatus}</b>
//             </p>

//             <button
//               onClick={() => setShowTracking(false)}
//               className="mt-4 w-full bg-red-500 text-white py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  User,
} from "lucide-react"

import axiosInstance from "@/configs/axios-middleware"
import Api from "../../../api-endpoints/ApiUrls"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"

// ✅ SSR FIX
const LiveMap = dynamic(
  () => import("@/components/live-map").then((mod) => mod.LiveMap),
  { ssr: false }
)

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

const transformOrder = (order: any) => ({
  id: order.id,
  status: order.order_status?.toLowerCase(),
  slot: order.slot_time,
  address: order.address,
  amount: Math.abs(Number(order.total_price || 0)),
  fullData: order,
  items: order.items || [],
  agent: order.agent_details
    ? {
      name: order.agent_details.user_details?.name,
      phone: order.agent_details.user_details?.mobile_number,
    }
    : null,
})

export default function OrderDetailPage({ params }: any) {
  const { id }: any = use(params)

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [showTracking, setShowTracking] = useState(false)
  const [location, setLocation] = useState<any>(null)
  const [liveStatus, setLiveStatus] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [actionType, setActionType] = useState<"cancel" | "slot" | "refund" | null>(null)
  const [formData, setFormData] = useState<any>({
    reason: "",
    description: "",
    date: "",
    slotId: "",
    orderItemId: ""
  })

  const orderStatus = order?.fullData?.order_status
  const paymentStatus = order?.fullData?.payment_status
  const showRefund = paymentStatus === "SUCCESS"
  const showCancel = !["CANCELLED", "COMPLETED"].includes(orderStatus)

  const showSlotChange = ![
    "IN_PROGRESS",
    "IN_TRANSIT",
    "CANCELLED",
    "COMPLETED",
    "SERVICE_IN_PROGRESS",
    "REFUNDED",
  ].includes(orderStatus)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get(`${Api?.orders}${id}/`)
      setOrder(transformOrder(res.data.order))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleClick = () => setShowMenu(false)
    if (showMenu) {
      window.addEventListener("click", handleClick)
    }
    return () => window.removeEventListener("click", handleClick)
  }, [showMenu])


  useEffect(() => {
    if (!showTracking) return

    const token = localStorage.getItem("token")
    if (!token) return

    const ws = new WebSocket(
      `wss://api.itfixer199.com/ws/order-tracking/${id}/?token=${token}`
    )

    ws.onopen = () => console.log("✅ WS CONNECTED")

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log("📩 WS DATA:", data)

      setLiveStatus(data.status)

      if (data.order_details?.partner_location) {
        setLocation(data.order_details.partner_location)
      }
    }

    ws.onerror = (e) => console.error("❌ WS ERROR", e)
    ws.onclose = () => console.log("🔌 WS CLOSED")

    return () => ws.close()
  }, [showTracking, id]);

  const handleCancel = async () => {
    await axiosInstance.post(Api?.requestRefund, {
      order_id: order.id,
      cancellation_reason_type: formData.reason,
      cancellation_reason_description: formData.description,
    })
  }

  const handleSlotChange = async () => {
    await axiosInstance.post(Api?.slotChange, {
      order_id: order.id,
      requested_slot_id: formData.slotId,
      requested_date: formData.date,
      slot_change_reason_type: formData.reason,
      slot_change_reason_description: formData.description,
    })
  }

  const handleRefund = async () => {
    await axiosInstance.post(Api?.requestCancellation, {
      order_id: order.id,
      order_item_id: formData.orderItemId,
    })
  }

  const cancellationReasons = [
    { value: "CUSTOMER_CHANGE_OF_MIND", label: "Customer Change of Mind" },
    { value: "WRONG_BOOKING", label: "Wrong Booking" },
    { value: "BOOKED_BY_MISTAKE", label: "Booked By Mistake" },
    { value: "FOUND_BETTER_PRICE", label: "Found Better Price" },
    { value: "SERVICE_NO_LONGER_REQUIRED", label: "Service No Longer Required" },
    { value: "SCHEDULE_CHANGE", label: "Schedule Change" },
    { value: "LOCATION_CHANGED", label: "Location Changed" },
    { value: "DUPLICATE_BOOKING", label: "Duplicate Booking" },
    { value: "AGENT_UNAVAILABLE", label: "Agent Unavailable" },
    { value: "AGENT_RUNNING_LATE", label: "Agent Running Late" },
    { value: "AGENT_PERSONAL_EMERGENCY", label: "Agent Personal Emergency" },
    { value: "AGENT_VEHICLE_ISSUE", label: "Agent Vehicle Issue" },
    { value: "AGENT_UNABLE_TO_CONTACT_CUSTOMER", label: "Unable to Contact Customer" },
    { value: "CUSTOMER_NOT_RESPONDING", label: "Customer Not Responding" },
    { value: "CUSTOMER_NOT_AVAILABLE_AT_LOCATION", label: "Customer Not Available at Location" },
    { value: "SERVICE_DELAY", label: "Service Delay" },
    { value: "OUT_OF_STOCK", label: "Out of Stock" },
    { value: "PRICE_DISPUTE", label: "Price Dispute" },
    { value: "SERVICE_NOT_AVAILABLE", label: "Service Not Available" },
    { value: "ADDRESS_NOT_SERVICEABLE", label: "Address Not Serviceable" },
    { value: "TECHNICAL_ISSUE", label: "Technical Issue" },
    { value: "OTHER", label: "Other" },
  ]

  const slotChangeReasons = [
    { value: "AGENT_UNAVAILABLE", label: "Agent Unavailable" },
    { value: "RUNNING_LATE", label: "Running Late" },
    { value: "EMERGENCY", label: "Emergency" },
    { value: "VEHICLE_ISSUE", label: "Vehicle Issue" },
    { value: "PERSONAL_REASON", label: "Personal Reason" },
    { value: "NOT_AVAILABLE_AT_TIME", label: "Not Available at Selected Time" },
    { value: "DELAY", label: "Delay" },
    { value: "OVERBOOKED", label: "Overbooked" },
    { value: "ROUTE_CONFLICT", label: "Route Conflict" },
    { value: "SERVICE_DELAY", label: "Service Delay" },
    { value: "PARTS_DELAY", label: "Parts Delay" },
    { value: "RESOURCE_UNAVAILABLE", label: "Resource Unavailable" },
    { value: "TRAFFIC_DELAY", label: "Traffic Delay" },
    { value: "WEATHER_ISSUE", label: "Weather Issue" },
    { value: "LOCATION_ACCESS_ISSUE", label: "Location Access Issue" },
    { value: "OTHER", label: "Other" },
  ]

  if (loading) return <p className="p-10 text-center">Loading...</p>
  if (!order) return <p className="p-10 text-center">Order Not Found</p>


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />

      {/* <main className="flex-1">
        <div className="max-w-3xl mx-auto p-4 space-y-6">

          <Link href="/orders" className="flex gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <div className="flex justify-between">
            <h1 className="font-bold">{order.id}</h1>
            <span className={`px-2 py-1 text-xs rounded ${statusStyles[order.status]}`}>
              {order.status}
            </span>
          </div>

        
          <div className="border p-4 rounded-xl">
            <p><Clock className="inline h-4 w-4" /> {order.slot}</p>
            <p><MapPin className="inline h-4 w-4" /> {order.address}</p>
          </div>

          <div className="border p-4 rounded-xl">
            {order.agent ? (
              <div className="flex justify-between">
                <p>{order.agent.name}</p>
                <div className="flex gap-2">
                  <a href={`tel:${order.agent.phone}`} className="bg-green-500 text-white px-3 py-1 rounded">Call</a>
                  <button onClick={() => setShowTracking(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Track
                  </button>
                </div>
              </div>
            ) : (
              <p>Not Assigned</p>
            )}
          </div>

    
          <div className="border p-4 rounded-xl">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <p>{item.item_details?.name}</p>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main> */}

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">

          {/* Back */}
          <Link href="/orders" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-gray-800 transition">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          {/* Header */}
          <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-md border flex justify-between items-center relative hover:shadow-lg transition">

            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
                {order.id}
              </h1>
            </div>

            <div className="flex items-center gap-3">

              {/* Status */}
              <span className={`text-xs px-4 py-1.5 rounded-full font-semibold shadow-sm ${statusStyles[order.status]}`}>
                {order.status}
              </span>

              {/* 3 DOT MENU */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                ⋮
              </button>

              {/* DROPDOWN */}
              {showMenu && (
                <div className="absolute right-4 top-16 w-44 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">

                  {showCancel && (
                    <button
                      onClick={() => setActionType("cancel")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600 transition">
                      ❌ Cancel Order
                    </button>
                  )}

                  {showSlotChange && (
                    <button
                      onClick={() => setActionType("slot")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 text-yellow-600 transition">
                      ⏰ Change Slot
                    </button>
                  )}

                  {showRefund && (
                    <button
                      onClick={() => setActionType("refund")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700 transition">
                      💰 Request Refund
                    </button>
                  )}

                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Slot */}
              <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-semibold mb-4 text-gray-700">Service Schedule</h2>

                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="text-green-600" />
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    {order.slot}
                  </p>
                </div>
              </div>

              {/* Agent */}
              <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-semibold mb-4 text-gray-700">Service Professional</h2>

                {order.agent ? (
                  <>
                    <div className="flex justify-between items-center mb-5">

                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="text-green-600" />
                        </div>

                        <p className="font-semibold text-gray-800">
                          {order.agent.name}
                        </p>
                      </div>

                      <div className="flex gap-2">

                        <a
                          href={`tel:${order.agent.phone}`}
                          className="bg-green-50 text-green-600 px-4 py-2 rounded-xl border border-green-200 text-sm font-medium hover:bg-green-100 transition"
                        >
                          Call
                        </a>

                        {["IN_PROGRESS", "IN_TRANSIT"].includes(orderStatus) && (
                          <button
                            onClick={() => setShowTracking(true)}
                            className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-xl border border-yellow-200 text-sm font-medium hover:bg-yellow-100 transition"
                          >
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">Not Assigned</p>
                )}
              </div>

              {/* Items */}
              {/* Items */}
              <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-semibold mb-5 text-gray-700 flex items-center gap-2">
                  📦 Items
                </h2>

                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition"
                    >

                      {/* Image (small + tight) */}
                      <div className="h-12 w-12 rounded-lg overflow-hidden border bg-white shrink-0">
                        <img
                          src={item?.item_details?.full_details?.media_files?.[0]?.image_url}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Name */}
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {item.item_details?.name}
                        </p>

                        {/* Brand / Category */}
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item?.brand || "Service"} • {item?.type || "General"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item?.item_details?.full_details?.categories}
                        </p>

                        {/* Price */}
                        <p className="text-sm font-bold text-indigo-600 mt-1">
                          ₹{item.price}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Payment */}
              <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-semibold mb-4 text-gray-700">Payment</h2>

                <p className="text-lg font-semibold text-green-600">
                  ₹{order.amount}
                </p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-md transition">
                <h2 className="text-sm font-semibold mb-3 text-gray-700">Address</h2>

                <p className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                  <MapPin className="h-4 w-4 mt-1 text-gray-400" />
                  {order.address}
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>

      {actionType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <h2 className="text-lg font-semibold mb-4 capitalize">
              {actionType} Request
            </h2>

            {/* ❌ CANCEL */}
            {actionType === "cancel" && (
              <>
                <select
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                >
                  <option value="">Select Reason</option>

                  {cancellationReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Description"
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </>
            )}

            {/* ⏰ SLOT CHANGE */}
            {actionType === "slot" && (
              <>
                <input
                  type="date"
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />

                <input
                  placeholder="Slot ID"
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => setFormData({ ...formData, slotId: e.target.value })}
                />

                <select
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2.5 rounded-xl mb-3 text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                >
                  <option value="">Select Reason</option>

                  {slotChangeReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Description"
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </>
            )}

            {/* 💰 REFUND */}
            {actionType === "refund" && (
              <>
                <p className="text-sm mb-3">
                  Are you sure you want to request refund?
                </p>
              </>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setActionType(null)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (actionType === "cancel") await handleCancel()
                  if (actionType === "slot") await handleSlotChange()
                  if (actionType === "refund") await handleRefund()

                  setActionType(null)
                }}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />

      {/* ✅ TRACKING MODAL */}
      {showTracking && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-4 rounded-xl">

            <h2 className="font-semibold mb-3">Live Tracking</h2>

            <div className="h-[300px] w-full">
              <LiveMap
                agentLat={location?.lat}
                agentLng={location?.lng}
                customerLat={order.fullData?.latitude}
                customerLng={order.fullData?.longitude}
                technicianName={order.agent?.name}
              />
            </div>

            <p className="mt-2 text-sm">
              Status: <b>{liveStatus}</b>
            </p>

            <button
              onClick={() => setShowTracking(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}