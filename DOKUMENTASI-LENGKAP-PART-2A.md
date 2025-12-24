# DOKUMENTASI LENGKAP WEBSITE PREMIUM KITCHEN SET

**Part 2: Fitur Halaman Public**

---

[← Kembali ke Part 1](./DOKUMENTASI-LENGKAP-PART-1.md) | [Lanjut ke Part 3 →](./DOKUMENTASI-LENGKAP-PART-3.md)

---

## 4. FITUR HALAMAN PUBLIC

### 4.1 HOMEPAGE (Halaman Beranda)

**URL**: `http://localhost:3008/`  
**Route**: `src/app/(public)/page.tsx`  
**Layout**: Public Layout (Navbar + Footer + WhatsApp Button)

#### 4.1.1 Section-section Homepage

Homepage terdiri dari 8 section utama:

##### **1. Hero Section**

**File**: `src/components/sections/Hero.tsx`

**Deskripsi**:
Section pembuka dengan visual menarik dan call-to-action utama.

**Fitur**:

-   Judul besar dengan animasi fade-in
-   Tagline perusahaan yang jelas
-   2 CTA buttons:
    -   "Lihat Katalog" → Link ke /products
    -   "Hubungi Kami" → Link ke /contact
-   Background gradient dari primary-600 ke primary-800
-   Responsive typography (mobile: text-4xl, desktop: text-6xl)

**Kode Implementation**:

```typescript
<section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800'>
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='container-custom text-center text-white'
    >
        <h1 className='heading-1 mb-6'>Premium Kitchen Set & Furniture</h1>
        <p className='text-xl md:text-2xl mb-8'>
            Wujudkan Dapur Impian dengan Kualitas Terbaik
        </p>
        <div className='flex gap-4 justify-center'>
            <Button variant='secondary'>Lihat Katalog</Button>
            <Button variant='outline'>Hubungi Kami</Button>
        </div>
    </motion.div>
</section>
```

**Animasi**:

-   Fade in dari bawah (y: 20 → 0)
-   Duration: 0.6 detik
-   Smooth transition

##### **2. Stats Section**

**File**: `src/components/sections/Stats.tsx`

**Deskripsi**:
Menampilkan pencapaian perusahaan dalam angka untuk membangun kredibilitas.

**Data yang Ditampilkan**:

1. **15+ Tahun Pengalaman**

    - Icon: Award
    - Deskripsi: "Berpengalaman dalam industri furniture"

2. **500+ Proyek Selesai**

    - Icon: Package
    - Deskripsi: "Kitchen set dan furniture custom"

3. **100% Kepuasan Customer**

    - Icon: Users
    - Deskripsi: "Rating sempurna dari pelanggan"

4. **Garansi 5 Tahun**
    - Icon: Shield
    - Deskripsi: "Jaminan kualitas produk"

**Layout**:

-   Grid 2 columns di mobile
-   Grid 4 columns di desktop
-   Card dengan background putih
-   Counter animation (angka naik dari 0)

**Code Example**:

```typescript
const stats = [
    { number: '15+', label: 'Tahun Pengalaman', icon: Award },
    { number: '500+', label: 'Proyek Selesai', icon: Package },
    { number: '100%', label: 'Kepuasan Customer', icon: Users },
    { number: '5', label: 'Tahun Garansi', icon: Shield },
];
```

##### **3. Features Section**

**File**: `src/components/sections/Features.tsx`

**Deskripsi**:
Highlight keunggulan dan value proposition perusahaan.

**Fitur yang Ditampilkan**:

1. **Custom Design**

    - Desain sesuai keinginan dan kebutuhan
    - Icon: Pencil/Ruler

2. **Kualitas Premium**

    - Material berkualitas tinggi dan tahan lama
    - Icon: Star/Award

3. **Harga Kompetitif**

    - Harga terbaik tanpa mengorbankan kualitas
    - Icon: DollarSign

4. **Garansi Resmi**

    - Garansi 5 tahun untuk semua produk
    - Icon: Shield

5. **Free Konsultasi**

    - Konsultasi gratis dengan designer profesional
    - Icon: MessageCircle

6. **Pemasangan Gratis**
    - Gratis instalasi untuk area Jakarta
    - Icon: Wrench

**Layout**:

-   Grid 1 column (mobile)
-   Grid 2 columns (tablet)
-   Grid 3 columns (desktop)
-   Icon dengan background primary
-   Hover effect: scale up

