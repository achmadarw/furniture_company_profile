'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        title: 'Kitchen Set',
        description: 'Dapur modern dan fungsional sesuai kebutuhan Anda',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        href: '/products/kitchen-set',
    },
    {
        title: 'Wardrobe & Lemari',
        description: 'Solusi penyimpanan elegan untuk ruang tidur',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        href: '/products/wardrobe',
    },
    {
        title: 'TV Cabinet',
        description: 'Meja TV stylish untuk ruang keluarga',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
        href: '/products/tv-cabinet',
    },
    {
        title: 'Display Cabinet',
        description: 'Lemari display untuk koleksi favorit Anda',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
        href: '/products/display-cabinet',
    },
];

export default function ProductCategories() {
    return (
        <section className='section-padding bg-secondary-50'>
            <div className='container-custom'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center max-w-3xl mx-auto mb-16'
                >
                    <h2 className='heading-2 mb-4'>Kategori Produk</h2>
                    <p className='text-lg text-secondary-600'>
                        Berbagai pilihan furniture berkualitas untuk memenuhi
                        kebutuhan rumah Anda
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={category.href}>
                                <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80'>
                                    {/* Image */}
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                                    />

                                    {/* Overlay */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                                    {/* Content */}
                                    <div className='absolute inset-0 p-6 flex flex-col justify-end'>
                                        <h3 className='text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform'>
                                            {category.title}
                                        </h3>
                                        <p className='text-white/90 text-sm mb-4 transform group-hover:translate-y-0 translate-y-2 transition-transform'>
                                            {category.description}
                                        </p>
                                        <div className='flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors'>
                                            <span className='mr-2'>
                                                Lihat Detail
                                            </span>
                                            <ArrowRight className='w-5 h-5 transform group-hover:translate-x-2 transition-transform' />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
