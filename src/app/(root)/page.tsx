/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import PostsSlider from '@/component/PostsSlider';
import { CategorySection } from '@/component/home/CategorySection';
import { LatestReviewsWidget } from '@/component/home/LatestReviewsWidget';
import { FeaturedProductSection } from '@/component/home/FeaturedProductSection';
import { CategoryListWidget } from '@/component/home/CategoryListWidget';
import { FeaturedPostsSection } from '@/component/home/FeaturedPosts';
import HeroSection from '@/component/home/HeroSection';
import {CategorySlider} from "@/component/common/FeaturedSlider";

export default function MagazinePage() {
    return (
        <div className="bg-background text-foreground" dir="rtl">
            {/* <TopBanner /> */}

            <main className="container mx-auto px-2">
                <div className="block lg:hidden">
                    <PostsSlider />
                </div>
                <div className="hidden lg:block">
                    <FeaturedPostsSection />
                </div>
                    <CategorySlider/>
                <div className="hidden lg:block">

                    <HeroSection />
                </div>
                {/* --- بخش اصلی با سایدبار چسبان --- */}
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
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

        </div>
    );
}

// ----------------- کامپوننت‌های بخش‌های مختلف صفحه -----------------

// const TopBanner = () => (
//     <div className="bg-primary text-white w-full py-2">
//         <div className="container mx-auto flex justify-between items-center h-11 px-4">

//         </div>
//     </div>
// );





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



