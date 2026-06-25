import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex gap-4 min-h-screen bg-[#080c0a]">
            <DashboardSidebar/>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;