// components/CategorySlider.tsx

import * as React from "react"
import {
  Gamepad2,
  HardDrive,
  Headphones,
  Laptop,
  Monitor,
  Rotate3D,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const categories = [
  { name: "گوشی", icon: Smartphone },
  { name: "تبلت", icon: Tablet },
  { name: "لپ‌تاپ", icon: Laptop },
  { name: "تلویزیون", icon: Monitor },
  { name: "ساعت هوشمند", icon: Watch },
  { name: "هدفون", icon: Headphones },
  { name: "هارد", icon: HardDrive },
  { name: "کنسول بازی", icon: Gamepad2 },
  { name: "کنسول بازی", icon: Gamepad2 },
  { name: "کنسول بازی", icon: Gamepad2 },
  { name: "کنسول بازی", icon: Gamepad2 },
  { name: "کنسول بازی", icon: Gamepad2 },
]

export function CategorySlider() {
    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className="w-full mx-auto lg:pb-4 pb-0">
      <Card className="overflow-hidden p-0 shadow-none border-none bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] items-center">
          {/* قسمت نوشته‌ها تنها در صفحات بزرگ نمایش داده می‌شود */}
          <div className="hidden lg:block p-6 md:p-8 border-b lg:border-b-0">
            <CardHeader className="p-0 mb-4 gap-4">
              <CardTitle className="text-2xl font-bold text-primary flex items-center gap-1">
                <Rotate3D size={20} />
                برترین موضوعات
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                دیجی ترند بهترین ها را برای شما گلچین میکند
              </CardDescription>
            </CardHeader>
          </div>

          {/* بخش کاروسل که در تمامی اندازه‌ها نمایش داده می‌شود */}
          <div className="p-6 md:px-12 md:py-8">
            <Carousel
               plugins={[plugin.current]}
              opts={{
                align: "start",
                direction: "rtl",
                loop:true
                // تنظیمات اتوپلی: 
              }}
              className="relative w-full border-l-none border-r-none lg:border-r-2 lg:border-l-2"
            >
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[calc(100%/3.5)] md:basis-1/5 lg:basis-1/7 pl-2"
                  >
                    <div className="p-1">
                      <a
                        href="#"
                        className="group flex flex-col items-center justify-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <category.icon
                          className="h-8 w-8 lg:w-10 lg:h-10 text-muted-foreground group-hover:text-primary transition-colors"
                          strokeWidth={1.5}
                        />
                        <span className="text-[12px] sm:text-[14px] lg:text-[14px] font-medium text-center text-muted-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* دکمه‌های ناوبری، قابل نمایش در صفحات میانی به بالا */}
              <CarouselPrevious className="hidden border-none shadow-none md:inline-flex absolute left-[-2.5rem] top-1/2 -translate-y-1/2" />
              <CarouselNext className="hidden border-none shadow-none md:inline-flex absolute right-[-2.5rem] top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </Card>
    </div>
  )
}