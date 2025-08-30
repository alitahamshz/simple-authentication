"use client";

// import { apiRequest } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from 'react-hot-toast';
// import { useApi } from "@/hooks/useApi";
// import { http } from '@/lib/axiosApi';
import { Button } from "@/components/ui/button";
import { postPosts } from "@/services/public";
import Link from "next/link";

// type Post = {
//   title: string;
//   body: string;
//   userId: number;
// };

export default function Form() {
  // const { request } = useApi();
  async function postdata() {
    // request('post', '/posts', { title: 'foo', body: 'bar', userId: 1 })
    //     .then((data: Post) => console.log(data))
    //     .catch(console.error);
    postPosts({ title: "foo", content: "bar"}).then((res) =>
      console.log("result", res)
    ).catch(err => console.log('err',err));
  }
  // if (isLoading) return <div>در حال بارگذاری...</div>;
  // if (isError) return <div>خطا در بارگذاری اطلاعات</div>;
  return (
    <>
      <Button onClick={() => postdata()}>send data</Button>
<Link href={'/newpage'}>صفحه بعد</Link>
    </>
  );
}
