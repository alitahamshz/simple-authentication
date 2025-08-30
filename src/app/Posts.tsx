// "use client"
// import { apiRequest } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from 'react-hot-toast';
// import { useApi } from '@/hooks/useApi';
import { getPosts } from "@/services/public"
type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
 const getData = async () => {
    const res = await getPosts();
    return res;
 }

export default async function Posts() {
    const data = await getData()
    // const {data, isLoading, isError} = useQuery({
    //     queryKey: ["posts"],
    //     queryFn:getPosts,
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // })
    // console.log({data})
    // if (isLoading) return <div>در حال بارگذاری...</div>;
    // if (isError) return <div>خطا در بارگذاری اطلاعات</div>;
    return (
        <>
            <div>
                {data?.data?.map((post: Post) => (
                    <div key={post.id} className="border p-4 my-2">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
