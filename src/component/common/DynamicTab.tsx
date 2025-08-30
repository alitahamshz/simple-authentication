// components/DynamicTabs.tsx
'use client'
import React from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
// import { Separator } from '@/components/ui/separator'

type TabItem = {
  value: string
  label: string
  content: React.ReactNode
}

interface DynamicTabsProps {
  tabs: TabItem[]
  defaultValue?: string
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabs,
  defaultValue,
}) => {
  return (
    <Tabs dir='rtl' defaultValue={defaultValue || tabs[0]?.value} className="w-[90%] mx-auto max-w-[480px]">
      <TabsList className="mb-4 w-full h-[58px] rounded-2xl p-2">
        {tabs.map((tab) =>
          <div key={tab.value} className='w-full flex'>
            <TabsTrigger value={tab.value} className='h-11 rounded-3xl'>
              {tab.label}
            </TabsTrigger>

            {/* <Separator key={index} orientation="vertical" /> */}

          </div>
        )}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
export default DynamicTabs;