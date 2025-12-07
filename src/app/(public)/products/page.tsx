'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const categories = [
    'Semua',
    'Kitchen Set',
    'Wardrobe',
    'TV Cabinet',
    'Display Cabinet',
    'Custom',
];

const products = [
    {
        id: '1',
        title: 'Modern Kitchen Set - Minimalis',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        description:
            'Kitchen set minimalis dengan HPL motif kayu oak, island counter, dan top table granit',
    },
    {
        id: '2',
        title: 'Classic White Kitchen',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
        description:
            'Desain klasik dengan finishing duco putih, hardware premium',
    },
    {
        id: '3',
        title: 'Walk-in Wardrobe Premium',
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        description:
            'Walk-in closet mewah dengan sistem LED lighting dan drawer organizer',
    },
    {
        id: '4',
        title: 'Sliding Door Wardrobe',
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-d7d59f149b12?q=80&w=2069',
        description: 'Lemari pintu sliding dengan cermin, hemat space',
    },
    {
        id: '5',
        title: 'Contemporary TV Cabinet',
        category: 'TV Cabinet',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
        description: 'TV cabinet modern dengan rak display dan hidden storage',
    },
    {
        id: '6',
        title: 'Floating TV Unit',
        category: 'TV Cabinet',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070',
        description: 'Desain floating minimalis dengan LED backlight',
    },
    {
        id: '7',
        title: 'Glass Display Cabinet',
        category: 'Display Cabinet',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069',
        description: 'Lemari display dengan kaca tempered dan LED',
    },
    {
        id: '8',
        title: 'Industrial Kitchen',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070',
        description: 'Konsep industrial dengan kombinasi kayu dan metal',
    },
];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredProducts =
        activeCategory === 'Semua'
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <div className='min-h-screen pt-24 pb-16'>
            {/* Hero Section */}
            <section className='bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16'>
                <div className='container-custom'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='max-w-3xl'
                    >
                        <h1 className='heading-1 text-white mb-4'>
                            Katalog Produk
                        </h1>
                        <p className='text-xl text-white/90'>
                            Temukan furniture berkualitas tinggi sesuai
                            kebutuhan Anda. Semua produk dapat dikustomisasi
                            sesuai keinginan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    {/* Category Filter */}
                    <div className='flex flex-wrap gap-4 mb-12 justify-center'>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={
                                    activeCategory === category
                                        ? 'primary'
                                        : 'outline'
                                }
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <ProductCard {...product} onClick={() => {}} />
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className='text-center py-12'>
                            <p className='text-secondary-600'>
                                Tidak ada produk dalam kategori ini.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className='bg-secondary-50 py-16'>
                <div className='container-custom text-center'>
                    <h2 className='heading-3 mb-4'>
                        Tidak Menemukan yang Anda Cari?
                    </h2>
                    <p className='text-lg text-secondary-600 mb-6'>
                        Kami menerima custom order sesuai kebutuhan dan desain
                        Anda
                    </p>
                    <Button variant='primary' size='lg'>
                        Konsultasi Custom Design
                    </Button>
                </div>
            </section>
        </div>
    );
}