**Animation**:

```typescript
const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};
```

##### **4. Product Categories Section**

**File**: `src/components/sections/ProductCategories.tsx`

**Deskripsi**:
Showcase kategori produk utama dengan gambar menarik.

**Kategori Produk**:

1. **Kitchen Set**

    - Deskripsi: "Kitchen set custom dengan material premium"
    - Link: /products?category=Kitchen Set

2. **Wardrobe**

    - Deskripsi: "Lemari pakaian dengan desain modern"
    - Link: /products?category=Wardrobe

3. **TV Cabinet**

    - Deskripsi: "Rak TV minimalis dan elegan"
    - Link: /products?category=TV Cabinet

4. **Custom Furniture**
    - Deskripsi: "Furniture custom sesuai kebutuhan"
    - Link: /products

**Card Design**:

```typescript
<Card className='group cursor-pointer'>
    <Image
        src={category.image}
        alt={category.name}
        className='group-hover:scale-110 transition-transform'
    />
    <CardContent>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <Button>Lihat Produk</Button>
    </CardContent>
</Card>
```

**Interaction**:

-   Hover: Image scale 110%
-   Click: Navigate to products page dengan filter

##### **5. Featured Projects Section**

**File**: `src/components/sections/FeaturedProjects.tsx`

**Deskripsi**:
Menampilkan 3-4 project terbaik yang sudah dikerjakan sebagai portfolio.

**Data Project** (dari database):

-   Project name
-   Location
-   Category (Residential/Commercial)
-   Image
-   Brief description

**Features**:

-   Carousel/slider untuk multiple projects
-   Navigation arrows (prev/next)
-   Dots indicator
-   Auto-play (optional)
-   Link ke /gallery untuk lihat semua project

**Layout**:

```typescript
<section className='section-padding bg-secondary-50'>
    <div className='container-custom'>
        <h2 className='heading-2 text-center mb-12'>Proyek Unggulan Kami</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </div>
        <div className='text-center mt-8'>
            <Button href='/gallery'>Lihat Semua Project</Button>
        </div>
    </div>
</section>
```

##### **6. Process/Workflow Section**

**File**: `src/components/sections/Process.tsx`

**Deskripsi**:
Menjelaskan tahapan kerja dari konsultasi hingga selesai untuk memberi gambaran customer.

**Tahapan Proses**:

1. **Konsultasi**

    - Icon: MessageCircle
    - Deskripsi: "Diskusi kebutuhan dan budget dengan tim kami"
    - Duration: "1-2 hari"

2. **Survey & Pengukuran**

    - Icon: Ruler
    - Deskripsi: "Tim kami datang ke lokasi untuk survey dan ukur"
    - Duration: "1 hari"

3. **Desain 3D**

    - Icon: Pencil
    - Deskripsi: "Buat desain 3D sesuai dengan keinginan Anda"
    - Duration: "3-5 hari"

4. **Produksi**

    - Icon: Package
    - Deskripsi: "Pembuatan furniture dengan material premium"
    - Duration: "2-4 minggu"

5. **Instalasi**

    - Icon: Wrench
    - Deskripsi: "Pemasangan profesional oleh tim berpengalaman"
    - Duration: "1-3 hari"

6. **Garansi & After Sales**
    - Icon: Shield
    - Deskripsi: "Garansi 5 tahun dan layanan purna jual"
    - Duration: "5 tahun"

**Visual Design**:

```
Step 1 ──► Step 2 ──► Step 3 ──► Step 4 ──► Step 5 ──► Step 6
  ⓵           ⓶           ⓷           ⓸           ⓹           ⓺
```

**Implementation**:

```typescript
<div className='relative'>
    {/* Timeline line */}
    <div className='absolute top-1/2 left-0 right-0 h-1 bg-primary-200' />

    {/* Process steps */}
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
        {steps.map((step, index) => (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
            >
                <div className='bg-white p-6 rounded-xl shadow-lg'>
                    <div className='w-16 h-16 bg-primary-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4'>
                        {index + 1}
                    </div>
                    <Icon className='mx-auto mb-2' />
                    <h3 className='font-bold text-center'>{step.title}</h3>
                    <p className='text-sm text-center'>{step.description}</p>
                </div>
            </motion.div>
        ))}
    </div>
</div>
```

##### **7. Testimonials Section**

**File**: `src/components/sections/Testimonials.tsx`

**Deskripsi**:
Menampilkan review dan testimoni dari customer yang puas.

