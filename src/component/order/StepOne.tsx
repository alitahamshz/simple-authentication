
'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useProductsApi } from "@/services/user";

export default function WashTypeSelection({
  selectedWashTypes,
  onSelectWashTypes
}: {
  selectedWashTypes:   number[] | null,
  onSelectWashTypes: (washTypes: number[]) => void
}) {
  const { data } = useProductsApi();
  console.log({selectedWashTypes})
  // console.log({data,isLoading})
  const handleCheckboxChange = (id: number) => {
    if (selectedWashTypes?.includes(id)) {
      onSelectWashTypes(selectedWashTypes.filter(type => type !== id));
    } else {
      onSelectWashTypes([...(selectedWashTypes ?? []), id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // قبل از نمایش
      animate={{ opacity: 1, y: 0 }}    // بعد از mount
      exit={{ opacity: 0, y: 20 }}      // هنگام خروج (اختیاری)
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white p-2 rounded-t-3xl h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">انتخاب نوع خدمات</h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.data?.products?.map((option:{name:string,category_id:number,id:number}) => (
          <div
            key={option.id}
            className={`flex items-start z-20 p-4 rounded-2xl border transition-all cursor-pointer
              ${selectedWashTypes?.includes(option.id)
                ? 'border-laundry'
                : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => handleCheckboxChange(option.id)}
          >
            <Checkbox
              id={option.id.toString()}
              checked={selectedWashTypes?.includes(option.id)}
              className="mt-1"
            />
            <div className="mr-3">
              <span className="text-base font-[900] cursor-pointer">
                {option.name}
              </span>
              {/* <p className="text-sm text-gray-600 mt-1">{option.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}