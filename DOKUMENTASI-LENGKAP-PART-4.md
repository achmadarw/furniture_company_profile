# DOKUMENTASI LENGKAP WEBSITE PREMIUM KITCHEN SET

**Part 4: Technical Features & Integrations**

---

[← Kembali ke Part 3](./DOKUMENTASI-LENGKAP-PART-3.md) | [Lanjut ke Part 5 →](./DOKUMENTASI-LENGKAP-PART-5.md)

---

## 6. TECHNICAL FEATURES

### 6.1 DATABASE & PRISMA ORM

#### 6.1.1 Database Configuration

**File**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Environment Variable** (`.env`):

```env
DATABASE_URL="file:./dev.db"
```

#### 6.1.2 Database Models

**Complete Schema**:

```prisma
// User Model (untuk admin authentication)
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // hashed dengan bcrypt
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Product Model
model Product {
  id          String   @id @default(cuid())
  name        String
  category    String   // Kitchen Set, Wardrobe, TV Cabinet, Custom
  description String
  price       Float
  image       String   // path to uploaded image
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Project Model (untuk gallery)
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String   // Kitchen, Living Room, Bedroom, Office, Custom
  image       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Testimonial Model
model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String   // e.g., "Homeowner", "Interior Designer"
  content   String   // testimonial text
  rating    Int      // 1-5
  image     String   // customer photo
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Inquiry Model (dari contact form)
model Inquiry {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  subject     String
  message     String
  projectType String?  // Kitchen Set, Wardrobe, TV Cabinet, Custom, Lainnya
  status      String   @default("new") // new, in-progress, completed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 6.1.3 Prisma Client Setup

**File**: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
```

**Why this pattern?**

-   Prevents multiple Prisma Client instances in development
-   Hot reload in Next.js dev mode doesn't create new connections
-   Production uses single instance

#### 6.1.4 Database Commands

**Initialize database**:

```bash
npx prisma migrate dev --name init
```

**Generate Prisma Client**:

```bash
npx prisma generate
```

**Reset database** (development only):

```bash
npx prisma migrate reset
```

**Open Prisma Studio** (GUI database viewer):

```bash
npx prisma studio
```

**Seed database**:

```bash
npm run seed
```

#### 6.1.5 Database Seeding

**File**: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@premiumkitchen.com' },
        update: {},
        create: {
            email: 'admin@premiumkitchen.com',
            name: 'Admin',
            password: hashedPassword,
            role: 'admin',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Create sample products
    const products = [
        {
            name: 'Modern Kitchen Set',
            category: 'Kitchen Set',
            description: 'Kitchen set minimalis modern dengan material premium',
            price: 15000000,
            image: '/products/kitchen-modern.jpg',
            isFeatured: true,
        },
        {
            name: 'Classic Wardrobe',
            category: 'Wardrobe',
            description: 'Lemari pakaian klasik dengan ukiran detail',
            price: 8000000,
            image: '/products/wardrobe-classic.jpg',
            isFeatured: true,
        },
        // ... more products
    ];

    for (const product of products) {
        await prisma.product.create({ data: product });
    }
    console.log(`✅ Created ${products.length} products`);

    // Create sample projects
    const projects = [
        {
            title: 'Minimalist Kitchen Project',
            description: 'Modern kitchen with sleek design',
            category: 'Kitchen',
            image: '/projects/kitchen-1.jpg',
        },
        // ... more projects
    ];

    for (const project of projects) {
        await prisma.project.create({ data: project });
    }
    console.log(`✅ Created ${projects.length} projects`);

    // Create sample testimonials
    const testimonials = [
        {
            name: 'John Doe',
            role: 'Homeowner',
            content: 'Amazing quality and professional service!',
            rating: 5,
            image: '/testimonials/customer-1.jpg',
        },
        // ... more testimonials
    ];

    for (const testimonial of testimonials) {
        await prisma.testimonial.create({ data: testimonial });
    }
    console.log(`✅ Created ${testimonials.length} testimonials`);

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```

**Package.json script**:

```json
{
    "scripts": {
        "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    },
    "prisma": {
        "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    }
}
```

---

### 6.2 FILE UPLOAD SYSTEM

#### 6.2.1 Upload API Route

**File**: `src/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg',
        ];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    error: 'Invalid file type. Only JPEG, PNG, and WebP allowed.',
                },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s/g, '-');
        const filename = `${timestamp}-${originalName}`;

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = path.join(uploadsDir, filename);

        await writeFile(filepath, buffer);

        // Return URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url,
            filename,
            size: file.size,
            type: file.type,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
