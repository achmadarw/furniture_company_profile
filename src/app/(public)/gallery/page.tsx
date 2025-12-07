'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

const categories = [
    'Semua',
    'Kitchen Set',
    'Wardrobe',
    'TV Cabinet',
    'Living Room',
];

const galleryItems = [
    {
        id: 1,
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        title: 'Modern Kitchen with Island',
        location: 'Jakarta Selatan',
    },
    {
        id: 2,
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
        title: 'Classic White Kitchen',
        location: 'Tangerang',
    },
    {
        id: 3,
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        title: 'Walk-in Closet',
        location: 'BSD',
    },
    {
        id: 4,
        category: 'TV Cabinet',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
        title: 'Contemporary TV Unit',
        location: 'Kemang',
    },
    {
        id: 5,
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070',
        title: 'Industrial Kitchen',
        location: 'Pondok Indah',
    },
    {
        id: 6,
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-d7d59f149b12?q=80&w=2069',
        title: 'Sliding Wardrobe',
        location: 'Kelapa Gading',
    },
    {
        id: 7,
        category: 'Living Room',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2069',
        title: 'Living Room Set',
        location: 'Senopati',
    },
    {
        id: 8,
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070',
        title: 'Luxury Kitchen',
        location: 'PIK',
    },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [selectedImage, setSelectedImage] = useState<
        (typeof galleryItems)[0] | null
    >(null);

    const filteredItems =
        activeCategory === 'Semua'
            ? galleryItems
            : galleryItems.filter((item) => item.category === activeCategory);

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
                            Galeri Proyek
                        </h1>
                        <p className='text-xl text-white/90'>
                            Lihat hasil karya terbaik kami yang telah mewujudkan
                            impian ratusan klien
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    {/* Category Filter */}
                    <div className='flex flex-wrap gap-4 mb-12 justify-center'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                                    activeCategory === category
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                                className='group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer'
                                onClick={() => setSelectedImage(item)}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                                        <h3 className='text-white font-bold text-lg mb-1'>
                                            {item.title}
                                        </h3>
                                        <p className='text-white/80 text-sm'>
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className='fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4'
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className='absolute top-4 right-4 text-white hover:text-primary-400 transition-colors'
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className='w-8 h-8' />
                    </button>
                    <div className='relative max-w-6xl w-full h-[80vh]'>
                        <Image
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            fill
                            className='object-contain'
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-6 text-white'>
                            <h3 className='text-2xl font-bold mb-2'>
                                {selectedImage.title}
                            </h3>
                            <p className='text-white/80'>
                                {selectedImage.location}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
