"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Heart, X, Book } from 'lucide-react';
import ThemeSwitcher from "@/component/theme/ThemeSwitcher"

const featuredPost = {
  category: 'راهنمای خرید',
  title: 'راهنمای خرید میکروفون مخصوص استریم و تولید محتوا',
  description: 'پیشرفت تکنولوژی به نقطه‌ای رسیده که هر شخص می‌تواند در خانه و به وسیله رایانه خود درآمد مناسبی کسب کند. اما رسیدن به این هدف...',
  author: 'تیم ویجیاتو',
  date: '۲ روز قبل',
  imageUrl: '/img/ppp.webp',
  url: '#',
};

const sidePosts = [
//   {
//     title: 'راهنمای خرید هارد اکسترنال',
//     author: 'تیم ویجیاتو',
//     date: '۳ روز قبل',
//     imageUrl: '/img/ppp.webp',
//     url: '#',
//   },
  {
    title: 'راهنمای خرید بهترین هدست‌های واقعیت مجازی',
    author: 'شکیبا سادات وکیلی',
    date: '۴ روز قبل',
    imageUrl: '/img/ppp.webp',
    url: '#',
  },
  {
    title: 'ایسوس در گیمزکام امسال از یک کارت گرافیک RTX ۵۰۸۰ جدید رونمایی خواهد کرد',
    author: 'رایان زجاجی',
    date: '۴ روز قبل',
    imageUrl: '/img/ppp.webp',
    url: '#',
  },
  {
    title: 'بهترین تلویزیون‌های مناسب گیمینگ',
    author: 'تیم ویجیاتو',
    date: '۵ روز قبل',
    imageUrl: '/img/ppp.webp',
    url: '#',
  },
  {
    title: 'راهنمای خرید بهترین مانیتور گیمینگ',
    author: 'تیم ویجیاتو',
    date: '۶ روز قبل',
    imageUrl: '/img/ppp.webp',
    url: '#',
  },
];
// کامپوننت اصلی صفحه


export default function MagazinePage() {
  return (
    <div className="bg-gray-50 text-gray-800" dir="rtl">
      <TopBanner />
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <FeaturedPostsSection/>
        <HeroSection />

        {/* --- بخش اصلی با سایدبار چسبان --- */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {/* ستون اصلی محتوا */}
          <div className="lg:col-span-2">
            <CategorySection title="آموزش آرایش" />
            <CategorySection title="بهداشت و سلامت" />
            <CategorySection title="مکمل‌ها" />
          </div>

          {/* سایدبار چسبان */}
          <aside className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              <AdBanner />
              <LatestReviewsWidget />
            </div>
          </aside>
        </div>

        {/* --- بخش دوم با سایدبار چسبان دیگر --- */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            {/* ستون اصلی محتوا */}
            <div className="lg:col-span-2">
                <FeaturedProductSection />
                <CategorySection title="عطر و ادکلن" hasMoreButton />
            </div>

            {/* سایدبار چسبان دسته‌بندی */}
            <aside className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="sticky top-24 space-y-8">
                    <CategoryListWidget />
                </div>
            </aside>
        </div>

      </main>
      <Footer />
    </div>
  );
}


// ----------------- کامپوننت‌های بخش‌های مختلف صفحه -----------------

const TopBanner = () => (
    <div className="bg-primary text-white w-full py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center gap-1">
                <span className="text-2xl font-bold">%۸۰</span>
                <span className="font-semibold">تخفیف</span>
            </div>
            <Button variant="secondary" className="bg-white text-primary rounded-full px-6 hover:bg-gray-100">
                مشاهده و خرید
            </Button>
        </div>
    </div>
);

const Header = () => (
    <header className="bg-white/70 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
        <div className="container mx-auto flex h-12 items-center justify-between px-4">
            <div className="flex items-center gap-8">
                <span className="text-3xl font-black text-primary">ماهنامه</span>
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-primary transition-colors">فروشگاه خانومی</a>
                    <a href="#" className="hover:text-primary transition-colors">آرایش</a>
                    <a href="#" className="hover:text-primary transition-colors">پوستی</a>
                    <a href="#" className="hover:text-primary transition-colors">آموزش</a>
                    <a href="#" className="hover:text-primary transition-colors">سبک زندگی</a>
                    <a href="#" className="hover:text-primary transition-colors">عطر</a>
                    <a href="#" className="hover:text-primary transition-colors">تازه ها</a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Input placeholder="جستجو برای..." className="rounded-full bg-gray-100 border-none pl-10 w-64" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                
                    {/* <Moon className="h-5 w-5" /> */}
                    <ThemeSwitcher/>
            </div>
        </div>
    </header>
);

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

const PostCard = ({ large = false }: { large?: boolean }) => (
    <Card className="flex flex-col md:flex-row items-center gap-4 p-4 border-none shadow-none bg-transparent">
        <div className={`relative ${large ? 'md:w-1/2 h-48' : 'w-24 h-24'} flex-shrink-0`}>
            <Image src="/img/ppp.webp" alt="Post Image" layout="fill" objectFit="cover" className="rounded-xl" />
        </div>
        <div className="flex-grow space-y-2">
            <a href="#" className="font-bold text-lg hover:text-primary">درمان سریع ورم چشم با ۴ روش خانگی</a>
            <p className="text-sm text-gray-500">تاریخ: ۳ بهمن ۱۴۰۲</p>
            {large && <p className="text-gray-600 hidden md:block">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>}
        </div>
    </Card>
);

const CategorySection = ({ title, hasMoreButton = false }: { title: string, hasMoreButton?: boolean }) => (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h2 className="text-xl font-bold text-primary relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-primary after:-bottom-4 after:right-0">
                {title}
            </h2>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
        {hasMoreButton && (
             <div className="text-center mt-6">
                <Button variant="outline" className="rounded-full px-8 border-gray-300">بارگذاری بیشتر</Button>
            </div>
        )}
    </div>
);

const AdBanner = () => (
    <div className="relative rounded-2xl overflow-hidden h-80 w-full">
         <Image src="/img/ppp.webp" alt="Ad Banner" layout="fill" objectFit="cover" />
         <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-white text-center p-4">
            <h3 className="text-2xl font-bold">«باشگاه مشتریان»</h3>
            <p className="my-4">یک همراه آنلاین برای هر روز شما</p>
            <Button className="bg-white text-primary rounded-full hover:bg-gray-100">مشاهده تقویم</Button>
         </div>
    </div>
);

const LatestReviewsWidget = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
        <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-full">
                <TabsTrigger value="trending" className="rounded-full">ترند روز</TabsTrigger>
                <TabsTrigger value="new" className="rounded-full">تازه</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full">نظرها</TabsTrigger>
            </TabsList>
            <TabsContent value="trending" className="mt-4 space-y-4">
                {[...Array(3)].map((_, i) => <PostCard key={i} />)}
            </TabsContent>
            <TabsContent value="new" className="mt-4 space-y-4">
                <p>محتوای تب تازه‌ها</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 space-y-4">
                <p>محتوای تب نظرها</p>
            </TabsContent>
        </Tabs>
    </div>
);

const FeaturedProductSection = () => (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <div className="relative rounded-xl overflow-hidden h-72 w-full mb-4">
            <Image src="/img/ppp.webp" alt="Featured Product" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h2 className="text-white text-3xl font-bold">بهترین مایع دستشویی در بازار متناسب با پوست شما</h2>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden h-40 group">
                     <Image src="/img/ppp.webp" alt={`Sub feature ${i+1}`} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
                     <div className="absolute inset-0 bg-black/50 flex items-end p-3">
                        <h4 className="text-white font-semibold">عنوان محصول یا مطلب فرعی</h4>
                     </div>
                </div>
            ))}
        </div>
    </div>
);

