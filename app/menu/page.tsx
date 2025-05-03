"use client"

import { motion } from "framer-motion"
import { getCategories } from "@/lib/products"
import CategoryCard from "@/components/category-card"
import { Cake, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

export default function MenuPage() {
  const categories = getCategories()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop"
          alt="قائمة المنتجات"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-white"
          >
            قائمة المنتجات
          </motion.h1>
          <motion.div
            initial={{ width: "60%", opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-1 max-w-md bg-primary"
          ></motion.div>
        </div>
      </div>

      <div className="container py-16">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
          >
            اكتشف تشكيلتنا الواسعة من الحلويات المنزلية الطازجة المصنوعة بأفضل المكونات وبأيدي محترفة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mb-12 max-w-md"
          >
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن قسم..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {filteredCategories.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCategories.map((category) => (
              <motion.div key={category.id} variants={item}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <Cake className="mx-auto mb-4 h-16 w-16 text-muted" />
            <h3 className="mb-2 text-xl">لا توجد أقسام مطابقة</h3>
            <p className="text-muted-foreground">جرب البحث بكلمة أخرى</p>
          </div>
        )}
      </div>
    </div>
  )
}
