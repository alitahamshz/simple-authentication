
export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {

  const steps = [
    { id: 1, title: "انتخاب تاریخ" },
    { id: 2, title: "نوع شستشو" },
    { id: 3, title: "انتخاب آدرس" },
  ];

  // const StepTitleMaker = () => {
  //   let result: string = "";
  //   result =
  //     currentStep === 1
  //       ? "نوع شستشو"
        
       
  //       : currentStep === 2
  //       ?  "انتخاب تاریخ "
  //       : currentStep === 3
  //       ? "انتخاب آدرس"
  //       : "";

  //   return result;
  // };

  return (
    <div className="mb-12">
      <div className="flex flex-col justify-between relative gap-2 bg-transparent">
        {/* خط اتصال مراحل */}
        <div className="absolute top-3 left-0 right-0 h-[3px] bg-transparent -z-10">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-in-out" 
            style={{ 
              width: currentStep === 1 ? '0%' : 
                     currentStep === 2 ? '50%' : '100%' 
            }}
          ></div>
        </div>
        <span className="font-[900] text-2xl">ثبت سفارش</span>
        <span className="text-[#616161] text-">{`مرحله ${currentStep} از سه مرحله`}</span>

        {/* مراحل */}
        <div className="flex flex-row w-full gap-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className="w-1/3 flex flex-col items-center z-10"
            >
              <div
                className={`w-full h-[3px] rounded-full mb-2
              ${currentStep >= step.id ? "bg-primary" : "bg-gray-300"}`}
              ></div>
              <span
                className={`text-sm font-medium 
              ${
                currentStep >= step.id
                  ? "text-indigo-600 font-bold"
                  : "text-gray-500"
              }`}
              >
                {/* {step.title} */}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
