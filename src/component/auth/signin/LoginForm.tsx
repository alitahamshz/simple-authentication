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

// فقط فرمت 09XXXXXXXXX رو قبول می‌کنیم
const phoneSchema = z.object({
  phone_number: z.string().regex(/^09\d{9}$/, "فرمت شماره همراه صحیح نیست"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

// --- 🔹 تابع normalize برای همه ورودی‌ها
const normalizePhone = (value: string): string => {
  let v = value.replace(/\D/g, ""); // حذف هر چیزی غیر از عدد

  if (v.startsWith("0098")) {
    v = "0" + v.slice(4);
  } else if (v.startsWith("98")) {
    v = "0" + v.slice(2);
  } else if (v.startsWith("9")) {
    v = "0" + v; // اگر کسی 912... بزنه
  }

  // نهایتاً فقط 11 رقم
  return v.slice(0, 11);
};

export default function PhoneForm() {
  const router = useRouter();
  const { saveUser } = useUser();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: "onSubmit",
    defaultValues: { phone_number: "" },
  });

  const onSubmit = async () => {
    setLoading(true);
    simpleLoginApi({ results: 1, nat: "us" })
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
                <Input
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const normalized = normalizePhone(e.target.value);
                    field.onChange(normalized);
                  }}
                  maxLength={11} // همیشه 11 رقم
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
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> در حال ارسال...
            </>
          ) : (
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
}
