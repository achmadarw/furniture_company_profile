# 🏠 Premium Kitchen Set - Company Profile Website

Website company profile modern dan profesional untuk perusahaan furniture spesialis kitchen set, wardrobe, dan furniture custom.

## 📸 Screenshots

> Note: Tambahkan screenshots website Anda di sini setelah deployment

## 🌟 Highlights

-   ✨ **Modern & Professional Design** - UI/UX yang menarik dan user-friendly
-   📱 **Fully Responsive** - Optimal di semua device (desktop, tablet, mobile)
-   ⚡ **Fast Performance** - Optimized untuk loading cepat
-   🎨 **Smooth Animations** - Framer Motion untuk interaksi yang smooth
-   📧 **Contact Form** - Terintegrasi dengan email notification
-   🖼️ **Gallery Lightbox** - Showcase proyek dengan tampilan profesional
-   🎯 **SEO Optimized** - Meta tags dan structured data
-   🔒 **Type Safe** - Full TypeScript implementation
-   🎛️ **Admin Dashboard** - Built-in CMS untuk manage content

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/furniture-company.git

# Install dependencies
cd furniture-company
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local dengan informasi Anda

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📦 Tech Stack

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| Next.js 16      | React framework with App Router   |
| TypeScript      | Type safety                       |
| Tailwind CSS    | Styling                           |
| Framer Motion   | Animations                        |
| React Hook Form | Form management                   |
| Zod             | Validation                        |
| Nodemailer      | Email functionality               |
| Lucide React    | Icons                             |
| Prisma          | Database ORM                      |
| SQLite          | Database (dev), PostgreSQL (prod) |

## 📄 Pages

### Public Pages

-   **Homepage** - Hero, features, products, testimonials
-   **Products** - Katalog produk dengan filter kategori
-   **Gallery** - Portfolio proyek dengan lightbox
-   **Services** - Layanan dan paket harga
-   **About** - Company story, team, values
-   **Contact** - Form kontak dengan email integration

### Admin Dashboard (`/admin`)

-   **Dashboard** - Overview statistics dan recent inquiries
-   **Products Management** - CRUD operations untuk products
-   **Projects Management** - Manage portfolio projects
-   **Testimonials Management** - Manage customer reviews
-   **Inquiries Management** - View dan manage contact inquiries

> 📖 Lihat [ADMIN-GUIDE.md](ADMIN-GUIDE.md) untuk dokumentasi lengkap Admin Dashboard

## 🎨 Customization

### Update Branding

1. **Colors** - Edit `tailwind.config.ts`
2. **Logo** - Update di `src/components/layout/Navbar.tsx`
3. **Content** - Edit di masing-masing page component
4. **Images** - Replace URLs di components

### Add Features

Lihat [SETUP.md](SETUP.md) untuk guide lengkap customization.

## 🗄️ Database Setup

Website support 2 mode:

-   **In-Memory Store** (Default) - Development, data temporary
-   **Prisma Database** (Production) - Persistent data dengan SQLite/PostgreSQL

### Quick Start dengan Database

```bash
# Setup sudah complete, tinggal run seed
npm run db:seed

# View data dengan Prisma Studio
npm run db:studio
```

Lihat [DATABASE-MIGRATION.md](DATABASE-MIGRATION.md) untuk migrasi lengkap ke database.

## 📧 Email Setup

Website ini menggunakan Nodemailer untuk contact form. Setup Gmail:

1. Enable 2-Factor Authentication di Google Account
2. Generate App Password di Security Settings
3. Update `.env.local`:
    ```
    EMAIL_USER="your-email@gmail.com"
    EMAIL_PASSWORD="your-app-specific-password"
    ```

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist folder via Netlify dashboard
```

### Railway/Render

-   Build command: `npm run build`
-   Start command: `npm start`

## 📊 Performance

Target metrics:

-   Lighthouse Score: 90+
-   First Contentful Paint: < 1.5s
-   Time to Interactive: < 3.5s

## 🔮 Future Features (Roadmap)

-   [x] Admin Dashboard untuk manage content
-   [x] Database integration (Prisma + SQLite/PostgreSQL)
-   [x] Authentication system untuk admin
-   [ ] File upload untuk images
-   [ ] Product Customizer dengan price calculator
-   [ ] Blog/Articles CMS
-   [ ] Multi-language (ID/EN)
-   [ ] Online quotation system
-   [ ] Customer portal
-   [ ] Payment gateway integration
-   [ ] 3D product viewer
-   [ ] Live chat integration
-   [ ] WhatsApp Business API

## 📝 Documentation

-   [Setup Guide](SETUP.md) - Detailed installation & configuration
-   [Admin Guide](ADMIN-GUIDE.md) - Admin Dashboard documentation
-   [Database Migration](DATABASE-MIGRATION.md) - Prisma database setup & migration
-   [Authentication Guide](AUTHENTICATION-GUIDE.md) - Login system & user management
-   [Change Log](CHANGELOG.md) - Version history
-   [README.md](README.md) - This file

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📞 Support

Untuk pertanyaan atau support:

-   📧 Email: info@premiumkitchen.com
-   📱 WhatsApp: +62 812-3456-7890
-   🌐 Website: https://premiumkitchen.com

## 📄 License

Copyright © 2025 Premium Kitchen Set. All rights reserved.

---

**Built with ❤️ using Next.js & TypeScript**
