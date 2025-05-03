"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts, getCategories } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { ArrowDown } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import "swiper/css/parallax"
import CategoryCard from "@/components/category-card"
import SpecialOfferBanner from "@/components/special-offer-banner"
import TestimonialCard from "@/components/testimonial-card"
import { testimonials } from "@/lib/data"
import ProcessStep from "@/components/process-step"
import { useInView } from "react-intersection-observer"
import { useCart } from "@/components/cart-provider"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getCategories()
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [productsRef, productsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { addToCart } = useCart()

  useEffect(() => {
    setMounted(true)

    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal")

    const revealScroll = () => {
      const windowHeight = window.innerHeight
      const revealPoint = 150

      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top

        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", revealScroll)
    revealScroll() // Initial check

    return () => window.removeEventListener("scroll", revealScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100vh] w-full overflow-hidden bg-[#c27c4c]">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#c27c4c] to-[#a05c2e] z-0"></div>

        {/* Floating dessert images container */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Top left dessert */}
          <div className="absolute left-[5%] sm:left-[10%] top-[20%] w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] animate-float">
            <Image
              src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000&auto=format&fit=crop"
              alt="حلويات"
              fill
              className="rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          </div>

          {/* Top right dessert */}
          <div
            className="absolute right-[5%] sm:right-[15%] top-[15%] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] animate-float-reverse"
            style={{ animationDelay: "1s" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000&auto=format&fit=crop"
              alt="حلويات"
              fill
              className="rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          </div>

          {/* Bottom left dessert */}
          <div
            className="absolute left-[10%] sm:left-[20%] bottom-[20%] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
              alt="حلويات"
              fill
              className="rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          </div>

          {/* Bottom right dessert */}
          <div
            className="absolute right-[10%] sm:right-[25%] bottom-[25%] w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] animate-float-reverse"
            style={{ animationDelay: "0.5s" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop"
              alt="حلويات"
              fill
              className="rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity, y, scale }}
          className="container relative z-20 flex h-full min-h-[100vh] flex-col items-center justify-center py-10 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-[#ff8c38]/80 px-4 py-2 rounded-lg inline-block mb-4">
              <span className="text-white text-base sm:text-lg font-normal">الحلويات</span>
            </div>
            <h1 className="mb-4 sm:mb-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">
              لُقمة حلا
            </h1>
            <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white">
              حلويات منزلية بنكهة مميزة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-base sm:text-lg bg-[#ff8c38] hover:bg-[#ff8c38]/90">
                <Link href="/menu">القائمة</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <Link href="#about" className="flex flex-col items-center text-white">
              <span className="mb-2 text-sm sm:text-base">اكتشف المزيد</span>
              <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Special Offer Banner */}
      <SpecialOfferBanner />

      {/* About Section */}
      <section id="about" className="py-20" ref={aboutRef}>
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=1000&auto=format&fit=crop"
                  alt="لُقمة حلا"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-8 border-background bg-primary p-4 text-center text-white shadow-lg">
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm">خبرة</span>
                  <span className="text-xl sm:text-2xl font-bold">١٠</span>
                  <span className="text-xs sm:text-sm">سنوات</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">من نحن</h2>
              <p className="mb-6 text-lg leading-relaxed">
                مرحباً بكم في <span className="font-bold text-primary">لُقمة حلا</span>، مشروعنا المنزلي المتخصص في صناعة
                الحلويات الشهية بأيدي محترفة وبمكونات طازجة عالية الجودة.
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                نقدم لكم تشكيلة واسعة من الحلويات التقليدية والعصرية التي تناسب جميع المناسبات والأذواق. نحرص على اختيار
                أفضل المكونات وتحضير منتجاتنا بعناية فائقة لنقدم لكم تجربة تذوق استثنائية.
              </p>
              <p className="mb-8 text-lg leading-relaxed">
                بدأت رحلتنا منذ عشر سنوات كمشروع منزلي صغير، واليوم أصبحنا من أشهر متاجر الحلويات المنزلية في المملكة
                بفضل ثقة عملائنا ودعمهم المستمر.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-secondary p-4 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">+٥٠</div>
                  <div className="text-xs sm:text-sm">منتج مختلف</div>
                </div>
                <div className="rounded-lg bg-secondary p-4 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">+١٠٠٠</div>
                  <div className="text-xs sm:text-sm">عميل سعيد</div>
                </div>
                <div className="rounded-lg bg-secondary p-4 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">+٥</div>
                  <div className="text-xs sm:text-sm">فروع</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="bg-[url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center py-20 text-white"
        ref={processRef}
      >
        <div className="container relative z-10">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="section-title mx-auto text-black">كيف نعمل</h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-black">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProcessStep
                  number="01"
                  title="اختيار المكونات"
                  description="نختار أفضل المكونات الطازجة والعالية الجودة"
                  icon="🥚"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProcessStep
                  number="02"
                  title="التحضير بعناية"
                  description="نحضر منتجاتنا يدوياً بعناية فائقة وحب"
                  icon="👩‍🍳"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProcessStep
                  number="03"
                  title="التغليف الأنيق"
                  description="نغلف منتجاتنا بطريقة أنيقة تحافظ على جودتها"
                  icon="🎁"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ProcessStep
                  number="04"
                  title="التوصيل السريع"
                  description="نوصل طلبك بسرعة وعناية للحفاظ على الطعم والجودة"
                  icon="🚚"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary/50 py-20" ref={categoriesRef}>
        <div className="container">
          <h2 className="section-title mx-auto">أقسامنا</h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 bg-gradient-to-br from-secondary/30 to-background" ref={productsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="section-title mx-auto">منتجاتنا المميزة</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              اكتشف مجموعتنا المميزة من الحلويات المصنوعة بعناية فائقة وبأفضل المكونات الطازجة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-lg">
              <Link href="/menu">عرض جميع المنتجات</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Parallax Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h2 className="mb-6 text-3xl sm:text-4xl font-bold">نصنع الحلويات بحب</h2>
          <p className="mb-8 max-w-2xl text-base sm:text-xl">
            نضع في كل قطعة حلوى لمسة من الحب والإبداع لنقدم لكم تجربة تذوق فريدة ولا تُنسى
          </p>
          <Button asChild size="lg" variant="default" className="text-lg">
            <Link href="/menu">اطلب الآن</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-20" ref={testimonialsRef}>
        <div className="container">
          <h2 className="section-title mx-auto">آراء عملائنا</h2>

          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="py-10"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <div className="container">
          <h2 className="section-title mx-auto">تابعونا على انستغرام</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1455099229380-7b52707e356a?q=80&w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=500&auto=format&fit=crop",
            ].map((src, index) => (
              <Link
                key={index}
                href="https://instagram.com/loqmathala"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt="انستغرام"
                  width={300}
                  height={300}
                  className="aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-white">@loqmathala</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/10 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 sm:p-10 text-center shadow-xl">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold">اطلب الآن وتذوق ألذ الحلويات</h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg">
              يمكنك الآن طلب منتجاتنا المفضلة بكل سهولة من خلال موقعنا والتواصل معنا عبر الواتساب
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link href="/menu">تصفح القائمة</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
