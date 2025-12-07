'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
} from '@/lib/data/store';
import { Project } from '@/types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ProjectsPage() {
    const [projects, setProjects] = useState(getProjects());
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
            setProjects(getProjects());
            toast.success('Project deleted successfully');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingProject(null);
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <div className='space-y-6'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            Projects
                        </h1>
                        <p className='text-gray-600 mt-1'>
                            Manage your portfolio showcase
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className='flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
                    >
                        <Plus className='w-5 h-5 mr-2' />
                        Add Project
                    </button>
                </div>

                {/* Search */}
                <div className='bg-white rounded-lg shadow p-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            placeholder='Search projects...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className='bg-white rounded-lg shadow overflow-hidden group'
                        >
                            <div className='relative h-48'>
                                <Image
                                    src={project.afterImage}
                                    alt={project.title}
                                    fill
                                    className='object-cover'
                                />
                                {project.featured && (
                                    <span className='absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded'>
                                        Featured
                                    </span>
                                )}
                            </div>
                            <div className='p-4'>
                                <h3 className='font-semibold text-gray-900 mb-1'>
                                    {project.title}
                                </h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    {project.location}
                                </p>
                                <p className='text-xs text-gray-500 line-clamp-2 mb-3'>
                                    {project.description}
                                </p>
                                <div className='flex items-center justify-between'>
                                    <span className='px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'>
                                        {project.category}
                                    </span>
                                    <div className='flex space-x-2'>
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className='p-2 text-primary-600 hover:bg-primary-50 rounded'
                                        >
                                            <Edit className='w-4 h-4' />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(project.id)
                                            }
                                            className='p-2 text-red-600 hover:bg-red-50 rounded'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className='bg-white rounded-lg shadow p-12 text-center text-gray-500'>
                        No projects found
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <ProjectModal
                    project={editingProject}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProject(null);
                    }}
                    onSave={() => {
                        setProjects(getProjects());
                        setShowModal(false);
                        setEditingProject(null);
                    }}
                />
            )}
        </AdminLayout>
    );
}

function ProjectModal({
    project,
    onClose,
    onSave,
}: {
    project: Project | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        category: project?.category || 'kitchen-set',
        description: project?.description || '',
        location: project?.location || '',
        afterImage: project?.afterImage || '',
        images: project?.images.join(', ') || '',
        clientName: project?.clientName || '',
        testimonial: project?.testimonial || '',
        featured: project?.featured || false,
        completionDate: project?.completionDate
            ? new Date(project.completionDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            title: formData.title,
            category: formData.category as any,
            description: formData.description,
            location: formData.location,
            afterImage: formData.afterImage,
            images: formData.images.split(',').map((img) => img.trim()),
            clientName: formData.clientName,
            testimonial: formData.testimonial,
            featured: formData.featured,
            completionDate: new Date(formData.completionDate),
        };

        if (project) {
            updateProject(project.id, projectData);
            toast.success('Project updated successfully');
        } else {
            addProject(projectData);
            toast.success('Project added successfully');
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
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h3>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Title
                            </label>
                            <input
                                type='text'
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
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
                                    <option value='kitchen-set'>
                                        Kitchen Set
                                    </option>
                                    <option value='wardrobe'>Wardrobe</option>
                                    <option value='tv-cabinet'>
                                        TV Cabinet
                                    </option>
                                    <option value='display-cabinet'>
                                        Display Cabinet
                                    </option>
                                    <option value='custom'>Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Location
                                </label>
                                <input
                                    type='text'
                                    required
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: e.target.value,
                                        })
                                    }
                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                                />
                            </div>
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
                                Main Image URL
                            </label>
                            <input
                                type='text'
                                required
                                value={formData.afterImage}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        afterImage: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Gallery Image URLs (comma separated)
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

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Client Name (Optional)
                            </label>
                            <input
                                type='text'
                                value={formData.clientName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        clientName: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Testimonial (Optional)
                            </label>
                            <textarea
                                rows={2}
                                value={formData.testimonial}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        testimonial: e.target.value,
                                    })
                                }
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>
                                Completion Date
                            </label>
                            <input
                                type='date'
                                required
                                value={formData.completionDate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        completionDate: e.target.value,
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
                                Featured Project
                            </label>
                        </div>

                        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                            <button
                                type='submit'
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm'
                            >
                                {project ? 'Update' : 'Add'} Project
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
