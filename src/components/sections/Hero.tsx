'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            {/* Background Image */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src='https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068'
                    alt='Modern Kitchen'
                    fill
                    className='object-cover'
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/50' />
            </div>

            {/* Content */}
            <div className='container-custom relative z-10 pt-20'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className='heading-1 text-white mb-6'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Wujudkan Dapur{' '}
                            <span className='text-gradient'>Impian</span> Anda
                        </motion.h1>

                        <motion.p
                            className='text-xl text-gray-200 mb-8 leading-relaxed'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Spesialis pembuatan kitchen set, lemari, dan
                            furniture custom berkualitas tinggi. Desain modern,
                            material premium, dan pengerjaan profesional.
                        </motion.p>

                        <motion.div
                            className='flex flex-col sm:flex-row gap-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button
                                variant='primary'
                                size='lg'
                                className='group'
                            >
                                Konsultasi Gratis
                                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                            </Button>
                            <Button
                                variant='outline'
                                size='lg'
                                className='bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-secondary-900'
                            >
                                <Play className='mr-2 w-5 h-5' />
                                Lihat Portfolio
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className='grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div>
                                <h3 className='text-4xl font-bold text-white mb-1'>
                                    15+
                                </h3>
                                <p className='text-gray-300 text-sm'>
                                    Tahun Pengalaman
                                </p>
                            </div>
                            <div>
                                <h3 className='text-4xl font-bold text-white mb-1'>
                                    500+
                                </h3>
                                <p className='text-gray-300 text-sm'>
                                    Proyek Selesai
                                </p>
                            </div>
                            <div>
                                <h3 className='text-4xl font-bold text-white mb-1'>
                                    98%
                                </h3>
                                <p className='text-gray-300 text-sm'>
                                    Kepuasan Klien
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Floating Card */}
                    <motion.div
                        className='hidden lg:block'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
                            <h3 className='text-2xl font-bold text-white mb-4'>
                                Dapatkan Penawaran Spesial!
                            </h3>
                            <ul className='space-y-3 text-white mb-6'>
                                <li className='flex items-center'>
                                    <svg
                                        className='w-5 h-5 mr-3 text-primary-400'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    Konsultasi & Desain 3D Gratis
                                </li>
                                <li className='flex items-center'>
                                    <svg
                                        className='w-5 h-5 mr-3 text-primary-400'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    Garansi 5 Tahun
                                </li>
                                <li className='flex items-center'>
                                    <svg
                                        className='w-5 h-5 mr-3 text-primary-400'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    Cicilan 0% Tersedia
                                </li>
                            </ul>
                            <Button variant='primary' className='w-full'>
                                Hubungi Sekarang
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2'>
                    <div className='w-1 h-3 bg-white/50 rounded-full' />
                </div>
            </motion.div>
        </section>
    );
}
