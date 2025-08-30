/* eslint-disable @typescript-eslint/no-explicit-any */
// menuItems.ts
import {
  LayoutDashboard,
  Receipt,
  BarChart,
  NotepadText,
  Layers,
  Tags
} from "lucide-react";

interface MenuItem {
  name: string;
  href?: string;
  icon?: any;
  badge?: string;
  pro?: boolean;
  subItems?: MenuItem[];
}

interface MenuGroup {
  group: string;
  items: MenuItem[];
}

// یک تابع که رول رو میگیره و منو متناسب با اون رو برمی‌گردونه
export function getMenuItems(role: string | null): MenuGroup[] {
  console.log({role})
  if (role === "admin") {
    return [
      {
        group: "",
        items: [
          { name: "داشبورد", href: "/dashboard", icon: LayoutDashboard },
          { name: "مدیریت مقالات", icon: NotepadText ,
            subItems: [
              { name: "ایجاد مقاله جدید",icon:Receipt, href: "/dashboard/posts/create" },
              { name: "مدیریت مقالات",icon:Receipt, href: "/dashboard/posts" },
             
            ],
          },
          { name: " دسته بندی ها", icon: Layers ,
            subItems: [
              { name: "ایجاد دسته جدید",icon:Receipt, href: "/dashboard/category/create" },
              { name: "مدیریت دسته بندی ها",icon:Receipt, href: "/dashboard/category/management" },

            ],
          },
          { name: "تگ ها", icon: Tags ,
            subItems: [
              { name: "ایجاد تگ جدید",icon:Tags, href: "/dashboard/tag/create" },
              { name: "مدیریت  تگ ها",icon:Tags, href: "/dashboard/tag" },

            ],
          }
        ],
      },
    ];
  }

  if (role === "user") {
    return [
      {
        group: "Main",
        items: [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          {
            name: "Reports",
            icon: BarChart,
            subItems: [
              { name: "Monthly", href: "/reports/monthly" },
            ],
          },
        ],
      },
    ];
  }

  // رول پیش‌فرض یا خالی
  return [];
}
