import AdminAuthProvider from '@/components/admin/AdminAuthProvider';
import { ReactNode } from 'react';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
    return (
        <AdminAuthProvider>
            <main className='min-h-screen'>{children}</main>
        </AdminAuthProvider>
    );
}
