// Temporary in-memory data store
// TODO: Replace with database (Prisma + PostgreSQL/MongoDB)

import { Product, Project, Testimonial, Inquiry } from '@/types';

// Sample Products Data
export let products: Product[] = [
    {
        id: '1',
        name: 'Modern Kitchen Set - Minimalis',
        category: 'kitchen-set',
        description:
            'Kitchen set minimalis dengan HPL motif kayu oak, island counter, dan top table granit',
        images: [
            'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        ],
        priceRange: { min: 15000000, max: 25000000 },
        featured: true,
        materials: ['HPL', 'Granit', 'Stainless Steel'],
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        name: 'Classic White Kitchen',
        category: 'kitchen-set',
        description:
            'Desain klasik dengan finishing duco putih, hardware premium',
        images: [
            'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
        ],
        priceRange: { min: 20000000, max: 35000000 },
        featured: true,
        materials: ['Duco', 'Kayu Solid', 'Marble'],
        createdAt: new Date('2024-02-20'),
    },
    {
        id: '3',
        name: 'Walk-in Wardrobe Premium',
        category: 'wardrobe',
        description:
            'Walk-in closet mewah dengan sistem LED lighting dan drawer organizer',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        ],
        priceRange: { min: 18000000, max: 30000000 },
        featured: false,
        materials: ['HPL Premium', 'LED System', 'Soft Close'],
        createdAt: new Date('2024-03-10'),
    },
];

// Sample Projects Data
export let projects: Project[] = [
    {
        id: '1',
        title: 'Modern Minimalist Kitchen',
        category: 'kitchen-set',
        description:
            'Kitchen set modern dengan finishing HPL motif kayu, dilengkapi island counter',
        location: 'Jakarta Selatan',
        afterImage:
            'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        images: [
            'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
        ],
        completionDate: new Date('2024-06-15'),
        featured: true,
        clientName: 'Ibu Sarah',
        testimonial:
            'Hasilnya luar biasa! Kitchen set impian saya terwujud dengan sempurna.',
    },
    {
        id: '2',
        title: 'Scandinavian Wardrobe',
        category: 'wardrobe',
        description:
            'Lemari pakaian dengan desain Skandinavia, pintu sliding dengan cermin',
        location: 'BSD City',
        afterImage:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
        ],
        completionDate: new Date('2024-07-20'),
        featured: true,
    },
];

// Sample Testimonials Data
export let testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Ibu Sarah',
        role: 'Homeowner',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        rating: 5,
        comment:
            'Hasilnya luar biasa! Kitchen set impian saya terwujud dengan sempurna. Tim sangat profesional dan detail oriented.',
        projectType: 'Kitchen Set',
        createdAt: new Date('2024-06-20'),
    },
    {
        id: '2',
        name: 'Bapak Andi',
        role: 'Property Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
        rating: 5,
        comment:
            'Sudah beberapa kali order untuk project apartemen. Kualitas konsisten, on-time, dan harga kompetitif.',
        projectType: 'Multiple Projects',
        createdAt: new Date('2024-07-15'),
    },
];

// Sample Inquiries Data
export let inquiries: Inquiry[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+62 812-3456-7890',
        subject: 'Inquiry Kitchen Set',
        message:
            'Saya tertarik untuk membuat kitchen set custom untuk rumah saya.',
        projectType: 'kitchen-set',
        budget: '15-20 juta',
        status: 'new',
        createdAt: new Date('2024-12-01'),
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+62 813-9876-5432',
        subject: 'Konsultasi Wardrobe',
        message: 'Butuh konsultasi untuk walk-in closet di kamar utama.',
        projectType: 'wardrobe',
        status: 'contacted',
        createdAt: new Date('2024-12-03'),
    },
];

// CRUD Operations for Products
export const getProducts = () => products;
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date(),
    };
    products.push(newProduct);
    return newProduct;
};
export const updateProduct = (id: string, updates: Partial<Product>) => {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        return products[index];
    }
    return null;
};
export const deleteProduct = (id: string) => {
    products = products.filter((p) => p.id !== id);
};

// CRUD Operations for Projects
export const getProjects = () => projects;
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
        ...project,
        id: Date.now().toString(),
    };
    projects.push(newProject);
    return newProject;
};
export const updateProject = (id: string, updates: Partial<Project>) => {
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        return projects[index];
    }
    return null;
};
export const deleteProject = (id: string) => {
    projects = projects.filter((p) => p.id !== id);
};

// CRUD Operations for Testimonials
export const getTestimonials = () => testimonials;
export const getTestimonialById = (id: string) =>
    testimonials.find((t) => t.id === id);
export const addTestimonial = (
    testimonial: Omit<Testimonial, 'id' | 'createdAt'>
) => {
    const newTestimonial: Testimonial = {
        ...testimonial,
        id: Date.now().toString(),
        createdAt: new Date(),
    };
    testimonials.push(newTestimonial);
    return newTestimonial;
};
export const updateTestimonial = (
    id: string,
    updates: Partial<Testimonial>
) => {
    const index = testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
        testimonials[index] = { ...testimonials[index], ...updates };
        return testimonials[index];
    }
    return null;
};
export const deleteTestimonial = (id: string) => {
    testimonials = testimonials.filter((t) => t.id !== id);
};

// CRUD Operations for Inquiries
export const getInquiries = () => inquiries;
export const getInquiryById = (id: string) =>
    inquiries.find((i) => i.id === id);
export const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInquiry: Inquiry = {
        ...inquiry,
        id: Date.now().toString(),
        createdAt: new Date(),
    };
    inquiries.push(newInquiry);
    return newInquiry;
};
export const updateInquiry = (id: string, updates: Partial<Inquiry>) => {
    const index = inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
        inquiries[index] = { ...inquiries[index], ...updates };
        return inquiries[index];
    }
    return null;
};
export const deleteInquiry = (id: string) => {
    inquiries = inquiries.filter((i) => i.id !== id);
};
