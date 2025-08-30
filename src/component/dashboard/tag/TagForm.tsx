/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateTagApi, useUpdateTagApi } from "@/services/admin"
const schema = z.object({
    name: z
        .string({ required_error: "نام الزامی است" })
        .min(1, "نام را وارد کنید"),
    slug: z
        .string({ required_error: "اسلاگ الزامی است" })
        .min(1, "اسلاگ را وارد کنید")
    // .regex(/^[a-z0-9_-]+$/i, "فقط حروف لاتین، عدد، خط تیره و خط زیر"),
});

export type CategoryFormValues = z.infer<typeof schema>;

// Optional helper to make a slug from name
function slugify(input: string): string {
    return input
        .trim()
        .replace(/\s+/g, "-")          // فاصله‌ها → خط فاصله
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]/g, "") // حذف کاراکترهای غیرمجاز، فقط فارسی/انگلیسی/عدد/خط فاصله
        .replace(/-+/g, "-")           // چندتا خط فاصله → یکی
        .toLowerCase();                // اگه بخوای انگلیسی‌ها کوچیک شن
}
export default function CategoryForm({
    initialData,
    openStatus,
    refetch,
}: {
    initialData?: any;
    openStatus?: any;
    refetch?:any;
    onSubmit?: (values: CategoryFormValues) => void | Promise<void>;
    loading?: boolean;
}) {
    const { mutate: createTag, isPending } = useCreateTagApi();
    const { mutate: UpdateTag, isPending: updatePending } = useUpdateTagApi(initialData?.id);
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: initialData?.name ?? "",
            slug: initialData?.slug ?? "",
        },
        mode: "onChange",
    });

    const handleSubmit = (data: any) => {
        if(!initialData){

            createTag(data,{
                onSuccess:()=> {
                    refetch()
                    if(openStatus) openStatus(false)
                    },
            })
        }else{
              UpdateTag(data,{
                onSuccess:()=> {
                    refetch()
                    if(openStatus) openStatus(false)
                    },
            })
        }
    }



    return (
        <Card className="w-full mx-auto">
            <div className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-xl">ایجاد/ویرایش تگ</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-4">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نام</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="مثلاً: حیوانات خانگی"
                                                autoComplete="off"
                                                {...field}
                                                onChange={(e) => {
                                                    const v = e.target.value;
                                                    field.onChange(v);
                                                }}
                                            />
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
                                        <FormLabel>اسلاگ</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Input placeholder="مثلاً: pets" {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => {
                                                    const nameVal = form.getValues("name");
                                                    const newSlug = slugify(nameVal);
                                                    form.setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true });
                                                }}
                                            >
                                                ساخت از نام
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">فقط حروف لاتین، عدد، - و _ مجاز است.</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" disabled={isPending || updatePending || !form.formState.isValid}>
                                    ذخیره
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset({ name: "", slug: "" })}
                                >
                                    ریست
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </div>

        </Card>
    );
}
