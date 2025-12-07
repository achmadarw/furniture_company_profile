# Admin Dashboard Guide

## Akses Admin Dashboard

URL: `http://localhost:3001/admin`

## Fitur-fitur Admin Dashboard

### 1. Dashboard Overview (`/admin`)

-   **Statistik Real-time**: Total products, projects, testimonials, dan new inquiries
-   **Recent Inquiries**: Daftar 5 inquiry terbaru dengan status
-   **Quick Actions**: Shortcut ke semua halaman management

### 2. Products Management (`/admin/products`)

**Fitur:**

-   ✅ View semua products dalam table format
-   ✅ Search products by name atau category
-   ✅ Add new product dengan form modal
-   ✅ Edit existing product
-   ✅ Delete product dengan confirmation
-   ✅ Toggle featured status
-   ✅ Filter by category

**Data yang dapat dikelola:**

-   Product name
-   Category (Kitchen Set, Wardrobe, TV Cabinet, Display Cabinet, Custom)
-   Description
-   Image URLs (multiple, comma separated)
-   Price range (min-max)
-   Materials (comma separated)
-   Featured status

### 3. Projects Management (`/admin/projects`)

**Fitur:**

-   ✅ View projects dalam grid layout
-   ✅ Search projects by title atau location
-   ✅ Add new project dengan form modal
-   ✅ Edit existing project
-   ✅ Delete project dengan confirmation
-   ✅ Toggle featured status
-   ✅ Display completion date

**Data yang dapat dikelola:**

-   Project title
-   Category
-   Description
-   Location
-   Main image URL
-   Gallery images (multiple, comma separated)
-   Client name (optional)
-   Client testimonial (optional)
-   Completion date
-   Featured status

### 4. Testimonials Management (`/admin/testimonials`)

**Fitur:**

-   ✅ View testimonials dalam grid layout
-   ✅ Search testimonials by name atau comment
-   ✅ Add new testimonial dengan form modal
-   ✅ Edit existing testimonial
-   ✅ Delete testimonial dengan confirmation
-   ✅ Display star rating visually

**Data yang dapat dikelola:**

-   Customer name
-   Role/Position
-   Profile image URL
-   Rating (1-5 stars)
-   Project type
-   Review comment
-   Creation date

### 5. Inquiries Management (`/admin/inquiries`)

**Fitur:**

-   ✅ View all inquiries dengan detail lengkap
-   ✅ Filter by status (All, New, Contacted, Quoted, Closed)
-   ✅ Search inquiries by name, email, atau subject
-   ✅ Update inquiry status langsung dari list
-   ✅ View detailed inquiry information dalam modal
-   ✅ Delete inquiry dengan confirmation
-   ✅ Statistics counter untuk setiap status

**Data yang ditampilkan:**

-   Customer information (name, email, phone)
-   Subject dan message
-   Project type dan budget
-   Status (New, Contacted, Quoted, Closed)
-   Received date

**Status Management:**

-   **New**: Inquiry baru yang belum dihubungi
-   **Contacted**: Sudah menghubungi customer
-   **Quoted**: Sudah memberikan quotation
-   **Closed**: Inquiry sudah selesai/ditutup

## Data Store

Saat ini menggunakan **in-memory data store** (`src/lib/data/store.ts`):

-   ⚠️ Data akan hilang ketika server restart
-   ✅ Cocok untuk development dan testing
-   🔄 Siap untuk migrasi ke database (Prisma + PostgreSQL/MongoDB)

## Integrasi dengan Website

### Contact Form Integration

Semua submissions dari contact form (`/contact`) otomatis tersimpan di Inquiries:

-   Status otomatis: "new"
-   Semua data form tersimpan
-   Email notification tetap terkirim

## Cara Menggunakan

### 1. Menambah Product Baru

1. Buka `/admin/products`
2. Klik tombol "Add Product"
3. Isi form dengan data product:
    - Name: Nama product
    - Category: Pilih kategori
    - Description: Deskripsi product
    - Image URLs: URL gambar (pisahkan dengan koma untuk multiple)
    - Price Range: Min dan Max price
    - Materials: Bahan material (pisahkan dengan koma)
    - Featured: Centang jika ingin ditampilkan di homepage
