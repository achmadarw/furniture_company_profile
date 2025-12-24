# DOKUMENTASI LENGKAP WEBSITE PREMIUM KITCHEN SET

**Part 3: Admin Dashboard & Management System**

---

[← Kembali ke Part 2B](./DOKUMENTASI-LENGKAP-PART-2B.md) | [Lanjut ke Part 4 →](./DOKUMENTASI-LENGKAP-PART-4.md)

---

## 5. ADMIN DASHBOARD

**Base URL**: `http://localhost:3008/admin`  
**Route Group**: `src/app/(admin)`  
**Layout**: `src/app/(admin)/layout.tsx`  
**Protected**: Yes (requires authentication)

### 5.1 AUTHENTICATION SYSTEM

#### 5.1.1 Login Page

**URL**: `http://localhost:3008/admin/login`  
**Route**: `src/app/(admin)/login/page.tsx`

**Features**:

-   Credentials-based authentication
-   Form validation with Zod
-   Error handling
-   Remember me (optional)
-   Redirect after login

**Form Fields**:

```typescript
const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;
```

**Login Form Implementation**:

```typescript
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email atau password salah');
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
                {/* Logo & Title */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4'>
                        <Lock className='w-8 h-8 text-white' />
                    </div>
                    <h1 className='text-3xl font-bold text-secondary-900 mb-2'>
                        Admin Login
                    </h1>
                    <p className='text-secondary-600'>
                        Premium Kitchen Set Management
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className='bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6'>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    {/* Email Field */}
                    <div>
                        <label className='block text-sm font-medium text-secondary-700 mb-2'>
                            Email
                        </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400' />
                            <input
                                type='email'
                                placeholder='admin@premiumkitchen.com'
                                {...register('email')}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-colors ${
                                    errors.email
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-secondary-200 focus:border-primary-500'
                                } focus:outline-none`}
                            />
                        </div>
                        {errors.email && (
                            <p className='text-red-600 text-sm mt-1'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className='block text-sm font-medium text-secondary-700 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='••••••••'
                                {...register('password')}
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-colors ${
                                    errors.password
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-secondary-200 focus:border-primary-500'
                                } focus:outline-none`}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600'
                            >
                                {showPassword ? (
                                    <EyeOff className='w-5 h-5' />
                                ) : (
                                    <Eye className='w-5 h-5' />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className='text-red-600 text-sm mt-1'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                {/* Demo Credentials Info */}
                <div className='mt-6 p-4 bg-secondary-50 rounded-lg'>
                    <p className='text-sm text-secondary-600 text-center'>
                        <strong>Demo Credentials:</strong>
                        <br />
                        Email: admin@premiumkitchen.com
                        <br />
                        Password: admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
```

#### 5.1.2 NextAuth Configuration

**File**: `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

#### 5.1.3 Middleware Protection

**File**: `src/middleware.ts`

```typescript
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Allow access to /admin/* routes only for authenticated users
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Check if accessing admin routes
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    // Allow /admin/login without token
                    if (req.nextUrl.pathname === '/admin/login') {
                        return true;
                    }
                    // Require token for other admin routes
                    return !!token;
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'],
};
```

---

### 5.2 DASHBOARD OVERVIEW

**URL**: `http://localhost:3008/admin/dashboard`  
**Route**: `src/app/(admin)/dashboard/page.tsx`

#### 5.2.1 Stats Cards

**4 Stat Cards**:

1. **Total Products**

    - Icon: Package
    - Value: Count dari Product model
    - Color: Blue

2. **Total Projects**

    - Icon: Image
    - Value: Count dari Project model
    - Color: Green

3. **Total Testimonials**

    - Icon: MessageSquare
    - Value: Count dari Testimonial model
    - Color: Purple

4. **New Inquiries**
    - Icon: Mail
    - Value: Count dari Inquiry dengan status 'new'
    - Color: Orange

**Implementation**:

```typescript
import { prisma } from '@/lib/prisma';
import { Package, Image, MessageSquare, Mail } from 'lucide-react';

export default async function DashboardPage() {
    // Fetch stats
    const [productsCount, projectsCount, testimonialsCount, newInquiriesCount] =
        await Promise.all([
            prisma.product.count(),
            prisma.project.count(),
            prisma.testimonial.count(),
            prisma.inquiry.count({ where: { status: 'new' } }),
        ]);

    const stats = [
        {
            title: 'Total Products',
            value: productsCount,
            icon: Package,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Projects',
            value: projectsCount,
            icon: Image,
            color: 'bg-green-500',
        },
        {
            title: 'Total Testimonials',
            value: testimonialsCount,
            icon: MessageSquare,
            color: 'bg-purple-500',
        },
        {
            title: 'New Inquiries',
            value: newInquiriesCount,
            icon: Mail,
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className='space-y-8'>
            {/* Page Header */}
            <div>
                <h1 className='text-3xl font-bold text-secondary-900'>
                    Dashboard
                </h1>
                <p className='text-secondary-600 mt-2'>
                    Welcome back! Here's what's happening.
                </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className='bg-white rounded-xl shadow-md p-6 border-2 border-secondary-100'
                        >
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-secondary-600 mb-1'>
                                        {stat.title}
                                    </p>
                                    <p className='text-3xl font-bold text-secondary-900'>
                                        {stat.value}
                                    </p>
                                </div>
                                <div
                                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                                >
                                    <Icon className='w-6 h-6 text-white' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className='grid lg:grid-cols-2 gap-6'>
                {/* Recent Inquiries */}
                <RecentInquiries />

                {/* Quick Actions */}
                <QuickActions />
            </div>
        </div>
    );
}
```

#### 5.2.2 Recent Inquiries Widget

**Show latest 5 inquiries**:

```typescript
async function RecentInquiries() {
    const inquiries = await prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className='bg-white rounded-xl shadow-md p-6 border-2 border-secondary-100'>
            <h2 className='text-xl font-bold text-secondary-900 mb-4'>
                Recent Inquiries
            </h2>

            <div className='space-y-4'>
                {inquiries.map((inquiry) => (
                    <div
                        key={inquiry.id}
                        className='flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors'
                    >
                        <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                                inquiry.status === 'new'
                                    ? 'bg-orange-500'
                                    : inquiry.status === 'in-progress'
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'
                            }`}
                        />
                        <div className='flex-1'>
                            <p className='font-semibold text-secondary-900'>
                                {inquiry.name}
                            </p>
                            <p className='text-sm text-secondary-600 line-clamp-1'>
                                {inquiry.subject}
                            </p>
                            <p className='text-xs text-secondary-500 mt-1'>
                                {new Date(inquiry.createdAt).toLocaleDateString(
                                    'id-ID'
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Link
                href='/admin/inquiries'
                className='block text-center text-primary-600 hover:text-primary-700 font-semibold mt-4'
            >
                View All Inquiries →
            </Link>
        </div>
    );
}
```

#### 5.2.3 Quick Actions Widget

**Shortcut buttons**:

```typescript
function QuickActions() {
    const actions = [
        {
            title: 'Add New Product',
            description: 'Create a new product listing',
            icon: Plus,
            href: '/admin/products/new',
            color: 'bg-blue-500',
        },
        {
            title: 'Add New Project',
            description: 'Upload a new gallery project',
            icon: Image,
            href: '/admin/projects/new',
            color: 'bg-green-500',
        },
        {
            title: 'View Inquiries',
            description: 'Manage customer inquiries',
            icon: Mail,
            href: '/admin/inquiries',
            color: 'bg-orange-500',
        },
        {
            title: 'Manage Testimonials',
            description: 'Add or edit testimonials',
            icon: MessageSquare,
            href: '/admin/testimonials',
            color: 'bg-purple-500',
        },
    ];

    return (
        <div className='bg-white rounded-xl shadow-md p-6 border-2 border-secondary-100'>
            <h2 className='text-xl font-bold text-secondary-900 mb-4'>
                Quick Actions
            </h2>

            <div className='grid grid-cols-2 gap-4'>
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className='p-4 rounded-lg border-2 border-secondary-200 hover:border-primary-500 hover:bg-primary-50 transition-all group'
                        >
                            <div
                                className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                            >
                                <Icon className='w-5 h-5 text-white' />
                            </div>
                            <h3 className='font-semibold text-secondary-900 mb-1 group-hover:text-primary-600'>
                                {action.title}
                            </h3>
                            <p className='text-xs text-secondary-600'>
                                {action.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
```

---

### 5.3 PRODUCTS MANAGEMENT

**URL**: `http://localhost:3008/admin/products`  
**Routes**:

-   List: `/admin/products`
-   Create: `/admin/products/new`
-   Edit: `/admin/products/[id]/edit`

#### 5.3.1 Products List

**Features**:

-   Table view with all products
-   Category filter
-   Search by name
-   Pagination
-   Actions: Edit, Delete
-   Image preview

**Implementation**:

```typescript
export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { page?: string; category?: string; search?: string };
}) {
    const page = parseInt(searchParams.page || '1');
    const category = searchParams.category;
    const search = searchParams.search;

    const perPage = 10;

    const where = {
        ...(category && { category }),
        ...(search && {
            name: { contains: search, mode: 'insensitive' as const },
        }),
    };

    const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
            where,
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    return (
        <div className='space-y-6'>
            {/* Header with Add Button */}
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-3xl font-bold text-secondary-900'>
                        Products
                    </h1>
                    <p className='text-secondary-600 mt-2'>
                        Manage your product catalog
                    </p>
                </div>
                <Link
                    href='/admin/products/new'
                    className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors'
                >
                    <Plus className='w-5 h-5 mr-2' />
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className='bg-white rounded-xl shadow-md p-6 border-2 border-secondary-100'>
                <div className='grid md:grid-cols-2 gap-4'>
                    {/* Category Filter */}
                    <div>
                        <label className='block text-sm font-medium text-secondary-700 mb-2'>
                            Category
                        </label>
                        <select className='w-full px-4 py-2 rounded-lg border-2 border-secondary-200 focus:border-primary-500'>
                            <option value=''>All Categories</option>
                            <option value='Kitchen Set'>Kitchen Set</option>
                            <option value='Wardrobe'>Wardrobe</option>
                            <option value='TV Cabinet'>TV Cabinet</option>
                            <option value='Custom'>Custom</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label className='block text-sm font-medium text-secondary-700 mb-2'>
                            Search
                        </label>
                        <input
                            type='text'
                            placeholder='Search products...'
                            className='w-full px-4 py-2 rounded-lg border-2 border-secondary-200 focus:border-primary-500'
                        />
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className='bg-white rounded-xl shadow-md border-2 border-secondary-100 overflow-hidden'>
                <table className='w-full'>
                    <thead className='bg-secondary-50 border-b-2 border-secondary-100'>
                        <tr>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-secondary-700'>
                                Image
                            </th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-secondary-700'>
                                Name
                            </th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-secondary-700'>
                                Category
                            </th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-secondary-700'>
                                Price
                            </th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-secondary-700'>
                                Featured
                            </th>
                            <th className='px-6 py-4 text-right text-sm font-semibold text-secondary-700'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className='border-b border-secondary-100 hover:bg-secondary-50'
                            >
                                <td className='px-6 py-4'>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={64}
                                        height={64}
                                        className='rounded-lg object-cover'
                                    />
                                </td>
                                <td className='px-6 py-4 font-medium text-secondary-900'>
                                    {product.name}
                                </td>
                                <td className='px-6 py-4 text-secondary-600'>
                                    {product.category}
                                </td>
                                <td className='px-6 py-4 text-secondary-900'>
                                    Rp {product.price.toLocaleString('id-ID')}
                                </td>
                                <td className='px-6 py-4'>
                                    {product.isFeatured ? (
                                        <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold'>
                                            Yes
                                        </span>
                                    ) : (
                                        <span className='bg-secondary-100 text-secondary-600 px-3 py-1 rounded-full text-xs font-semibold'>
                                            No
                                        </span>
                                    )}
                                </td>
                                <td className='px-6 py-4 text-right space-x-2'>
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className='inline-flex items-center text-blue-600 hover:text-blue-700'
                                    >
                                        <Edit className='w-4 h-4' />
                                    </Link>
                                    <DeleteButton productId={product.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
}
```

#### 5.3.2 Create/Edit Product Form

**Form Fields**:

-   Name (text, required)
-   Category (select, required)
-   Description (textarea, required)
-   Price (number, required)
-   Image (file upload, required)
-   Featured (checkbox)

**Validation Schema**:

```typescript
const productSchema = z.object({
    name: z.string().min(3, 'Name minimal 3 karakter'),
    category: z.enum(['Kitchen Set', 'Wardrobe', 'TV Cabinet', 'Custom']),
    description: z.string().min(20, 'Description minimal 20 karakter'),
    price: z.number().min(1, 'Price harus lebih dari 0'),
    isFeatured: z.boolean(),
});
```

**Form Component**:

```typescript
'use client';

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(product?.image || '');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: product || {
            isFeatured: false,
        },
    });

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to /api/upload
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setImagePreview(data.url);
        setValue('image', data.url);
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);

        try {
            const url = product
                ? `/api/products/${product.id}`
                : '/api/products';
            const method = product ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(
                    product ? 'Product updated!' : 'Product created!'
                );
                router.push('/admin/products');
                router.refresh();
            }
        } catch (error) {
            toast.error('Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Name */}
            <Input
                label='Product Name'
                placeholder='e.g., Modern Kitchen Set'
                error={errors.name?.message}
                {...register('name')}
            />

            {/* Category */}
            <div>
                <label className='block text-sm font-medium text-secondary-700 mb-2'>
                    Category
                </label>
                <select
                    {...register('category')}
                    className='w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500'
                >
                    <option value='Kitchen Set'>Kitchen Set</option>
                    <option value='Wardrobe'>Wardrobe</option>
                    <option value='TV Cabinet'>TV Cabinet</option>
                    <option value='Custom'>Custom</option>
                </select>
                {errors.category && (
                    <p className='text-red-600 text-sm mt-1'>
                        {errors.category.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <Textarea
                label='Description'
                placeholder='Describe the product...'
                rows={5}
                error={errors.description?.message}
                {...register('description')}
            />

            {/* Price */}
            <Input
                label='Price (IDR)'
                type='number'
                placeholder='5000000'
                error={errors.price?.message}
                {...register('price', { valueAsNumber: true })}
            />

            {/* Image Upload */}
            <div>
                <label className='block text-sm font-medium text-secondary-700 mb-2'>
                    Product Image
                </label>
                {imagePreview && (
                    <Image
                        src={imagePreview}
                        alt='Preview'
                        width={200}
                        height={200}
                        className='rounded-lg mb-4'
                    />
                )}
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='block w-full text-sm text-secondary-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100'
                />
            </div>

            {/* Featured Checkbox */}
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    id='isFeatured'
                    {...register('isFeatured')}
                    className='w-5 h-5 rounded border-2 border-secondary-300 text-primary-600 focus:ring-primary-500'
                />
                <label htmlFor='isFeatured' className='ml-2 text-secondary-700'>
                    Feature this product on homepage
                </label>
            </div>

            {/* Submit Buttons */}
            <div className='flex gap-4'>
                <Button type='submit' variant='primary' disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Saving...'
                        : product
                        ? 'Update Product'
                        : 'Create Product'}
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
```

#### 5.3.3 Delete Product

**Client Component**:

```typescript
'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ productId }: { productId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Product deleted successfully');
                router.refresh();
            }
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    return (
        <button
            onClick={handleDelete}
            className='inline-flex items-center text-red-600 hover:text-red-700'
        >
            <Trash2 className='w-4 h-4' />
        </button>
    );
}
```

---

### 5.4 PROJECTS MANAGEMENT

**URL**: `http://localhost:3008/admin/projects`  
**Similar structure to Products**

#### 5.4.1 Project Schema

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  image       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 5.4.2 Category Options

-   Kitchen
-   Living Room
-   Bedroom
-   Office
-   Custom

**Implementation follows same pattern as Products with:**

-   List view with filters
-   Create/Edit form
-   Image upload
-   Delete functionality

---

### 5.5 TESTIMONIALS MANAGEMENT

**URL**: `http://localhost:3008/admin/testimonials`

#### 5.5.1 Testimonial Schema

```prisma
model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String
  content   String
  rating    Int
  image     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 5.5.2 Form Fields

-   Customer Name (text, required)
-   Role/Company (text, required)
-   Testimonial Content (textarea, required, min 20 chars)
-   Rating (number, 1-5, required)
-   Customer Photo (file upload, optional)

#### 5.5.3 Rating Input

```typescript
<div>
    <label className='block text-sm font-medium text-secondary-700 mb-2'>
        Rating
    </label>
    <div className='flex gap-2'>
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type='button'
                onClick={() => setValue('rating', star)}
                className={`text-3xl ${
                    star <= rating ? 'text-yellow-400' : 'text-secondary-300'
                }`}
            >
                ★
            </button>
        ))}
    </div>
