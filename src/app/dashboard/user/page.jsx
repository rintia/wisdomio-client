'use client';
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentLessons from "@/components/dashboard/RecentLessons";
import StatsGrid from "@/components/dashboard/StatGrid";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";

const page = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }


    const user = session?.user;

    return (
        <div  className="space-y-8 p-6">
            <h2 className="text-4xl">Welcome back, {user?.name}</h2>
            <StatsGrid />
            <div className="grid gap-6 lg:grid-cols-2">
                <RecentLessons />
                <QuickActions />
            </div>

            <AnalyticsCard />
        </div>
    
    );
};

export default page;