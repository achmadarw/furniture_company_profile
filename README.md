# Furniture Company - Premium Kitchen Set

Website company profile untuk perusahaan furniture yang spesialis dalam pembuatan kitchen set, wardrobe, TV cabinet, dan furniture custom.

## 🚀 Teknologi yang Digunakan

-   **Next.js 14+** - React framework dengan App Router
-   **TypeScript** - Type safety
-   **Tailwind CSS** - Utility-first CSS framework
-   **Framer Motion** - Animasi dan transitions
-   **React Hook Form** - Form management
-   **Zod** - Schema validation
-   **Nodemailer** - Email functionality
-   **Lucide React** - Icon library

## ✨ Fitur Utama

### 1. Homepage

-   Hero section dengan CTA
-   Company stats & achievements
-   Featured features
-   Product categories
-   Featured projects
-   Process workflow
-   Customer testimonials
-   Call-to-action section

### 2. Products Page

-   Category filter
-   Product catalog
-   Custom design inquiry

### 3. Gallery Page

-   Project showcase
-   Category filtering
-   Lightbox image viewer
-   Before-after comparisons

### 4. Services Page

-   Service offerings
-   Package pricing
-   Feature details

### 5. About Page

-   Company story
-   Core values
-   Team profiles
-   Company statistics

### 6. Contact Page

-   Contact form with validation
-   Company information
-   Google Maps integration
-   WhatsApp integration
-   Email notifications

### 7. UI Components

-   Reusable buttons
-   Cards (Product, Testimonial)
-   Form inputs
-   Responsive navbar
-   Footer
-   Animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

1. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Update environment variables:

```env
# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@furniturecompany.com"
ADMIN_EMAIL="admin@furniturecompany.com"

# Company Information
NEXT_PUBLIC_COMPANY_NAME="Premium Kitchen Set"
NEXT_PUBLIC_COMPANY_PHONE="+62 812-3456-7890"
NEXT_PUBLIC_COMPANY_EMAIL="info@furniturecompany.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: { /* Your primary colors */ },
  secondary: { /* Your secondary colors */ },
}
```

### Content

-   Update company information in `.env.local`
-   Replace images in components with your own
-   Modify text content in each page component

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── api/            # API routes
│   ├── contact/        # Contact page
│   ├── gallery/        # Gallery page
│   ├── products/       # Products page
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── sections/       # Page sections
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions
└── types/              # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
npm start
```

## 📝 Features to Add (Future)

-   [ ] Admin dashboard (CMS)
-   [ ] Product customizer with price calculator
-   [ ] Blog/Articles section
-   [ ] Multi-language support
-   [ ] Online quotation system
-   [ ] Customer portal
-   [ ] Payment integration
-   [ ] 3D product viewer
-   [ ] Live chat integration

## 📞 Support

Untuk pertanyaan atau support, hubungi:

-   Email: info@premiumkitchen.com
-   Phone: +62 812-3456-7890

## 📄 License

Copyright © 2025 Premium Kitchen Set. All rights reserved.