**Data Testimonial** (dari database):

-   Customer name
-   Company/Role
-   Rating (1-5 stars)
-   Testimonial text
-   Customer photo (optional)
-   Date

**Features**:

-   Carousel slider
-   Star rating display (⭐⭐⭐⭐⭐)
-   Customer photo dengan border circular
-   Quote icon
-   Auto-rotate setiap 5 detik

**Card Layout**:

```typescript
<div className='bg-white p-8 rounded-xl shadow-lg'>
    <div className='flex items-center mb-4'>
        <Image src={customer.photo} className='w-16 h-16 rounded-full' />
        <div className='ml-4'>
            <h4 className='font-bold'>{customer.name}</h4>
            <p className='text-sm text-secondary-600'>{customer.role}</p>
        </div>
    </div>

    {/* Rating stars */}
    <div className='flex mb-4'>
        {[...Array(rating)].map(() => (
            <Star className='w-5 h-5 text-yellow-400 fill-current' />
        ))}
    </div>

    {/* Testimonial text */}
    <p className='text-secondary-700 italic'>"{testimonial.text}"</p>
</div>
```

##### **8. Call-to-Action (CTA) Section**

**File**: `src/components/sections/CallToAction.tsx`

**Deskripsi**:
Section terakhir untuk mendorong customer mengambil action (contact/WhatsApp).

**Content**:

-   Heading: "Siap Wujudkan Furniture Impian Anda?"
-   Subheading: "Dapatkan konsultasi dan desain 3D gratis sekarang..."
-   2 CTA Buttons:
    1. "Hubungi Kami" → Link ke /contact
    2. "WhatsApp" → Buka WhatsApp dengan pesan pre-filled

**Contact Info**:

-   Phone: +62 812-3456-7890 (clickable → WhatsApp)
-   Email: info@premiumkitchen.com (clickable → mail)

**Background**: Gradient primary dengan decorative elements

**WhatsApp Integration**:

```typescript
const openWhatsApp = () => {
    const whatsappNumber = '6281234567890';
    const message =
        'Halo Premium Kitchen! Saya tertarik untuk konsultasi gratis mengenai furniture.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;
    window.open(url, '_blank');
};
```

#### 4.1.2 Responsive Design

**Mobile (< 640px)**:

-   Single column layout
-   Font size: heading-1 = 4xl (36px)
-   CTA buttons: Full width stack
-   Stats: 2 columns grid

**Tablet (640px - 1024px)**:

-   2 columns untuk features
-   Font size: heading-1 = 5xl (48px)
-   Maintain card proportions

**Desktop (> 1024px)**:

-   Multi-column layouts (3-4 columns)
-   Font size: heading-1 = 6xl (60px)
-   Hover effects active
-   Wider container (max-w-7xl)

---

### 4.2 PRODUCTS PAGE (Halaman Produk)

**URL**: `http://localhost:3008/products`  
**Route**: `src/app/(public)/products/page.tsx`

#### 4.2.1 Hero Section

**Features**:

-   Judul: "Katalog Produk"
-   Subtitle: "Temukan furniture berkualitas tinggi sesuai kebutuhan Anda..."
-   Background gradient

#### 4.2.2 Category Filter

**Deskripsi**:
Filter horizontal untuk memudahkan customer mencari produk berdasarkan kategori.

**Kategori**:

-   Semua (default)
-   Kitchen Set
-   Wardrobe
-   TV Cabinet
-   Display Cabinet
-   Custom

**Implementation**:

```typescript
const [activeCategory, setActiveCategory] = useState('Semua');

const categories = [
    'Semua',
    'Kitchen Set',
    'Wardrobe',
    'TV Cabinet',
    'Display Cabinet',
    'Custom',
];

const filteredProducts =
    activeCategory === 'Semua'
        ? products
        : products.filter((p) => p.category === activeCategory);
```

**UI Design**:

```typescript
<div className='flex gap-4 overflow-x-auto pb-4'>
    {categories.map((category) => (
        <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-secondary-700 hover:bg-primary-50'
            }`}
        >
            {category}
        </button>
    ))}
