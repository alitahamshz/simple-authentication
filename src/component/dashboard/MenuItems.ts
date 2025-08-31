/* eslint-disable @typescript-eslint/no-explicit-any */
// menuItems.ts
import { LayoutDashboard } from "lucide-react";

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
export function getMenuItems(): MenuGroup[] {
  return [
    {
      group: "",
      items: [{ name: "داشبورد", href: "/dashboard", icon: LayoutDashboard }],
    },
  ];
}
