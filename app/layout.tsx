import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { LocationProvider } from '@/context/location-context'
import { OrderProvider } from '@/context/order-context'
import { LocationModalWrapper } from '@/components/location-modal-wrapper'
import { CartItemProvider } from '@/context/CartItemContext'
import Script from 'next/script'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'ITFixer@199',
  // description: 'Premium service booking platform. Verified professionals. Instant booking. Transparent pricing.',
  // generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#4338ca',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_spaceGrotesk.variable}`}>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              <CartItemProvider>
                <OrderProvider>
                  {/* <LocationModalWrapper /> */}
                  {children}
                </OrderProvider>
              </CartItemProvider>
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
