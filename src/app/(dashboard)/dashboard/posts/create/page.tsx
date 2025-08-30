/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  // CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import ImageUploader from "@/component/common/ImageUploader";
import { useGetCategoryApi, useCreatePostApi } from "@/services/admin";

const CustomEditor = dynamic(() => import("@/component/EditorCustom"), {
  ssr: false,
});
type Category = {
  id: number;
  name: string;
  parent_id?: number | null;
  children?: Category[];
};
// ------------------------ Schema ------------------------
const articleSchema = z.object({
  title: z.string().min(5, "عنوان خیلی کوتاه است"),
  slug: z.string().min(2, "اسلاگ معتبر نیست"),
  meta_title: z.string().min(3, "عنوان سئو معتبر نیست"),
  meta_description: z.string().max(160, "حداکثر 160 کاراکتر"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.any().optional(),
  thumbnail: z.any().optional(),
  status: z.enum(["draft", "published"]),
  category_id: z.number().optional(),
  // keywords: z.array(z.string()).optional(),
});

// ------------------------ اسلاگ ساز ------------------------
function generateSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, "-") // فاصله‌ها → -
    .replace(/[^\u0600-\u06FF\w-]+/g, ""); // فقط حروف فارسی، انگلیسی، عدد
}

// ------------------------ Component ------------------------
export default function NewArticlePage() {
  const { data: categories } = useGetCategoryApi();
  const { mutate: createPost, isPending, data } = useCreatePostApi();


  console.log({ isPending, data })
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      excerpt: "",
      content: "",
      status: "draft",
      // keywords: [],
      category_id: 0
    },
  });
  console.log(form.watch('content'))
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  // تولید خودکار اسلاگ از عنوان
  useEffect(() => {
    const title = form.watch("title");
    if (title) {
      form.setValue("slug", generateSlug(title));
    }
  }, [form.watch("title")]);

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    console.log("📤 ارسال مقاله:", { ...data, keywords });
    createPost(data)
  };

  // ---------------- دسته بندی ----------------
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
          onSelect={() => form.setValue("category_id", cat.id)} // ✅ دیگه parent_id نیست
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4 bg-primary p-[1px] text-background rounded-full",
              form.watch("category_id") === cat.id ? "opacity-100" : "opacity-0"
            )}
          />
          <span
            className={cn(
              `pr-${level * 4}`,
              level === 0
                ? "font-bold"
                : "font-normal text-gray-600 dark:text-gray-400"
            )}
          >
            {cat.name}
          </span>
        </CommandItem>
        {cat.children && renderCategories(cat.children, level + 1)}
      </div>
    ));

  return (
    <div className="mx-auto bg-white dark:bg-background py-6 px-2 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">ایجاد مقاله جدید</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
          {/* ستون راست */}
          <div className="col-span-12 lg:col-span-9 space-y-5">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان مقاله</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً آموزش Next.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسلاگ (آدرس)</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً آموزش-nextjs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meta Title */}
            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان سئو</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً آموزش Next.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meta Description */}
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>متا دیسکریپشن</FormLabel>
                  <FormControl>
                    <Textarea placeholder="توضیح کوتاه برای گوگل..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>خلاصه مقاله</FormLabel>
                  <FormControl>
                    <Textarea placeholder="چکیده‌ای کوتاه از مقاله..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Content */}

            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem>
                  <FormLabel>محتوای مقاله</FormLabel>
                  <CustomEditor form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* ستون چپ */}
          <div className="bg-primary/5 py-3 rounded-lg col-span-12 lg:col-span-3 space-y-5 pr-1">
            {/* Cover + Thumbnail */}
            <div className="w-full lg:sticky top-16 space-y-5">
              <div className=" flex w-full gap-1">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploader
                          label="انتخاب تصویر کاور"
                          maxSize={1}
                          onChange={(file) => field.onChange(file)}
                          aspect={16 / 9}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploader
                          label="انتخاب بندانگشتی"
                          maxSize={0.2}
                          onChange={(file) => field.onChange(file)}
                          aspect={1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Category */}
              <FormField
                control={form.control}
                name="category_id"
                render={() => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {form.watch("category_id")
                              ? categories?.data?.find((c: Category) => c.id === form.watch("category_id"))?.name
                              : "انتخاب دسته‌بندی"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="جستجوی دسته..." />
                          <CommandEmpty>دسته‌ای پیدا نشد</CommandEmpty>
                          <CommandGroup>
                            {renderCategories(categoryTree)} {/* ✅ اینجا درست شد */}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Keywords */}
              <FormItem>
                <FormLabel>کلمات کلیدی</FormLabel>
                <div className="flex flex-wrap gap-2 border rounded-md p-2">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md"
                    >
                      {kw}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))}
                      />
                    </span>
                  ))}
                  <input
                    className="flex-1 outline-none bg-transparent"
                    placeholder="افزودن کلمه و Enter"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && keywordInput.trim()) {
                        e.preventDefault();
                        setKeywords([...keywords, keywordInput.trim()]);
                        setKeywordInput("");
                      }
                    }}
                  />
                </div>
              </FormItem>

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وضعیت مقاله</FormLabel>
                    <select
                      {...field}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="draft">پیش‌نویس</option>
                      <option value="published">منتشر شده</option>
                    </select>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                انتشار مقاله
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
