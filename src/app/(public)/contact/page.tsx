'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const contactSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon tidak valid'),
    subject: z.string().min(5, 'Subjek minimal 5 karakter'),
    message: z.string().min(10, 'Pesan minimal 10 karakter'),
    projectType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(
                    'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
                );
                reset();
            } else {
                toast.error('Gagal mengirim pesan. Silakan coba lagi.');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Hubungi Kami
                        </h1>
                        <p className='text-xl text-white/90'>
                            Siap membantu mewujudkan furniture impian Anda.
                            Konsultasi gratis!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className='section-padding bg-white'>
                <div className='container-custom'>
                    <div className='grid lg:grid-cols-2 gap-12'>
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className='heading-3 mb-6'>Informasi Kontak</h2>

                            <div className='space-y-6 mb-8'>
                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                                        <MapPin className='w-6 h-6 text-primary-600' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-secondary-900 mb-1'>
                                            Alamat
                                        </h3>
                                        <p className='text-secondary-600'>
                                            Jl. Furniture Raya No. 123
                                            <br />
                                            Jakarta Selatan, 12345
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                                        <Phone className='w-6 h-6 text-primary-600' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-secondary-900 mb-1'>
                                            Telepon
                                        </h3>
                                        <p className='text-secondary-600'>
                                            +62 812-3456-7890
                                        </p>
                                        <p className='text-secondary-600'>
                                            +62 21-1234-5678
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                                        <Mail className='w-6 h-6 text-primary-600' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-secondary-900 mb-1'>
                                            Email
                                        </h3>
                                        <p className='text-secondary-600'>
                                            info@premiumkitchen.com
                                        </p>
                                        <p className='text-secondary-600'>
                                            sales@premiumkitchen.com
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                                        <Clock className='w-6 h-6 text-primary-600' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-secondary-900 mb-1'>
                                            Jam Operasional
                                        </h3>
                                        <p className='text-secondary-600'>
                                            Senin - Sabtu: 08:00 - 17:00
                                        </p>
                                        <p className='text-secondary-600'>
                                            Minggu: Tutup
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-primary-50 p-6 rounded-xl'>
                                <h3 className='font-semibold text-secondary-900 mb-3'>
                                    Chat via WhatsApp
                                </h3>
                                <p className='text-secondary-600 mb-4'>
                                    Hubungi kami langsung via WhatsApp untuk
                                    respons lebih cepat
                                </p>
                                <Button variant='primary' className='w-full'>
                                    <MessageCircle className='mr-2 w-5 h-5' />
                                    Chat WhatsApp
                                </Button>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className='heading-3 mb-6'>Kirim Pesan</h2>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <Input
                                    label='Nama Lengkap'
                                    placeholder='Masukkan nama lengkap'
                                    error={errors.name?.message}
                                    {...register('name')}
                                />

                                <Input
                                    label='Email'
                                    type='email'
                                    placeholder='nama@email.com'
                                    error={errors.email?.message}
                                    {...register('email')}
                                />

                                <Input
                                    label='Nomor Telepon'
                                    placeholder='+62 812-3456-7890'
                                    error={errors.phone?.message}
                                    {...register('phone')}
                                />

                                <div>
                                    <label className='block text-sm font-semibold text-secondary-700 mb-2'>
                                        Jenis Proyek (Opsional)
                                    </label>
                                    <select
                                        className='w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:outline-none transition-colors text-secondary-900'
                                        {...register('projectType')}
                                    >
                                        <option value=''>
                                            Pilih jenis proyek
                                        </option>
                                        <option value='kitchen-set'>
                                            Kitchen Set
                                        </option>
                                        <option value='wardrobe'>
                                            Wardrobe
                                        </option>
                                        <option value='tv-cabinet'>
                                            TV Cabinet
                                        </option>
                                        <option value='display-cabinet'>
                                            Display Cabinet
                                        </option>
                                        <option value='custom'>Custom</option>
                                    </select>
                                </div>

                                <Input
                                    label='Subjek'
                                    placeholder='Subjek pesan'
                                    error={errors.subject?.message}
                                    {...register('subject')}
                                />

                                <Textarea
                                    label='Pesan'
                                    placeholder='Ceritakan kebutuhan Anda...'
                                    error={errors.message?.message}
                                    {...register('message')}
                                />

                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='w-full'
                                    isLoading={isSubmitting}
                                >
                                    Kirim Pesan
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className='h-96 bg-secondary-200'>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                ></iframe>
            </section>
        </div>
    );
}