```

#### 6.2.2 Upload Component

**File**: `src/components/ui/ImageUpload.tsx`

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setIsUploading(true);

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
            setPreview(data.url);
            onChange(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        if (onRemove) onRemove();
    };

    return (
        <div className='space-y-4'>
            {preview ? (
                <div className='relative inline-block'>
                    <Image
                        src={preview}
                        alt='Preview'
                        width={300}
                        height={300}
                        className='rounded-lg object-cover'
                    />
                    <button
                        type='button'
                        onClick={handleRemove}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
                    >
                        <X className='w-4 h-4' />
                    </button>
                </div>
            ) : (
                <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-secondary-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        {isUploading ? (
                            <>
                                <Loader2 className='w-12 h-12 text-primary-600 animate-spin mb-4' />
                                <p className='text-sm text-secondary-600'>
                                    Uploading...
                                </p>
                            </>
                        ) : (
                            <>
                                <Upload className='w-12 h-12 text-secondary-400 mb-4' />
                                <p className='mb-2 text-sm text-secondary-700'>
                                    <span className='font-semibold'>
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </p>
                                <p className='text-xs text-secondary-500'>
                                    PNG, JPG, or WebP (MAX. 5MB)
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                </label>
            )}
        </div>
    );
}
```

#### 6.2.3 Usage in Forms

```typescript
<ImageUpload
    value={formData.image}
    onChange={(url) => setValue('image', url)}
    onRemove={() => setValue('image', '')}
/>
```

---

### 6.3 WHATSAPP INTEGRATION

#### 6.3.1 WhatsApp Configuration

**File**: `src/config/whatsapp.ts`

```typescript
export const whatsappConfig = {
    // WhatsApp business number (format: country code + number, no spaces/symbols)
    number: '6281234567890', // Indonesia: +62 812-3456-7890

    // Default messages for different contexts
    messages: {
        general:
            'Halo Premium Kitchen! Saya tertarik untuk konsultasi mengenai furniture.',
        product: (productName: string) =>
            `Halo! Saya tertarik dengan produk "${productName}". Bisakah saya mendapatkan informasi lebih lanjut?`,
        customizer: (specs: string) =>
            `Halo! Saya telah menggunakan kalkulator harga dan tertarik dengan spesifikasi berikut:\n\n${specs}\n\nBisakah kita diskusikan lebih lanjut?`,
        contact:
            'Halo Premium Kitchen! Saya ingin bertanya mengenai layanan Anda.',
    },
};

// Helper function to generate WhatsApp URL
export function getWhatsAppUrl(
    message: string = whatsappConfig.messages.general
): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappConfig.number}?text=${encodedMessage}`;
}

// Helper to open WhatsApp in new tab
export function openWhatsApp(message?: string): void {
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
}
```

#### 6.3.2 Floating WhatsApp Button

**File**: `src/components/WhatsAppButton.tsx`

```typescript
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { openWhatsApp } from '@/config/whatsapp';

export default function WhatsAppButton() {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openWhatsApp()}
            className='fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-colors group'
            aria-label='Chat via WhatsApp'
        >
            <MessageCircle className='w-8 h-8' />

            {/* Tooltip */}
            <span className='absolute right-full mr-3 bg-secondary-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                Chat via WhatsApp
            </span>

            {/* Pulse animation */}
            <span className='absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20'></span>
        </motion.button>
    );
}
```

**Color Reference**:

-   WhatsApp Green: `#25D366`
-   Hover state: `#20BA5A`

#### 6.3.3 Integration Locations

**1. Floating Button (All Public Pages)**

Added in `src/app/(public)/layout.tsx`:

```typescript
import WhatsAppButton from '@/components/WhatsAppButton';

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
```

**2. Contact Page Button**

In `src/app/(public)/contact/page.tsx`:

```typescript
import { openWhatsApp, whatsappConfig } from '@/config/whatsapp';

<Button
    variant='primary'
    className='w-full'
    onClick={() => openWhatsApp(whatsappConfig.messages.contact)}
>
    <MessageCircle className='mr-2 w-5 h-5' />
    Chat WhatsApp
</Button>;
```

**3. CTA Section (Homepage)**

In `src/components/sections/CallToAction.tsx`:

```typescript
import { openWhatsApp } from '@/config/whatsapp';

<Button variant='primary' onClick={() => openWhatsApp()}>
    <MessageCircle className='mr-2' />
    Chat WhatsApp
</Button>;
```

