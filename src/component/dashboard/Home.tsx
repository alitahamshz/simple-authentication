"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useUser();
  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    if (user && !welcomeShown) {
      const alreadyShown = localStorage.getItem("welcomeShown");
      if (!alreadyShown) {
        toast.success(`خوش آمدید، ${user.name}!`);
        localStorage.setItem("welcomeShown", "true");
        setWelcomeShown(true);
      }
    }
  }, [user, welcomeShown]);

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-lg font-medium">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 mt-10">
      <h1 className="font-bold text-xl">خوش آمدید، {user.name}!</h1>
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <h3 className="text-gray-700">{user.name}</h3>
      <h3 className="text-gray-500">{user.email}</h3>
    </div>
  );
}
