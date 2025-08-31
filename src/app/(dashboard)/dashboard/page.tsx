"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-xl">خوش آمدید</h1>
      <Avatar className="h-24 w-24">
        <AvatarImage src={user?.picture} alt="@shadcn" />
        <AvatarFallback>user?.name</AvatarFallback>
      </Avatar>
      <h3>{user?.name}</h3>
      <h3>{user?.email}</h3>
    </div>
  );
}
