'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Invalid email or password');
            } else {
                toast.success('Login successful!');
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 flex items-center justify-center px-4'>
            <div className='max-w-md w-full'>
                {/* Logo/Brand */}
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4'>
                        <Lock className='w-8 h-8 text-primary-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2'>
                        Admin Login
                    </h1>
                    <p className='text-gray-300'>
                        Premium Kitchen Set Dashboard
                    </p>
                </div>

                {/* Login Form */}
                <div className='bg-white rounded-2xl shadow-2xl p-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                                <input
                                    id='email'
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'
                                    placeholder='admin@example.com'
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                                <input
                                    id='password'
                                    type='password'
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'
                                    placeholder='••••••••'
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className='mt-6 pt-6 border-t border-gray-200'>
                        <p className='text-center text-sm text-gray-600'>
                            Demo Credentials:
                        </p>
                        <p className='text-center text-xs text-gray-500 mt-1'>
                            Email: <strong>admin@premiumkitchen.com</strong>
                            <br />
                            Password: <strong>admin123</strong>
                        </p>
                    </div>
                </div>

                {/* Back to Website */}
                <div className='text-center mt-6'>
                    <a
                        href='/'
                        className='text-white hover:text-gray-200 text-sm transition-colors'
                    >
                        ← Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
}
