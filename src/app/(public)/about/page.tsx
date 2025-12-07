'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Award, Target, Heart } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Fokus pada Kualitas',
        description:
            'Kami berkomitmen menggunakan material terbaik dan pengerjaan presisi untuk hasil maksimal',
    },
    {
        icon: Users,
        title: 'Customer First',
        description:
            'Kepuasan klien adalah prioritas utama. Kami mendengarkan dan mewujudkan impian Anda',
    },
    {
        icon: Award,
        title: 'Profesionalisme',
        description:
            'Tim berpengalaman 15+ tahun dengan sertifikasi dan skill tingkat profesional',
    },
    {
        icon: Heart,
        title: 'Passion & Dedikasi',
        description:
            'Setiap proyek dikerjakan dengan penuh passion dan perhatian terhadap detail',
    },
];

const team = [
    {
        name: 'Budi Santoso',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    {
        name: 'Maya Kusuma',
        role: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    },
    {
        name: 'Andi Wijaya',
        role: 'Production Manager',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    },
    {
        name: 'Siti Rahayu',
        role: 'Customer Relations',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    },
];

export default function AboutPage() {
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
                            Tentang Kami
                        </h1>
                        <p className='text-xl text-white/90'>
                            Lebih dari 15 tahun menghadirkan furniture
                            berkualitas untuk rumah impian Anda
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    <div className='grid lg:grid-cols-2 gap-12 items-center'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className='heading-2 mb-6'>Perjalanan Kami</h2>
                            <div className='space-y-4 text-secondary-600 leading-relaxed'>
                                <p>
                                    Premium Kitchen Set dimulai dari passion
                                    sederhana: menciptakan furniture berkualitas
                                    tinggi yang terjangkau untuk keluarga
                                    Indonesia. Sejak tahun 2008, kami telah
                                    melayani ratusan klien dengan dedikasi
                                    penuh.
                                </p>
                                <p>
                                    Dengan tim profesional yang berpengalaman
                                    lebih dari 15 tahun, kami terus berinovasi
                                    menghadirkan desain modern, material
                                    premium, dan teknologi terkini dalam setiap
                                    proyek.
                                </p>
                                <p>
                                    Kepercayaan klien adalah aset terbesar kami.
                                    Setiap furniture yang kami buat adalah
                                    komitmen kami untuk menghadirkan kualitas
                                    terbaik dan kepuasan maksimal.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className='relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl'
                        >
                            <Image
                                src='https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068'
                                alt='Our Workshop'
                                fill
                                className='object-cover'
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='section-padding bg-secondary-50'>
                <div className='container-custom'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-center max-w-3xl mx-auto mb-16'
                    >
                        <h2 className='heading-2 mb-4'>Nilai-Nilai Kami</h2>
                        <p className='text-lg text-secondary-600'>
                            Prinsip yang kami pegang teguh dalam setiap proyek
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center'
                            >
                                <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
                                    <value.icon className='w-8 h-8 text-primary-600' />
                                </div>
                                <h3 className='text-xl font-bold text-secondary-900 mb-3'>
                                    {value.title}
                                </h3>
                                <p className='text-secondary-600'>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-center max-w-3xl mx-auto mb-16'
                    >
                        <h2 className='heading-2 mb-4'>Tim Kami</h2>
                        <p className='text-lg text-secondary-600'>
                            Profesional berpengalaman yang siap mewujudkan
                            impian Anda
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className='text-center group'
                            >
                                <div className='relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow'>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <h3 className='text-xl font-bold text-secondary-900 mb-1'>
                                    {member.name}
                                </h3>
                                <p className='text-primary-600 font-semibold'>
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='section-padding bg-primary-600 text-white'>
                <div className='container-custom'>
                    <div className='grid md:grid-cols-4 gap-8 text-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className='text-5xl font-bold mb-2'>15+</h3>
                            <p className='text-white/90'>Tahun Pengalaman</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className='text-5xl font-bold mb-2'>500+</h3>
                            <p className='text-white/90'>Proyek Selesai</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className='text-5xl font-bold mb-2'>98%</h3>
                            <p className='text-white/90'>Tingkat Kepuasan</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className='text-5xl font-bold mb-2'>5 Tahun</h3>
                            <p className='text-white/90'>Garansi</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
