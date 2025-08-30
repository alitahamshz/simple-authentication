/* eslint-disable @typescript-eslint/no-unused-vars */
// app/dashboard/posts/page.tsx
"use client"
// import { Post } from "@/app/lib/schema";
import { DataTable } from "@/component/data-table/data-table";
import { columns } from "@/component/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPostsApi } from "@/services/admin"
import { useState } from "react";
import { Pagination } from "@/component/common/pagination";
import { TableFilters } from "@/component/common/Filter";



export default function PostsPage() {
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(10);
    const [filters, setFilters] = useState({});

    const { data, isLoading, isFetching } = useGetPostsApi({
        page: pageIndex,
        limit: pageSize,
        ...filters,
    });
    console.log({ data })
    const filterFields = [
        { key: "title", label: "عنوان", type: "text" },
        { key: "author", label: "نویسنده", type: "text" },
        {
            key: "status", label: "وضعیت", type: "select", options: [
                { label: "منتشر شده", value: "published" },
                { label: "پیش‌نویس", value: "draft" }
            ]
        },
        // میتونی بقیه ستون‌ها رو هم اضافه کنی
    ];

    const posts = data?.data || [];
    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <CardTitle>لیست مقالات</CardTitle>
            </CardHeader>
            <CardContent>
                <TableFilters
                    fields={filterFields}
                    // onFilterChange={setFilters}
                    onApply={
                        (filters) => {
                            setPageIndex(1); // همیشه صفحه اول
                            setFilters(filters);
                        }
                    }   // فقط وقتی روی "جستجو" کلیک بشه
                    resetPage={() => setPageIndex(1)} // وقتی فیلتر تغییر کرد صفحه اول بشه
                />
                <DataTable columns={columns} data={posts}
                    // manualPagination
                    isFetching={isFetching}
                    isLoading={isLoading}
                />
                <Pagination
                    pageIndex={pageIndex}
                    totalPages={200}
                    onPageChange={setPageIndex}
                    siblingCount={1} // می‌تونی تغییر بدی، مثلا 2 یا 3
                />

                {/* {isLoading && <div>در حال بارگذاری...</div>} */}
                {/* {isFetching && <div>در حال آپدیت داده‌ها...</div>} */}
            </CardContent>
        </Card>
    );
}