import axiosInstance from "@/configs/axios-middleware";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Api from "../api-endpoints/ApiUrls";

export function ProductCard({ product, cart, i, fetchCart }: any) {
    const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjnAPBYyNW-vmruk_1DNqCUg7wjyrs_6g_6LuRm20yQ&s";


    const addToCartApi = async (productId: string) => {
        try {
            await axiosInstance.post(`${Api?.cartApi}/add/`, {
                type: "PRODUCT",
                product_id: productId,
                quantity: 1,
            })

            fetchCart()
        } catch (err) {
            console.error("Add cart error", err)
        }
    }

    const increaseQty = async (productId: string, cart: any) => {
        try {
            await axiosInstance.patch(`${Api?.cartApi}/item/${cart?.id}/update/`, {
                type: "PRODUCT",
                product_id: productId,
                quantity: cart?.quantity + 1,
            })

            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    const decreaseQty = async (productId: string, cart: any) => {
        try {
            await axiosInstance.post(`${Api?.cartApi}/item/${cart?.id}/decrease/`, {
                type: "PRODUCT",
                product_id: productId,
                quantity: cart?.quantity - 1,
            })

            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <div
                key={product?.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
            >
                <Link href={`/products/${product?.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={product?.media[0]?.url ? product?.media[0]?.url : emptyImage}
                            alt={product?.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                </Link>
                <div className="p-4">
                    <Link href={`/products/${product?.id}`}>
                        <h3 className="mb-2 capitalize text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                            {product?.name}
                        </h3>
                    </Link>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {product?.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-foreground">
                                {/* {"₹"}{product.price.toLocaleString()} */}
                                {"₹"}{product?.pricing[0]?.price?.toLocaleString()}
                            </p>
                        </div>
                        {/* <button
                            onClick={() =>
                              addItem({ id: product?.id, name: product?.name, price: product?.price, image: product?.image, type: "product" })
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-90"
                            aria-label={`Add ${product?.name} to cart`}
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </button> */}
                        {!cart || cart.quantity === 0 ? (
                            <button
                                onClick={() => addToCartApi(product?.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow hover:scale-105 active:scale-95 transition"
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 px-2 py-1">
                                <button
                                    onClick={() => decreaseQty(product?.id, cart)}
                                    className="h-7 w-7 flex items-center justify-center rounded bg-white shadow text-lg font-bold"
                                >
                                    -
                                </button>

                                <span className="min-w-[20px] text-center font-semibold">
                                    {cart.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQty(product?.id, cart)}
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