const CategoryListWidget = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4 pb-4 border-b">دسته بندی‌ها</h3>
        <ul className="space-y-3">
            {[
                { name: 'مراقبت از پوست', count: 298 },
                { name: 'برند ها و محصولات', count: 152 },
                { name: 'آرایش', count: 282 },
                { name: 'مکمل ها', count: 12 },
                { name: 'عطر و ادکلن', count: 60 },
            ].map(cat => (
                <li key={cat.name} className="flex justify-between items-center text-gray-700 hover:text-primary transition-colors">
                    <a href="#" className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        {cat.name}
                    </a>
                    <Badge variant="destructive" className="bg-primary rounded-full">{cat.count}</Badge>
                </li>
            ))}
        </ul>
    </div>
);


const Footer = () => (
    <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">مجله خانومی</h3>
                    <p className="text-gray-400 text-sm">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">مطالب پربازدید</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white">درمان سریع ورم چشم با ۴ روش خانگی</a></li>
                        <li><a href="#" className="hover:text-white">بهترین کرم ضد لک قوی بدون بازگشت</a></li>
                        <li><a href="#" className="hover:text-white">ماسک صورت خانگی برای سفیدی پوست</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold mb-4">آخرین مطالب ویرایش شده</h4>
                     <ul className="space-y-3 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white">بهترین زمان مصرف قرص منیزیم</a></li>
                        <li><a href="#" className="hover:text-white">راهنمای مراقبت از صورت در مردان</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold mb-4">ما را دنبال کنید</h4>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-white"><Search /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><X/></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 flex justify-between items-center text-sm text-gray-500">
                <p>کپی‌رایت © ۲۰۲۵. تمامی حقوق متعلق است به <span className="text-primary">سایت خانومی</span> <Heart className="inline-block w-4 h-4 text-primary" /></p>
                <span className="text-3xl font-black text-primary">MAG</span>
            </div>
        </div>
    </footer>
);


export function FeaturedPostsSection() {
  return (
    <section className="py-8 md:py-12 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ستون اصلی - پست ویژه (دو ستون از سه ستون در دسکتاپ) */}
          <div className="lg:col-span-2">
            <a href={featuredPost.url} className="block relative w-full h-[500px] rounded-2xl overflow-hidden group shadow-lg">
              {/* تصویر پس‌زمینه */}
              <Image 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                layout="fill" 
                objectFit="cover" 
                className="z-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* گرادینت برای خوانایی متن */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              
              {/* محتوای متنی */}
              <div className="absolute bottom-0 right-0 p-6 md:p-8 text-white z-20 space-y-4">
                <div className="flex items-center text-xs opacity-80">
                   <Book className="w-4 h-4 ml-2 text-cyan-300" />
                   <span>نوشته شده توسط {featuredPost.author} | {featuredPost.date}</span>
                </div>
                <div>
                   <Badge variant="destructive" className="bg-red-600 mb-2">{featuredPost.category}</Badge>
                   <h2 className="text-2xl md:text-4xl font-extrabold transition-colors duration-300 group-hover:text-cyan-300">
                     {featuredPost.title}
                   </h2>
                </div>
                <p className="hidden md:block text-sm opacity-90 max-w-lg">
                  {featuredPost.description}
                </p>
              </div>
            </a>
          </div>

          {/* ستون کناری - لیست پست‌ها (یک ستون از سه ستون در دسکتاپ) */}
          <div className="bg-gray-100/70 rounded-2xl p-4 flex flex-col gap-4">
            {sidePosts.map((post, index) => (
              <a 
                key={index} 
                href={post.url} 
                className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 group"
              >
                    <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    width={96} 
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-bold text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500">نوشته شده توسط {post.author} | {post.date}</p>
                </div>
            
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}