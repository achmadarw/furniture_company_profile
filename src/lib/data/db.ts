import { prisma } from '../prisma';
import { Product, Project, Testimonial, Inquiry } from '@/types';

// Product Operations
export async function getProducts() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category as any,
        description: p.description,
        images: JSON.parse(p.images),
        priceRange: { min: p.priceMin, max: p.priceMax },
        materials: JSON.parse(p.materials),
        featured: p.featured,
        createdAt: p.createdAt,
    })) as Product[];
}

export async function getProductById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return null;

    return {
        id: product.id,
        name: product.name,
        category: product.category as any,
        description: product.description,
        images: JSON.parse(product.images),
        priceRange: { min: product.priceMin, max: product.priceMax },
        materials: JSON.parse(product.materials),
        featured: product.featured,
        createdAt: product.createdAt,
    } as Product;
}

export async function addProduct(data: Omit<Product, 'id' | 'createdAt'>) {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            category: data.category,
            description: data.description,
            images: JSON.stringify(data.images),
            priceMin: data.priceRange?.min || 0,
            priceMax: data.priceRange?.max || 0,
            materials: JSON.stringify(data.materials),
            featured: data.featured,
        },
    });

    return {
        id: product.id,
        name: product.name,
        category: product.category as any,
        description: product.description,
        images: JSON.parse(product.images),
        priceRange: { min: product.priceMin, max: product.priceMax },
        materials: JSON.parse(product.materials),
        featured: product.featured,
        createdAt: product.createdAt,
    } as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const data: any = {};

    if (updates.name) data.name = updates.name;
    if (updates.category) data.category = updates.category;
    if (updates.description) data.description = updates.description;
    if (updates.images) data.images = JSON.stringify(updates.images);
    if (updates.priceRange) {
        data.priceMin = updates.priceRange.min;
        data.priceMax = updates.priceRange.max;
    }
    if (updates.materials) data.materials = JSON.stringify(updates.materials);
    if (typeof updates.featured !== 'undefined')
        data.featured = updates.featured;

    const product = await prisma.product.update({
        where: { id },
        data,
    });

    return {
        id: product.id,
        name: product.name,
        category: product.category as any,
        description: product.description,
        images: JSON.parse(product.images),
        priceRange: { min: product.priceMin, max: product.priceMax },
        materials: JSON.parse(product.materials),
        featured: product.featured,
        createdAt: product.createdAt,
    } as Product;
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
}

// Project Operations
export async function getProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return projects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category as any,
        description: p.description,
        location: p.location,
        afterImage: p.afterImage,
        images: JSON.parse(p.images),
        clientName: p.clientName,
        testimonial: p.testimonial,
        featured: p.featured,
        completionDate: p.completionDate,
    })) as Project[];
}

export async function getProjectById(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return null;

    return {
        id: project.id,
        title: project.title,
        category: project.category as any,
        description: project.description,
        location: project.location,
        afterImage: project.afterImage,
        images: JSON.parse(project.images),
        clientName: project.clientName,
        testimonial: project.testimonial,
        featured: project.featured,
        completionDate: project.completionDate,
    } as Project;
}

export async function addProject(data: Omit<Project, 'id'>) {
    const project = await prisma.project.create({
        data: {
            title: data.title,
            category: data.category,
            description: data.description,
            location: data.location,
            afterImage: data.afterImage,
            images: JSON.stringify(data.images),
            clientName: data.clientName,
            testimonial: data.testimonial,
            featured: data.featured,
            completionDate: data.completionDate,
        },
    });

    return {
        id: project.id,
        title: project.title,
        category: project.category as any,
        description: project.description,
        location: project.location,
        afterImage: project.afterImage,
        images: JSON.parse(project.images),
        clientName: project.clientName,
        testimonial: project.testimonial,
        featured: project.featured,
        completionDate: project.completionDate,
    } as Project;
}

export async function updateProject(id: string, updates: Partial<Project>) {
    const data: any = {};

    if (updates.title) data.title = updates.title;
    if (updates.category) data.category = updates.category;
    if (updates.description) data.description = updates.description;
    if (updates.location) data.location = updates.location;
    if (updates.afterImage) data.afterImage = updates.afterImage;
    if (updates.images) data.images = JSON.stringify(updates.images);
    if (updates.clientName !== undefined) data.clientName = updates.clientName;
    if (updates.testimonial !== undefined)
        data.testimonial = updates.testimonial;
    if (typeof updates.featured !== 'undefined')
        data.featured = updates.featured;
    if (updates.completionDate) data.completionDate = updates.completionDate;

    const project = await prisma.project.update({
        where: { id },
        data,
    });

    return {
        id: project.id,
        title: project.title,
        category: project.category as any,
        description: project.description,
        location: project.location,
        afterImage: project.afterImage,
        images: JSON.parse(project.images),
        clientName: project.clientName,
        testimonial: project.testimonial,
        featured: project.featured,
        completionDate: project.completionDate,
    } as Project;
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
}

// Testimonial Operations
export async function getTestimonials() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return testimonials as Testimonial[];
}

export async function getTestimonialById(id: string) {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    return testimonial as Testimonial | null;
}

export async function addTestimonial(
    data: Omit<Testimonial, 'id' | 'createdAt'>
) {
    const testimonial = await prisma.testimonial.create({
        data: {
            name: data.name,
            role: data.role,
            image: data.image,
            rating: data.rating,
            comment: data.comment,
            projectType: data.projectType,
        },
    });

    return testimonial as Testimonial;
}

export async function updateTestimonial(
    id: string,
    updates: Partial<Testimonial>
) {
    const testimonial = await prisma.testimonial.update({
        where: { id },
        data: updates,
    });

    return testimonial as Testimonial;
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
}

// Inquiry Operations
export async function getInquiries() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return inquiries as Inquiry[];
}

export async function getInquiryById(id: string) {
    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    return inquiry as Inquiry | null;
}

export async function addInquiry(data: Omit<Inquiry, 'id' | 'createdAt'>) {
    const inquiry = await prisma.inquiry.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            projectType: data.projectType,
            budget: data.budget,
            status: data.status || 'new',
        },
    });

    return inquiry as Inquiry;
}

export async function updateInquiry(id: string, updates: Partial<Inquiry>) {
    const inquiry = await prisma.inquiry.update({
        where: { id },
        data: updates,
    });

    return inquiry as Inquiry;
}

export async function deleteInquiry(id: string) {
    await prisma.inquiry.delete({ where: { id } });
}
