'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className = '',
    hover = true,
    onClick,
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            onClick={onClick}
            className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
        >
            {children}
        </motion.div>
    );
}

interface ProductCardProps {
    image: string;
    title: string;
    category: string;
    description?: string;
    onClick?: () => void;
}

export function ProductCard({
    image,
    title,
    category,
    description,
    onClick,
}: ProductCardProps) {
    return (
        <Card hover className='cursor-pointer group' onClick={onClick}>
            <div className='relative h-64 overflow-hidden'>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
            <div className='p-6'>
                <p className='text-sm text-primary-600 font-semibold mb-2'>
                    {category}
                </p>
                <h3 className='text-xl font-bold text-secondary-900 mb-2'>
                    {title}
                </h3>
                {description && (
                    <p className='text-secondary-600 text-sm line-clamp-2'>
                        {description}
                    </p>
                )}
            </div>
        </Card>
    );
}

interface TestimonialCardProps {
    name: string;
    role?: string;
    image?: string;
    rating: number;
    comment: string;
}

export function TestimonialCard({
    name,
    role,
    image,
    rating,
    comment,
}: TestimonialCardProps) {
    return (
        <Card className='p-6'>
            <div className='flex items-center mb-4'>
                {image && (
                    <div className='relative w-12 h-12 rounded-full overflow-hidden mr-4'>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className='object-cover'
                        />
                    </div>
                )}
                <div>
                    <h4 className='font-semibold text-secondary-900'>{name}</h4>
                    {role && (
                        <p className='text-sm text-secondary-600'>{role}</p>
                    )}
                </div>
            </div>
            <div className='flex mb-3'>
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${
                            i < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                    >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                ))}
            </div>
            <p className='text-secondary-700 italic'>&ldquo;{comment}&rdquo;</p>
        </Card>
    );
}
