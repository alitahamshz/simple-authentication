import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

export const CategoryListWidget = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4 pb-4 border-b">دسته بندی‌ها</h3>
        <ul className="space-y-3">
            {[
                { name: 'مراقبت از پوست', count: 298 },
                { name: 'برند ها و محصولات', count: 152 },
                { name: 'آرایش', count: 282 },
                { name: 'مکمل ها', count: 12 },
                { name: 'عطر و ادکلن', count: 60 },
            ].map(cat => (
                <li key={cat.name} className="flex justify-between items-center text-foreground hover:text-primary transition-colors">
                    <a href="#" className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        {cat.name}
                    </a>
                    <Badge className="bg-primary rounded-full">{cat.count}</Badge>
                </li>
            ))}
        </ul>
    </div>
);