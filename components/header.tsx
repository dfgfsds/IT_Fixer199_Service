// "use client"

// import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import { MapPin, Search, ShoppingCart, User, ChevronDown, LogOut, Package, X, Loader2, Menu } from "lucide-react"
// import { useAuth } from "@/context/auth-context"
// import { useCart } from "@/context/cart-context"
// import { useLocation } from "@/context/location-context"
// import { services, products } from "@/data/mock"

// export function Header() {
//   const { isLoggedIn, setShowLoginModal, logout, user } = useAuth()
//   const { totalItems } = useCart()
//   const { location, detecting, setShowLocationModal } = useLocation()
//   const [searchOpen, setSearchOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [profileDropdown, setProfileDropdown] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const searchRef = useRef<HTMLDivElement>(null)
//   const profileRef = useRef<HTMLDivElement>(null)

//   console.log(user)
//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
//       if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileDropdown(false)
//     }
//     document.addEventListener("mousedown", handleClick)
//     return () => document.removeEventListener("mousedown", handleClick)
//   }, [])

//   const allItems = [
//     ...services.map((s) => ({ id: s.id, name: s.name, type: "service" as const, href: `/services/${s.id}` })),
//     ...products.map((p) => ({ id: p.id, name: p.name, type: "product" as const, href: `/products/${p.id}` })),
//   ]

//   const suggestions =
//     searchQuery.length > 0
//       ? allItems.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
//       : []

//   return (
//     <header className="sticky top-0 z-50 glass shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 lg:gap-4 lg:px-8">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-muted lg:hidden"
//         >
//           <Menu className="h-5 w-5 text-foreground" />
//         </button>

//         {/* Logo */}
//         <Link href="/" className="flex shrink-0 items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
//             <span className="text-sm font-bold text-primary-foreground">S</span>
//           </div>
//           <span className="hidden text-xl font-bold tracking-tight text-foreground sm:block">
//             ServeNow
//           </span>
//         </Link>

//         {/* City Selector - Opens Modal */}
//         <button
//           onClick={() => setShowLocationModal(true)}
//           className="group flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 active:scale-[0.97]"
//         >
//           {detecting ? (
//             <Loader2 className="h-4 w-4 animate-spin text-primary" />
//           ) : (
//             <MapPin className="h-4 w-4 text-primary" />
//           )}
//           <div className="hidden flex-col items-start md:flex">
//             <span className="text-xs text-muted-foreground leading-none">Deliver to</span>
//             <span className="max-w-[120px] truncate font-semibold text-foreground leading-tight">
//               {location.city}
//             </span>
//           </div>
//           <span className="max-w-[80px] truncate font-medium text-foreground md:hidden">
//             {location.city}
//           </span>
//           <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform group-hover:rotate-180" />
//         </button>

//         {/* Search - Compact Premium */}
//         <div ref={searchRef} className="relative ml-auto hidden sm:block">
//           <div className="relative flex w-[220px] items-center rounded-full border border-border bg-card/80 px-4 py-2 shadow-sm transition-all duration-300 focus-within:w-[280px] focus-within:border-primary/40 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/20 lg:w-[300px] lg:focus-within:w-[340px]">
//             <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Search services or products"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value)
//                 setSearchOpen(true)
//               }}
//               onFocus={() => setSearchOpen(true)}
//               className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => {
//                   setSearchQuery("")
//                   setSearchOpen(false)
//                 }}
//                 className="ml-1"
//               >
//                 <X className="h-3.5 w-3.5 text-muted-foreground transition-colors hover:text-foreground" />
//               </button>
//             )}
//           </div>
//           {searchOpen && suggestions.length > 0 && (
//             <div className="absolute right-0 top-full mt-2 w-[320px] animate-slide-up rounded-xl border border-border bg-card p-2 shadow-xl">
//               {suggestions.map((s) => (
//                 <Link
//                   key={s.id}
//                   href={s.href}
//                   onClick={() => {
//                     setSearchOpen(false)
//                     setSearchQuery("")
//                   }}
//                   className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
//                 >
//                   <span className="text-sm font-medium text-foreground">{s.name}</span>
//                   <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground capitalize">
//                     {s.type}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Mobile Search Button */}
//         <button
//           onClick={() => setSearchOpen(!searchOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-muted sm:hidden"
//         >
//           <Search className="h-5 w-5 text-foreground" />
//         </button>

//         {/* Cart */}
//         <Link
//           href="/cart"
//           className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
//         >
//           <ShoppingCart className="h-5 w-5 text-foreground" />
//           {totalItems > 0 && (
//             <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md shadow-primary/30 animate-fade-in">
//               {totalItems}
//             </span>
//           )}
//         </Link>

//         {/* Profile */}
//         <div ref={profileRef} className="relative">
//           {isLoggedIn ? (
//             <>
//               <button
//                 onClick={() => setProfileDropdown(!profileDropdown)}
//                 className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 transition-all hover:border-primary/40 hover:shadow-md"
//               >
//                 <User className="h-5 w-5 text-primary" />
//               </button>

//               {profileDropdown && (
//                 <div className="absolute right-0 top-full mt-2 w-52 animate-slide-up rounded-2xl border border-border bg-card p-2 shadow-xl">
//                   <div className="mb-2 border-b border-border px-3 pb-3 pt-2">
//                     <p className="text-sm font-bold text-foreground capitalize">{user?.name}</p>
//                     <p className="text-xs text-muted-foreground">{user?.mobile_number}</p>
//                     {/* <p className="text-xs text-muted-foreground">{location.city}</p> */}
//                   </div>
//                   <Link
//                     href="/orders"
//                     onClick={() => setProfileDropdown(false)}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-muted"
//                   >
//                     <Package className="h-4 w-4 text-muted-foreground" />
//                     <span className="font-medium">My Orders</span>
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout()
//                       setProfileDropdown(false)
//                     }}
//                     className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span className="font-medium">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <button
//               onClick={() => setShowLoginModal(true)}
//               className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile Search Overlay */}

