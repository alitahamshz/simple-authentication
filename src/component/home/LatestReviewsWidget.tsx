import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/component/home/PostCard";

export const LatestReviewsWidget = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
        <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background rounded-full">
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