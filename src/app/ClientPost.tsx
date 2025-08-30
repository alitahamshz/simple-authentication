"use client";
// import { apiRequest } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
// import { toast } from 'react-hot-toast';
// import { useApi } from '@/hooks/useApi';
import { getPosts } from "@/services/public";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function Posts() {
  const [flag, setflag] = useState(true)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", flag],
    queryFn: () => getPosts().then((res) => res.data),
    staleTime:0,
    
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });
useEffect(() => {
// getPosts().then((res) =>console.log({res}))
}, [])

  if (isLoading)
    return (
      <>
        <div className="flex flex-col space-y-3 mb-2">
          <Skeleton className="h-[100px] w-[100%] rounded-md" />
        </div>
        <div className="flex flex-col space-y-3 mb-2">
          <Skeleton className="h-[100px] w-[100%] rounded-md" />
        </div>
        <div className="flex flex-col space-y-3 mb-2">
          <Skeleton className="h-[100px] w-[100%] rounded-md" />
        </div>
        <div className="flex flex-col space-y-3 mb-2">
          <Skeleton className="h-[100px] w-[100%] rounded-md" />
        </div>
      </>
    );
  if (isError) return <div>خطا در بارگذاری اطلاعات</div>;
  return (
    <>
    <Button onClick={() => setflag(!flag)}>فچ</Button>
      <div>
        {data?.map((post: Post) => (
          <div key={post.id} className="border p-4 my-2">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
