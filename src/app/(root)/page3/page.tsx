"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Eye, Menu, Star, Home, ChevronLeft } from 'lucide-react';
import ScrollIndicator from '@/component/common/ScrollIndicator';

// کامپوننت‌های هدر و فوتر را از مثال قبلی کپی می‌کنیم چون یکسان هستند.
// برای سادگی، آنها را دوباره اینجا تعریف می‌کنم.
// const TopBanner = () => (/* ... کد از مثال قبل ... */);


// const Footer = () => (/* ... کد از مثال قبل ... */);


// کامپوننت اصلی صفحه مطلب
export default function BlogPostPage() {
    return (
            <>
            <ScrollIndicator />
            <div className="bg-background text-gray-800 pb-4 pt-2" dir="rtl">
            <main className="container mx-auto mt-0 px-2">
                {/*
      نکته کلیدی اینجاست: کل محتوای صفحه (مقاله + سایدبار)
      داخل یک گرید قرار می‌گیرند تا ارتفاع والد مشترکشان زیاد باشد
      و سایدبار بتواند تا انتها اسکرول بخورد.
    */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">

                    {/* ستون اصلی محتوای مقاله (2 ستون از 3 ستون گرید) */}
                    <div className="lg:col-span-2">
                        <ArticleContent />
                    </div>

                    {/* ستون سایدبار (1 ستون از 3 ستون گرید) */}
                    <aside className="lg:col-span-1 mt-8 lg:mt-0">
                        <div className="sticky top-24 space-y-8">
                            <SidebarWidgets />
                        </div>
                    </aside>
                </div>
            </main>
        </div></>
    );
}


// ----------------- کامپوننت‌های محتوای مقاله و سایدبار -----------------

const ArticleContent = () => {
    return (
        <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <Home className="w-4 h-4 ml-2" />
                <a href="#" className="hover:text-primary">خانه</a>
                <ChevronLeft className="w-4 h-4 mx-1" />
                <a href="#" className="hover:text-primary">کالای دیجیتال</a>
                <ChevronLeft className="w-4 h-4 mx-1" />
                <span>پاور بانک چیست و چه کاربردی دارد؟</span>
            </div>

            {/* Post Header */}
            <Badge className="bg-primary border-primary mb-4">کالای دیجیتال</Badge>
            <h1 className="text-3xl md:text-4xl dark:text-gray-100 font-extrabold mb-4">
                پاور بانک چیست و چه کاربردی دارد؟ مزایا و کاربردها
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-white mb-6 border-b pb-6">
                <div className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> مجله خانومی</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> ۵ روز پیش</div>
                <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-primary" /> ۱۷۰۹ بازدید</div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <Image src="/img/ppp.webp" alt="پاور بانک" layout="fill" objectFit="cover" />
            </div>

            {/* Table of Contents */}
            <Card className="mb-8 p-6 bg-white dark:bg-gray-700 border-dashed">
                <div className="flex items-center font-bold text-lg mb-4">
                    <Menu className="w-6 h-6 ml-3 text-primary" />
                    فهرست مطالب
                </div>
                <ul className="space-y-2 text-foreground list-inside pr-4">
                    <li><a href="#section1" className="hover:text-primary">پاور بانک چیست و چه کاربردی دارد؟</a></li>
                    <li><a href="#section2" className="hover:text-primary">برای انتخاب پاوربانک به چه نکاتی توجه کنیم؟</a></li>
                    <li><a href="#section3" className="hover:text-primary">ظرفیت پاور بانک: ظرفیت بالاتر معادل با ذخیره انرژی بیشتر</a></li>
                </ul>
            </Card>

            {/* Article Body - با استفاده از کلاس prose */}
            <div className="prose text-foreground prose-lg max-w-none prose-a:text-primary prose-headings:font-bold prose-p:leading-relaxed">
                <p>
                    انواع گجت‌های الکترونیکی به بخش جدانشدنی زندگی ما تبدیل شده‌اند. وابستگی ما به این دستگاه‌ها در سفر در مسیر محل کار یا حتی یک جلسه آنلاین، روزبه‌روز در حال افزایش است. یکی از رایج‌ترین مشکلاتی که ممکن است در بدترین زمان ممکن رخ دهد، تمام شدن شارژ باتری گجت‌هاست.
                </p>
                <h2 id="section1">پاور بانک چیست و چه کاربردی دارد؟ یک باتری قابل‌حمل</h2>
                <p>
                    پاوربانک در اصل یک باتری قابل‌حمل است که به شما امکان می‌دهد دستگاه‌های الکترونیکی مانند گوشی هوشمند، تبلت یا لپتاپ را در هر مکان شارژ کنید. این باتری‌های همراه به شما این امکان را می‌دهند که در هر زمان و مکانی، بدون نیاز به پریز برق ثابت، به منبع برق مطمئن دسترسی داشته باشید.

                    
                </p>
                <Image src="/img/ppp.webp" alt="شارژ گوشی با پاوربانک" width={800} height={450} className="rounded-xl" />
                <h3 id="section2">برای انتخاب پاوربانک به چه نکاتی توجه کنیم؟</h3>
                <ul>
                    <li>ظرفیت</li>
                    <li>اندازه و وزن</li>
                    <li>درگاه‌های اتصال</li>
                    <li>نمایشگر میزان شارژ</li>
                </ul>
                <p>
                    ظرفیت پاور بانک، ظرفیت بالاتر معادل با ذخیره انرژی بیشتر. هرچه ظرفیت پاوربانک بالاتر باشد، انرژی بیشتری برای شارژ دستگاه‌های شما ذخیره می‌کند.
                </p>
                {/* ... بقیه محتوای مقاله ... */}
            </div>

            {/* Embedded Products */}
            <div className="my-12 bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                 <h3 className="text-xl font-bold text-center mb-6 dark:text-gray-200">محصولات مرتبط</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Card 1 */}
                    <Card className="flex flex-col items-center text-center p-4">
                        <Image src="/img/ppp.webp" alt="محصول ۱" width={100} height={100} />
                        <CardContent className="mt-4">
                            <p className="font-semibold">پاوربانک مدل X ظرفیت ۱۰۰۰۰</p>
                            <p className="text-primary font-bold my-2">۱,۵۰۰,۰۰۰ تومان</p>
                            <Button className="bg-primary text-white rounded-full px-8">مشاهده محصول</Button>
                        </CardContent>
                    </Card>
                     {/* Product Card 2 */}
                    <Card className="flex flex-col items-center text-center p-4">
                        <Image src="/img/ppp.webp" alt="محصول ۲" width={100} height={100} />
                        <CardContent className="mt-4">
                            <p className="font-semibold">پاوربانک مدل Y ظرفیت ۲۰۰۰۰</p>
                            <p className="text-primary font-bold my-2">۲,۸۰۰,۰۰۰ تومان</p>
                            <Button className="bg-primary text-white rounded-full px-8">مشاهده محصول</Button>
                        </CardContent>
                    </Card>
                 </div>
            </div>

            {/* Rating Section */}
            <div className="text-center border-t pt-8 mt-8">
                 <p className="font-semibold mb-4">به این مطلب چه امتیازی می‌دهید؟</p>
                 <div className="flex justify-center gap-2 text-gray-300">
                    <Star className="w-8 h-8 cursor-pointer hover:text-yellow-400" />
                    <Star className="w-8 h-8 cursor-pointer hover:text-yellow-400" />
                    <Star className="w-8 h-8 cursor-pointer hover:text-yellow-400" />
                    <Star className="w-8 h-8 cursor-pointer hover:text-yellow-400" />
                    <Star className="w-8 h-8 cursor-pointer hover:text-yellow-400" />
                 </div>
            </div>
            
            {/* Ad Banner */}
            <div className="relative rounded-2xl overflow-hidden h-48 w-full my-8">
                <Image src="/img/ppp.webp" alt="Ad Banner" layout="fill" objectFit="cover" />
            </div>

            {/* Comment Form */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">دیدگاهتان را بنویسید</h3>
                <form className="space-y-4">
                    <Textarea placeholder="دیدگاه شما..." rows={5} className="bg-gray-100" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="نام *" className="bg-gray-100" />
                        <Input type="email" placeholder="ایمیل *" className="bg-gray-100" />
                    </div>
                    <Button type="submit" className="bg-primary text-white rounded-full px-8">فرستادن دیدگاه</Button>
                </form>
            </div>
        </article>
    );
};


const SidebarWidgets = () => {
    return (
        <div className="space-y-8">
            <WidgetCard title="آخرین بررسی‌ها">
                <ul className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <li key={i} className="flex items-center gap-4">
                            <Image src="/img/ppp.webp" alt="Post" width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                            <div>
                                <a href="#" className="font-semibold text-sm hover:text-primary">عنوان مطلب آزمایشی برای سایدبار</a>
                                <p className="text-xs text-gray-500">۴ هفته پیش</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </WidgetCard>

            <div className="relative rounded-2xl overflow-hidden h-80 w-full">
                <Image src="/img/ppp.webp" alt="Ad Banner" layout="fill" objectFit="cover" />
            </div>

            <WidgetCard title="آموزش آرایش">
                 <ul className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <li key={i} className="flex items-center gap-4">
                            <Image src="/img/ppp.webp" alt="Post" width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                            <div>
                                <a href="#" className="font-semibold text-sm hover:text-primary">بهترین ریمل کدام است؟</a>
                                <p className="text-xs text-gray-500">۱۰ دی ۱۴۰۲</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </WidgetCard>
        </div>
    );
};

const WidgetCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm text-foreground">
        <h3 className="font-bold text-lg text-foreground mb-4 pb-4 border-b flex items-center">
             <span className="w-2 h-2 bg-primary rounded-full ml-2"></span>
            {title}
        </h3>
        {children}
    </div>
);