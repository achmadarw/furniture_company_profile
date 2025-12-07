'use client';

import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-secondary-900 text-white'>
            <div className='container-custom py-12 md:py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div>
                        <div className='flex items-center space-x-2 mb-4'>
                            <div className='w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center'>
                                <span className='text-white font-bold text-xl'>
                                    PK
                                </span>
                            </div>
                            <span className='font-bold text-xl'>
                                Premium Kitchen
                            </span>
                        </div>
                        <p className='text-secondary-300 mb-4'>
                            Spesialis pembuatan kitchen set, lemari, dan
                            furniture custom berkualitas tinggi dengan desain
                            modern dan material premium.
                        </p>
                        <div className='flex space-x-4'>
                            <a
                                href='#'
                                className='text-secondary-400 hover:text-primary-500 transition-colors'
                            >
                                <Facebook className='w-5 h-5' />
                            </a>
                            <a
                                href='#'
                                className='text-secondary-400 hover:text-primary-500 transition-colors'
                            >
                                <Instagram className='w-5 h-5' />
                            </a>
                            <a
                                href='#'
                                className='text-secondary-400 hover:text-primary-500 transition-colors'
                            >
                                <Youtube className='w-5 h-5' />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Link Cepat</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/'
                                    className='text-secondary-300 hover:text-primary-500 transition-colors'
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/products'
                                    className='text-secondary-300 hover:text-primary-500 transition-colors'
                                >
                                    Produk
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/gallery'
                                    className='text-secondary-300 hover:text-primary-500 transition-colors'
                                >
                                    Galeri
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/about'
                                    className='text-secondary-300 hover:text-primary-500 transition-colors'
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='text-secondary-300 hover:text-primary-500 transition-colors'
                                >
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Layanan</h3>
                        <ul className='space-y-2'>
                            <li className='text-secondary-300'>
                                Kitchen Set Custom
                            </li>
                            <li className='text-secondary-300'>
                                Lemari & Wardrobe
                            </li>
                            <li className='text-secondary-300'>TV Cabinet</li>
                            <li className='text-secondary-300'>
                                Display Cabinet
                            </li>
                            <li className='text-secondary-300'>
                                Konsultasi Gratis
                            </li>
                            <li className='text-secondary-300'>Desain 3D</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Hubungi Kami</h3>
                        <ul className='space-y-3'>
                            <li className='flex items-start space-x-3'>
                                <MapPin className='w-5 h-5 text-primary-500 flex-shrink-0 mt-1' />
                                <span className='text-secondary-300'>
                                    Jl. Furniture Raya No. 123
                                    <br />
                                    Jakarta Selatan, 12345
                                </span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Phone className='w-5 h-5 text-primary-500' />
                                <a
                                    href='tel:+6281234567890'
                                    className='text-secondary-300 hover:text-primary-500'
                                >
                                    +62 812-3456-7890
                                </a>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Mail className='w-5 h-5 text-primary-500' />
                                <a
                                    href='mailto:info@premiumkitchen.com'
                                    className='text-secondary-300 hover:text-primary-500'
                                >
                                    info@premiumkitchen.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-secondary-800 mt-12 pt-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='text-secondary-400 text-sm'>
                            &copy; {currentYear} Premium Kitchen Set. All rights
                            reserved.
                        </p>
                        <div className='flex space-x-6 mt-4 md:mt-0'>
                            <Link
                                href='/privacy'
                                className='text-secondary-400 hover:text-primary-500 text-sm'
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href='/terms'
                                className='text-secondary-400 hover:text-primary-500 text-sm'
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
