import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Premium Kitchen Set | Custom Furniture Solutions',
    description:
        'Spesialis pembuatan kitchen set, lemari, dan furniture custom berkualitas tinggi. Desain modern, material premium, dan pengerjaan profesional.',
    keywords:
        'kitchen set, furniture custom, lemari, drawer, interior design, furniture jakarta',
    authors: [{ name: 'Premium Kitchen Set' }],
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: 'Premium Kitchen Set',
        title: 'Premium Kitchen Set | Custom Furniture Solutions',
        description:
            'Spesialis pembuatan kitchen set dan furniture custom berkualitas tinggi',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Premium Kitchen Set',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Premium Kitchen Set | Custom Furniture Solutions',
        description:
            'Spesialis pembuatan kitchen set dan furniture custom berkualitas tinggi',
        images: ['/images/og-image.jpg'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='id' className={`${inter.variable} ${playfair.variable}`}>
            <body className={inter.className}>
                {children}
                <Toaster
                    position='top-right'
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
