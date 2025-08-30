import Image from "next/image";

export const FeaturedProductSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm">
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