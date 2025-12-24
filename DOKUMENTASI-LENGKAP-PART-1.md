# DOKUMENTASI LENGKAP WEBSITE PREMIUM KITCHEN SET

**Part 1: Pengenalan & Teknologi**

---

## 📋 DAFTAR ISI LENGKAP

**Part 1: Pengenalan & Teknologi** (Dokumen ini)

-   Ringkasan Proyek
-   Teknologi yang Digunakan
-   Arsitektur Aplikasi

**Part 2: Fitur Halaman Public** (DOKUMENTASI-LENGKAP-PART-2.md)

-   Homepage
-   Products Page
-   Gallery Page
-   Services Page
-   About Page
-   Contact Page
-   Customizer Page

**Part 3: Fitur Admin Dashboard** (DOKUMENTASI-LENGKAP-PART-3.md)

-   Admin Login & Authentication
-   Dashboard Overview
-   Product Management (CRUD)
-   Project Management (CRUD)
-   Testimonial Management (CRUD)
-   Inquiry Management

**Part 4: Fitur Teknis & Integrasi** (DOKUMENTASI-LENGKAP-PART-4.md)

-   Database & Prisma ORM
-   File Upload System
-   WhatsApp Integration
-   Email Notifications
-   Authentication System

**Part 5: Panduan Development & Deployment** (DOKUMENTASI-LENGKAP-PART-5.md)

-   Installation & Setup
-   Development Guide
-   Testing
-   Deployment
-   Troubleshooting

---

## 1. RINGKASAN PROYEK

### 1.1 Informasi Umum

**Nama Proyek**: Premium Kitchen Set - Furniture Company Website  
**Versi**: 1.0.0  
**Tanggal Release**: December 7, 2025  
**Developer**: Internal Development Team  
**Status**: Production Ready

### 1.2 Deskripsi Proyek

Website company profile untuk perusahaan furniture yang spesialis dalam pembuatan kitchen set, wardrobe, TV cabinet, dan furniture custom lainnya. Website ini dibangun menggunakan teknologi modern dengan fokus pada:

-   **User Experience**: Interface yang clean, modern, dan mudah digunakan
-   **Performance**: Fast loading dengan optimasi Next.js
-   **Responsive Design**: Optimal di semua device (mobile, tablet, desktop)
-   **SEO Friendly**: Structure yang baik untuk search engine
-   **Admin Management**: Dashboard lengkap untuk manage content

### 1.3 Tujuan Website

1. **Brand Awareness**: Memperkenalkan perusahaan dan produk furniture
2. **Lead Generation**: Mendapatkan inquiry dan konsultasi dari customer
3. **Portfolio Showcase**: Menampilkan project yang sudah dikerjakan
4. **Customer Engagement**: Komunikasi langsung via WhatsApp dan email
5. **Content Management**: Memudahkan admin update produk dan content

### 1.4 Target Pengguna

**Customer (Public)**:

-   Pemilik rumah yang ingin renovasi dapur/furniture
-   Interior designer yang mencari vendor furniture
-   Developer properti untuk proyek besar
-   Umur: 25-55 tahun
-   Lokasi: Indonesia (fokus Jakarta & sekitarnya)

**Administrator**:

-   Sales team untuk manage inquiry
-   Marketing team untuk update content
-   Owner untuk monitoring business

---

## 2. TEKNOLOGI YANG DIGUNAKAN

### 2.1 Frontend Framework

#### **Next.js 16.0.7**

-   **Alasan Pemilihan**:

    -   React framework yang powerful dengan Server-Side Rendering (SSR)
    -   App Router untuk routing modern dan efisien
    -   Built-in optimization (image, font, script)
    -   Excellent SEO capabilities
    -   Fast development dengan Hot Module Replacement

-   **Features yang Digunakan**:

    -   Server Components untuk performance optimal
    -   Client Components untuk interactivity
    -   API Routes untuk backend logic
    -   Image optimization dengan next/image
    -   Font optimization dengan next/font
    -   Middleware untuk authentication

-   **Konfigurasi**:

```javascript
// next.config.js
module.exports = {
    images: {
        domains: ['images.unsplash.com'], // External images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
        ],
    },
    experimental: {
        serverActions: true, // Enable Server Actions
    },
};
```

#### **TypeScript 5.9.3**

