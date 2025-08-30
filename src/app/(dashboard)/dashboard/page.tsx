import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "./stat-card";
import { Eye, DollarSign, Package, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Next.js Admin Dashboard Solution
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Views" value="3.5K" icon={Eye} change="+0.43% from last month" changeType="increase"/>
        <StatCard title="Total Profit" value="$4.2K" icon={DollarSign} change="+4.35% from last month" changeType="increase"/>
        <StatCard title="Total Products" value="3.5K" icon={Package} change="+2.59% from last month" changeType="increase"/>
        <StatCard title="Total Users" value="3.5K" icon={Users} change="-0.95% from last month" changeType="decrease"/>
      </div>
      
      {/* Placeholder for other components */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Payments Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Chart will be here</p>
             </div>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Profit this week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Chart will be here</p>
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}