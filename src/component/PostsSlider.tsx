// components/PostsSlider.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './PostsSlider.css';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Post = { id: number; title: string; imageUrl: string; };

const PostsSlider: React.FC = () => {
  const posts: Post[] = [
    { id: 1, title: "پست شماره یک", imageUrl: "https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Post+1" },
    { id: 2, title: "پست شماره دو", imageUrl: "https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Post+2" },
    { id: 3, title: "پست شماره سه", imageUrl: "https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Post+3" },
    { id: 4, title: "پست شماره چهار", imageUrl: "https://via.placeholder.com/400x300/F4FF33/000000?text=Post+4" },
  ];

  return (
    <div className="slider-container pt-6">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        className="posts-swiper"
        spaceBetween={16}
        slidesPerView={1.2}       // برای دیده شدن گوشه اسلایدهای کناری
        centeredSlides={true}
        loop={false}
        speed={600}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.custom-pagination-bullets' }}
      >
        {posts.map(post => (
          <SwiperSlide key={post.id} className='z-10'>
            <div className="relative rounded-md z-100 overflow-hidden h-64 group">
              {/* اگر Next.js 13+ هستی بهتره از fill استفاده کنی */}
              <Image
                src="/img/ppp.webp"
                alt="تست"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white">
                <Badge className="bg-primary border-primary mb-2">تست</Badge>
                <h3 className="text-lg font-bold">عنوان مطلب آزمایشی برای این دسته بندی</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pagination-wrapper py-3">
        <div className="custom-pagination-bullets dark:bg-gray-800 bg-gray-400 w-auto flex px-1 py-1 rounded-xl z-20 -mt-10 lg:mt-2"></div>
      </div>
    </div>
  );
};

export default PostsSlider;