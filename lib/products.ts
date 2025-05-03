import type { Product, Category } from "./types"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "كوكيز شوكولاتة",
    description: "كوكيز طري بقطع الشوكولاتة الفاخرة، مصنوع من أجود أنواع الشوكولاتة البلجيكية",
    price: 3000,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop",
    category: "cookies",
    featured: true,
    rating: 5,
    reviewCount: 42,
  },
  {
    id: "2",
    name: "كيك لوتس",
    description: "كيك بنكهة بسكويت اللوتس الشهير مع صوص الكراميل وطبقة كريمة غنية",
    price: 5000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    category: "cakes",
    featured: true,
    rating: 4,
    reviewCount: 28,
    discount: 10,
  },
  {
    id: "3",
    name: "تشيز كيك",
    description: "تشيز كيك كريمي مع صوص التوت الطازج وقاعدة بسكويت هشة",
    price: 6000,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
    category: "cheesecake",
    featured: true,
    rating: 5,
    reviewCount: 36,
  },
  {
    id: "4",
    name: "كنافة بالقشطة",
    description: "كنافة طازجة محشوة بالقشطة والفستق، مغطاة بالقطر المميز",
    price: 4500,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
    category: "traditional",
    featured: false,
    rating: 4,
    reviewCount: 18,
  },
  {
    id: "5",
    name: "براونيز",
    description: "براونيز شوكولاتة غنية مع قطع الجوز، طبقات متعددة من الشوكولاتة الداكنة",
    price: 3500,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop",
    category: "cookies",
    featured: false,
    rating: 4,
    reviewCount: 24,
  },
  {
    id: "6",
    name: "كيك سينامون",
    description: "كيك طري بنكهة القرفة والسكر البني، مع طبقة كريمة الجبن الناعمة",
    price: 4000,
    image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=1000&auto=format&fit=crop",
    category: "cinnamon",
    featured: true,
    rating: 5,
    reviewCount: 31,
    discount: 15,
  },
  {
    id: "7",
    name: "كوكيز الفستق",
    description: "كوكيز محشو بالفستق الحلبي المميز، مع نكهة الهيل الفريدة",
    price: 3500,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop",
    category: "cookies",
    featured: false,
    rating: 4,
    reviewCount: 19,
  },
  {
    id: "8",
    name: "كيك الزعفران",
    description: "كيك بنكهة الزعفران الفاخر مع الهيل، مزين بالفستق والورد",
    price: 5500,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1000&auto=format&fit=crop",
    category: "cakes",
    featured: false,
    rating: 5,
    reviewCount: 27,
  },
  {
    id: "9",
    name: "بسبوسة",
    description: "بسبوسة طرية بجوز الهند والقشطة، مغطاة بالقطر وقطع الفستق",
    price: 3000,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000&auto=format&fit=crop",
    category: "traditional",
    featured: true,
    rating: 5,
    reviewCount: 45,
  },
  {
    id: "10",
    name: "تشيز كيك الفراولة",
    description: "تشيز كيك بنكهة الفراولة الطازجة، مع طبقة من صوص الفراولة الطبيعي",
    price: 6500,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
    category: "cheesecake",
    featured: false,
    rating: 4,
    reviewCount: 33,
    discount: 5,
  },
  {
    id: "11",
    name: "رولز القرفة",
    description: "رولز القرفة الطرية مع صوص الكريمة والقرفة، مخبوزة طازجة يومياً",
    price: 3500,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
    category: "cinnamon",
    featured: false,
    rating: 5,
    reviewCount: 29,
  },
  {
    id: "12",
    name: "كيك التمر",
    description: "كيك التمر الطري مع صوص الكراميل، غني بالتمر السكري الفاخر",
    price: 4000,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000&auto=format&fit=crop",
    category: "cakes",
    featured: false,
    rating: 4,
    reviewCount: 22,
  },
]

// Mock data for categories
const categories: Category[] = [
  {
    id: "1",
    name: "كوكيز",
    slug: "cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "كيك",
    slug: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "تشيز كيك",
    slug: "cheesecake",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "سينامون",
    slug: "cinnamon",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "حلويات تقليدية",
    slug: "traditional",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=2000&auto=format&fit=crop",
  },
]

// Get all products
export function getAllProducts(): Product[] {
  return products
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

// Get products by category
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => {
    const category = categories.find((cat) => cat.slug === categorySlug)
    return product.category === categorySlug
  })
}

// Get all categories
export function getCategories(): Category[] {
  return categories
}

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

// Get product by id
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
