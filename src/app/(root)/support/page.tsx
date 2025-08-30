import { Button } from '@/components/ui/button'
import React from 'react'
import DynamicAccordion from "@/component/common/Accordion"

const items = [
  { title: "سوال اول", content: "پاسخ به سوال اول" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
  { title: "سوال دوم", content: "پاسخ به سوال دوم" },
  { title: "سوال سوم", content: "پاسخ به سوال سوم" },
]
export default function Support() {
  return (
    <>
    <div className='py-26 flex flex-col max-w-[480px] w-[90%] gap-4'>
     <div className='bg-white w-full flex flex-col p-4 rounded-2xl gap-4'>
        <span className='font-[900] text-xl'>تماس با ما</span>
        <span className='text-[#616161]'>شماره تماس بی تایم : 0917765437</span>
        <Button className='h-11 rounded-2xl text-lg'>تماس با پشتیبانی</Button>
     </div>
     <div className='bg-white w-full flex flex-col p-4 rounded-2xl gap-4'>
        <span className='font-[900] text-xl'>سوالات متداول</span>
        <DynamicAccordion items={items}/>
     </div>
    </div>
    </>
  )
}
