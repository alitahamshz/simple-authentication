import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostCard } from "./PostCard";

export const CategorySection = ({ title, hasMoreButton = false }: { title: string, hasMoreButton?: boolean }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h2 className="text-xl font-bold text-primary relative after:content-[''] after:absolute after:w-12 after:rounded-2xl after:h-1 after:bg-primary after:-bottom-4 after:right-0">
                {title}
            </h2>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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