"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
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

  return null
}
