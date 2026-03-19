import axiosInstance from "@/configs/axios-middleware";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Api from "../api-endpoints/ApiUrls";

export function ServiceCard({ service, cart, i, fetchCart, zoneData }: any,) {
    const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjnAPBYyNW-vmruk_1DNqCUg7wjyrs_6g_6LuRm20yQ&s";

    const addToCartApi = async (serviceId: string) => {
        try {
            await axiosInstance.post(`${Api?.cartApi}/add/`, {
                type: "SERVICE",
                service_id: serviceId,
                quantity: 1,
                zone_id: zoneData?.zone?.id
            })

            fetchCart()
        } catch (err) {
            console.error("Add cart error", err)
        }
    }

    const increaseQty = async (serviceId: string, cart: any) => {
        try {
            await axiosInstance.patch(`${Api?.cartApi}/item/${cart?.id}/update/`, {
                type: "SERVICE",
                service_id: serviceId,
                quantity: cart?.quantity + 1
            })

            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    const decreaseQty = async (serviceId: string, cart: any) => {
        try {
            await axiosInstance.post(`${Api?.cartApi}/item/${cart?.id}/decrease/`, {
                type: "SERVICE",
                service_id: serviceId,
                quantity: cart?.quantity - 1
            })

            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <>
            <div
                key={service?.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
            >
                <Link href={`/services/${service.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={service?.media_files[0]?.image_url || emptyImage}
                            alt={service?.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>

                <div className="p-4">
                    <h3 className="font-semibold">{service?.name}</h3>

                    <div className="flex items-center justify-between mt-3">
                        <p className="font-bold">
                            ₹{
                                service?.pricing_models?.find(
                                    (p: any) => p?.pricing_type_name === "Selling Price"
                                )?.price ?? 0
                            }
                        </p>

                        {!cart || cart.quantity === 0 ? (
                            <button
                                onClick={() => addToCartApi(service?.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow hover:scale-105 active:scale-95 transition"
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2  px-2 py-1 ">
                                <button
                                    onClick={() => decreaseQty(service?.id, cart)}
                                    className="h-7 w-7 flex items-center justify-center rounded bg-white shadow text-lg font-bold"
                                >
                                    -
                                </button>

                                <span className="min-w-[20px] text-center font-semibold">
                                    {cart.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQty(service?.id, cart)}
                                    className="h-7 w-7 flex items-center justify-center rounded bg-primary text-white shadow"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
