"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem, Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface CartContextType {
  items: CartItem[]
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    } else {
      localStorage.removeItem("cart")
    }

    // Calculate total price
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }, [items])

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Increment quantity if product already in cart
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })

    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة المشتريات`,
    })
  }

  const removeFromCart = (productId: string) => {
    const productToRemove = items.find((item) => item.id === productId)

    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))

    if (productToRemove) {
      toast({
        title: "تمت إزالة المنتج",
        description: `تمت إزالة ${productToRemove.name} من سلة المشتريات`,
      })
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "تم تفريغ السلة",
      description: "تم تفريغ سلة المشتريات بنجاح",
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
