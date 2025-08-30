/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  useRouter
} from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const otpSchema = z.object({
  verification_code: z.string().length(6, "کد باید 6 رقمی باشد"),
  user_id: z.number(),
  device: z.string(),
});

type OTPFormValues = z.infer<typeof otpSchema>;

export function OTPForm({
  // onVerify,
  setStep,
  phone,
  userId,
}: {
  // onVerify: (code: string) => void;
  phone?: string;
  userId: number | undefined;
  setStep: (num: number) => void
}) {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { verification_code: "", user_id: userId, device: "mobile" },
  });
  const onSubmit = async (data: OTPFormValues) => {
    setError(null); // قبلش پاک کن
    setLoading(true)
    const result = await signIn("credentials", {
      verification_code: data.verification_code,
      user_id: data.user_id,
      device: "mobile",
      redirect: false, // handle redirect manually
    }) as unknown as { error?: string; ok?: boolean };

    if (result?.error) {
      setError("کد وارد شده اشتباه است یا منقضی شده");
      setLoading(false)
    } else if (result?.ok) {
      setLoading(false)
      // redirect("/profile");
      router.push("/");
      router.refresh(); // ✅ مهم‌ترین بخش
    }
  };
  useEffect(() => {
    if (!("OTPCredential" in window)) return;
    const ac = new AbortController();
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      } as any)
      .then((otp: any) => {
        if (otp?.code) {
          form.setValue("verification_code", otp.code);
          form.trigger("verification_code");
        }
      })
      .catch((err) => {
        console.log("Web OTP error:", err);
      });

    return () => ac.abort();
  }, [form]);
  return (
    <Form {...form}>
      <form
        dir="ltr"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm flex flex-col justify-center items-center gap-5"
      >
        <div>
          <span>{` کد تایید ارسال شده به شماره `}</span>
          <span className="text-laundry font-[900]">{phone}</span>
          <span>{` را وارد نمایید`}</span>
        </div>

        <FormField
          control={form.control}
          name="verification_code"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>کد تأیید</FormLabel> */}
              <FormControl>
                <InputOTP autoFocus maxLength={6}
                  onComplete={() => {
                    // برای جلوگیری از ارسال مجدد هنگام لودینگ، یک شرط اضافه می‌کنیم
                    if (!isLoading) {
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  {...field} >
                  <InputOTPGroup >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full text-center">
          <span>ورود شما به معنای پذیرش{" "}
            <Link href='/rules' className="underline mx-0.5 text-gray-600">
              {" "} شرایط و قوانین{" "}
            </Link>
            است{" "}
          </span>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full text-md rounded-lg h-11 font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                در حال ارسال
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "تایید"
            )}
          </Button>
          <Button
            onClick={() => setStep(1)}

            className="w-full text-md bg-grayBg dark:bg-accent text-foreground rounded-lg h-11 font-bold"
          >تغییر شماره</Button>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center bg-red-200 px-6 py-2 w-full rounded-lg">{error}</div>
        )}
      </form>
    </Form>
  );
}
