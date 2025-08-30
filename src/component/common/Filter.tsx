/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterField {
  key: string;
  label: string;
  type?: "text" | "number" | "select";
  options?: { label: string; value: any }[];
  debounce?: boolean;
}

interface TableFiltersProps {
  fields: any;
  onApply: (filters: Record<string, any>) => void;
  resetPage: () => void;
}

export function TableFilters({ fields, onApply, resetPage }: TableFiltersProps) {
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<Record<string, any>>({});

  // دیباونس برای فیلدهایی که debounce:true دارن
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Object.keys(debouncedFilters).length > 0) {
        const merged = { ...appliedFilters, ...debouncedFilters };
        setAppliedFilters(merged);
        onApply(merged);
        resetPage();
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [debouncedFilters]);

  const handleChange = (field: FilterField, value: any) => {
    if (field.debounce) {
      setDebouncedFilters((prev) => ({ ...prev, [field.key]: value || undefined }));
    } else {
      setTempFilters((prev) => ({ ...prev, [field.key]: value || undefined }));
    }
  };

  const handleApply = () => {
    const merged = { ...appliedFilters, ...tempFilters };
    setAppliedFilters(merged);
    onApply(merged);
    resetPage();
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...appliedFilters };
    delete newFilters[key];
    setAppliedFilters(newFilters);
    setTempFilters(newFilters);
    onApply(newFilters);
    resetPage();
  };

  const handleClearAll = () => {
    setAppliedFilters({});
    setTempFilters({});
    setDebouncedFilters({});
    onApply({});
    resetPage();
  };

  return (
    <div className="mb-4 space-y-3">
      {/* ورودی‌ها */}
      <div className="flex flex-col sm:flex-row gap-2">
        {fields.map((field:any) => (
          <div key={field.key} className="flex-1">
            {field.type === "select" ? (
              <select
                className="border rounded px-2 py-1 w-full"
                value={tempFilters[field.key] || appliedFilters[field.key] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              >
                <option value="">همه {field.label}</option>
                {field.options?.map((opt:any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                placeholder={field.label}
                value={tempFilters[field.key] || appliedFilters[field.key] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
        <Button onClick={handleApply}>جستجو</Button>
      </div>

      {/* فیلترهای فعال */}
      {Object.keys(appliedFilters).length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(appliedFilters).map(([key, value]) =>
            value ? (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1 rounded-full"
              >
                <span>
                  {fields.find((f:any) => f.key === key)?.label}: {value}
                </span>
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFilter(key)}
                >
                  ✕
                </button>
              </Badge>
            ) : null
          )}

          {/* دکمه پاک کردن همه */}
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-300"
            onClick={handleClearAll}
          >
            پاک کردن همه
          </Button>
        </div>
      )}
    </div>
  );
}
