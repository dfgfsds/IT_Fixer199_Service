"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Minus, Plus, Trash2, MapPin, CreditCard, Wallet, Banknote, Smartphone,
  Calendar, Clock, CheckCircle2, ShoppingBag, ArrowLeft
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useOrders } from "@/context/order-context"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { savedAddresses, timeSlots } from "@/data/mock"
import { useCartItem } from "@/context/CartItemContext"
import axiosInstance from "@/configs/axios-middleware"
import Api from "../../api-endpoints/ApiUrls";
import { useLocation } from "@/context/location-context"

const paymentMethods = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "wallet", label: "Wallet", icon: Wallet },
]

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { isLoggedIn, setShowLoginModal } = useAuth()
  const router = useRouter()

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || "")
  const [scheduleType, setScheduleType] = useState<"instant" | "later">("instant")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const serviceFee = Math.round(totalAmount * 0.05)
  const tax = Math.round(totalAmount * 0.08)
  const discount = totalAmount > 2000 ? 200 : 0
  const grandTotal = totalAmount + serviceFee + tax - discount
  const { cartItem, fetchCart }: any = useCartItem();
  const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjnAPBYyNW-vmruk_1DNqCUg7wjyrs_6g_6LuRm20yQ&s";
  const [addressData, setAddressData] = useState<any[]>([]);
  const { location, zoneData } = useLocation()
  const slots = zoneData?.slots || [];
  const instant = zoneData?.instant_availability;
  const [appData, setAppData] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successModal, setSuccessModal] = useState(false)

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return { value: d.toISOString().split("T")[0], label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) }
  })

  // const handleConfirmBooking = () => {
  //   if (!isLoggedIn) {
  //     setShowLoginModal(true)
  //     return
  //   }

  //   const newOrder = {
  //     id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
  //     date: new Date().toISOString().split("T")[0],
  //     amount: grandTotal,
  //     status: "ongoing" as const,
  //     serviceId: items[0]?.id || "s1",
  //     address: savedAddresses.find((a) => a.id === selectedAddress)?.address || "Current Location",
  //     slot: scheduleType === "instant" ? "Instant - Within 1 hour" : `${selectedDate} ${selectedTime}`,
  //     paymentMethod: selectedPayment.toUpperCase(),
  //     technician: { name: "Rajesh Kumar", phone: "+91 98765 43210", rating: 4.9 },
  //     timeline: { booked: new Date().toLocaleString() },
  //   }

  //   addOrder(newOrder)
  //   setBookingSuccess(true)
  //   setTimeout(() => {
  //     clearCart()
  //     router.push(`/orders/${newOrder.id}`)
  //   }, 2000)
  // }


  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // const handleConfirmBooking = async () => {
  //   try {
  //     const razorpayLoaded = await loadRazorpay();

  //     if (!razorpayLoaded) {
  //       // setErrorMessage(
  //       //   "Payment gateway blocked by browser. Please use Chrome or disable ad-block."
  //       // );
  //       // setLoading(false);
  //       return;
  //     }

  //     const updatedApi = await axiosInstance.post(Api?.orderCheckout)
  //     if (!updatedApi) throw new Error("Payment init failed");
  //     if (updatedApi) {
  //       const { payment_order_id, final_price } = updatedApi.data;

  //       const options = {
  //         key: appData?.pg_api_key,
  //         amount: Math.round(final_price * 100),
  //         currency: "INR",
  //         name: "ITFixer@199",
  //         description: "Order Payment",
  //         order_id: payment_order_id,

  //         handler: function (response: any) {
  //           // setPaymentSuccess(true);
  //         },

  //         modal: {
  //           ondismiss: function () {
  //             // setLoading(false);
  //           },
  //         },

  //         // prefill: {
  //         //   name: user?.data?.name || "",
  //         //   email: user?.data?.email || "",
  //         //   contact: user?.data?.contact_number || "",
  //         // },

  //         notes: {
  //           address: "Selected Address",
  //         },

  //         theme: {
  //           color: "#008cf6",
  //         },
  //       };

  //       const razorpay = new (window as any).Razorpay(options);

  //       razorpay.on("payment.failed", function (response: any) {
  //         // setErrorMessage(response?.error?.description || "Payment failed");
  //       });

  //       razorpay.open();
  //     }
  //   } catch (error) {

  //   }
  // }

  const handleConfirmBooking = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    try {
      setLoading(true)
      setErrorMessage("")

      const razorpayLoaded = await loadRazorpay()

      if (!razorpayLoaded) {
        setErrorMessage("Payment gateway blocked. Try Chrome / disable adblock.")
        setLoading(false)
        return
      }

      const res = await axiosInstance.post(Api?.orderCheckout)
      console.log(res)
      if (!res?.data) throw new Error("Payment init failed")

      const { razorpay_order_id, amount, order_id } = res.data?.checkout

      const options = {
        key: appData?.pg_api_key,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "ITFixer@199",
        description: "Order Payment",
        order_id: razorpay_order_id,

        handler: function (response: any) {
          // ✅ SUCCESS
          setSuccessModal(true)
          setLoading(false)

          setTimeout(() => {
            router.push(`/orders/${order_id}`)
          }, 2000)
        },

        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },

        theme: {
          color: "#008cf6",
        },
      }

      const razorpay = new (window as any).Razorpay(options)

      razorpay.on("payment.failed", function (response: any) {
        setErrorMessage(response?.error?.description || "Payment failed")
        setLoading(false)
      })

      razorpay.open()

    } catch (err: any) {
      console.error(err)
      setErrorMessage("Something went wrong. Try again.")
      setLoading(false)
    }
  }


  const increaseQty = async (productId: string, cart: any, type: any) => {
    try {
      await axiosInstance.patch(`${Api?.cartApi}/item/${productId}/update/`, {
        type: type,
        product_id: productId,
        quantity: cart + 1,
      })

      fetchCart()
    } catch (err) {
      console.error(err)
    }
  }

  const decreaseQty = async (productId: string, cart: any, type: any) => {
    try {
      await axiosInstance.post(`${Api?.cartApi}/item/${productId}/decrease/`, {
        type: type,
        product_id: productId,
        quantity: cart - 1,
      })

      fetchCart()
    } catch (err) {
      console.error(err)
    }
  }

  // Address

  const FetchAddressApi = async () => {
    try {
      const updatedApi = await axiosInstance.get(Api?.myAddress)
      console.log(updatedApi)
      if (updatedApi) {
        setAddressData(updatedApi?.data?.data)
      }
    } catch (error) {

    }
  }

  // AppSettings
  const FetchAppSetting = async () => {
    try {
      const updatedApi = await axiosInstance.get(Api?.appSettings)
      if (updatedApi) {
        setAppData(updatedApi?.data?.data);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    FetchAddressApi();
    FetchAppSetting();
  }, [])

  // 🔥 SLOT SELECT
  const handleSlotSelect = async (slot: any) => {
    try {
      setSelectedTime(slot.id)
      setScheduleType("later")

      await axiosInstance.patch(`${Api?.cartApi}/update/`, {
        slot_id: slot.id,
        zone_id: zoneData?.zone?.id,
        is_instant_slot: false,
      })

      fetchCart()
    } catch (err) {
      console.error("Slot update error", err)
    }
  }

  // 🔥 INSTANT SELECT
  const handleInstantSelect = async () => {
    try {
      setScheduleType("instant")
      setSelectedTime("")

      await axiosInstance.patch(`${Api?.cartApi}/update/`, {
        slot_id: null,
        zone_id: zoneData?.zone?.id,
        is_instant_slot: true,
      })

      fetchCart()
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (!cartItem) return

    if (cartItem?.is_instant_slot) {
      setScheduleType("instant")
      setSelectedTime("")
    }

    if (cartItem?.slot_id) {
      setScheduleType("later")
      setSelectedTime(cartItem?.slot_id)
    }
  }, [cartItem])

  //   if (scheduleType === "later" && !selectedTime) {
  //   setErrorMessage("Please select a time slot")
  //   return
  // }

  if (bookingSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="animate-slide-up text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Redirecting to your order...</p>
          </div>
        </main>
      </div>
    )
  }

  if (cartItem?.items?.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <LoginModal />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mb-6 text-muted-foreground">Add services or products to get started</p>
            <Link href="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25">
              Browse Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <LoginModal />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30">
            <ArrowLeft className="h-3.5 w-3.5" />
            Continue Shopping
          </Link>

          <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left */}
            <div className="space-y-6 lg:col-span-2">
              {/* Cart Items */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Cart Items ({cartItem?.items?.length})</h2>
                <div className="space-y-4">
                  {cartItem?.items?.map((item: any) => {
                    const isDisabled = item?.is_active === false

                    return (
                      <div
                        key={item.id}
                        className={`flex gap-4 rounded-xl border p-3 transition-all
        ${isDisabled ? "opacity-50 bg-gray-100" : "border-border bg-background"}
      `}
                      >
                        {/* IMAGE */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item?.service?.media[0]?.url || emptyImage}
                            alt={item?.service?.name}
                            fill
                            className="object-cover"
                          />

                          {/* 🔥 NOT AVAILABLE OVERLAY */}
                          {isDisabled && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold">
                              Not Available
                            </div>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 mb-1">
                              <h3 className="text-sm font-semibold text-foreground">
                                {item?.service?.name}
                              </h3>

                              <p className="text-xs text-muted-foreground capitalize">
                                {item?.type}
                              </p>

                              <p className="text-sm font-bold text-foreground">
                                ₹{item?.unit_price?.toLocaleString()}
                              </p>

                              {/* 🔥 RED MESSAGE */}
                              {isDisabled && (
                                <p className="text-xs text-red-500 font-medium">
                                  ❌ Not available in your location
                                </p>
                              )}
                            </div>

                            {/* DELETE */}
                            <button
                              onClick={() => removeItem(item?.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* QTY */}
                          <div className="flex items-center justify-between">
                            <div
                              className={`flex items-center gap-2 rounded-lg border px-1
              ${isDisabled ? "opacity-40 pointer-events-none" : ""}
            `}
                            >
                              <button
                                onClick={() =>
                                  !isDisabled &&
                                  decreaseQty(item?.id, item?.quantity, item?.type)
                                }
                                className="h-8 w-8 flex items-center justify-center"
                              >
                                <Minus className="h-3 w-3" />
                              </button>

                              <span className="w-6 text-center text-sm font-medium">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  !isDisabled &&
                                  increaseQty(item?.id, item?.quantity, item?.type)
                                }
                                className="h-8 w-8 flex items-center justify-center"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-foreground">
                              ₹{item?.item_total?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Address */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Delivery Address</h2>
                <div className="space-y-3">
                  {addressData?.map((addr: any) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${addr?.selected_address === true ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                    >
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${addr?.selected_address === true ? "border-primary" : "border-muted-foreground/30"}`}>
                        {addr?.selected_address === true && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{addr?.name}</p>
                        <p className="text-xs text-muted-foreground">{addr?.full_address}</p>
                      </div>
                    </button>
                  ))}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
                    <MapPin className="h-4 w-4" />
                    Use Current Location
                  </button>
                </div>
              </div>

              {/* Slot Selection */}
              {/* Slot Selection */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Schedule</h2>

                {/* Toggle */}
                <div className="mb-4 flex rounded-xl border border-border bg-background p-1">
                  <button
                    onClick={handleInstantSelect}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${scheduleType === "instant"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                      }`}
                  >
                    Instant Service
                  </button>

                  <button
                    onClick={() => setScheduleType("later")}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${scheduleType === "later"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                      }`}
                  >
                    Schedule for Later
                  </button>
                </div>

                {/* 🔥 INSTANT */}
                {scheduleType === "instant" && (
                  <div className="rounded-xl border p-4 bg-green-50 border-green-200">
                    {instant?.available ? (
                      <div className="text-sm font-medium text-green-700">
                        Available Now <br />
                        {instant?.eta_start_time} - {instant?.eta_end_time}
                      </div>
                    ) : (
                      <div className="text-sm text-red-500">
                        ❌ Instant not available
                      </div>
                    )}
                  </div>
                )}

                {/* 🔥 SLOTS */}
                {scheduleType === "later" && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots?.map((slot: any) => {

                      return (
                        <button
                          key={slot?.id}
                          onClick={() => handleSlotSelect(slot)}
                          className={`rounded-xl border py-2.5 text-xs font-medium transition-all
              
              ${selectedTime === slot?.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/30"
                            }

             `}
                        >
                          {slot?.name} <br />
                          {slot?.start_time} - {slot?.end_time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Payment */}
              {/* <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Payment Method</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setSelectedPayment(pm.id)}
                        className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${selectedPayment === pm.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}
                      >
                        <Icon className={`h-5 w-5 ${selectedPayment === pm.id ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-xs font-medium ${selectedPayment === pm.id ? "text-primary" : "text-muted-foreground"}`}>{pm.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div> */}

            </div>

            {/* Right - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-5 text-lg font-semibold text-foreground">Payment Summary</h2>
                <div className="space-y-3 border-b border-border pb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">{"₹"}{cartItem?.cart_total?.toLocaleString()}</span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium text-foreground">{"₹"}{serviceFee.toLocaleString()}</span>
                  </div> */}
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium text-foreground">{"₹"}{tax.toLocaleString()}</span>
                  </div> */}
                  {/* {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-accent">Discount</span>
                      <span className="font-medium text-accent">-{"₹"}{discount.toLocaleString()}</span>
                    </div>
                  )} */}
                </div>
                <div className="flex justify-between py-5">
                  <span className="text-base font-semibold text-foreground">Grand Total</span>
                  <span className="text-xl font-bold text-foreground">{"₹"}{cartItem?.cart_total?.toLocaleString()}</span>
                </div>

                {errorMessage && (
                  <p className="mt-3 text-center text-sm text-red-500 font-medium">
                    {errorMessage}
                  </p>
                )}
                {/* <button
                  onClick={handleConfirmBooking}
                  className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  Confirm Booking
                </button> */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Secure checkout. Cancel anytime before service starts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {successModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl animate-scale-in">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-xl font-bold mb-2">Payment Successful 🎉</h2>
            <p className="text-sm text-gray-500">
              Your order has been placed successfully
            </p>

            <p className="mt-3 text-xs text-gray-400">
              Redirecting to order page...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
