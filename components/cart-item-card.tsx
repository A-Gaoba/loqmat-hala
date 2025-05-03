"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { motion } from "framer-motion"

interface CartItemCardProps {
  item: CartItem
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-md">
        <Image
          src={item.image || "/placeholder.svg?height=100&width=100"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">تقليل الكمية</span>
        </Button>

        <span className="w-8 text-center">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">زيادة الكمية</span>
        </Button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-primary">{formatPrice(item.price * item.quantity)}</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 h-8 text-destructive hover:text-destructive"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-4 w-4 ml-1" />
          <span className="text-xs">حذف</span>
        </Button>
      </div>
    </motion.div>
  )
}
