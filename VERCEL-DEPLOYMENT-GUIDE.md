# 🚀 Panduan Deployment ke Vercel

## Persiapan Sebelum Deploy

### 1. Setup Database PostgreSQL

Aplikasi ini menggunakan PostgreSQL untuk production. Anda punya beberapa pilihan:

#### Opsi A: Vercel Postgres (Recommended)

1. Buka [Vercel Dashboard](https://vercel.com)
2. Buat project baru atau buka project yang sudah ada
3. Pilih tab "Storage"
4. Klik "Create Database" → Pilih "Postgres"
5. Copy `DATABASE_URL` yang diberikan

#### Opsi B: Neon (Free Tier Available)

1. Buka [Neon.tech](https://neon.tech)
2. Buat akun dan database baru
3. Copy connection string

#### Opsi C: Supabase (Free Tier Available)

1. Buka [Supabase.com](https://supabase.com)
2. Buat project baru
3. Buka Settings → Database
4. Copy connection string (mode "Transaction" atau "Session")

### 2. Generate NextAuth Secret

Jalankan command ini di terminal untuk generate secret yang aman:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Atau gunakan online generator: https://generate-secret.vercel.app/32

## 📋 Langkah-langkah Deploy

### Step 1: Push ke GitHub

Jika belum, inisialisasi Git dan push ke GitHub:

```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### Step 2: Deploy ke Vercel

#### Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**

    - Buka [vercel.com](https://vercel.com)
    - Login dengan GitHub account

2. **Import Project**

    - Klik "Add New Project"
    - Pilih repository GitHub Anda
    - Klik "Import"

3. **Configure Project**

    - Framework Preset: `Next.js` (otomatis terdeteksi)
    - Root Directory: `./` (default)
    - Build Command: `next build` (default)
    - Output Directory: `.next` (default)

4. **Setup Environment Variables**

    Tambahkan semua environment variables berikut:

    ```env
    # Database
    DATABASE_URL=postgresql://user:password@host:5432/database?schema=public

    # NextAuth
    NEXTAUTH_URL=https://your-domain.vercel.app
    NEXTAUTH_SECRET=your-generated-secret-here

    # Email Configuration
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASSWORD=your-app-password
    EMAIL_FROM=noreply@furniturecompany.com

    # Admin
    ADMIN_EMAIL=admin@furniturecompany.com

    # WhatsApp (optional)
    WHATSAPP_NUMBER=+6281234567890
    WHATSAPP_API_KEY=

    # Cloudinary (optional)
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    # Site Configuration
    NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
    NEXT_PUBLIC_COMPANY_NAME=Premium Kitchen Set
    NEXT_PUBLIC_COMPANY_PHONE=+62 812-3456-7890
    NEXT_PUBLIC_COMPANY_EMAIL=info@furniturecompany.com
    ```

5. **Deploy**
    - Klik "Deploy"
    - Tunggu proses build selesai (3-5 menit)

#### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts
# Deploy to production
vercel --prod
```

### Step 3: Setup Database (Setelah Deploy)

Setelah aplikasi berhasil di-deploy, Anda perlu setup database:

1. **Run Migrations**

    Di Vercel Dashboard:

    - Buka project Anda
    - Klik tab "Settings"
    - Scroll ke "Build & Development Settings"
    - Tambahkan di "Build Command":
        ```
        prisma migrate deploy && next build
        ```

    Atau jalankan manual via CLI lokal:

    ```bash
    # Set DATABASE_URL environment variable
    export DATABASE_URL="your-production-database-url"

    # Run migrations
    npx prisma migrate deploy
    ```

2. **Seed Database (Optional)**

    Jika ingin mengisi data awal:

    ```bash
    export DATABASE_URL="your-production-database-url"
    npm run db:seed
    ```

3. **Create Admin User**

    ```bash
    export DATABASE_URL="your-production-database-url"
    npm run create:admin
    ```

### Step 4: Verifikasi

1. Buka URL Vercel Anda
2. Test semua halaman:
    - Homepage
    - Products
    - Gallery
    - Contact
    - Admin login
3. Test admin dashboard
4. Test form submissions

## 🔧 Konfigurasi Tambahan

### Custom Domain

1. Buka project di Vercel Dashboard
2. Klik tab "Settings" → "Domains"
3. Tambahkan domain custom Anda
4. Update DNS records sesuai instruksi
5. Update `NEXTAUTH_URL` dan `NEXT_PUBLIC_SITE_URL` dengan domain baru

### Email Setup (Gmail)

Untuk menggunakan Gmail sebagai SMTP:

1. Aktifkan 2-Factor Authentication di Google Account
2. Generate App Password:
    - Buka [Google Account Security](https://myaccount.google.com/security)
    - Pilih "2-Step Verification"
    - Scroll ke bawah → "App passwords"
    - Generate password untuk "Mail"
3. Gunakan App Password sebagai `EMAIL_PASSWORD`

### Cloudinary Setup (Optional)

Untuk upload gambar:

1. Buka [Cloudinary.com](https://cloudinary.com)
2. Buat akun gratis
3. Copy credentials dari Dashboard:
    - Cloud Name
    - API Key
    - API Secret
4. Tambahkan ke environment variables di Vercel

## 📱 Continuous Deployment

Setelah setup awal, setiap push ke branch `main` akan otomatis trigger deployment baru:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel akan:

1. Detect perubahan
2. Build aplikasi
3. Run tests (jika ada)
4. Deploy otomatis
5. Notifikasi status via email/Slack

## 🔍 Monitoring & Debugging

### View Logs

1. Buka Vercel Dashboard
2. Pilih deployment
3. Klik tab "Logs"
4. Filter by: Runtime, Build, atau Static

### Performance

Vercel menyediakan analytics gratis:

-   Buka tab "Analytics"
-   Lihat:
    -   Page load times
    -   Web Vitals (LCP, FID, CLS)
    -   Traffic sources
    -   Top pages

## ⚠️ Troubleshooting

### Build Failed

**Error: "Prisma Client not found"**

```bash
# Pastikan postinstall script ada di package.json
"postinstall": "prisma generate"
```

**Error: "DATABASE_URL not set"**

-   Pastikan environment variable `DATABASE_URL` sudah diset di Vercel
-   Format harus valid PostgreSQL connection string

**Error: TypeScript compilation failed**

-   Pastikan semua perubahan di-commit dan di-push ke GitHub
-   Cek logs untuk detail error TypeScript
-   Jalankan `npm run build` secara lokal untuk test sebelum deploy

### Runtime Errors

**Error 500: Internal Server Error**

-   Cek logs di Vercel Dashboard
-   Pastikan semua environment variables terisi
-   Verify database connection

**Admin Login Failed**

-   Pastikan admin user sudah dibuat di database
-   Cek `NEXTAUTH_SECRET` dan `NEXTAUTH_URL`

### Database Issues

**Migration Failed**

```bash
# Reset dan run ulang migrations
npx prisma migrate reset
npx prisma migrate deploy
```

## 🎯 Checklist Deploy

-   [ ] Database PostgreSQL sudah dibuat
-   [ ] Repository di-push ke GitHub
-   [ ] Project di-import ke Vercel
-   [ ] Semua environment variables sudah diset
-   [ ] Build berhasil
-   [ ] Database migrations sudah dijalankan
-   [ ] Admin user sudah dibuat
-   [ ] Website bisa diakses
-   [ ] Admin dashboard berfungsi
-   [ ] Form submissions bekerja
-   [ ] Email notifications bekerja (jika diaktifkan)
-   [ ] Custom domain disetup (optional)

## 📚 Resources

-   [Vercel Documentation](https://vercel.com/docs)
-   [Next.js Deployment](https://nextjs.org/docs/deployment)
-   [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
-   [NextAuth.js Deployment](https://next-auth.js.org/deployment)

## 🆘 Need Help?

Jika mengalami masalah:

1. Cek logs di Vercel Dashboard
2. Baca error message dengan teliti
3. Search di [Vercel Community](https://github.com/vercel/vercel/discussions)
4. Cek [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

---

**Selamat! 🎉** Aplikasi Anda sekarang sudah live di Vercel!
