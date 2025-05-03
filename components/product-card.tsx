"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "./cart-provider"
import { ShoppingCart, Heart, Eye, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="group h-full product-card overflow-hidden">
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="product-card-image object-cover"
          />
          {product.featured && (
            <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
              مميز
            </div>
          )}
          {product.discount && (
            <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-bold text-white">
              خصم {product.discount}%
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/40 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
                <Eye className="h-5 w-5" />
                <span className="sr-only">عرض سريع</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogDescription>{product.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4 md:grid-cols-2">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{product.name}</h3>
                    <div className="mb-2 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < (product.rating || 5) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                      <span className="mr-1 text-sm text-muted-foreground">({product.reviewCount || 0})</span>
                    </div>
                    <p className="mb-4 text-muted-foreground">{product.description}</p>
                    <p className="mb-4 text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
                  </div>
                  <Button onClick={() => addToCart(product)} className="w-full">
                    <ShoppingCart className="ml-2 h-4 w-4" />
                    إضافة إلى السلة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
            <Heart className="h-5 w-5" />
            <span className="sr-only">إضافة للمفضلة</span>
          </Button>

          <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">إضافة للسلة</span>
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-2 flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < (product.rating || 5) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
            />
          ))}
          <span className="mr-2 text-xs text-muted-foreground">({product.reviewCount || 0})</span>
        </div>

        <h3 className="mb-2 text-xl font-bold">{product.name}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          <Button onClick={() => addToCart(product)} size="sm" className="rounded-full">
            <ShoppingCart className="ml-2 h-4 w-4" />
            أضف للسلة
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
