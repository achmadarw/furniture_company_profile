const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Seed Products
    const product1 = await prisma.product.create({
        data: {
            name: 'Modern Kitchen Set - Minimalis',
            category: 'kitchen-set',
            description:
                'Kitchen set minimalis dengan HPL motif kayu oak, island counter, dan top table granit',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
            ]),
            priceMin: 15000000,
            priceMax: 25000000,
            materials: JSON.stringify(['HPL', 'Granit', 'Stainless Steel']),
            featured: true,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Classic White Kitchen',
            category: 'kitchen-set',
            description:
                'Desain klasik dengan finishing duco putih, hardware premium',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2069',
            ]),
            priceMin: 20000000,
            priceMax: 35000000,
            materials: JSON.stringify(['Duco', 'Kayu Solid', 'Marble']),
            featured: true,
        },
    });

    const product3 = await prisma.product.create({
        data: {
            name: 'Walk-in Wardrobe Premium',
            category: 'wardrobe',
            description:
                'Walk-in closet mewah dengan sistem LED lighting dan drawer organizer',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
            ]),
            priceMin: 18000000,
            priceMax: 30000000,
            materials: JSON.stringify([
                'HPL Premium',
                'LED System',
                'Soft Close',
            ]),
            featured: false,
        },
    });

    console.log('Seeded products:', { product1, product2, product3 });

    // Seed Projects
    const project1 = await prisma.project.create({
        data: {
            title: 'Modern Minimalist Kitchen',
            category: 'kitchen-set',
            description:
                'Kitchen set modern dengan finishing HPL motif kayu, dilengkapi island counter',
            location: 'Jakarta Selatan',
            afterImage:
                'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068',
            ]),
            featured: true,
            completionDate: new Date('2024-06-15'),
            clientName: 'Ibu Sarah',
            testimonial:
                'Hasilnya luar biasa! Kitchen set impian saya terwujud dengan sempurna.',
        },
    });

    const project2 = await prisma.project.create({
        data: {
            title: 'Scandinavian Wardrobe',
            category: 'wardrobe',
            description:
                'Lemari pakaian dengan desain Skandinavia, pintu sliding dengan cermin',
            location: 'BSD City',
            afterImage:
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069',
            ]),
            featured: true,
            completionDate: new Date('2024-07-20'),
        },
    });

    console.log('Seeded projects:', { project1, project2 });

    // Seed Testimonials
    const testimonial1 = await prisma.testimonial.create({
        data: {
            name: 'Ibu Sarah',
            role: 'Homeowner',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
            rating: 5,
            comment:
                'Hasilnya luar biasa! Kitchen set impian saya terwujud dengan sempurna. Tim sangat profesional dan detail oriented.',
            projectType: 'Kitchen Set',
        },
    });

    const testimonial2 = await prisma.testimonial.create({
        data: {
            name: 'Bapak Andi',
            role: 'Property Developer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
            rating: 5,
            comment:
                'Sudah beberapa kali order untuk project apartemen. Kualitas konsisten, on-time, dan harga kompetitif.',
            projectType: 'Multiple Projects',
        },
    });

    console.log('Seeded testimonials:', { testimonial1, testimonial2 });

    // Seed Sample Inquiries
    const inquiry1 = await prisma.inquiry.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+62 812-3456-7890',
            subject: 'Inquiry Kitchen Set',
            message:
                'Saya tertarik untuk membuat kitchen set custom untuk rumah saya.',
            projectType: 'kitchen-set',
            budget: '15-20 juta',
            status: 'new',
        },
    });

    const inquiry2 = await prisma.inquiry.create({
        data: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+62 813-9876-5432',
            subject: 'Konsultasi Wardrobe',
            message: 'Butuh konsultasi untuk walk-in closet di kamar utama.',
            projectType: 'wardrobe',
            status: 'contacted',
        },
    });

    console.log('Seeded inquiries:', { inquiry1, inquiry2 });

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
