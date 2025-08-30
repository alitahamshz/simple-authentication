import type { Metadata } from "next";
import Header from "@/component/dashboard/Header";
import Sidebar from "@/component/dashboard/Sidebar";
import { ThemeDock } from "@/component/theme/ThemeDock";

export const metadata: Metadata = {
  title: "Next Admin",
  description: "Next.js Admin Dashboard Solution",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100/90 dark:bg-gray-900/90">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
           <ThemeDock side="left" />
        </main>
      </div>
    </div>
  );
}