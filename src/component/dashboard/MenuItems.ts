import { LayoutDashboard, LucideIcon } from "lucide-react";

interface MenuItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  subItems?: MenuItem[]
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
