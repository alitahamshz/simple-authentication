/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetCategoryApi, useCreateCategoryApi, useUpdateCategoryApi } from "@/services/admin";
import { Skeleton } from "@/components/ui/skeleton";

type CategoryFormValues = {
    id: number;
    name: string;
    parent_id?: number | null;
};

type Category = {
    id: number;
    name: string;
    parent_id?: number | null;
    children?: Category[];
};

export default function CategoryForm({
    initialData,
    onSubmit,
    openStatus
}: {
    initialData?: CategoryFormValues;
    onSubmit?: (data: CategoryFormValues) => void;
    openStatus?: (open:boolean) => void;

}) {
    console.log({ initialData })
    const [loading, setLoading] = useState(false);
    const { data: categories, isLoading, refetch } = useGetCategoryApi();
    const { mutate: createCategory, isPending: createPending } = useCreateCategoryApi();
    const { mutate: updateCategory, isPending: updatePending } = useUpdateCategoryApi(initialData ? initialData?.id : null);

    const form = useForm<CategoryFormValues>({
        defaultValues: { name:initialData?.name ?? "",   parent_id:initialData?.parent_id || null },
    });

    const handleSubmit = (data: CategoryFormValues) => {
        const payload = {...data, parent_id: data?.parent_id ?? null}
        setLoading(true);
        setTimeout(() => {
            console.log("📤 ارسال شد:", data);
            if (onSubmit) onSubmit(data);
            setLoading(false);
        }, 800);
        if (!initialData) {
            createCategory(payload, {
                onSuccess: () => {
                    refetch();
                    if(openStatus) openStatus(false)
                },
            })
        } else {
            console.log({data})
            updateCategory(payload, {
                onSuccess: () => {
                    refetch();
                    if(openStatus) openStatus(false)
                },
            })
        }
    };

    // دسته‌بندی‌ها رو به ساختار درختی تبدیل می‌کنیم
    const buildTree = (items: Category[], parentId: number | null = null): Category[] =>
        items
            .filter((item) => item.parent_id === parentId)
            .map((item) => ({
                ...item,
                children: buildTree(items, item.id),
            }));

    const categoryTree = buildTree(categories?.data || []);

    // تابع بازگشتی برای نمایش دسته‌بندی‌ها با فاصله
    const renderCategories = (cats: Category[], level = 0) =>
        cats.map((cat) => (
            <div key={cat.id}>
                <CommandItem
                    value={cat.name}
                    onSelect={() => form.setValue("parent_id", cat.id)}
                >
                    <Check
                        className={cn(
                            "mr-2 h-4 w-4 bg-primary p-[1px] text-background rounded-full",
                            form.watch("parent_id") === cat.id ? "opacity-100" : "opacity-0"
                        )}
                    />
                    <span
                        className={cn(
                            `pr-${level * 4}`, // فاصله تو در تو
                            level === 0 ? "font-[900]" : "font-normal text-gray-600 dark:text-gray-400" // 🔹 لول ۱ بولد
                        )}
                    >
                        {cat.name}
                    </span>
                </CommandItem>
                {cat.children && renderCategories(cat.children, level + 1)}
            </div>
        ));

    if (isLoading) return <div>
        <Skeleton className="h-[600px] w-full bg-gray-200" />
    </div>;

    return (

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* نام دسته‌بندی */}
            <div className="space-y-2">
                <Label htmlFor="name">نام دسته‌بندی</Label>
                <Input
                    id="name"
                    {...form.register("name", { required: "نام دسته‌بندی الزامی است" })}
                    placeholder="مثلاً رژ لب"
                />
                {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            {/* انتخاب والد با سرچ */}
            <div className="space-y-2 border px-2 py-4 rounded-lg">
                <Label>دسته‌بندی والد (اختیاری)</Label>
                <Command>
                    <CommandInput placeholder="جستجو دسته‌بندی..." />
                    <CommandList className="max-h-60 overflow-scroll overflow-x-hidden">
                        <CommandEmpty>هیچ دسته‌ای پیدا نشد</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                value="none"
                                onSelect={() => form.setValue("parent_id", undefined)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-8 w-8 bg-primary p-[1px] text-background rounded-full",
                                        !form.watch("parent_id") ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                بدون والد
                            </CommandItem>
                            {renderCategories(categoryTree)}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>

            {/* دکمه ارسال */}
            <Button type="submit" disabled={loading}>
                {updatePending || createPending
                    ? "در حال ذخیره..."
                    : initialData
                        ? "ذخیره تغییرات"
                        : "ایجاد دسته‌بندی"}
            </Button>
        </form>

    );
}