-   **Alasan Pemilihan**:

    -   Type safety untuk mencegah bugs
    -   Better IDE support dan autocomplete
    -   Code documentation melalui types
    -   Easier refactoring dan maintenance

-   **Type Definitions**:

```typescript
// Example: Product type
interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
```

#### **React 19**

-   **Core Library**: UI rendering dan component management
-   **Hooks Used**:
    -   `useState` - State management
    -   `useEffect` - Side effects
    -   `useMemo` - Performance optimization
    -   `useCallback` - Function memoization
    -   `useRef` - DOM references
    -   `useForm` - Form handling (react-hook-form)

### 2.2 Styling & UI

#### **Tailwind CSS 3.4.14**

-   **Alasan Pemilihan**:

    -   Utility-first CSS untuk development cepat
    -   Consistent design system
    -   Purge unused CSS untuk bundle size kecil
    -   Responsive design yang mudah
    -   Dark mode support (future ready)

-   **Custom Configuration**:

```javascript
// tailwind.config.ts
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626', // Main primary color
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                secondary: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151', // Main secondary color
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
};
```

-   **Utility Classes Created**:

```css
/* Global utilities */
.container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.section-padding {
    @apply py-16 md:py-24;
}

.heading-1 {
    @apply text-4xl md:text-5xl lg:text-6xl font-bold;
}

.heading-2 {
    @apply text-3xl md:text-4xl lg:text-5xl font-bold;
}

.heading-3 {
    @apply text-2xl md:text-3xl font-bold;
}
```

#### **Framer Motion 11.15.0**

-   **Alasan Pemilihan**:

    -   Smooth animations dan transitions
    -   Gesture support (drag, hover, tap)
    -   Layout animations
    -   Scroll-based animations
    -   Exit animations

-   **Animation Patterns Used**:

```typescript
// Fade in from bottom
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

// Stagger children
const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Scale on hover
const scaleOnHover = {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2 },
};
```

#### **Lucide React 0.468.0**

-   **Icon Library**: 1000+ consistent icons
-   **Usage**: Navigation, buttons, feature indicators
-   **Icons Used**: Phone, Mail, MapPin, MessageCircle, Package, Ruler, etc.

### 2.3 Form Management

#### **React Hook Form 7.54.2**

-   **Alasan Pemilihan**:

    -   Minimal re-renders untuk performance
    -   Easy validation integration
    -   TypeScript support
    -   Small bundle size
    -   Great developer experience

-   **Implementation Example**:

```typescript
const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
});

const onSubmit = async (data: ContactForm) => {
    // Handle form submission
};
```

#### **Zod 3.23.8**

-   **Schema Validation**: Type-safe validation
-   **Integration**: Seamless dengan React Hook Form
-   **Error Messages**: Custom error messages

-   **Validation Schema Example**:

```typescript
const contactSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon tidak valid'),
    subject: z.string().min(5, 'Subjek minimal 5 karakter'),
    message: z.string().min(10, 'Pesan minimal 10 karakter'),
});
```

### 2.4 Backend & Database

#### **Prisma ORM 5.22.0**

-   **Alasan Pemilihan**:

    -   Type-safe database client
    -   Auto-generated types
    -   Migration system
    -   Great developer experience
    -   Support multiple databases

-   **Database**: SQLite (development), PostgreSQL ready (production)
-   **Models**: Product, Project, Testimonial, Inquiry, User

-   **Schema Example**:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  category    String
  description String
  price       Float
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### **NextAuth.js 5.0.0-beta.30**

-   **Authentication System**: Credentials-based auth
-   **Session Management**: JWT tokens
-   **Password Hashing**: bcryptjs
-   **Protected Routes**: Middleware-based protection

### 2.5 Additional Libraries

#### **Nodemailer 7.0.11**

-   **Purpose**: Email notifications
-   **Features**:
    -   Send inquiry notifications to admin
    -   Send auto-reply to customers
    -   SMTP configuration support

#### **React Hot Toast 2.4.1**

-   **Purpose**: Toast notifications
-   **Features**:
    -   Success messages
    -   Error messages
    -   Loading states
    -   Customizable styling

#### **Bcryptjs 2.4.3**

-   **Purpose**: Password hashing
-   **Security**: 10 salt rounds
-   **Usage**: Admin authentication

---

## 3. ARSITEKTUR APLIKASI

### 3.1 Folder Structure

