import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Book } from 'lucide-react'; // یه آیکون مناسب برای سایت تکنولوژی/گیمینگ

// برای مدیریت راحت، داده‌ها رو در یک ساختار تعریف می‌کنیم
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
  {
    title: 'راهنمای خرید هارد اکسترنال',
    author: 'تیم ویجیاتو',
    date: '۳ روز قبل',
    imageUrl: '/img/ppp.webp',
    url: '#',
  },
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


// کامپوننت اصلی
export default function FeaturedPostsSection() {
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
                <div className="flex-grow space-y-1">
                  <h3 className="font-bold text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500">نوشته شده توسط {post.author} | {post.date}</p>
                </div>
                <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    width={96} 
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}