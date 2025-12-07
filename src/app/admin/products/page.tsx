'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/data/store';
import { Product } from '@/types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ProductsPage() {
    const [products, setProducts] = useState(getProducts());
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
            setProducts(getProducts());
            toast.success('Product deleted successfully');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AdminLayout>
            <div className='space-y-6'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Products
                        </h1>
                        <p className='text-gray-600 mt-1'>
                            Manage your product catalog
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className='flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
                    >
                        <Plus className='w-5 h-5 mr-2' />
                        Add Product
                    </button>
                </div>

                {/* Search */}
                <div className='bg-white rounded-lg shadow p-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            placeholder='Search products...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className='bg-white rounded-lg shadow overflow-hidden'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Product
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Category
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Price Range
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Status
                                </th>
                                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className='hover:bg-gray-50'
                                >
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='h-16 w-16 flex-shrink-0 relative'>
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className='rounded-lg object-cover'
                                                />
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-900'>
                                                    {product.name}
                                                </div>
                                                <div className='text-sm text-gray-500 line-clamp-1'>
                                                    {product.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {product.priceRange
                                            ? `${formatPrice(
                                                  product.priceRange.min
                                              )} - ${formatPrice(
                                                  product.priceRange.max
                                              )}`
                                            : 'N/A'}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {product.featured ? (
                                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                Featured
                                            </span>
                                        ) : (
                                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
                                                Regular
                                            </span>
                                        )}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className='text-primary-600 hover:text-primary-900 mr-4'
                                        >
                                            <Edit className='w-5 h-5' />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className='text-red-600 hover:text-red-900'
                                        >
                                            <Trash2 className='w-5 h-5' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className='text-center py-12 text-gray-500'>
                            No products found
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onSave={() => {
                        setProducts(getProducts());
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </AdminLayout>
    );
}

function ProductModal({
    product,
    onClose,
    onSave,
}: {
    product: Product | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || 'kitchen-set',
        description: product?.description || '',
        images: product?.images.join(', ') || '',
        minPrice: product?.priceRange?.min || 0,
        maxPrice: product?.priceRange?.max || 0,
        materials: product?.materials.join(', ') || '',
        featured: product?.featured || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            category: formData.category as any,
            description: formData.description,
            images: formData.images.split(',').map((img) => img.trim()),
            priceRange: {
                min: formData.minPrice,
                max: formData.maxPrice,
            },
            materials: formData.materials.split(',').map((m) => m.trim()),
            featured: formData.featured,
        };

        if (product) {
            updateProduct(product.id, productData);
            toast.success('Product updated successfully');
        } else {
            addProduct(productData);
            toast.success('Product added successfully');
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
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h3>

                    <form onSubmit={handleSubmit} className='space-y-4'>
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
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value as any,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            >
                                <option value='kitchen-set'>Kitchen Set</option>
                                <option value='wardrobe'>Wardrobe</option>
                                <option value='tv-cabinet'>TV Cabinet</option>
                                <option value='display-cabinet'>
                                    Display Cabinet
                                </option>
                                <option value='custom'>Custom</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Description
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Image URLs (comma separated)
                            </label>
                            <input
                                type='text'
                                required
                                value={formData.images}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        images: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Min Price
                                </label>
                                <input
                                    type='number'
                                    required
                                    value={formData.minPrice}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            minPrice: Number(e.target.value),
                                        })
                                    }
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Max Price
                                </label>
                                <input
                                    type='number'
                                    required
                                    value={formData.maxPrice}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            maxPrice: Number(e.target.value),
                                        })
                                    }
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Materials (comma separated)
                            </label>
                            <input
                                type='text'
                                required
                                value={formData.materials}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        materials: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='featured'
                                checked={formData.featured}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        featured: e.target.checked,
                                    })
                                }
                                className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded'
                            />
                            <label
                                htmlFor='featured'
                                className='ml-2 block text-sm text-gray-900'
                            >
                                Featured Product
                            </label>
                        </div>

                        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                            <button
                                type='submit'
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm'
                            >
                                {product ? 'Update' : 'Add'} Product
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
