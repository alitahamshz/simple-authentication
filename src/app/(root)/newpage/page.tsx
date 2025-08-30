'use client'
import { useCreatePostApi, 
  // useUserInfoApi
 } from '@/services/public'
import React, { useState } from 'react'
export default function Page() {
  // const { data, isLoading } = useUserInfoApi();
   const { mutate, isPending, error, isSuccess, data } = useCreatePostApi(2);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, body, userId: 1 });
    
  };
  console.log({data,isSuccess,error,isPending});
  return (
    <>
    {/* <div>{data?.data?.phone_number}</div> */}
     <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl space-y-4">
      <h1 className="text-xl font-bold">ایجاد پست جدید</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="متن"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isPending ? "در حال ارسال..." : "ارسال پست"}
        </button>
      </form>

      {isSuccess && (
        <pre className="text-green-600 bg-green-100 p-2 rounded text-sm">
          پست با موفقیت ارسال شد ✅
          <br />
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {error && (
        <p className="text-red-500">خطا در ارسال پست: {error.message}</p>
      )}
    </div>
    </>
  )
}
