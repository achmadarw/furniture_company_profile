const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
    console.log('Creating admin user...');

    const email = 'admin@premiumkitchen.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log('Admin user already exists!');
            console.log('Email:', email);
            return;
        }

        // Create admin user
        const user = await prisma.user.create({
            data: {
                email,
                name: 'Admin',
                password: hashedPassword,
                role: 'admin',
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', user.role);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
