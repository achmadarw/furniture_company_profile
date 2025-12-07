'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    disabled?: boolean;
}

export default function ImageUploader({
    value,
    onChange,
    onRemove,
    disabled,
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = useCallback(
        async (file: File) => {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            setUploading(true);

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                onChange(data.url);
                toast.success('Image uploaded successfully!');

                // Store filename for deletion
                if (data.filename) {
                    onChange(data.url);
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast.error('Failed to upload image');
            } finally {
                setUploading(false);
            }
        },
        [onChange]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleUpload(file);
        },
        [handleUpload]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
        },
        [handleUpload]
    );

    return (
        <div className='space-y-4'>
            {value ? (
                <div className='relative group'>
                    <div className='relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200'>
                        <Image
                            src={value}
                            alt='Uploaded image'
                            fill
                            className='object-cover'
                        />
                    </div>
                    {!disabled && onRemove && (
                        <button
                            type='button'
                            onClick={onRemove}
                            className='absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100'
                        >
                            <X className='w-5 h-5' />
                        </button>
                    )}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={`
                        relative border-2 border-dashed border-gray-300 rounded-lg p-8
                        hover:border-primary-500 transition-colors
                        ${
                            disabled
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }
                    `}
                >
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleChange}
                        disabled={disabled || uploading}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed'
                    />
                    <div className='text-center'>
                        {uploading ? (
                            <div className='flex flex-col items-center'>
                                <Loader2 className='w-12 h-12 text-primary-600 animate-spin mb-4' />
                                <p className='text-sm text-gray-600'>
                                    Uploading...
                                </p>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center'>
                                <div className='bg-primary-50 p-4 rounded-full mb-4'>
                                    <Upload className='w-8 h-8 text-primary-600' />
                                </div>
                                <p className='text-sm font-medium text-gray-900 mb-1'>
                                    Click to upload or drag and drop
                                </p>
                                <p className='text-xs text-gray-500'>
                                    PNG, JPG, WEBP up to 5MB
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
