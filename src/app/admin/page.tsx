'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import {
    Package,
    FolderOpen,
    MessageSquare,
    Mail,
    TrendingUp,
    Users,
    ArrowUpRight,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import {
    getProducts,
    getProjects,
    getTestimonials,
    getInquiries,
} from '@/lib/data/store';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const products = getProducts();
    const projects = getProjects();
    const testimonials = getTestimonials();
    const inquiries = getInquiries();

    const stats = [
        {
            name: 'Total Products',
            value: products.length,
            icon: Package,
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            href: '/admin/products',
            change: '+12%',
            changeType: 'increase',
        },
        {
            name: 'Total Projects',
            value: projects.length,
            icon: FolderOpen,
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-600',
            bgColor: 'bg-green-50',
            href: '/admin/projects',
            change: '+8%',
            changeType: 'increase',
        },
        {
            name: 'Testimonials',
            value: testimonials.length,
            icon: MessageSquare,
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            href: '/admin/testimonials',
            change: '+5%',
            changeType: 'increase',
        },
        {
            name: 'New Inquiries',
            value: inquiries.filter((i) => i.status === 'new').length,
            icon: Mail,
            color: 'from-red-500 to-red-600',
            textColor: 'text-red-600',
            bgColor: 'bg-red-50',
            href: '/admin/inquiries',
            change: '+23%',
            changeType: 'increase',
        },
    ];

    const recentInquiries = inquiries.slice(0, 5);

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AdminLayout>
            <div className='space-y-8'>
                {/* Header with Greeting */}
                <div className='bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg p-8 text-white'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold mb-2'>
                                {getCurrentGreeting()},{' '}
                                {session?.user?.name || 'Admin'}! 👋
                            </h1>
                            <p className='text-primary-100 text-lg'>
                                Here's what's happening with your business today
                            </p>
                        </div>
                        <div className='hidden md:flex items-center space-x-4 text-primary-100'>
                            <Clock className='w-5 h-5' />
                            <span>
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Enhanced */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {stats.map((stat) => (
                        <Link
                            key={stat.name}
                            href={stat.href}
                            className='group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                            ></div>

                            <div className='relative p-6'>
                                <div className='flex items-start justify-between mb-4'>
                                    <div
                                        className={`${stat.bgColor} p-3 rounded-lg`}
                                    >
                                        <stat.icon
                                            className={`w-6 h-6 ${stat.textColor}`}
                                        />
                                    </div>
                                    <ArrowUpRight className='w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors' />
                                </div>

                                <div>
                                    <p className='text-sm font-medium text-gray-600 mb-1'>
                                        {stat.name}
                                    </p>
                                    <div className='flex items-end justify-between'>
                                        <p className='text-3xl font-bold text-gray-900'>
                                            {stat.value}
                                        </p>
                                        <div className='flex items-center text-xs font-semibold text-green-600'>
                                            <TrendingUp className='w-3 h-3 mr-1' />
                                            {stat.change}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Recent Activity & Quick Stats */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Recent Inquiries */}
                    <div className='lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden'>
                        <div className='px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                    <div className='bg-primary-100 p-2 rounded-lg'>
                                        <Mail className='w-5 h-5 text-primary-600' />
                                    </div>
                                    <h2 className='text-xl font-bold text-gray-900'>
                                        Recent Inquiries
                                    </h2>
                                </div>
                                <Link
                                    href='/admin/inquiries'
                                    className='text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center'
                                >
                                    View All
                                    <ArrowUpRight className='w-4 h-4 ml-1' />
                                </Link>
                            </div>
                        </div>
                        <div className='divide-y divide-gray-100'>
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inquiry) => (
                                    <div
                                        key={inquiry.id}
                                        className='px-6 py-4 hover:bg-gray-50 transition-colors'
                                    >
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <div className='flex items-center space-x-3 mb-2'>
                                                    <h3 className='font-semibold text-gray-900'>
                                                        {inquiry.name}
                                                    </h3>
                                                    <span
                                                        className={`
                                                        px-2.5 py-0.5 text-xs font-medium rounded-full
                                                        ${
                                                            inquiry.status ===
                                                            'new'
                                                                ? 'bg-red-100 text-red-700 ring-1 ring-red-200'
                                                                : ''
                                                        }
                                                        ${
                                                            inquiry.status ===
                                                            'contacted'
                                                                ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                                                                : ''
                                                        }
                                                        ${
                                                            inquiry.status ===
                                                            'quoted'
                                                                ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200'
                                                                : ''
                                                        }
                                                        ${
                                                            inquiry.status ===
                                                            'closed'
                                                                ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                                                                : ''
                                                        }
                                                    `}
                                                    >
                                                        {inquiry.status}
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600 mb-2 line-clamp-1'>
                                                    {inquiry.subject}
                                                </p>
                                                <div className='flex items-center text-xs text-gray-500 space-x-3'>
                                                    <span className='flex items-center'>
                                                        <Mail className='w-3 h-3 mr-1' />
                                                        {inquiry.email}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{inquiry.phone}</span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/admin/inquiries`}
                                                className='ml-4 px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors'
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='px-6 py-12 text-center'>
                                    <Mail className='w-12 h-12 mx-auto text-gray-300 mb-3' />
                                    <p className='text-gray-500'>
                                        No inquiries yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className='space-y-6'>
                        {/* Activity Summary */}
                        <div className='bg-white rounded-xl shadow-md p-6'>
                            <h3 className='font-bold text-gray-900 mb-4 flex items-center'>
                                <TrendingUp className='w-5 h-5 mr-2 text-primary-600' />
                                Activity Summary
                            </h3>
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                                    <span className='text-sm text-gray-600'>
                                        Total Items
                                    </span>
                                    <span className='font-bold text-gray-900'>
                                        {products.length +
                                            projects.length +
                                            testimonials.length}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                                    <span className='text-sm text-gray-600'>
                                        Active Products
                                    </span>
                                    <span className='font-bold text-gray-900'>
                                        {products.length}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                                    <span className='text-sm text-gray-600'>
                                        Published Projects
                                    </span>
                                    <span className='font-bold text-gray-900'>
                                        {projects.length}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-600'>
                                        Pending Inquiries
                                    </span>
                                    <span className='font-bold text-red-600'>
                                        {
                                            inquiries.filter(
                                                (i) => i.status === 'new'
                                            ).length
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Status Overview */}
                        <div className='bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6'>
                            <div className='flex items-center mb-3'>
                                <CheckCircle2 className='w-5 h-5 text-primary-600 mr-2' />
                                <h3 className='font-bold text-gray-900'>
                                    System Status
                                </h3>
                            </div>
                            <p className='text-sm text-gray-700 mb-4'>
                                All systems operational
                            </p>
                            <div className='space-y-2 text-xs'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-600'>
                                        Database
                                    </span>
                                    <span className='text-green-600 font-medium'>
                                        ● Active
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-600'>API</span>
                                    <span className='text-green-600 font-medium'>
                                        ● Active
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-600'>
                                        Storage
                                    </span>
                                    <span className='text-green-600 font-medium'>
                                        ● Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions - Enhanced */}
                <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
                        <div className='w-1 h-6 bg-primary-600 mr-3 rounded-full'></div>
                        Quick Actions
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <Link
                            href='/admin/products'
                            className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-primary-200'
                        >
                            <div className='bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                                <Package className='w-8 h-8 text-blue-600' />
                            </div>
                            <h3 className='font-bold text-gray-900 mb-2'>
                                Manage Products
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Add or edit products catalog
                            </p>
                        </Link>
                        <Link
                            href='/admin/projects'
                            className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-primary-200'
                        >
                            <div className='bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                                <FolderOpen className='w-8 h-8 text-green-600' />
                            </div>
                            <h3 className='font-bold text-gray-900 mb-2'>
                                Manage Projects
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Showcase your portfolio
                            </p>
                        </Link>
                        <Link
                            href='/admin/testimonials'
                            className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-primary-200'
                        >
                            <div className='bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                                <MessageSquare className='w-8 h-8 text-purple-600' />
                            </div>
                            <h3 className='font-bold text-gray-900 mb-2'>
                                Testimonials
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Manage customer reviews
                            </p>
                        </Link>
                        <Link
                            href='/admin/inquiries'
                            className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-primary-200'
                        >
                            <div className='bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                                <Mail className='w-8 h-8 text-red-600' />
                            </div>
                            <h3 className='font-bold text-gray-900 mb-2'>
                                View Inquiries
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Review customer messages
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
