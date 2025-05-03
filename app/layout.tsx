import type React from "react"
import type { Metadata } from "next"
import { Aref_Ruqaa, Tajawal } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CartProvider from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
})

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
})

export const metadata: Metadata = {
  title: "لُقمة حلا | Loqmat Hala",
  description: "متجر الحلويات المنزلية الأشهى والألذ - حلويات منزلية بنكهة مميزة",
  keywords: "حلويات, حلويات منزلية, كيك, كوكيز, تشيز كيك, حلويات عربية, لقمة حلا",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={cn("overflow-x-hidden overflow-y-hidden", tajawal.variable, arefRuqaa.variable, tajawal.className)}>
        <CartProvider>
          <div className="flex min-h-screen flex-col overflow-x-hidden ">
            <Header />
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