**4. Product Customizer**

After user clicks "Request Quote":

```typescript
const handleRequestQuote = () => {
    const specs = `
KITCHEN SET QUOTE

Dimensions: ${dimensions.width}×${dimensions.height}×${dimensions.depth} cm
Material: ${selectedMaterial}
Finish: ${selectedFinish}
Hardware: ${selectedHardware}

Estimated Price: Rp ${totalPrice.toLocaleString('id-ID')}
`;

    openWhatsApp(whatsappConfig.messages.customizer(specs));
};
```

#### 6.3.4 Best Practices

**Message Format**:

-   Keep messages concise and clear
-   Include relevant context (product name, specs, etc.)
-   Use proper formatting (line breaks, bullet points)

**Number Format**:

-   Use international format: country code + number
-   No spaces, dashes, or parentheses
-   Example: `6281234567890` (not `+62 812-3456-7890`)

**User Experience**:

-   Always open in new tab (`_blank`)
-   Add loading states for better feedback
-   Show tooltip on hover
-   Use recognizable WhatsApp green color

---

### 6.4 EMAIL NOTIFICATIONS

#### 6.4.1 Email Configuration

**File**: `src/lib/email.ts`

```typescript
import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
    try {
        const info = await transporter.sendMail({
            from: from || `"Premium Kitchen Set" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email error:', error);
        throw error;
    }
}

