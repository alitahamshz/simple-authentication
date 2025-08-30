import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Phone, User, Star, CheckCircle2, Tv, Code, ShoppingCart, BarChart, PenTool, Search, Settings, Mail, Layout, Eye, MessageCircle, Send, Instagram, Youtube, Linkedin, MoveRight } from 'lucide-react';

// کامپوننت اصلی صفحه
export default function HomePage() {
  return (
    <div className="bg-gray-50/50 text-gray-800">
      <Header />
      <main className='max-w-[1440px] mx-auto'>
        <HeroSection />
        <ServicesSummarySection />
        <PricingSection />
        <CtaSection />
        <FeaturesSection />
        <PortfolioCtaSection />
        <BlogSection />
      </main>
      <footer className='max-w-[1440px] mx-auto'>

      <Footer />
      </footer>
    </div>
  );
}

// ----------------- کامپوننت‌های بخش‌های مختلف صفحه -----------------

const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
    <div className="container mx-auto flex h-20 items-center justify-between px-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">آرتاوب</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">صفحه اصلی</a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none">
              سایر دمو ها <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>دمو ۱</DropdownMenuItem>
              <DropdownMenuItem>دمو ۲</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#" className="hover:text-primary transition-colors">درباره ما</a>
          <a href="#" className="hover:text-primary transition-colors">وبلاگ</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <User className="h-5 w-5" />
        </Button>
        <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6 py-2">
          <Phone className="ml-2 h-4 w-4" />
          دریافت مشاوره
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="bg-white py-20">
    <div className="container grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-center md:text-right">
        <p className="text-primary font-semibold">طراحی وب سایت و ساخت سایت آنلاین</p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          طراحی سایت آسان‌تر از همیشه
        </h1>
        <p className="text-gray-600 text-lg">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base">
             دریافت مشاوره
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
            </div>
            <span className="font-semibold">(۵k+) رضایت مشتری</span>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <div className="absolute bg-primary/10 w-[80%] h-[80%] rounded-3xl rotate-45"></div>
        <Image src="/img/hhh.webp" alt="Hero Image" width={500} height={500} className="rounded-2xl z-10" />
      </div>
    </div>
  </section>
);

const services = [
  { icon: Tv, title: "برنامه نویسی", price: "شروع از ۲ میلیون" },
  { icon: Code, title: "دیجیتال مارکتینگ", price: "شروع از ۱.۵ میلیون" },
  { icon: ShoppingCart, title: "بهینه سازی", price: "شروع از ۳ میلیون" },
  { icon: BarChart, title: "طراحی سایت", price: "شروع از ۵ میلیون" },
  { icon: PenTool, title: "اپلیکیشن", price: "شروع از ۱۰ میلیون" },
  { icon: Search, title: "سئو و بهینه سازی", price: "شروع از ۴ میلیون" }
];

