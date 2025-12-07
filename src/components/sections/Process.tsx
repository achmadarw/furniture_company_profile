'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Ruler, Hammer, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: 'Konsultasi',
        description:
            'Diskusikan kebutuhan, budget, dan preferensi desain Anda dengan tim kami',
        duration: '1-2 hari',
    },
    {
        icon: Ruler,
        title: 'Survey & Desain',
        description:
            'Tim kami akan survey lokasi dan membuat desain 3D sesuai keinginan Anda',
        duration: '3-5 hari',
    },
    {
        icon: Hammer,
        title: 'Produksi',
        description:
            'Pengerjaan di workshop dengan kontrol kualitas ketat dan update progress',
        duration: '2-4 minggu',
    },
    {
        icon: CheckCircle,
        title: 'Instalasi',
        description:
            'Pemasangan profesional di lokasi hingga sempurna dan siap digunakan',
        duration: '1-3 hari',
    },
];

export default function Process() {
    return (
        <section className='section-padding bg-gradient-to-br from-primary-50 to-secondary-50'>
            <div className='container-custom'>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center max-w-3xl mx-auto mb-16'
                >
                    <h2 className='heading-2 mb-4'>Proses Kerja Kami</h2>
                    <p className='text-lg text-secondary-600'>
                        Dari konsultasi hingga instalasi, kami memastikan setiap
                        tahap berjalan lancar
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
                    {/* Connection Lines (hidden on mobile) */}
                    <div className='hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200' />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className='relative'
                        >
                            <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10'>
                                {/* Step Number */}
                                <div className='absolute -top-4 -left-4 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg'>
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className='inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-lg mb-4'>
                                    <step.icon className='w-7 h-7 text-primary-600' />
                                </div>

                                {/* Content */}
                                <h3 className='text-xl font-bold text-secondary-900 mb-2'>
                                    {step.title}
                                </h3>
                                <p className='text-secondary-600 mb-4 leading-relaxed'>
                                    {step.description}
                                </p>
                                <div className='inline-flex items-center text-sm text-primary-600 font-semibold'>
                                    <svg
                                        className='w-4 h-4 mr-2'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                    {step.duration}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center mt-12'
                >
                    <p className='text-secondary-600 mb-4'>
                        Siap memulai proyek Anda?
                    </p>
                    <a
                        href='/contact'
                        className='inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'
                    >
                        Mulai Konsultasi Gratis
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
