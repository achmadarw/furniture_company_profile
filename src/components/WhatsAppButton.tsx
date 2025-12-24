'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const whatsappNumber = '6281234567890'; // Format: country code + number (no +, no spaces)
    const whatsappMessage =
        'Halo Premium Kitchen! Saya tertarik untuk konsultasi mengenai furniture.';

    const openWhatsApp = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openWhatsApp}
            className='fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-colors group'
            aria-label='Chat via WhatsApp'
        >
            <MessageCircle className='w-8 h-8' />

            {/* Tooltip */}
            <span className='absolute right-full mr-3 bg-secondary-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                Chat via WhatsApp
            </span>

            {/* Pulse animation */}
            <span className='absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20'></span>
        </motion.button>
    );
}
