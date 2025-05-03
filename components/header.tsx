"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ShoppingCart, X, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 shadow-md backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">القائمة</span>
          </Button>

          <Link href="/" className="flex items-center">
            <span className="font-display text-2xl font-bold text-primary">لُقمة حلا</span>
          </Link>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 top-0 z-50 flex flex-col bg-background p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="text-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                  لُقمة حلا
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">إغلاق</span>
                </Button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                <Link href="/" className="py-2 text-lg hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  الرئيسية
                </Link>
                <Link href="/menu" className="py-2 text-lg hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  المنتجات
                </Link>
                <Link href="/cart" className="py-2 text-lg hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  السلة
                  {totalItems > 0 && (
                    <Badge variant="secondary" className="mr-2">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </nav>

              <div className="mt-auto">
                <div className="mb-4 flex items-center justify-center space-x-4 space-x-reverse">
                  <Link
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary p-2 text-white hover:bg-primary/80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                    </svg>
                    <span className="sr-only">واتساب</span>
                  </Link>
                  <Link
                    href="https://instagram.com/loqmathala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary p-2 text-white hover:bg-primary/80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">انستغرام</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="hidden items-center md:flex">
          <Link href="/" className="px-4 py-2 text-lg font-medium hover:text-primary">
            الرئيسية
          </Link>
          <Link href="/menu" className="px-4 py-2 text-lg font-medium hover:text-primary">
            المنتجات
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "300px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative"
              >
                <Input
                  type="search"
                  placeholder="ابحث عن منتج..."
                  className="pl-10"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </motion.div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">بحث</span>
              </Button>
            )}
          </AnimatePresence>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center">
                  تسجيل الدخول
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center">
                  إنشاء حساب
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">المفضلة</span>
          </Button>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">السلة</span>
            </Button>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