4. Klik "Add Product"

### 2. Mengelola Projects

1. Buka `/admin/projects`
2. Klik "Add Project" untuk project baru
3. Isi form dengan data project:
    - Title: Judul project
    - Category: Kategori project
    - Location: Lokasi project
    - Description: Deskripsi project
    - Main Image: URL gambar utama
    - Gallery Images: URL multiple images (pisahkan dengan koma)
    - Client Name: Nama client (opsional)
    - Testimonial: Testimoni dari client (opsional)
    - Completion Date: Tanggal selesai
    - Featured: Centang jika ingin ditampilkan di homepage
4. Klik "Add Project"

### 3. Mengelola Testimonials

1. Buka `/admin/testimonials`
2. Klik "Add Testimonial"
3. Isi form:
    - Name: Nama customer
    - Role: Posisi/peran customer
    - Image URL: URL foto customer
    - Rating: Pilih 1-5 stars
    - Project Type: Jenis project
    - Comment: Review dari customer
4. Klik "Add Testimonial"

### 4. Mengelola Inquiries

1. Buka `/admin/inquiries`
2. Filter berdasarkan status jika perlu
3. Update status dengan dropdown pada setiap inquiry:
    - New → Contacted: Setelah menghubungi customer
    - Contacted → Quoted: Setelah memberikan quotation
    - Quoted → Closed: Setelah deal atau cancel
4. Klik icon mata untuk melihat detail lengkap
5. Klik icon trash untuk menghapus inquiry

## Tips & Best Practices

### Product Images

-   Gunakan URL gambar berkualitas tinggi
-   Recommended aspect ratio: 4:3 atau 16:9
-   Untuk multiple images, pisahkan dengan koma:
    ```
    https://example.com/image1.jpg, https://example.com/image2.jpg
    ```

### Featured Content

-   Gunakan "Featured" untuk konten terbaik yang ingin ditampilkan di homepage
-   Tidak lebih dari 6 featured products/projects untuk performa optimal
-   Testimonials featured akan tampil lebih prominent

### Status Management

Best practice untuk inquiry status flow:

```
New → Contacted → Quoted → Closed
```

### Search Functionality

-   Search case-insensitive
-   Mencari di multiple fields (name, description, etc.)
-   Real-time filtering

## Future Enhancements

### Database Migration

Ketika siap untuk production, migrate ke database:

```bash
# Setup Prisma
npm install @prisma/client
npx prisma init

# Create schema in prisma/schema.prisma
# Generate client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### Authentication

Untuk production, tambahkan authentication:

-   NextAuth.js untuk authentication
-   Role-based access control (Admin, Editor, Viewer)
-   Protected routes dengan middleware

### File Upload

Tambahkan file upload untuk images:

-   Integration dengan cloud storage (Cloudinary, AWS S3)
-   Drag & drop interface
-   Image optimization otomatis

### Advanced Features

-   Export data ke Excel/CSV
-   Bulk operations (delete, update status)
-   Advanced filtering dan sorting
-   Analytics dashboard
-   Email templates editor
-   Backup & restore functionality

## Troubleshooting

### Data Hilang Setelah Restart

**Problem**: Data yang ditambahkan hilang setelah server restart

**Solusi**: Ini normal behavior untuk in-memory store. Untuk persistent data, migrate ke database dengan Prisma.

### Image Tidak Tampil

**Problem**: Image URL tidak loading

**Solusi**:

1. Pastikan URL valid dan publicly accessible
2. Tambahkan domain ke `next.config.js`:

```javascript
images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'your-domain.com',
        },
    ],
}
```

### Status Update Tidak Tersimpan

**Problem**: Status inquiry berubah sebentar lalu kembali

**Solusi**: Pastikan tidak ada error di console. Refresh page untuk melihat perubahan terbaru.

## Support

Untuk pertanyaan atau issues, hubungi developer team atau buka issue di repository.
