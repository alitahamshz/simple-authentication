"use client";

import moment from "moment-jalaali";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DrawerNoneTrigger } from "../common/DrawerNoneTrigger";
import { motion } from "framer-motion";

// فعال‌سازی فارسی
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

function isSameDate(date1: Date | null, date2: Date): boolean {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function StepTwo({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  const days = [];
  let i = 0;

  // ساختن ۸ روز غیرجمعه
  while (days.length < 7) {
    const date = moment().add(i, "day");
    const dayName = date.format("dddd");
    if (dayName !== "جمعه") {
      days.push({
        label: date.format("dddd jD jMMMM"), // خروجی مثل "سه‌شنبه ۲۲ خرداد"
        dateObject: date.toDate(),
      });
    }
    i++;
  }

  return (
    <motion.div
     initial={{ opacity: 0, y: 20 }}   // قبل از نمایش
      animate={{ opacity: 1, y: 0 }}    // بعد از mount
      exit={{ opacity: 0, y: 20 }}      // هنگام خروج (اختیاری)
      transition={{ duration: 0.4, ease: "easeOut" }}
    className="grid grid-cols-2 gap-3">
      <h2 className="text-xl font-bold text-gray-800 mb-6 col-span-2">
        انتخاب زمان تحویل
      </h2>

      {days.map((day, idx) => {
        const isSelected = isSameDate(selectedDate, day.dateObject);
        return (
          <Button
            key={day.dateObject.toISOString()}
            onClick={() => {
              onSelectDate(day.dateObject);
              if (idx === 0) setOpen(true);
            }}
            className={`
              ${idx === 0 ? "col-span-2" : ""}
              ${isSelected ? "bg-laundry text-white" : "bg-[#E4EBF0] text-black"}
              rounded-2xl h-11 text-lg font-bold border-0 shadow-none hover:bg-blue-100
            `}
            variant={isSelected ? "default" : "outline"}
          >
            {day.label}
            {idx === 0 && (
              <span className={`ml-1 ${isSelected ? "text-white" : "text-laundry"}`}>
                (تحویل فوری ۶ ساعته)
              </span>
            )}
          </Button>
        );
      })}

      <DrawerNoneTrigger open={open} onOpenChange={setOpen}>
        <div className="flex flex-col w-full gap-3 text-center px-8 py-2">
          <span className="font-[900] text-lg">تحویل فوری</span>
          <p>
            با انتخاب تحویل فوری، انجام فرایند شستشو در کمتر از ۲۴ ساعت انجام می‌شود
            و هزینه شستشو ۲ برابر می‌شود.
          </p>
          <Button onClick={() => setOpen(false)}>متوجه شدم</Button>
        </div>
      </DrawerNoneTrigger>
    </motion.div>
  );
}