```
furniture-company/
├── prisma/
│   ├── dev.db                    # SQLite database (development)
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seeding script
│
├── public/
│   ├── uploads/                  # Uploaded images
│   │   ├── .gitkeep             # Keep folder in git
│   │   └── *.jpg                # User uploaded files (gitignored)
│   └── favicon.ico              # Site favicon
│
├── src/
│   ├── app/
│   │   ├── (public)/            # Public route group
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── customizer/
│   │   │   │   └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx       # Public layout with Navbar/Footer
│   │   │   └── page.tsx         # Homepage
│   │   │
│   │   ├── admin/               # Admin route group (protected)
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   └── page.tsx
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx       # Admin layout with Sidebar
│   │   │   └── page.tsx         # Dashboard
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   ├── products/
│   │   │   │   └── route.ts
│   │   │   ├── projects/
│   │   │   │   └── route.ts
│   │   │   ├── testimonials/
│   │   │   │   └── route.ts
│   │   │   └── inquiries/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── not-found.tsx        # 404 page
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx
│   │   │   └── ImageUploader.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── ProductCategories.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CallToAction.tsx
│   │   │   └── Stats.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Textarea.tsx
│   │   │
│   │   ├── ProductCustomizer.tsx
│   │   └── WhatsAppButton.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts            # Prisma client
│   │   ├── email.ts             # Email utility
│   │   └── auth.ts              # Auth helpers
│   │
│   └── middleware.ts             # Route protection
│
├── .env.local                    # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
│
└── Documentation/
    ├── AUTHENTICATION-GUIDE.md
    ├── CUSTOMIZER-GUIDE.md
    ├── FILE-UPLOAD-GUIDE.md
    ├── WHATSAPP-INTEGRATION.md
    ├── USE-CASES.md
    ├── TEST-RESULTS.md
    └── DOKUMENTASI-LENGKAP-PART-*.md
```

### 3.2 Route Groups Explanation

#### **(public) Route Group**

-   **Purpose**: Public-facing pages
-   **Layout**: Navbar + Footer + WhatsApp Button
-   **Pages**: Homepage, Products, Gallery, Services, About, Contact, Customizer
-   **Access**: Semua orang (tidak perlu login)

#### **admin Route Group**

-   **Purpose**: Admin dashboard
-   **Layout**: Sidebar + Admin Header
-   **Pages**: Dashboard, Products CRUD, Projects CRUD, Testimonials CRUD, Inquiries
-   **Access**: Hanya admin yang sudah login
-   **Protection**: Middleware checks authentication

### 3.3 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Public    │  │    Admin     │  │  Components  │      │
│  │   Pages     │  │  Dashboard   │  │   (UI/UX)    │      │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                │                  │               │
│         └────────────────┴──────────────────┘               │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     API ROUTES (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐   │
│  │ Products │  │ Projects │  │ Contact │  │  Upload  │   │
│  │   API    │  │   API    │  │   API   │  │   API    │   │
│  └────┬─────┘  └────┬─────┘  └────┬────┘  └────┬─────┘   │
│       │             │              │             │          │
└───────┼─────────────┼──────────────┼─────────────┼─────────┘
        │             │              │             │
        └─────────────┴──────────────┴─────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Prisma ORM (Type-safe queries)            │  │
│  └────────────────────────┬─────────────────────────────┘  │
└───────────────────────────┼────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   SQLite (Dev) / PostgreSQL (Production)            │   │
│  │                                                       │   │
│  │  Tables: products, projects, testimonials,          │   │
│  │          inquiries, users                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

                    EXTERNAL SERVICES
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Nodemailer │  │   WhatsApp   │  │   File       │
│   (Email)    │  │   (wa.me)    │  │   Storage    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 3.4 Authentication Flow

```
┌────────────┐
│   User     │
│ (Browser)  │
└─────┬──────┘
      │
      │ 1. Access /admin
      ▼
┌────────────────┐
│   Middleware   │ ◄── Check session cookie
└────────┬───────┘
         │
         ├── No Session ──► Redirect to /admin/login
         │
         └── Has Session ──► Allow access
                              │
                              ▼
                     ┌─────────────────┐
                     │ Admin Dashboard │
                     └─────────────────┘
```

---

**Lanjut ke DOKUMENTASI-LENGKAP-PART-2.md untuk fitur halaman public**

---

**Document Information**:

-   **Version**: 1.0
-   **Last Updated**: December 7, 2025
-   **Author**: Development Team
-   **Status**: Complete
