// 'use client'
// import React from 'react'
// import {
//   Headset,
//   House,
//   ShoppingBag,
//   Wallet,
// } from "lucide-react";

// export default function Navigation() {
//   return (
//     <>
//         <div
//           id="navigationBar"
//           className="fixed px-4 flex flex-row gap-3 justify-evenly rounded-2xl bottom-6 max-w-[480px]  w-[90%] bg-white shadow-2xl p-2"
//         >
//           <div className="transition-all duration-200 group flex flex-col justify-center items-center hover:bg-laundry px-5 rounded-2xl hover:text-white">
//             <House size={24} className="text-gray-500 group-hover:text-white" />
//             <span className="text-xs font-bold">خانه</span>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <ShoppingBag size={24} className="text-gray-500" />
//             <span className="text-xs font-bold">سفارش ها</span>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <Wallet size={24} className="text-gray-500" />
//             <span className="text-xs font-bold">کیف پول</span>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <Headset size={24} className="text-gray-500" />
//             <span className="text-xs font-bold">پشتیبانی</span>
//           </div>
//         </div>
//     </>
//   )
// }
"use client";
import React from "react";
import {
  Headset, House, ShoppingBag
  // , Wallet 
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const path = usePathname();
  console.log(path);
  // const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "خانه", icon: House, link: "/home" },
    { id: "orders", label: "سفارش ها", icon: ShoppingBag, link: "/orders" },
    // { id: "wallet", label: "کیف پول", icon: Wallet, link: "/" },
    { id: "support", label: "پشتیبانی", icon: Headset, link: "/support" },
  ];

  return (
    <div
      id="navigationBar"
      className="fixed px-4 flex flex-row gap-0 justify-evenly rounded-2xl bottom-6 max-w-[480px] w-[90%] bg-white shadow-2xl p-2"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        // const isActive = active === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              // setActive(item.id);
              router.push(item.link);
            }}
            className={`transition-all w-1/4 duration-200 group flex flex-col justify-center items-center px-4 py-2 rounded-2xl ${path === item.link
                ? "bg-laundry text-white"
                : "hover:bg-laundry hover:text-white text-gray-500"
              }`}
          >
            <Icon
              size={24}
              className={`${path === item.link ? "text-white" : "text-gray-500 group-hover:text-white"
                }`}
            />
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
