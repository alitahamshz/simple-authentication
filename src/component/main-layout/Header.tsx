/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    ChevronDown,
    ChevronLeft,
    Menu,
    Search,
    X,
    Brush,
    Sparkles,
    BookOpen,
    HeartPulse,
    ShoppingBag,
    Gift,
    SprayCan,
  
} from "lucide-react";

// دیتا با آیکون‌ها حفظ می‌شود
const menuItems = [
    { name: 'فروشگاه خانومی', href: '#', icon: ShoppingBag },
    {
        name: 'آرایش',
        href: '#',
        icon: Brush,
        children: [
            { name: 'آرایش صورت', href: '#' },
            {
                name: 'آرایش چشم',
                href: '#',
                children: [
                    { name: 'ریمل', href: '#' },
                    { name: 'خط چشم', href: '#' },
                    { name: 'سایه چشم', href: '#' },
                ],
            },
            { name: 'آرایش لب', href: '#' },
        ],
    },
    {
        name: 'پوستی',
        href: '#',
        icon: Sparkles,
        children: [
            { name: 'مرطوب کننده', href: '#' },
            { name: 'ضد آفتاب', href: '#' },
        ],
    },
    { name: 'آموزش', href: '#', icon: BookOpen },
    { name: 'سبک زندگی', href: '#', icon: HeartPulse },
    { name: 'عطر', href: '#', icon: SprayCan },
    { name: 'تازه ها', href: '#', icon: Gift },
];

export const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <header className="bg-white/70 backdrop-blur-sm sticky top-0 z-40 w-full border-b dark:bg-gray-900/90 dark:border-gray-800">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <span className="text-3xl font-black text-primary">ماهنامه</span>

                        {/* ======================================================= */}
                        {/* Desktop Dropdown Menu (Reverted to simple style) */}
                        {/* ======================================================= */}
                        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative group px-3 py-2">
                                    <a href={item.href} className="hover:text-primary transition-colors flex items-center gap-1.5">
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        {item.name}
                                        {item.children && <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />}
                                    </a>
                                    {/* Level 2 Dropdown با انیمیشن */}
                                    {item.children && (
                                        <div className="
                                            absolute top-full right-0 z-50 pt-2
                                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                            transform translate-y-2 group-hover:translate-y-0
                                            transition-all duration-200 ease-in-out
                                        ">
                                            <div className="bg-white dark:bg-gray-800 border shadow-lg rounded-md min-w-[200px] py-2">
                                                {item.children.map((child) => (
                                                    <div key={child.name} className="relative group/level2">
                                                        <a href={child.href} className="flex justify-between items-center w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            {child.name}
                                                            {child.children && (
                                                                <span className="text-xs">
                                                                    <ChevronLeft size={16} />
                                                                </span>
                                                            )}
                                                        </a>
                                                        {/* Level 3 Dropdown با انیمیشن */}
                                                        {child.children && (
                                                            <div className="
                                                                absolute top-0 right-full z-50
                                                                opacity-0 invisible group-hover/level2:opacity-100 group-hover/level2:visible
                                                                transform -translate-x-2 group-hover/level2:translate-x-0
                                                                transition-all duration-200 ease-in-out
                                                            ">
                                                                <div className="bg-white dark:bg-gray-800 border shadow-lg rounded-md min-w-[200px] py-2">
                                                                    {child.children.map((grandchild) => (
                                                                        <a key={grandchild.name} href={grandchild.href} className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                            {grandchild.name}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        {/* ======================================================= */}
                        {/* End of Desktop Menu */}
                        {/* ======================================================= */}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Input placeholder="جستجو برای..." className="rounded-full bg-gray-100 border-none pl-10 w-64 dark:bg-gray-800" />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <button onClick={() => setIsDrawerOpen(true)} className="lg:hidden p-2">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer (with icons) */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsDrawerOpen(false)}
            ></div>

            <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                    <h2 className="font-bold text-lg text-primary">منو</h2>
                    <button onClick={() => setIsDrawerOpen(false)} className="p-2">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="p-4 overflow-y-auto h-[calc(100vh-65px)]">
                    <ul>
                        {menuItems.map((item) => (
                            <MobileMenuItem key={item.name} item={item} />
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

const MobileMenuItem = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleToggle = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        }
    };

    const ItemContent = () => (
        <div className="w-full flex items-center justify-between text-right py-3">
            <span className="flex items-center gap-3 font-medium hover:text-primary">
                {item.icon && <item.icon className="h-5 w-5 opacity-80" />}
                {item.name}
            </span>
            {hasChildren && <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
        </div>
    );

    return (
        <li className="border-b dark:border-gray-800">
            {hasChildren ? (
                <>
                    <button onClick={handleToggle} className="w-full">
                        <ItemContent />
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-50'}`}>
                        <div className="overflow-hidden">
                            <ul className="pr-4 mr-2 border-r-2 border-primary/20 py-2">
                                {item.children.map((child: any) => (
                                    <MobileMenuItem key={child.name} item={child} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <a href={item.href} className="block w-full">
                    <ItemContent />
                </a>
            )}
        </li>
    );
};