//       {searchOpen && (
//         <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md sm:hidden animate-fade-in">
//           <div className="flex items-center gap-3 border-b border-border px-4 py-3">
//             <button
//               onClick={() => {
//                 setSearchQuery("")
//                 setSearchOpen(false)
//               }}
//               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"
//             >
//               <X className="h-4 w-4 text-foreground" />
//             </button>
//             <div className="flex flex-1 items-center rounded-full border border-border bg-card px-4 py-2.5 shadow-sm ring-2 ring-primary/20">
//               <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search services or products"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//                 className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
//               />
//               {searchQuery && (
//                 <button onClick={() => setSearchQuery("")} className="ml-1">
//                   <X className="h-3.5 w-3.5 text-muted-foreground" />
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="overflow-y-auto px-4 pt-2 pb-8" style={{ maxHeight: "calc(100vh - 64px)" }}>
//             {suggestions.length > 0 ? (
//               <div className="flex flex-col gap-1">
//                 {suggestions.map((s) => (
//                   <Link
//                     key={s.id}
//                     href={s.href}
//                     onClick={() => {
//                       setSearchOpen(false)
//                       setSearchQuery("")
//                     }}
//                     className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-muted"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Search className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium text-foreground">{s.name}</span>
//                     </div>
//                     <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground capitalize">
//                       {s.type}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             ) : searchQuery.length > 0 ? (
//               <div className="flex flex-col items-center gap-2 py-12 text-center">
//                 <Search className="h-8 w-8 text-muted-foreground/40" />
//                 <p className="text-sm text-muted-foreground">No results found</p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center gap-2 py-12 text-center">
//                 <Search className="h-8 w-8 text-muted-foreground/30" />
//                 <p className="text-sm text-muted-foreground">Start typing to search</p>
//               </div>
//             )}
//           </div>

//         </div>
//       )}

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="border-t border-border px-4 pb-4 lg:hidden animate-slide-up">
//           <nav className="flex flex-col gap-1 pt-2">
//             <Link
//               href="/"
//               onClick={() => setMobileMenuOpen(false)}
//               className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//             >
//               Home
//             </Link>
//             <Link
//               href="/services"
//               onClick={() => setMobileMenuOpen(false)}
//               className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//             >
//               Services
//             </Link>
//             <Link
//               href="/products"
//               onClick={() => setMobileMenuOpen(false)}
//               className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//             >
//               Products
//             </Link>
//             <Link
//               href="/orders"
//               onClick={() => setMobileMenuOpen(false)}
//               className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//             >
//               My Orders
//             </Link>
//             <button
//               onClick={() => {
//                 setShowLocationModal(true)
//                 setMobileMenuOpen(false)
//               }}
//               className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
//             >
//               <MapPin className="h-4 w-4 text-primary" />
//               <span>{location.city}</span>
//               <span className="ml-auto text-xs text-primary">Change</span>
//             </button>
//           </nav>
//         </div>
//       )}
//     </header>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Package,
  X,
  Menu,
} from "lucide-react"

import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useLocation } from "@/context/location-context"
import LocationModal from "./Address/LocationModal"
import { useCartItem } from "@/context/CartItemContext"


export function Header() {
  const { isLoggedIn, setShowLoginModal, logout, user } = useAuth()
  const { totalItems } = useCart()
  const { location, showLocationModal, setShowLocationModal } = useLocation()
  // const [showLocationModal, setShowLocationModal] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const { cartItem, fetchCart }: any = useCartItem();
  console.log(user)

  // 🔥 outside click close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileDropdown(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 lg:px-8">

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded text-white flex items-center justify-center font-bold">
              S
            </div>
            <span className="font-bold text-lg hidden sm:block">
              ServeNow
            </span>
          </Link>

          {/* 🔥 LOCATION BUTTON */}
          <button
            onClick={() => {
              console.log("clicked")
              setShowLocationModal(true)
            }}
            className="flex items-center gap-1 border px-3 py-2 rounded-full"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {location?.city || "Select Location"}
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {/* SEARCH */}
          <div ref={searchRef} className="ml-auto hidden sm:block relative">
            <div className="flex items-center border rounded-full px-3 py-2">
              <Search className="h-4 w-4 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSearchOpen(true)
                }}
                className="outline-none text-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* CART */}
          {isLoggedIn ? (
            <Link
              href="/cart" className="relative ml-2">
              <ShoppingCart className="h-5 w-5" />
              {cartItem?.items?.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full px-1">
                  {cartItem?.items?.length}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/"
              onClick={() => setShowLoginModal(true)}
              className="relative ml-2">
              <ShoppingCart className="h-5 w-5" />
              {cartItem?.items?.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full px-1">
                  {cartItem?.items?.length}
                </span>
              )}
            </Link>
          )}


          {/* PROFILE */}
          <div ref={profileRef} className="relative ml-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <User className="h-5 w-5" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-xl p-2">
                    <div className="px-3 py-2 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500">
                        {user?.mobile_number}
                      </p>
                    </div>

                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <Package className="h-4 w-4" />
                      Orders
                    </Link>

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-full"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t p-3">
            <Link href="/" className="block py-2">Home</Link>
            <Link href="/services" className="block py-2">Services</Link>
            <Link href="/products" className="block py-2">Products</Link>
          </div>
        )}
      </header>

      {/* 🔥 LOCATION MODAL RENDER */}
      {showLocationModal && (
        <LocationModal onClose={() => setShowLocationModal(false)} />
      )}
    </>
  )
}
