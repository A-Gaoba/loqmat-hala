"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { getProductsByCategory, getCategoryBySlug } from "@/lib/products"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { ChevronLeft, Search, SlidersHorizontal, Cake } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category)
  const allProducts = getProductsByCategory(params.category)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [inStock, setInStock] = useState(true)

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter((product) => (inStock ? true : Math.random() > 0.5)) // Mock in-stock filter
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return a.featured ? -1 : 1
      }
    })

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

  if (!category) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4">القسم غير موجود</h1>
        <Link href="/menu" className="text-primary hover:underline">
          العودة إلى القائمة
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Category Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src={
            category.heroImage ||
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop"
          }
          alt={category.name}
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
            {category.name}
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
        <div className="mb-8">
          <Link href="/menu" className="mb-4 flex items-center text-primary hover:underline">
            <ChevronLeft className="ml-1 h-4 w-4" />
            العودة إلى القائمة
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-center text-lg text-muted-foreground"
          >
            اكتشف مجموعتنا المميزة من {category.name} المصنوعة بأفضل المكونات وبأيدي محترفة
          </motion.p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن منتج..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">الأكثر تميزاً</SelectItem>
                <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
                <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
                <SelectItem value="name-asc">الاسم: أ-ي</SelectItem>
                <SelectItem value="name-desc">الاسم: ي-أ</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="sr-only">تصفية</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>تصفية المنتجات</SheetTitle>
                  <SheetDescription>اختر المعايير المناسبة لتصفية المنتجات</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">نطاق السعر</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{priceRange[0]} ريال</span>
                        <span>{priceRange[1]} ريال</span>
                      </div>
                      <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={500}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">التوفر</h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox id="in-stock" checked={inStock} onCheckedChange={setInStock} />
                      <Label htmlFor="in-stock">متوفر في المخزون</Label>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => {}}>
                    تطبيق التصفية
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <Cake className="mx-auto mb-4 h-16 w-16 text-muted" />
            <h3 className="mb-2 text-xl">لا توجد منتجات مطابقة</h3>
            <p className="text-muted-foreground">جرب البحث بكلمة أخرى أو تغيير معايير التصفية</p>
          </div>
        )}
      </div>
    </div>
  )
}
