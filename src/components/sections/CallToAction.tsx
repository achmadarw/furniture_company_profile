'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export default function CallToAction() {
    const whatsappNumber = '6281234567890';
    const whatsappMessage =
        'Halo Premium Kitchen! Saya tertarik untuk konsultasi gratis mengenai furniture.';

    const openWhatsApp = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;
        window.open(url, '_blank');
    };

    return (
        <section className='section-padding bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl' />
                <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl' />
            </div>

            <div className='container-custom relative z-10'>
                <div className='max-w-4xl mx-auto text-center'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-4xl md:text-5xl font-bold text-white mb-6'
                    >
                        Siap Wujudkan Furniture Impian Anda?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className='text-xl text-white/90 mb-8'
                    >
                        Dapatkan konsultasi dan desain 3D gratis sekarang. Tim
                        profesional kami siap membantu mewujudkan kitchen set
                        dan furniture impian Anda dengan kualitas terbaik.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
                    >
                        <Link href='/contact'>
                            <Button
                                variant='secondary'
                                size='lg'
                                className='bg-white text-primary-600 hover:bg-gray-100'
                            >
                                <Phone className='mr-2 w-5 h-5' />
                                Hubungi Kami
                            </Button>
                        </Link>
                        <Button
                            variant='outline'
                            size='lg'
                            className='border-white text-white hover:bg-white hover:text-primary-600'
                            onClick={openWhatsApp}
                        >
                            <MessageCircle className='mr-2 w-5 h-5' />
                            WhatsApp
                        </Button>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='flex flex-col md:flex-row gap-8 justify-center items-center text-white/90'
                    >
                        <button
                            onClick={openWhatsApp}
                            className='flex items-center gap-2 hover:text-white transition-colors'
                        >
                            <Phone className='w-5 h-5' />
                            <span>+62 812-3456-7890</span>
                        </button>
                        <div className='hidden md:block w-px h-6 bg-white/30' />
                        <a
                            href='mailto:info@premiumkitchen.com'
                            className='flex items-center gap-2 hover:text-white transition-colors'
                        >
                            <Mail className='w-5 h-5' />
                            <span>info@premiumkitchen.com</span>
                        </a>
                        <div className='hidden md:block w-px h-6 bg-white/30' />
                        <div className='flex items-center gap-2'>
                            <MessageCircle className='w-5 h-5' />
                            <span>Chat via WhatsApp</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
