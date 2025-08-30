"use client"; // چون از کامپوننت‌های تعاملی مثل Tabs استفاده می‌کنیم

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { User, Calendar, MessageSquare, Eye, Home } from "lucide-react";

//================================================================//
// کامپوننت 1: کارت هر مقاله در لیست اصلی (PostCard)
//================================================================//
type PostCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
    views: number;
    comments: number;
    category: string;
  };
};

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border bg-white dark:bg-gray-800 flex flex-col md:flex-row w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="md:w-1/3 w-full h-48 md:h-auto relative">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <div className="p-5 flex flex-col justify-between md:w-2/3">
        <div>
          <Badge className="mb-2 bg-primary">{post.category}</Badge>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-bold mb-2 hover:text-pink-600 transition-colors">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-red-500"><Eye size={14} /> {post.views.toLocaleString('fa-IR')}</span>
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {post.comments.toLocaleString('fa-IR')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}


//================================================================//
// کامپوننت 2: آیتم‌های کوچک در سایدبار (SidebarPostItem)
//================================================================//
type SidebarPostItemProps = {
  post: {
    slug: string;
    title: string;
    imageUrl: string;
    date: string;
  };
};

function SidebarPostItem({ post }: SidebarPostItemProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="flex items-center justify-end gap-4 py-3 border-b last:border-b-0">
     
      <div className="flex flex-col justify-start">
        <h3 className="text-sm font-semibold leading-tight hover:text-pink-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <Calendar size={12} /> {post.date}
        </p>
      </div>
       <div className="w-20 h-20 relative justify-start rounded-md overflow-hidden flex-shrink-0">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
      </div>
    </Link>
  );
}

//================================================================//
// کامپوننت 3: سایدبار کناری (Sidebar)
//================================================================//

// داده‌های آزمایشی برای سایدبار
const recentPostsData = [
  { slug: "1", title: "ارتباط قرص زینک پلاس و چاقی؛ زینک پلاس در وزن گیری موثر است؟", imageUrl: "/img/eeee.webp", date: "۲ ساعت پیش" },
  { slug: "2", title: "۱۰ مورد از بهترین پاوربانک فست شارژ", imageUrl: "/img/eeee.webp", date: "۲۲ ساعت پیش" },
  { slug: "3", title: "بهترین نقره مال کجاست؟ آشنایی با بهترین نقره جهان", imageUrl: "/img/ppp.webp", date: "۲ روز پیش" },
];

const trendingPostsData = [
    { slug: "4", title: "بهترین رنگ برای موهای سفید بدون دکلره + معرفی محصول", imageUrl: "/img/ppp.webp", date: "۱۴ مرداد" },
    { slug: "5", title: "پرایمر چیست؟ انواع و نحوه استفاده از آن", imageUrl: "/img/ppp.webp", date: "۱۹ دی" },
];

function Sidebar() {
  return (
    <aside className="sticky top-8">
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-b-none h-12">
              <TabsTrigger value="recent" className="text-md">تازه</TabsTrigger>
              <TabsTrigger value="trending" className="text-md">ترند روز</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="p-4">
              {recentPostsData.map((post) => (
                <SidebarPostItem key={post.slug} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="trending" className="p-4">
               {trendingPostsData.map((post) => (
                <SidebarPostItem key={post.slug} post={post} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </aside>
  );
}


//================================================================//
// کامپوننت اصلی صفحه (BlogPage)
//================================================================//
export default function BlogPage() {
  
  // داده‌های آزمایشی برای لیست مقالات اصلی
  const mainPostsData = [
    { slug: "post-1", title: "آموزش رسیدگی به پوست صورت با روش‌های موثر", excerpt: "امروزه رسیدگی به پوست صورت یکی از ضروری‌ترین بخش‌های مراقبت شخصی است. با افزایش مشغله‌های روزمره...", imageUrl: "/img/eeee.webp", author: "امیرحسین مامنو", date: "۰۵ خرداد ۱۴۰۴", views: 946, comments: 1, category: "روتین پوستی" },
    { slug: "post-2", title: "پودر بچه برای پوست صورت؛ بررسی خواص و مضرات آن", excerpt: "پودر بچه یکی از محصولاتی است که نسل به نسل در خانه‌های ما حضور داشته و برای نرم و لطیف کردن پوست...", imageUrl: "/img/ppp.webp", author: "مرتضی رستمی", date: "۱۸ اردیبهشت ۱۴۰۴", views: 2075, comments: 1, category: "مراقبت پوست" },
    { slug: "post-3", title: "بهترین سرم آبرسان برای پوست چرب و خشک", excerpt: "با وجود انواع سرم‌های آبرسان، انتخاب بهترین گزینه می‌تواند کمی گیج‌کننده باشد. در این مقاله به شما کمک...", imageUrl: "/img/hhh.webp", author: "لعیا احمدی", date: "۲۷ اسفند ۱۴۰۳", views: 8768, comments: 0, category: "محصولات" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
    { slug: "post-4", title: "چطور از سرم ویتامین سی استفاده کنیم؟ مهم‌ترین نکات", excerpt: "سرم ویتامین سی یکی از محبوب‌ترین محصولات مراقبت از پوست است که به دلیل خواص آنتی‌اکسیدانی و روشن‌کنندگی...", imageUrl: "/img/eeee.webp", author: "مینا افجه", date: "۱۵ اردیبهشت ۱۴۰۴", views: 71932, comments: 8, category: "آموزش" },
  ];

  return (
    <div className="bg-background">

    <div className="container max-w-[1440px] mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center  text-sm text-gray-500 dark:text-white">
        <Home size={16} className="ml-2" />
        <span>خانه</span>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-800">روتین پوستی</span>
      </div>
      
      <h1 className="text-4xl font-extrabold mb-8 text-center md:text-right">روتین پوستی</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        {/* Main Content */}
        <main className="lg:col-span-8 space-y-6">
          {mainPostsData.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}

          {/* Pagination */}
          <div className="pt-8">
             <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>

        {/* Sidebar */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <Sidebar />
        </div>
      </div>
    </div>
    </div>

  );
}