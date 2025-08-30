import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const HeroSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {['مد و فشن', 'طلا و نقره', 'کالای دیجیتال', 'مکمل‌ها'].map((cat, i) => (
      <div key={i} className="relative rounded-2xl overflow-hidden h-64 group">
        <Image src="/img/ppp.webp" alt={cat} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 right-4 text-white">
          <Badge className="bg-primary border-primary mb-2">{cat}</Badge>
          <h3 className="text-lg font-bold">عنوان مطلب آزمایشی برای این دسته بندی</h3>
        </div>
      </div>
    ))}
  </div>
);
export default HeroSection;