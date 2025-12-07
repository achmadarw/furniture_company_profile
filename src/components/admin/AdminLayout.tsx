'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    FolderOpen,
    MessageSquare,
    Mail,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface AdminLayoutProps {
    children: ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Mail },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 z-40 lg:hidden'
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-secondary-900 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}
            >
                <div className='flex items-center justify-between h-16 px-6 bg-secondary-800'>
                    <h1 className='text-xl font-bold text-white'>
                        Admin Panel
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className='lg:hidden text-white'
                    >
                        <X className='w-6 h-6' />
                    </button>
                </div>

                <nav className='mt-6 px-3'>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center px-3 py-3 mb-2 rounded-lg text-sm font-medium transition-colors
                                    ${
                                        isActive
                                            ? 'bg-primary-600 text-white'
                                            : 'text-gray-300 hover:bg-secondary-800 hover:text-white'
                                    }
                                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className='w-5 h-5 mr-3' />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className='absolute bottom-0 w-full p-4 border-t border-secondary-800 space-y-2'>
                    <button
                        onClick={handleLogout}
                        className='flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-secondary-800 rounded-lg transition-colors'
                    >
                        <LogOut className='w-5 h-5 mr-3' />
                        Logout
                    </button>
                    <Link
                        href='/'
                        className='flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors'
                    >
                        ← Back to Website
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className='lg:pl-64'>
                {/* Top bar */}
                <div className='sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white shadow'>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className='lg:hidden text-gray-600'
                    >
                        <Menu className='w-6 h-6' />
                    </button>
                    <div className='hidden lg:block flex-1'></div>
                    <div className='flex items-center space-x-4 ml-auto'>
                        <div className='text-right'>
                            <p className='text-sm font-semibold text-gray-900'>
                                {session?.user?.name || 'Admin User'}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {session?.user?.email ||
                                    'admin@premiumkitchen.com'}
                            </p>
                        </div>
                        <div className='w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold'>
                            {session?.user?.name?.charAt(0).toUpperCase() ||
                                'A'}
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className='p-6'>{children}</main>
            </div>
        </div>
    );
}
