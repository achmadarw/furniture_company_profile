'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const projects = [
    {
        id: '1',
        title: 'Modern Minimalist Kitchen',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        description:
            'Kitchen set modern dengan finishing HPL motif kayu, dilengkapi island counter',
    },
    {
        id: '2',
        title: 'Scandinavian Wardrobe',
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        description:
            'Lemari pakaian dengan desain Skandinavia, pintu sliding dengan cermin',
    },
    {
        id: '3',
        title: 'Contemporary TV Unit',
        category: 'TV Cabinet',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
        description:
            'TV cabinet kontemporer dengan rak display dan storage tersembunyi',
    },
    {
        id: '4',
        title: 'Classic Kitchen Design',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
        description:
            'Kitchen set klasik elegan dengan finishing duco warna putih',
    },
    {
        id: '5',
        title: 'Industrial Style Kitchen',
        category: 'Kitchen Set',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070',
        description: 'Konsep industrial dengan kombinasi kayu dan metal',
    },
    {
        id: '6',
        title: 'Luxury Walk-in Closet',
        category: 'Wardrobe',
        image: 'https://images.unsplash.com/photo-1558618666-d7d59f149b12?q=80&w=2069',
        description:
            'Walk-in closet mewah dengan sistem lighting dan drawer organizer',
    },
];

export default function FeaturedProjects() {
    return (
        <section className='section-padding bg-white'>
            <div className='container-custom'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center max-w-3xl mx-auto mb-16'
                >
                    <h2 className='heading-2 mb-4'>Proyek Unggulan</h2>
                    <p className='text-lg text-secondary-600'>
                        Lihat hasil karya terbaik kami yang telah mewujudkan
                        impian klien
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                image={project.image}
                                title={project.title}
                                category={project.category}
                                description={project.description}
                                onClick={() => {}}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className='text-center'>
                    <Link href='/gallery'>
                        <Button variant='outline' size='lg'>
                            Lihat Semua Proyek
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
