'use client';

import { motion } from 'framer-motion';
import {
    Sparkles,
    Ruler,
    Palette,
    Headphones,
    Wrench,
    CheckCircle,
} from 'lucide-react';

const features = [
    {
        icon: Sparkles,
        title: 'Desain Custom',
        description:
            'Sesuaikan dengan kebutuhan dan style Anda. Tim desainer kami siap mewujudkan impian dapur Anda.',
    },
    {
        icon: Ruler,
        title: 'Presisi Sempurna',
        description:
            'Pengukuran akurat dan detail untuk hasil maksimal. Setiap centimeter diperhatikan dengan teliti.',
    },
    {
        icon: Palette,
        title: 'Material Premium',
        description:
            'Pilihan material berkualitas tinggi dari brand ternama. HPL, duco, kayu solid, dan lainnya.',
    },
    {
        icon: Headphones,
        title: 'Konsultasi Gratis',
        description:
            'Diskusikan ide Anda dengan ahli kami tanpa biaya. Kami siap membantu dari awal hingga akhir.',
    },
    {
        icon: Wrench,
        title: 'Instalasi Profesional',
        description:
            'Tim teknisi berpengalaman memastikan instalasi sempurna. Rapi, cepat, dan aman.',
    },
    {
        icon: CheckCircle,
        title: 'Garansi 5 Tahun',
        description:
            'Jaminan kualitas untuk ketenangan Anda. After-sales service yang responsif.',
    },
];

export default function Features() {
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
                    <h2 className='heading-2 mb-4'>Mengapa Memilih Kami?</h2>
                    <p className='text-lg text-secondary-600'>
                        Kami berkomitmen memberikan solusi furniture terbaik
                        dengan kualitas premium, desain modern, dan layanan
                        profesional.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className='group'
                        >
                            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-secondary-100 hover:border-primary-200 h-full'>
                                <div className='inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-lg mb-4 group-hover:bg-primary-600 transition-colors'>
                                    <feature.icon className='w-7 h-7 text-primary-600 group-hover:text-white transition-colors' />
                                </div>
                                <h3 className='text-xl font-bold text-secondary-900 mb-3'>
                                    {feature.title}
                                </h3>
                                <p className='text-secondary-600 leading-relaxed'>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