// Email templates
export const emailTemplates = {
    // Admin notification for new inquiry
    newInquiry: (inquiry: any) => ({
        subject: `New Inquiry: ${inquiry.subject}`,
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B7355 0%, #6B5644 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #8B7355; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Customer Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${inquiry.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${inquiry.email}</div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${inquiry.phone}</div>
              </div>
              
              ${
                  inquiry.projectType
                      ? `
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${inquiry.projectType}</div>
              </div>
              `
                      : ''
              }
              
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${inquiry.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${inquiry.message.replace(
                    /\n/g,
                    '<br>'
                )}</div>
              </div>
              
              <p style="margin-top: 30px; color: #666;">
                <em>Reply to this inquiry from your admin dashboard.</em>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    }),

    // Auto-reply to customer
    inquiryConfirmation: (inquiry: any) => ({
        subject: 'Terima kasih atas inquiry Anda - Premium Kitchen Set',
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B7355 0%, #6B5644 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .cta-button { background: #8B7355; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Premium Kitchen Set</h1>
              <p>Quality Furniture for Your Dream Home</p>
            </div>
            <div class="content">
              <h2>Halo ${inquiry.name},</h2>
              
              <p>Terima kasih telah menghubungi <strong>Premium Kitchen Set</strong>.</p>
              
              <p>Kami telah menerima inquiry Anda dengan detail sebagai berikut:</p>
              
              <div style="background: white; padding: 20px; border-left: 4px solid #8B7355; margin: 20px 0;">
                <p><strong>Subject:</strong> ${inquiry.subject}</p>
                <p><strong>Message:</strong><br>${inquiry.message.replace(
                    /\n/g,
                    '<br>'
                )}</p>
              </div>
              
              <p>Tim kami akan segera menghubungi Anda dalam waktu <strong>1x24 jam</strong> untuk memberikan informasi lebih lanjut.</p>
              
              <p>Jika Anda memiliki pertanyaan mendesak, silakan hubungi kami langsung:</p>
              
              <ul>
                <li>📞 Phone: +62 812-3456-7890</li>
                <li>📧 Email: info@premiumkitchen.com</li>
                <li>💬 WhatsApp: <a href="https://wa.me/6281234567890">Chat Now</a></li>
              </ul>
              
              <a href="https://wa.me/6281234567890" class="cta-button">Chat via WhatsApp</a>
              
              <p style="margin-top: 30px;">
                Salam hangat,<br>
                <strong>Premium Kitchen Set Team</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    }),
};
```

#### 6.4.2 Environment Variables

**Required in `.env`**:

```env
# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin email for notifications
ADMIN_EMAIL=admin@premiumkitchen.com
```

**Gmail Setup**:

1. Enable 2-Factor Authentication on Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password as `SMTP_PASS`

#### 6.4.3 Usage in Contact API

**File**: `src/app/api/contact/route.ts`

```typescript
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Save to database
        const inquiry = await prisma.inquiry.create({ data });

        // Send email to admin
        const adminEmail = emailTemplates.newInquiry(inquiry);
        await sendEmail({
            to: process.env.ADMIN_EMAIL!,
            ...adminEmail,
        });

        // Send confirmation to customer
        const customerEmail = emailTemplates.inquiryConfirmation(inquiry);
        await sendEmail({
            to: inquiry.email,
            ...customerEmail,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
```

---

### 6.5 AUTHENTICATION & AUTHORIZATION

#### 6.5.1 NextAuth Setup

Already covered in Part 3, Section 5.1.2

#### 6.5.2 Session Management

**Get session in Server Component**:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ProtectedPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    return <div>Welcome, {session.user.name}!</div>;
}
```

**Get session in Client Component**:

```typescript
'use client';

import { useSession } from 'next-auth/react';

export default function UserProfile() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Not authenticated</div>;
    }

    return <div>Hello, {session.user.name}</div>;
}
```

#### 6.5.3 Logout Function

```typescript
'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <button
            onClick={handleLogout}
            className='flex items-center gap-2 text-red-600 hover:text-red-700'
        >
            <LogOut className='w-5 h-5' />
            Logout
        </button>
    );
}
```

---

### 6.6 API ROUTES

#### 6.6.1 Products API

**File**: `src/app/api/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/products - Get all products (with filters)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        const where = {
            ...(category && { category }),
            ...(featured === 'true' && { isFeatured: true }),
        };

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create new product (protected)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();

        const product = await prisma.product.create({
            data: {
                name: data.name,
                category: data.category,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image,
                isFeatured: data.isFeatured || false,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
```

**File**: `src/app/api/products/[id]/route.ts`

```typescript
// GET /api/products/:id - Get single product
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT /api/products/:id - Update product (protected)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();

        const product = await prisma.product.update({
            where: { id: params.id },
            data: {
                name: data.name,
                category: data.category,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image,
                isFeatured: data.isFeatured,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE /api/products/:id - Delete product (protected)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await prisma.product.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
```

#### 6.6.2 Similar API Routes

**Projects API**: `src/app/api/projects/route.ts` & `src/app/api/projects/[id]/route.ts`  
**Testimonials API**: `src/app/api/testimonials/route.ts` & `src/app/api/testimonials/[id]/route.ts`  
**Inquiries API**: `src/app/api/inquiries/route.ts` & `src/app/api/inquiries/[id]/route.ts`

All follow the same pattern:

-   GET (public) - Fetch data
-   POST (protected) - Create
-   PUT (protected) - Update
-   DELETE (protected) - Delete

---

### 6.7 RESPONSIVE DESIGN

#### 6.7.1 Breakpoints (Tailwind)

```javascript
// tailwind.config.ts
module.exports = {
    theme: {
        screens: {
            sm: '640px', // Mobile landscape
            md: '768px', // Tablet
            lg: '1024px', // Desktop
            xl: '1280px', // Large desktop
            '2xl': '1536px', // Extra large
        },
    },
};
```

#### 6.7.2 Responsive Patterns

**Grid Layouts**:

```typescript
// 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
    {items.map((item) => (
        <Card key={item.id} {...item} />
    ))}
</div>
```

**Typography**:

```typescript
// Responsive text sizes
<h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold'>
  Heading
</h1>

<p className='text-sm md:text-base lg:text-lg'>
  Body text
</p>
```

**Spacing**:

```typescript
// Responsive padding
<section className='px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-24'>
    Content
</section>
```

**Navigation**:

```typescript
// Desktop menu visible on lg+, mobile menu below lg
<div className='hidden lg:flex items-center gap-6'>
  {/* Desktop menu */}
</div>

<div className='lg:hidden'>
  {/* Mobile hamburger */}
</div>
```

---

### 6.8 ANIMATIONS (Framer Motion)

#### 6.8.1 Common Animation Variants

**Fade In**:

```typescript
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

<motion.div
    variants={fadeIn}
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
>
    Content
</motion.div>;
```

**Scale Up**:

```typescript
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    Click me
</motion.button>
```

**Stagger Children**:

```typescript
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial='hidden' animate='visible'>
    {items.map((item) => (
        <motion.div key={item.id} variants={item}>
            {item.content}
        </motion.div>
    ))}
</motion.div>;
```

---

**Lanjut ke Part 5 untuk Development & Deployment Guide →**

---

**Document Information**:

-   **Part**: 4 of 5
-   **Version**: 1.0
-   **Last Updated**: December 7, 2025
