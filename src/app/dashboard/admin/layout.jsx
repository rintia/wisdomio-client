import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminDashBoardLayout = async ({children}) => {
   await requireRole('admin');
    return children;

};

export default AdminDashBoardLayout; 