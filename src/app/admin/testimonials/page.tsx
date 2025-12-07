'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import {
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '@/lib/data/store';
import { Testimonial } from '@/types';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState(getTestimonials());
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] =
        useState<Testimonial | null>(null);

    const filteredTestimonials = testimonials.filter(
        (testimonial) =>
            testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            deleteTestimonial(id);
            setTestimonials(getTestimonials());
            toast.success('Testimonial deleted successfully');
        }
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingTestimonial(null);
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <div className='space-y-6'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Testimonials
                        </h1>
                        <p className='text-gray-600 mt-1'>
                            Manage customer reviews and feedback
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className='flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
                    >
                        <Plus className='w-5 h-5 mr-2' />
                        Add Testimonial
                    </button>
                </div>

                {/* Search */}
                <div className='bg-white rounded-lg shadow p-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            placeholder='Search testimonials...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                        />
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {filteredTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className='bg-white rounded-lg shadow p-6'
                        >
                            <div className='flex items-start space-x-4'>
                                {testimonial.image && (
                                    <div className='relative w-16 h-16 flex-shrink-0'>
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className='rounded-full object-cover'
                                        />
                                    </div>
                                )}
                                <div className='flex-1'>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <h3 className='font-semibold text-gray-900'>
                                                {testimonial.name}
                                            </h3>
                                            <p className='text-sm text-gray-600'>
                                                {testimonial.role}
                                            </p>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <button
                                                onClick={() =>
                                                    handleEdit(testimonial)
                                                }
                                                className='p-1 text-primary-600 hover:bg-primary-50 rounded'
                                            >
                                                <Edit className='w-4 h-4' />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(testimonial.id)
                                                }
                                                className='p-1 text-red-600 hover:bg-red-50 rounded'
                                            >
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center mt-2'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < testimonial.rating
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                        <span className='ml-2 text-sm text-gray-600'>
                                            {testimonial.rating}/5
                                        </span>
                                    </div>

                                    <p className='text-sm text-gray-700 mt-3 line-clamp-3'>
                                        {testimonial.comment}
                                    </p>

                                    <div className='mt-3 flex items-center justify-between'>
                                        <span className='text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded'>
                                            {testimonial.projectType}
                                        </span>
                                        <span className='text-xs text-gray-500'>
                                            {new Date(
                                                testimonial.createdAt
                                            ).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTestimonials.length === 0 && (
                    <div className='bg-white rounded-lg shadow p-12 text-center text-gray-500'>
                        No testimonials found
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <TestimonialModal
                    testimonial={editingTestimonial}
                    onClose={() => {
                        setShowModal(false);
                        setEditingTestimonial(null);
                    }}
                    onSave={() => {
                        setTestimonials(getTestimonials());
                        setShowModal(false);
                        setEditingTestimonial(null);
                    }}
                />
            )}
        </AdminLayout>
    );
}

function TestimonialModal({
    testimonial,
    onClose,
    onSave,
}: {
    testimonial: Testimonial | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [formData, setFormData] = useState({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        image: testimonial?.image || '',
        rating: testimonial?.rating || 5,
        comment: testimonial?.comment || '',
        projectType: testimonial?.projectType || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const testimonialData = {
            name: formData.name,
            role: formData.role,
            image: formData.image,
            rating: formData.rating,
            comment: formData.comment,
            projectType: formData.projectType,
        };

        if (testimonial) {
            updateTestimonial(testimonial.id, testimonialData);
            toast.success('Testimonial updated successfully');
        } else {
            addTestimonial(testimonialData);
            toast.success('Testimonial added successfully');
        }

        onSave();
    };

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto' onClick={onClose}>
            <div className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0'>
                <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />

                <div
                    className='relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6'
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                        {testimonial
                            ? 'Edit Testimonial'
                            : 'Add New Testimonial'}
                    </h3>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Role/Position
                                </label>
                                <input
                                    type='text'
                                    required
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Image URL
                            </label>
                            <input
                                type='text'
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                placeholder='https://example.com/photo.jpg'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Rating
                            </label>
                            <select
                                value={formData.rating}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        rating: Number(e.target.value),
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            >
                                <option value={5}>5 Stars - Excellent</option>
                                <option value={4}>4 Stars - Very Good</option>
                                <option value={3}>3 Stars - Good</option>
                                <option value={2}>2 Stars - Fair</option>
                                <option value={1}>1 Star - Poor</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Project Type
                            </label>
                            <input
                                type='text'
                                required
                                value={formData.projectType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        projectType: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                placeholder='e.g., Kitchen Set, Wardrobe'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Comment/Review
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.comment}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        comment: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                placeholder="Customer's feedback..."
                            />
                        </div>

                        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                            <button
                                type='submit'
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm'
                            >
                                {testimonial ? 'Update' : 'Add'} Testimonial
                            </button>
                            <button
                                type='button'
                                onClick={onClose}
                                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
