"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/component/order/StepIndicator";
import StepOne from "@/component/order/StepOne";
import StepTwo from "@/component/order/StepTwo";
import StepThree from "@/component/order/StepThree";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { DrawerNoneTrigger } from "../common/DrawerNoneTrigger";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useCreateOrderApi } from "@/services/user";
import { useRouter } from "next/navigation";

export default function MultiStepForm() {
  const router = useRouter();
  const { data: session } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, isPending, error, isSuccess, data } = useCreateOrderApi();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    date: null as Date | null,
    washTypes: [] as number[],
    addressId: null as string | null,
  });

  useEffect(() => {
    if (session?.accessToken) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [session?.accessToken]);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // alert("فرم با موفقیت ارسال شد!\n" + JSON.stringify(formData, null, 2));
    const services = formData?.washTypes?.map((item) => ({
      id: item,
      quantity: 0,
    }));
    const data = {
      product_items: services,
      schedule: formData?.date,
      location_id: formData?.addressId,
    };

    mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/orders");
        }, 2000);
      },
    });
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // قبل از نمایش
      animate={{ opacity: 1, y: 0 }} // بعد از mount
      exit={{ opacity: 0, y: 20 }} // هنگام خروج (اختیاری)
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-screen w-full flex-col p-3 relative bg-gradient-to-br from-[#E4EBF0] to-[#E4EBF0] flex items-center justify-center"
    >
      {/* <div className="w-full h-full max-w-2xl bg-transparent rounded-2xl shadow-xl"> */}
      <div className="p-3 md:p-4 w-full h-1/3 flex flex-col justify-end">
        <StepIndicator currentStep={currentStep} />
      </div>
      <div className="p-3 md:p-4 w-full h-2/3 bg-white rounded-t-4xl">
        <div className="mt-10 h-[70%] overflow-scroll overflow-x-hidden">
          {currentStep === 1 && (
            <StepOne
              selectedWashTypes={formData.washTypes}
              onSelectWashTypes={(washTypes) => updateFormData({ washTypes })}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              selectedDate={formData.date}
              onSelectDate={(date) => updateFormData({ date })}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              selectedAddressId={formData.addressId}
              onSelectAddress={(addressId) => updateFormData({ addressId })}
            />
          )}
        </div>

        <div className="h-[30%] flex justify-between gap-1 w-full p-4">
          {currentStep !== 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="h-12 rounded-xl flex-1 items-center gap-2"
              disabled={currentStep === 1}
            >
              {/* <ChevronRight size={18} /> */}
              برگشت
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              className="rounded-xl h-12 bg-primary hover:bg-primary flex-2 items-center gap-2 text-lg"
            >
              مرحله بعد
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-primary flex-2 h-12 text-lg hover:bg-primary rounded-xl"
              disabled={
                !formData.date ||
                formData.washTypes.length === 0 ||
                !formData.addressId ||
                isPending
              }
            >
              {isPending && "در حال ثبت اطلاعات"}
              {!isPending && "ثبت نهایی"}
            </Button>
          )}
        </div>
      </div>
      <DrawerNoneTrigger
        open={isLogin}
        onOpenChange={(value) => setIsLogin(value)}
      >
        <div className="w-full flex flex-col justify-center items-center p-4 gap-6">
          <UserCircle size={40} className="text-laundry" />
          <span>برای ثبت سفارش باید وارد شوید</span>
          <div className="w-full flex gap-2 justify-center items-center">
            <Button
              className="flex-1 bg-gray-400"
              onClick={() => setIsLogin(false)}
            >
              فعلا نه!
            </Button>
            <Link className="flex-1" href="/auth/signin">
              <Button className="w-full bg-foreground">ورود</Button>
            </Link>
          </div>
        </div>
      </DrawerNoneTrigger>
    </motion.div>

    // </div>
  );
}