</div>
```

---

### 5.6 INQUIRIES MANAGEMENT

**URL**: `http://localhost:3008/admin/inquiries`

#### 5.6.1 Inquiry Schema

```prisma
model Inquiry {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  subject     String
  message     String
  projectType String?
  status      String   @default("new") // new, in-progress, completed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 5.6.2 Inquiries List

**Features**:

-   Status badges (new, in-progress, completed)
-   Filter by status
-   Mark as read
-   Change status
-   Delete inquiry
-   View full details

**Status Badges**:

```typescript
const statusColors = {
    new: 'bg-orange-100 text-orange-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
};

<span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[inquiry.status]
    }`}
>
    {inquiry.status}
</span>;
```

#### 5.6.3 Inquiry Detail Modal

**Show full information**:

```typescript
<Modal isOpen={isOpen} onClose={onClose}>
    <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-secondary-900'>
            Inquiry Details
        </h2>

        <div className='grid grid-cols-2 gap-4'>
            <div>
                <label className='text-sm text-secondary-600'>Name</label>
                <p className='font-semibold'>{inquiry.name}</p>
            </div>

            <div>
                <label className='text-sm text-secondary-600'>Email</label>
                <p className='font-semibold'>{inquiry.email}</p>
            </div>

            <div>
                <label className='text-sm text-secondary-600'>Phone</label>
                <p className='font-semibold'>{inquiry.phone}</p>
            </div>

            <div>
                <label className='text-sm text-secondary-600'>
                    Project Type
                </label>
                <p className='font-semibold'>
                    {inquiry.projectType || 'Not specified'}
                </p>
            </div>
        </div>

        <div>
            <label className='text-sm text-secondary-600'>Subject</label>
            <p className='font-semibold'>{inquiry.subject}</p>
        </div>

        <div>
            <label className='text-sm text-secondary-600'>Message</label>
            <p className='text-secondary-700 whitespace-pre-wrap'>
                {inquiry.message}
            </p>
        </div>

        <div>
            <label className='text-sm text-secondary-600 mb-2 block'>
                Status
            </label>
            <select
                value={inquiry.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className='px-4 py-2 rounded-lg border-2 border-secondary-200'
            >
                <option value='new'>New</option>
                <option value='in-progress'>In Progress</option>
                <option value='completed'>Completed</option>
            </select>
        </div>

        <div className='flex gap-4'>
            <Button onClick={handleReply}>Reply via Email</Button>
            <Button variant='outline' onClick={onClose}>
                Close
            </Button>
        </div>
    </div>
</Modal>
```

---

**Lanjut ke Part 4 untuk Technical Features →**

---

**Document Information**:

-   **Part**: 3 of 5
-   **Version**: 1.0
-   **Last Updated**: December 7, 2025
