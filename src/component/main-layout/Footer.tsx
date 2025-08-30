import { Heart, Search, X } from "lucide-react";

export const Footer = () => (
    <footer className="bg-gray-900 text-white">
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
                        <a href="#" className="text-gray-400 hover:text-white"><X /></a>
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