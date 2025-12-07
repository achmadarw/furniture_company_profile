'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield } from 'lucide-react';

const stats = [
    {
        icon: Clock,
        value: '15+',
        label: 'Tahun Pengalaman',
        description: 'Melayani dengan dedikasi',
    },
    {
        icon: Users,
        value: '500+',
        label: 'Proyek Selesai',
        description: 'Kepercayaan klien terbukti',
    },
    {
        icon: Award,
        value: '98%',
        label: 'Tingkat Kepuasan',
        description: 'Review positif dari klien',
    },
    {
        icon: Shield,
        value: '5 Tahun',
        label: 'Garansi',
        description: 'Jaminan kualitas terbaik',
    },
];

export default function Stats() {
    return (
        <section className='section-padding bg-secondary-50'>
            <div className='container-custom'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className='text-center'
                        >
                            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
                                <stat.icon className='w-8 h-8 text-primary-600' />
                            </div>
                            <h3 className='text-4xl font-bold text-secondary-900 mb-2'>
                                {stat.value}
                            </h3>
                            <p className='text-lg font-semibold text-secondary-700 mb-1'>
                                {stat.label}
                            </p>
                            <p className='text-sm text-secondary-600'>
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
