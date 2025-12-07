'use client';

import { motion } from 'framer-motion';
import {
    Sparkles,
    Ruler,
    Hammer,
    Shield,
    Palette,
    Headphones,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const services = [
    {
        icon: Sparkles,
        title: 'Custom Design',
        description:
            'Desain furniture sesuai kebutuhan dan preferensi Anda. Tim desainer kami siap mewujudkan ide kreatif Anda menjadi kenyataan.',
        features: [
            'Konsultasi desain gratis',
            'Visualisasi 3D',
            'Unlimited revisi',
            'Rekomendasi material terbaik',
        ],
    },
    {
        icon: Ruler,
        title: 'Survey & Measurement',
        description:
            'Survey lokasi dan pengukuran detail untuk memastikan furniture pas sempurna dengan ruangan Anda.',
        features: [
            'Survey lokasi gratis',
            'Pengukuran presisi',
            'Analisis ruang',
            'Saran optimalisasi',
        ],
    },
    {
        icon: Hammer,
        title: 'Custom Production',
        description:
            'Produksi furniture berkualitas tinggi dengan kontrol kualitas ketat di setiap tahapan.',
        features: [
            'Material premium',
            'Craftmanship berkualitas',
            'Quality control ketat',
            'Progress update rutin',
        ],
    },
    {
        icon: Palette,
        title: 'Finishing Options',
        description:
            'Berbagai pilihan finishing untuk menciptakan tampilan sesuai selera Anda.',
        features: [
            'HPL (High Pressure Laminate)',
            'Duco (Cat premium)',
            'PVC (Polyvinyl Chloride)',
            'Natural wood finish',
        ],
    },
    {
        icon: Shield,
        title: 'Installation Service',
        description:
            'Instalasi profesional oleh tim berpengalaman dengan hasil rapi dan sempurna.',
        features: [
            'Instalasi oleh expert',
            'Garansi instalasi',
            'Pembersihan lokasi',
            'Training penggunaan',
        ],
    },
    {
        icon: Headphones,
        title: 'After Sales Support',
        description:
            'Layanan purna jual yang responsif untuk menjaga furniture Anda tetap prima.',
        features: [
            'Garansi 5 tahun',
            'Maintenance service',
            'Spare parts tersedia',
            'Customer support 24/7',
        ],
    },
];

const packages = [
    {
        name: 'Basic',
        price: 'Mulai 5jt',
        description: 'Cocok untuk project sederhana',
        features: [
            'Kitchen set 1-2 meter',
            'Material HPL standard',
            'Desain basic',
            'Garansi 2 tahun',
            'Free konsultasi',
        ],
    },
    {
        name: 'Premium',
        price: 'Mulai 15jt',
        description: 'Pilihan paling populer',
        features: [
            'Kitchen set 3-4 meter',
            'Material HPL premium',
            'Desain custom 3D',
            'Garansi 5 tahun',
            'Free survey & instalasi',
            'Hardware berkualitas',
        ],
        popular: true,
    },
    {
        name: 'Luxury',
        price: 'Custom',
        description: 'Untuk project premium',
        features: [
            'Unlimited size',
            'Material premium (kayu solid)',
            'Full custom design',
            'Garansi lifetime',
            'Project manager dedicated',
            'Hardware imported',
        ],
    },
];

export default function ServicesPage() {
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
                            Layanan Kami
                        </h1>
                        <p className='text-xl text-white/90'>
                            Solusi lengkap untuk kebutuhan furniture custom
                            Anda, dari desain hingga instalasi
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-center max-w-3xl mx-auto mb-16'
                    >
                        <h2 className='heading-2 mb-4'>
                            Apa yang Kami Tawarkan
                        </h2>
                        <p className='text-lg text-secondary-600'>
                            Layanan komprehensif untuk memastikan furniture
                            impian Anda terwujud dengan sempurna
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className='bg-white border-2 border-secondary-100 rounded-xl p-6 hover:border-primary-200 hover:shadow-xl transition-all'
                            >
                                <div className='inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-lg mb-4'>
                                    <service.icon className='w-7 h-7 text-primary-600' />
                                </div>
                                <h3 className='text-xl font-bold text-secondary-900 mb-3'>
                                    {service.title}
                                </h3>
                                <p className='text-secondary-600 mb-4'>
                                    {service.description}
                                </p>
                                <ul className='space-y-2'>
                                    {service.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className='flex items-center text-sm text-secondary-700'
                                        >
                                            <svg
                                                className='w-5 h-5 mr-2 text-primary-600'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className='section-padding bg-secondary-50'>
                <div className='container-custom'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-center max-w-3xl mx-auto mb-16'
                    >
                        <h2 className='heading-2 mb-4'>Paket Layanan</h2>
                        <p className='text-lg text-secondary-600'>
                            Pilih paket yang sesuai dengan kebutuhan dan budget
                            Anda
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-xl p-8 ${
                                    pkg.popular
                                        ? 'border-2 border-primary-600 shadow-2xl transform scale-105'
                                        : 'border border-secondary-200 shadow-lg'
                                }`}
                            >
                                {pkg.popular && (
                                    <div className='bg-primary-600 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4'>
                                        Paling Populer
                                    </div>
                                )}
                                <h3 className='text-2xl font-bold text-secondary-900 mb-2'>
                                    {pkg.name}
                                </h3>
                                <p className='text-3xl font-bold text-primary-600 mb-2'>
                                    {pkg.price}
                                </p>
                                <p className='text-secondary-600 mb-6'>
                                    {pkg.description}
                                </p>
                                <ul className='space-y-3 mb-8'>
                                    {pkg.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className='flex items-start'
                                        >
                                            <svg
                                                className='w-5 h-5 mr-3 text-primary-600 flex-shrink-0 mt-0.5'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                    clipRule='evenodd'
                                                />
                                            </svg>
                                            <span className='text-secondary-700'>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={
                                        pkg.popular ? 'primary' : 'outline'
                                    }
                                    className='w-full'
                                >
                                    Pilih Paket
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <p className='text-center text-secondary-600 mt-8'>
                        *Harga dapat berubah tergantung kompleksitas desain dan
                        material yang dipilih
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='max-w-3xl mx-auto'
                    >
                        <h2 className='heading-2 mb-4'>
                            Siap Memulai Proyek Anda?
                        </h2>
                        <p className='text-lg text-secondary-600 mb-8'>
                            Konsultasikan kebutuhan furniture Anda dengan tim
                            profesional kami. Gratis survey dan desain 3D!
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Link href='/contact'>
                                <Button variant='primary' size='lg'>
                                    Konsultasi Gratis
                                </Button>
                            </Link>
                            <Link href='/gallery'>
                                <Button variant='outline' size='lg'>
                                    Lihat Portfolio
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
