import Link from "next/link"
import { Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-secondary/80 to-secondary/30 pt-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">لُقمة حلا</h3>
            <p className="mb-6 text-muted-foreground">
              حلويات منزلية بنكهة مميزة، نقدم لكم أشهى وألذ الحلويات المصنوعة بأفضل المكونات وبأيدي محترفة
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-white hover:bg-primary/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                </svg>
                <span className="sr-only">واتساب</span>
              </Link>
              <Link
                href="https://instagram.com/loqmathala"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary p-2 text-white hover:bg-primary/80"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">انستغرام</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-primary">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary">
                  السلة
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-muted-foreground">info@loqmathala.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-muted-foreground">صنعاء، شارع الزبيري</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-muted py-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} لُقمة حلا. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}
