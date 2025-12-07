'use client';

import { motion } from 'framer-motion';
import { TestimonialCard } from '@/components/ui/Card';

const testimonials = [
    {
        name: 'Ibu Sarah',
        role: 'Homeowner',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        rating: 5,
        comment:
            'Hasilnya luar biasa! Kitchen set impian saya terwujud dengan sempurna. Tim sangat profesional dan detail oriented. Highly recommended!',
    },
    {
        name: 'Bapak Andi',
        role: 'Property Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
        rating: 5,
        comment:
            'Sudah beberapa kali order untuk project apartemen. Kualitas konsisten, on-time, dan harga kompetitif. Partner terpercaya!',
    },
    {
        name: 'Ibu Maya',
        role: 'Interior Designer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
        rating: 5,
        comment:
            'Sebagai designer, saya sangat puas dengan execution yang presisi. Material premium dan finishing rapi. Klien saya juga sangat senang!',
    },
    {
        name: 'Bapak Rudi',
        role: 'Business Owner',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
        rating: 5,
        comment:
            'Walk-in closet yang dibuat benar-benar sesuai ekspektasi. Detail storage-nya sangat fungsional. Terima kasih untuk pelayanan terbaiknya!',
    },
];

export default function Testimonials() {
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
                    <h2 className='heading-2 mb-4'>Kata Mereka</h2>
                    <p className='text-lg text-secondary-600'>
                        Testimoni dari klien yang puas dengan hasil kerja kami
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <TestimonialCard {...testimonial} />
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='mt-16 pt-16 border-t border-secondary-200'
                >
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60'>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-secondary-900'>
                                4.9/5.0
                            </p>
                            <p className='text-sm text-secondary-600'>
                                Rating Google
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-secondary-900'>
                                500+
                            </p>
                            <p className='text-sm text-secondary-600'>
                                Happy Clients
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-secondary-900'>
                                98%
                            </p>
                            <p className='text-sm text-secondary-600'>
                                Repeat Order
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-secondary-900'>
                                5 Years
                            </p>
                            <p className='text-sm text-secondary-600'>
                                Warranty
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
