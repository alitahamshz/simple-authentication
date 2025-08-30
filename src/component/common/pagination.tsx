// components/Pagination.tsx
"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageIndex: number; // صفحه فعلی
  totalPages: number; // تعداد کل صفحات
  onPageChange: (page: number) => void; // callback تغییر صفحه
  siblingCount?: number; // تعداد صفحات کنار صفحه فعلی
}

export function Pagination({
  pageIndex,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages === 0) return null;

  const createPageArray = () => {
    const pages: (number | string)[] = [];

    const startPage = Math.max(2, pageIndex - siblingCount);
    const endPage = Math.min(totalPages - 1, pageIndex + siblingCount);

    // اولین صفحه همیشه نمایش داده میشه
    pages.push(1);

    // ... قبل از startPage
    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // ... بعد از endPage
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // آخرین صفحه همیشه نمایش داده میشه
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = createPageArray();

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(pageIndex - 1, 1))}
        disabled={pageIndex === 1}
      >
        قبلی
      </Button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            size="sm"
            variant={page === pageIndex ? "default" : "outline"}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(pageIndex + 1, totalPages))}
        disabled={pageIndex === totalPages}
      >
        بعدی
      </Button>
    </div>
  );
}
