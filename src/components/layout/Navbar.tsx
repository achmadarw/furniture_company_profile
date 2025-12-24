'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Produk', href: '/products' },
    { name: 'Galeri', href: '/gallery' },
    { name: 'Layanan', href: '/services' },
    { name: 'Customizer', href: '/customizer' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Check if current page is homepage
    const isHomepage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine navbar background and text colors
    const isTransparent = isHomepage && !isScrolled;
    const navbarBg = isTransparent ? 'bg-transparent' : 'bg-white shadow-md';
    const textColor = isTransparent ? 'text-white' : 'text-secondary-700';
    const logoTextColor = isTransparent ? 'text-white' : 'text-secondary-900';

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${navbarBg} ${
                isTransparent ? 'py-6' : 'py-4'
            }`}
        >
            <div className='container-custom'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center space-x-2'>
                        <div className='w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center'>
                            <span className='text-white font-bold text-xl'>
                                PK
                            </span>
                        </div>
                        <span className={`font-bold text-xl ${logoTextColor}`}>
                            Premium Kitchen
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center space-x-8'>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`font-medium transition-colors hover:text-primary-600 ${textColor}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className='hidden lg:flex items-center space-x-4'>
                        <a
                            href='tel:+6281234567890'
                            className={`flex items-center space-x-2 hover:text-primary-600 transition-colors ${textColor}`}
                        >
                            <Phone className='w-4 h-4' />
                            <span>+62 812-3456-7890</span>
                        </a>
                        <Button variant='primary' size='sm'>
                            Konsultasi Gratis
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='lg:hidden p-2'
                    >
                        {isOpen ? (
                            <X className={`w-6 h-6 ${logoTextColor}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${logoTextColor}`} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className='lg:hidden mt-4'
                        >
                            <div className='bg-white rounded-lg shadow-lg p-6 space-y-4'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className='block text-secondary-700 hover:text-primary-600 font-medium'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className='pt-4 border-t border-secondary-200 space-y-3'>
                                    <a
                                        href='tel:+6281234567890'
                                        className='flex items-center space-x-2 text-secondary-700'
                                    >
                                        <Phone className='w-4 h-4' />
                                        <span>+62 812-3456-7890</span>
                                    </a>
                                    <Button
                                        variant='primary'
                                        className='w-full'
                                    >
                                        Konsultasi Gratis
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
