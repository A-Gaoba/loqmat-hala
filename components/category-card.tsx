"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"
import { motion } from "framer-motion"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/menu/${category.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg?height=300&width=300"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <motion.h3 className="font-display text-xl font-bold text-white" whileHover={{ scale: 1.05 }}>
            {category.name}
          </motion.h3>
        </CardContent>
      </Card>
    </Link>
  )
}
