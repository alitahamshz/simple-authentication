"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { simpleLoginApi } from "@/services/public";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه ورود",
  description: "Admin Dashboard",
};
const phoneSchema = z.object({
  phone_number: z.string().regex(
    /^(09\d{9}|\+989\d{9}|00989\d{9})$/,
    "فرمت شماره همراه وارد شده صحیح نیست"
  ),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function PhoneForm() {
  const router = useRouter();
  const { saveUser } = useUser();
  const [isLoading, setLoading] = useState(false);

  // 1. یک state برای مدیریت maxLength داینامیک
  // مقدار اولیه را روی 14 (طولانی‌ترین حالت) می‌گذاریم تا کاربر محدودیتی حس نکند
  const [maxLength, setMaxLength] = useState(14);

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: 'onSubmit',
    defaultValues: { phone_number: "" },
  });

  // 2. تابع سفارشی برای رویداد onChange
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: import("react-hook-form").ControllerRenderProps<PhoneFormValues, "phone_number">
  ) => {
    const value = e.target.value;

    // بر اساس ابتدای شماره، maxLength را تنظیم می‌کنیم
    if (value.startsWith('+')) {
      setMaxLength(13); // +989...
    } else if (value.startsWith('00')) {
      setMaxLength(14); // 00989...
    } else {
      setMaxLength(11); // 09...
    }

    // در نهایت، مقدار را به react-hook-form اطلاع می‌دهیم
    field.onChange(e);
  };

  const onSubmit = async () => {
    const config = { results: 1, nat: "us" };
    setLoading(true);
    simpleLoginApi(config)
      .then((res) => {
        setLoading(false);
        const user = res.data.results[0];
        const userData = {
          email: user.email,
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large,
        };
        saveUser(userData);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full gap-5"
      >
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">شماره تماس</FormLabel>
              <FormControl>
                {/* 3. اتصال maxLength و onChange به Input */}
                <Input
                  {...field} // name, value, onBlur, ref را از اینجا می‌گیرد
                  onChange={(e) => handlePhoneChange(e, field)} // onChange را با تابع سفارشی خود جایگزین می‌کنیم
                  maxLength={maxLength} // maxLength داینامیک را اعمال می‌کنیم
                  className="w-full h-12"
                  placeholder="مثلاً 09123456789"
                  type="tel"
                  dir="ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-md mt-4 h-11 rounded-lg font-bold"
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> در حال ارسال...</>
          ) : (
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
}