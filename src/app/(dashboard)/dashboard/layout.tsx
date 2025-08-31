import type { Metadata } from "next";
import Header from "@/component/dashboard/Header";
import Sidebar from "@/component/dashboard/Sidebar";
import ProtectedRoute from "@/component/common/ProtectedRoute";

export const metadata: Metadata = {
  title: "داشبورد مدیریت",
  description: "Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <ProtectedRoute requireAuth={true}>

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
          </main>
        </div>
      </div>
    </ProtectedRoute>

  );
}