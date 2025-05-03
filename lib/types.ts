export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
  discount?: number
  rating?: number
  reviewCount?: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  heroImage?: string
}

export interface Testimonial {
  name: string
  avatar?: string
  text: string
  rating: number
  date: string
}