const ServicesSummarySection = () => (
    <section className="py-20">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">سایر خدمات مجموعه ریوکد</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {services.map(service => (
                    <div key={service.title} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center flex flex-col items-center gap-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-bold">{service.title}</h3>
                        <p className="text-xs text-gray-500">{service.price}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const pricingPlans = [
  { title: "طراحی پایه", price: "۲,۵۰۰,۰۰۰", features: ["مشاوره طراحی سایت رایگان", "مشاوره رایگان بازاریابی اینترنتی", "خدمات پشتیبانی تا ۲ سال", "سفارشی سازی کامل"], featured: false },
  { title: "طراحی حرفه‌ای", price: "۵,۰۰۰,۰۰۰", features: ["تمام موارد بسته پایه", "طراحی گرافیک اختصاصی", "سئو پایه رایگان", "آموزش پنل مدیریت"], featured: true },
  { title: "طراحی فروشگاهی", price: "۷,۵۰۰,۰۰۰", features: ["تمام موارد بسته حرفه‌ای", "اتصال به درگاه پرداخت", "ماژول‌های فروش پیشرفته", "پشتیبانی ویژه"], featured: false },
];

const PricingSection = () => (
    <section className="bg-white py-20">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-2">طراحی وب سایت جهت کسب کار</h2>
            <p className="text-gray-600 mb-12">با گروه طراحی آرتاوب</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricingPlans.map(plan => (
                    <Card key={plan.title} className={`${plan.featured ? 'bg-secondary text-white' : 'bg-white'} rounded-2xl shadow-lg border-2 ${plan.featured ? 'border-primary' : 'border-transparent'}`}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                            <div className="flex items-baseline justify-center gap-2 my-4">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                <span className={plan.featured ? 'text-gray-300' : 'text-gray-500'}>تومان</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button size="lg" className={`w-full rounded-full text-lg py-6 ${plan.featured ? 'bg-primary text-white' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}>ثبت سفارش</Button>
                            <div className="border-t border-gray-500/50 my-4"></div>
                            <h4 className="font-semibold text-right">این بسته شامل:</h4>
                            <ul className="space-y-3 text-right">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section className="bg-primary text-white">
        <div className="container grid md:grid-cols-2 gap-8 items-center py-12">
            <div className="relative h-64 md:h-auto">
                <Image src="/img/eeee.webp" alt="سئو یا بهینه‌سازی" layout="fill" objectFit="cover" className="rounded-2xl" />
            </div>
            <div className="space-y-6 text-center md:text-right">
                <h2 className="text-3xl font-bold">سئو یا بهینه‌سازی سایت چیست؟</h2>
                <p className="text-white/90">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. این یک متن آزمایشی برای نمایش است.</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8">دریافت مشاوره</Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">سایر نمونه کارها</Button>
                </div>
            </div>
        </div>
    </section>
);

const features = [
  { icon: Phone, title: "مشاوره", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ." },
  { icon: Settings, title: "برنامه ریزی", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ." },
  { icon: Mail, title: "برنامه نویسی", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ." },
  { icon: Layout, title: "طراحی سایت", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ." },
]

const FeaturesSection = () => (
    <section className="py-20 bg-white">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">توضیحات درباره شرکت آرتاوب</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(feature => (
                    <div key={feature.title} className="bg-gray-50/70 p-8 rounded-2xl text-center flex flex-col items-center gap-4 hover:bg-white hover:shadow-xl transition-all">
                        <div className="bg-primary/10 p-5 rounded-full mb-4">
                           <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const PortfolioCtaSection = () => (
    <section className="py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-right">
                <p className="text-primary font-semibold">چرا ما را انتخاب کنید؟</p>
                <h2 className="text-3xl font-bold">راه حل‌های IT سفارشی برای کسب و کار</h2>
                <p className="text-gray-600">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                    <Phone className="ml-2 h-4 w-4" />
                    تماس با تیم آرتاوب
                </Button>
            </div>
            <div className="relative flex justify-center items-center">
                <div className="absolute border-2 border-dashed border-primary rounded-full w-[90%] h-[90%]"></div>
                <Image src="/img/hhh.webp" alt="Portfolio" width={400} height={400} className="rounded-full z-10 p-8" />
            </div>
        </div>
    </section>
);

const blogPosts = [
  { id: 1, title: "نوشته وبلاگ ۱", image: "/img/ppp.webp", author: "گروه ریوکد", views: 84, comments: 0 },
  { id: 2, title: "نوشته وبلاگ ۲", image: "/img/ppp.webp", author: "گروه ریوکد", views: 102, comments: 3 },
  { id: 3, title: "نوشته وبلاگ ۳", image: "/img/ppp.webp", author: "گروه ریوکد", views: 95, comments: 1 },
  { id: 4, title: "نوشته وبلاگ ۴", image: "/img/ppp.webp", author: "گروه ریوکد", views: 121, comments: 5 },
]

const BlogSection = () => (
    <section className="py-20 bg-white">
        <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">آخرین اخبار و مقالات</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {blogPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                        <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" />
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                            <p className="text-gray-600 text-sm">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...</p>
                            <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t">
                                <div className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1"><Eye className="h-4 w-4" /> {post.views}</div>
                                    <div className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {post.comments}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-white border-t">
    <div className="container py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">آرتاوب دیجیتال مارکتینگ</span>
          </div>
          <p className="text-gray-600">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          </p>
          <div className="flex space-x-4 space-x-reverse">
             <a href="#" className="text-gray-500 hover:text-primary"><Send size={20} /></a>
             <a href="#" className="text-gray-500 hover:text-primary"><Instagram size={20} /></a>
             <a href="#" className="text-gray-500 hover:text-primary"><Youtube size={20} /></a>
             <a href="#" className="text-gray-500 hover:text-primary"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">دسترسی سریع</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-primary flex items-center gap-2"><MoveRight className="w-4 h-4" /> صفحه اصلی</a></li>
            <li><a href="#" className="hover:text-primary flex items-center gap-2"><MoveRight className="w-4 h-4" /> خدمات ما</a></li>
            <li><a href="#" className="hover:text-primary flex items-center gap-2"><MoveRight className="w-4 h-4" /> درباره ما</a></li>
            <li><a href="#" className="hover:text-primary flex items-center gap-2"><MoveRight className="w-4 h-4" /> تماس با ما</a></li>
          </ul>
        </div>
        <div className="space-y-4">
            <h4 className="font-bold text-lg">اطلاعات تماس</h4>
            <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <span>(۰۲۱)۱۲۳۴۵۶۷۸</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <span>info@artaweb.com</span>
                </li>
            </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg">نمادهای اعتماد</h4>
          <div className="flex gap-4">
            <Image src="/img/hhh.webp" alt="نماد اعتماد" width={100} height={100} className="rounded-lg border" />
            <Image src="/img/hhh.webp" alt="نماد ساماندهی" width={100} height={100} className="rounded-lg border" />
          </div>
        </div>
      </div>
      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        <p>کلیه حقوق این وب‌سایت متعلق به شرکت آرتاوب می‌باشد. © ۱۴۰۳</p>
      </div>
    </div>
  </footer>
);