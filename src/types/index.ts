export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    description: string;
    images: string[];
    price?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    featured: boolean;
    materials: string[];
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    createdAt: Date;
}

export type ProductCategory =
    | 'kitchen-set'
    | 'wardrobe'
    | 'drawer'
    | 'tv-cabinet'
    | 'display-cabinet'
    | 'custom';

export interface Project {
    id: string;
    title: string;
    category: ProductCategory;
    description: string;
    location: string;
    beforeImage?: string;
    afterImage: string;
    images: string[];
    completionDate: Date;
    featured: boolean;
    clientName?: string;
    testimonial?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role?: string;
    company?: string;
    image?: string;
    rating: number;
    comment: string;
    projectType: string;
    createdAt: Date;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    projectType?: ProductCategory;
    budget?: string;
    timeline?: string;
    status: 'new' | 'contacted' | 'quoted' | 'closed';
    createdAt: Date;
}

export interface Material {
    id: string;
    name: string;
    type: 'wood' | 'finish' | 'hardware' | 'countertop';
    pricePerUnit: number;
    unit: 'sqm' | 'pcs' | 'set';
    image?: string;
    description: string;
}

export interface QuoteCalculation {
    materials: {
        materialId: string;
        quantity: number;
    }[];
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    laborCost: number;
    installationCost: number;
    totalCost: number;
    estimatedDays: number;
}
