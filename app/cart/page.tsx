"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ShoppingBag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import CartItemCard from "@/components/cart-item-card"
import { formatPrice } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import RelatedProducts from "@/components/related-products"

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [orderProgress, setOrderProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Validate form as user types
    const errors: Record<string, string> = {}
    if (name && name.length < 3) errors.name = "الاسم يجب أن يكون 3 أحرف على الأقل"
    if (phone && !/^\d{10}$/.test(phone)) errors.phone = "يرجى إدخال رقم هاتف صحيح (10 أرقام)"
    setFormErrors(errors)
  }, [name, phone])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!name) errors.name = "الاسم مطلوب"
    else if (name.length < 3) errors.name = "الاسم يجب أن يكون 3 أحرف على الأقل"

    if (!address) errors.address = "العنوان مطلوب"

    if (!phone) errors.phone = "رقم الهاتف مطلوب"
    else if (!/^\d{10}$/.test(phone)) errors.phone = "يرجى إدخال رقم هاتف صحيح (10 أرقام)"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى التحقق من البيانات المدخلة",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    for (let i = 0; i <= 100; i += 10) {
      setOrderProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Create WhatsApp message
    const productsText = items
      .map((item) => `- ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
      .join("\n")

    const message = `طلب جديد من موقع لُقمة حلا 🍪

🧁 المنتجات:
${productsText}

💰 الإجمالي: ${formatPrice(totalPrice)}
👤 الاسم: ${name}
📍 العنوان: ${address}
📱 رقم الهاتف: ${phone}
💳 طريقة الدفع: ${paymentMethod === "cash" ? "نقداً عند الاستلام" : "تحويل بنكي"}
${deliveryTime ? `🕒 وقت التوصيل المفضل: ${deliveryTime}` : ""}
${notes ? `📝 ملاحظات: ${notes}` : ""}`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // Replace with your actual WhatsApp number
    const whatsappNumber = "+79174828474"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Show success message
    toast({
      title: "تم إرسال الطلب بنجاح",
      description: "سنتواصل معك قريباً لتأكيد الطلب",
    })

    // Clear cart after sending
    clearCart()
    setIsSubmitting(false)
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-muted" />
          <h1 className="mb-4">السلة فارغة</h1>
          <p className="mb-8 text-muted-foreground">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <Button asChild size="lg">
            <Link href="/menu">تصفح المنتجات</Link>
          </Button>
        </motion.div>

        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">منتجات قد تعجبك</h2>
          <RelatedProducts />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <Link href="/menu" className="mb-4 flex items-center text-primary hover:underline">
          <ChevronLeft className="ml-1 h-4 w-4" />
          متابعة التسوق
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center gradient-text"
        >
          سلة المشتريات
        </motion.h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">المنتجات المختارة ({items.length})</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">المجموع الفرعي:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">التوصيل:</span>
                <span>مجاناً</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>الإجمالي:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">معلومات الطلب</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">
                  الاسم <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={formErrors.name ? "border-destructive" : ""}
                />
                {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right">
                  رقم الهاتف <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={formErrors.phone ? "border-destructive" : ""}
                />
                {formErrors.phone && <p className="text-xs text-destructive">{formErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-right">
                  العنوان <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={formErrors.address ? "border-destructive" : ""}
                />
                {formErrors.address && <p className="text-xs text-destructive">{formErrors.address}</p>}
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="delivery-time">
                  <AccordionTrigger>وقت التوصيل المفضل</AccordionTrigger>
                  <AccordionContent>
                    <Input
                      type="datetime-local"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment">
                  <AccordionTrigger>طريقة الدفع</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">الدفع عند الاستلام</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer">تحويل بنكي</Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-right">
                  ملاحظات
                </Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>ملاحظة</AlertTitle>
                <AlertDescription>سيتم إرسال طلبك عبر واتساب وسنتواصل معك لتأكيد الطلب</AlertDescription>
              </Alert>

              {isSubmitting && (
                <div className="space-y-2">
                  <Progress value={orderProgress} className="h-2 w-full" />
                  <p className="text-center text-sm text-muted-foreground">جاري معالجة الطلب...</p>
                </div>
              )}

              <Button onClick={handleSubmitOrder} className="w-full" size="lg" disabled={isSubmitting}>
                إرسال الطلب عبر واتساب
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
