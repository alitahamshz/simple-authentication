"use client"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Bell } from "lucide-react";
import Sidebar from "./Sidebar"; // Import Sidebar to use in the sheet
// import ThemeSwitcher from "@/component/theme/ThemeSwitcher"
import { useUser } from "@/context/UserContext";
export default function Header() {
  const { user, removeUser } = useUser();

  return (
    <header className="sticky top-0 z-10 flex py-[14px] items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 md:px-6">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle></SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1">
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
        {/* <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-gray-100 pl-8 md:w-[200px] lg:w-[320px] dark:bg-gray-800"
        /> */}
      </div>

      {/* Header Icons & User Menu */}
      <div className="flex items-center gap-4">
        {/* <ThemeSwitcher/> */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-auto gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.picture} alt="@shadcn" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
         
          
          
            <DropdownMenuItem>
              <Button onClick={() => removeUser()} variant="ghost" className="w-full justify-start">
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}