import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.jpeg"
                  alt="ServeNow Logo"
                  width={40}
                  height={40}
                  className=" w-full h-full object-contain"
                />
              </div>
              {/* <span className="text-xl font-bold text-foreground">ServeNow</span> */}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium service booking platform. Verified professionals. Instant booking. Transparent pricing.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">All Services</Link>
              <Link href="/products" className="text-sm text-muted-foreground transition-colors hover:text-primary">Products</Link>
              <Link href="/orders" className="text-sm text-muted-foreground transition-colors hover:text-primary">My Orders</Link>
              <Link href="/cart" className="text-sm text-muted-foreground transition-colors hover:text-primary">Cart</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Categories</h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/categories/cleaning" className="text-sm text-muted-foreground transition-colors hover:text-primary">Cleaning</Link>
              <Link href="/categories/plumbing" className="text-sm text-muted-foreground transition-colors hover:text-primary">Plumbing</Link>
              <Link href="/categories/electrical" className="text-sm text-muted-foreground transition-colors hover:text-primary">Electrical</Link>
              <Link href="/categories/beauty" className="text-sm text-muted-foreground transition-colors hover:text-primary">Beauty</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@servenow.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-muted-foreground">
            {"© 2026 ServeNow. All rights reserved."}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
