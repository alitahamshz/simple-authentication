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
import { otpPhone } from "@/services/public";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
// import { signIn } from "@/app/lib/auth";
// import { useRouter } from "next/navigation";

const phoneSchema = z.object({
  phone_number: z.string().regex(/^09\d{9}$/, "شماره همراه معتبر نیست"),
  device: z.string()
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function PhoneForm({
  onSuccess,
}: {
  onSuccess: (flag: number, phone: string, userId: number) => void;
}) {
  const [isLoading, setLoading] = useState(false)
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone_number: "", device: 'mobile' },
  });

  // const router = useRouter();
  const onSubmit = async (data: PhoneFormValues) => {
    setLoading(true)
    otpPhone(data).then(res => {
      console.log({ res })
      setLoading(false)
      onSuccess(2, data.phone_number, res.data.data.result.user)
    }).catch(err => {
      console.log({ err })
      setLoading(false)
    })
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
                  className="w-full h-12"
                  placeholder="مثلاً 09123456789"
                  {...field}
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              در حال ارسال...
            </>
          ) : (
            "ثبت نام"
          )}
        </Button>
        <div className="w-full text-center">
          <span>ورود شما به معنای پذیرش{" "}
            <Link href='/rules' className="underline mx-0.5 text-gray-600">
              {" "} شرایط و قوانین{" "}
            </Link>
           است{" "}
          </span>
        </div>
      </form>
    </Form>
  );
}