</div>
```

#### 4.2.3 Product Catalog Grid

**Layout**:

-   Grid 1 column (mobile)
-   Grid 2 columns (tablet)
-   Grid 3 columns (desktop)
-   Gap 8 (32px spacing)

**Product Card Components**:

```typescript
<div className='bg-white rounded-xl shadow-lg overflow-hidden group'>
    {/* Product Image */}
    <div className='relative h-64 overflow-hidden'>
        <Image
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-300'
        />

        {/* Category badge */}
        <div className='absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm'>
            {product.category}
        </div>
    </div>

    {/* Product Info */}
    <div className='p-6'>
        <h3 className='text-xl font-bold text-secondary-900 mb-2'>
            {product.name}
        </h3>

        <p className='text-secondary-600 text-sm mb-4 line-clamp-2'>
            {product.description}
        </p>

        {/* Price */}
        <div className='flex items-center justify-between mb-4'>
            <span className='text-2xl font-bold text-primary-600'>
                Rp {product.price.toLocaleString('id-ID')}
            </span>
        </div>

        {/* Action buttons */}
        <div className='flex gap-2'>
            <Button variant='primary' className='flex-1'>
                <MessageCircle className='mr-2 w-4 h-4' />
                Tanya
            </Button>
            <Button variant='outline'>Detail</Button>
        </div>
    </div>
</div>
```

#### 4.2.4 Data Fetching

**Server Component** (fetch dari database):

```typescript
import { prisma } from '@/lib/prisma';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return <ProductsClient products={products} />;
}
```

**Client Component** (untuk interactivity):

```typescript
'use client';

export function ProductsClient({ products }) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = // ... filter logic

  return (
    <div>
      <CategoryFilter />
      <ProductGrid products={filtered} />
    </div>
  );
}
```

#### 4.2.5 Empty State

Jika tidak ada produk:

```typescript
{
    filteredProducts.length === 0 ? (
        <div className='text-center py-12'>
            <Package className='w-16 h-16 text-secondary-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-secondary-700 mb-2'>
                Belum ada produk
            </h3>
            <p className='text-secondary-600'>
                Produk dalam kategori ini sedang dalam proses update
            </p>
        </div>
    ) : (
        <ProductGrid products={filteredProducts} />
    );
}
```

---

### 4.3 GALLERY PAGE (Halaman Galeri)

**URL**: `http://localhost:3008/gallery`  
**Route**: `src/app/(public)/gallery/page.tsx`

#### 4.3.1 Features Utama

1. **Project Showcase**: Menampilkan portfolio project yang sudah selesai
2. **Category Filtering**: Filter berdasarkan kategori project
3. **Masonry/Grid Layout**: Layout yang menarik untuk showcase
4. **Project Details**: Info lengkap setiap project

#### 4.3.2 Category Filter

**Kategori Project**:

-   Semua
-   Residential (Hunian)
-   Commercial (Komersial)

```typescript
const categories = ['Semua', 'Residential', 'Commercial'];
const [activeFilter, setActiveFilter] = useState('Semua');
```

#### 4.3.3 Project Card

**Data yang Ditampilkan**:

-   Project image (main photo)
-   Project name
-   Location
-   Category badge
-   Brief description

```typescript
<div className='group relative overflow-hidden rounded-xl shadow-lg'>
    <Image
        src={project.imageUrl}
        alt={project.name}
        className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500'
    />

    {/* Overlay on hover */}
    <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
            <div className='flex items-center gap-2 mb-2'>
                <span className='bg-primary-600 px-3 py-1 rounded-full text-sm'>
                    {project.category}
                </span>
            </div>

            <h3 className='text-2xl font-bold mb-2'>{project.name}</h3>

            <div className='flex items-center text-sm mb-2'>
                <MapPin className='w-4 h-4 mr-1' />
                {project.location}
            </div>

            <p className='text-sm text-white/90 line-clamp-2'>
                {project.description}
            </p>

            <Button className='mt-4' size='sm'>
                Lihat Detail
            </Button>
        </div>
    </div>
</div>
```

#### 4.3.4 Grid Layout

**Responsive Grid**:

```typescript
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    {filteredProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
    ))}
</div>
```

**Alternative: Masonry Layout** (using CSS columns):

```css
.masonry-grid {
    column-count: 1;
    column-gap: 2rem;
}

@media (min-width: 768px) {
    .masonry-grid {
        column-count: 2;
    }
}

@media (min-width: 1024px) {
    .masonry-grid {
        column-count: 3;
    }
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 2rem;
}
```

---

**Lanjut ke bagian Services, About, Contact, dan Customizer di baris berikutnya...**

---

**Document Information**:

-   **Part**: 2 of 5
-   **Version**: 1.0
-   **Last Updated**: December 7, 2025
