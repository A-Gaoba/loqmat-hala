"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function SpecialOfferBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 30,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              } else {
                clearInterval(timer)
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-3 text-center relative"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">إغلاق</span>
      </Button>

      <div className="container">
        <p className="text-sm md:text-base">
          عرض خاص! خصم 20% على جميع المنتجات لفترة محدودة
          <span className="mx-2 inline-block rounded-md bg-primary px-2 py-1 text-xs font-bold text-white">
            {String(timeLeft.days).padStart(2, "0")}:{String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <Button asChild variant="link" className="h-auto p-0 text-sm font-bold underline">
            <Link href="/menu">تسوق الآن</Link>
          </Button>
        </p>
      </div>
    </motion.div>
  )
}
