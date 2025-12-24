# DOKUMENTASI LENGKAP WEBSITE PREMIUM KITCHEN SET

**Part 2B: Fitur Halaman Public (Lanjutan)**

---

[← Kembali ke Part 2A](./DOKUMENTASI-LENGKAP-PART-2A.md) | [Lanjut ke Part 3 →](./DOKUMENTASI-LENGKAP-PART-3.md)

---

### 4.4 SERVICES PAGE (Halaman Layanan)

**URL**: `http://localhost:3008/services`  
**Route**: `src/app/(public)/services/page.tsx`

#### 4.4.1 Hero Section

**Content**:

-   Judul: "Layanan Kami"
-   Subtitle: "Solusi lengkap untuk kebutuhan furniture Anda"
-   Background gradient primary

#### 4.4.2 Main Services

**4 Layanan Utama**:

##### **1. Custom Kitchen Set**

**Deskripsi Lengkap**:
Desain dan pembuatan kitchen set sesuai dengan kebutuhan dan gaya Anda. Dari konsultasi, pengukuran, desain 3D, hingga instalasi.

**Features**:

-   Free konsultasi dan survey
-   Desain 3D gratis
-   Material premium (Plywood, MDF, Solid Wood, HPL)
-   Pilihan finishing (Matte, Glossy, Duco, HPL)
-   Hardware berkualitas (Blum, Hafele, Huppe)
-   Garansi 5 tahun
-   Free instalasi (area Jakarta)

**Package Options**:

1. **Paket Basic**

    - Material: Plywood Standard
    - Hardware: Basic
    - Finishing: HPL
    - Harga: Mulai Rp 3jt/meter

2. **Paket Premium**

    - Material: MDF Premium
    - Hardware: Standard (soft-close)
    - Finishing: Duco/Glossy
    - Harga: Mulai Rp 5jt/meter

3. **Paket Luxury**
    - Material: Solid Wood
    - Hardware: Premium (Blum)
    - Finishing: Custom
    - Harga: Mulai Rp 8jt/meter

**Code Implementation**:

```typescript
<div className='bg-white rounded-xl shadow-lg p-8'>
    <div className='flex items-center mb-6'>
        <div className='w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center'>
            <Package className='w-8 h-8 text-primary-600' />
        </div>
        <div className='ml-4'>
            <h3 className='text-2xl font-bold text-secondary-900'>
                Custom Kitchen Set
            </h3>
            <p className='text-secondary-600'>
                Solusi lengkap untuk dapur impian Anda
            </p>
        </div>
    </div>

    <p className='text-secondary-700 mb-6'>
        Desain dan pembuatan kitchen set sesuai dengan kebutuhan dan gaya
        Anda...
    </p>

    {/* Features list */}
    <ul className='space-y-3 mb-6'>
        {features.map((feature) => (
            <li className='flex items-start'>
                <Check className='w-5 h-5 text-green-500 mr-2 mt-0.5' />
                <span>{feature}</span>
            </li>
        ))}
    </ul>

    {/* Package options */}
    <div className='grid grid-cols-3 gap-4 mb-6'>
        {packages.map((pkg) => (
            <div className='border-2 border-secondary-200 rounded-lg p-4 hover:border-primary-500 transition-colors'>
                <h4 className='font-bold mb-2'>{pkg.name}</h4>
                <p className='text-sm text-secondary-600 mb-3'>
                    {pkg.description}
                </p>
                <p className='text-xl font-bold text-primary-600'>
                    {pkg.price}
                </p>
            </div>
        ))}
    </div>

    <Button variant='primary' className='w-full'>
        <MessageCircle className='mr-2' />
        Konsultasi Gratis
    </Button>
</div>
```

##### **2. Custom Furniture**

**Deskripsi**:
Pembuatan berbagai jenis furniture custom sesuai kebutuhan seperti wardrobe, TV cabinet, meja, kursi, rak buku, dll.

**Jenis Furniture**:

-   Wardrobe/Lemari pakaian
-   TV Cabinet & Entertainment Unit
-   Meja kerja & belajar
-   Rak buku & display cabinet
-   Buffet & credenza
-   Partisi ruangan
-   Dan lainnya sesuai kebutuhan

**Material Options**:

-   Kayu solid (Jati, Mahoni, Merbau)
-   Plywood premium
-   MDF dengan HPL
-   Kombinasi material

**Proses**:

1. Konsultasi kebutuhan
2. Survey & pengukuran
3. Desain 2D/3D
4. Approval design
5. Produksi (2-4 minggu)
6. Finishing
7. Quality control
8. Instalasi

##### **3. Interior Design Consultation**

**Deskripsi**:
Layanan konsultasi design interior untuk residential maupun commercial dengan designer berpengalaman.

**Scope of Work**:

-   Space planning
-   Concept design
-   3D visualization
-   Material selection
-   Furniture recommendation
-   Color scheme
-   Lighting design
-   Budget planning

**Deliverables**:

-   Floor plan
-   3D renders (3-5 views)
-   Material board
-   Furniture list & specification
-   Budget estimation

**Investment**:

-   Residential: Rp 150k - 300k per m²
-   Commercial: Rp 200k - 500k per m²

##### **4. Installation & After Sales Service**

**Deskripsi**:
Tim instalasi profesional dan layanan purna jual untuk memastikan kepuasan customer.

**Installation Service**:

-   Professional installer team
-   Complete tools & equipment
-   Clean installation
-   Post-installation cleaning
-   Free untuk area Jakarta
-   Charged untuk luar Jakarta

**After Sales**:

-   Garansi 5 tahun produk
-   Garansi 1 tahun instalasi
-   Free service untuk minor issues
-   Spare parts availability
-   Maintenance tips & guide
-   24/7 customer support

**Maintenance Package** (Optional):

-   Regular cleaning
-   Hardware adjustment
-   Polishing & refinishing
-   Harga: Rp 500k - 2jt per visit

#### 4.4.3 Why Choose Us Section

**Keunggulan**:

1. **15+ Years Experience**

    - Berpengalaman sejak 2010
    - 500+ projects completed
    - Trusted by homeowners & developers

2. **Quality Materials**

    - Material premium dari supplier terpercaya
    - Certified & tested
    - Eco-friendly options available

3. **Professional Team**

    - Certified designers
    - Skilled craftsmen
    - Experienced installers

4. **Competitive Price**

    - Best value for money
    - Transparent pricing
    - No hidden costs

5. **Warranty & Support**

    - 5 years product warranty
    - After sales service
    - Lifetime consultation

6. **On-Time Delivery**
    - Clear timeline
    - Project management
    - Regular updates

#### 4.4.4 Process Timeline

Visual timeline menunjukkan durasi setiap tahap:

```
Konsultasi → Survey → Design → Production → Installation → After Sales
  (1-2d)     (1d)    (3-5d)    (2-4w)        (1-3d)        (5 years)
```

#### 4.4.5 CTA Section

**Call to Action**:

```typescript
<div className='bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 rounded-2xl text-center'>
    <h2 className='text-3xl font-bold mb-4'>Siap Memulai Project Anda?</h2>
    <p className='text-xl mb-8'>
        Konsultasi gratis dengan designer kami sekarang
    </p>
    <div className='flex gap-4 justify-center'>
        <Button variant='secondary' size='lg'>
            <Phone className='mr-2' />
            Hubungi Kami
        </Button>
        <Button
            variant='outline'
            size='lg'
            className='border-white text-white hover:bg-white hover:text-primary-600'
        >
            <MessageCircle className='mr-2' />
            WhatsApp
        </Button>
    </div>
</div>
```

---

### 4.5 ABOUT PAGE (Halaman Tentang Kami)

**URL**: `http://localhost:3008/about`  
**Route**: `src/app/(public)/about/page.tsx`

#### 4.5.1 Hero Section

**Content**:

-   Judul: "Tentang Kami"
-   Subtitle: "Lebih dari 15 tahun menciptakan furniture berkualitas"

#### 4.5.2 Company Story

**Our Story Section**:

```typescript
<section className='section-padding bg-white'>
    <div className='container-custom'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
                <h2 className='heading-2 mb-6'>Cerita Kami</h2>
                <div className='space-y-4 text-secondary-700'>
                    <p>
                        Premium Kitchen Set didirikan pada tahun 2010 dengan
                        visi untuk menyediakan solusi furniture berkualitas
                        tinggi dengan harga yang kompetitif. Dimulai dari
                        workshop kecil dengan 3 orang craftsman, kini kami telah
                        berkembang menjadi perusahaan furniture terpercaya
                        dengan tim lebih dari 50 profesional.
                    </p>
                    <p>
                        Selama lebih dari 15 tahun, kami telah menyelesaikan
                        500+ project untuk residential dan commercial.
                        Kepercayaan customer adalah aset terbesar kami, dan kami
                        terus berkomitmen untuk memberikan hasil terbaik di
                        setiap project.
                    </p>
                    <p>
                        Dengan pengalaman, skill, dan dedikasi tim kami, tidak
                        ada project yang terlalu sulit. Dari kitchen set
                        minimalis modern hingga furniture klasik mewah, kami
                        siap mewujudkan impian Anda.
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <Image src='/about-1.jpg' className='rounded-xl' />
                <Image src='/about-2.jpg' className='rounded-xl' />
                <Image src='/about-3.jpg' className='rounded-xl' />
                <Image src='/about-4.jpg' className='rounded-xl' />
            </div>
        </div>
    </div>
</section>
```

#### 4.5.3 Mission & Vision

**Visi (Vision)**:

> "Menjadi perusahaan furniture #1 di Indonesia yang dikenal dengan kualitas premium, inovasi design, dan kepuasan customer."

**Misi (Mission)**:

1. Menyediakan furniture berkualitas tinggi dengan harga kompetitif
2. Memberikan layanan terbaik dari konsultasi hingga after sales
3. Terus berinovasi dalam design dan material
4. Membangun tim profesional yang skilled dan passionate
5. Berkontribusi pada industri furniture Indonesia

```typescript
<section className='section-padding bg-secondary-50'>
    <div className='container-custom'>
        <div className='grid md:grid-cols-2 gap-12'>
            {/* Vision */}
            <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6'>
                    <Eye className='w-8 h-8 text-primary-600' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>Visi Kami</h3>
                <p className='text-lg text-secondary-700 italic'>
                    "Menjadi perusahaan furniture #1 di Indonesia yang dikenal
                    dengan kualitas premium, inovasi design, dan kepuasan
                    customer."
                </p>
            </div>

            {/* Mission */}
            <div className='bg-white p-8 rounded-xl shadow-lg'>
                <div className='w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6'>
                    <Target className='w-8 h-8 text-primary-600' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>Misi Kami</h3>
                <ul className='space-y-3'>
                    {missions.map((mission, index) => (
                        <li className='flex items-start'>
                            <span className='flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5'>
                                {index + 1}
                            </span>
                            <span className='text-secondary-700'>
                                {mission}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
</section>
```

#### 4.5.4 Core Values

**5 Nilai Inti Perusahaan**:

1. **Quality First** 🏆

    - Kualitas adalah prioritas utama
    - Tidak kompromi dalam material dan workmanship
    - Quality control di setiap tahap produksi

2. **Customer Satisfaction** 😊

    - Customer adalah raja
    - Dengarkan kebutuhan dan keinginan
    - Exceed expectations

3. **Innovation** 💡

    - Selalu update dengan trend terkini
    - Explore material dan teknik baru
    - Creative design solutions

4. **Integrity** 🤝

    - Jujur dan transparan
    - Keep promises
    - Fair pricing

5. **Teamwork** 👥
    - Kolaborasi antar tim
    - Support dan belajar bersama
    - Achieve goals together

```typescript
<section className='section-padding bg-white'>
    <div className='container-custom'>
        <h2 className='heading-2 text-center mb-12'>Nilai-Nilai Kami</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {values.map((value, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className='bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border-2 border-primary-100 hover:border-primary-300 transition-colors'
                >
                    <div className='text-4xl mb-4'>{value.icon}</div>
                    <h3 className='text-xl font-bold mb-3'>{value.title}</h3>
                    <p className='text-secondary-700'>{value.description}</p>
                </motion.div>
            ))}
        </div>
    </div>
</section>
```

#### 4.5.5 Team Section

**Our Team**:

```typescript
const team = [
    {
        name: 'John Doe',
        role: 'Founder & CEO',
        photo: '/team/ceo.jpg',
        bio: '15+ years experience in furniture industry',
    },
    {
        name: 'Jane Smith',
        role: 'Head Designer',
        photo: '/team/designer.jpg',
        bio: 'Award-winning interior designer',
    },
    {
        name: 'Mike Johnson',
        role: 'Production Manager',
        photo: '/team/production.jpg',
        bio: 'Expert craftsman with 20+ years experience',
    },
    {
        name: 'Sarah Williams',
        role: 'Customer Relations',
        photo: '/team/customer.jpg',
        bio: 'Dedicated to customer satisfaction',
    },
];

<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
    {team.map((member) => (
        <div className='text-center group'>
            <div className='relative mb-4 overflow-hidden rounded-xl'>
                <Image
                    src={member.photo}
                    alt={member.name}
                    className='w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                    <div className='absolute bottom-4 left-0 right-0 text-white text-sm px-4'>
                        {member.bio}
                    </div>
                </div>
            </div>
            <h4 className='font-bold text-lg'>{member.name}</h4>
            <p className='text-secondary-600'>{member.role}</p>
        </div>
    ))}
</div>;
```

#### 4.5.6 Company Statistics

**Achievements in Numbers**:

```typescript
<section className='section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white'>
    <div className='container-custom'>
        <h2 className='heading-2 text-center mb-12'>Pencapaian Kami</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>15+</div>
                <div className='text-lg text-white/90'>Tahun Pengalaman</div>
            </div>

            <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>500+</div>
                <div className='text-lg text-white/90'>Project Selesai</div>
            </div>

            <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>50+</div>
                <div className='text-lg text-white/90'>Tim Profesional</div>
            </div>

            <div className='text-center'>
                <div className='text-5xl font-bold mb-2'>100%</div>
                <div className='text-lg text-white/90'>Kepuasan Customer</div>
            </div>
        </div>
    </div>
</section>
```

---

### 4.6 CONTACT PAGE (Halaman Kontak)

**URL**: `http://localhost:3008/contact`  
**Route**: `src/app/(public)/contact/page.tsx`

#### 4.6.1 Hero Section

**Content**:

-   Judul: "Hubungi Kami"
-   Subtitle: "Siap membantu mewujudkan furniture impian Anda. Konsultasi gratis!"

#### 4.6.2 Contact Information

**Company Info**:

1. **Address** 📍

    - Jl. Furniture Raya No. 123
    - Jakarta Selatan, 12345
    - Indonesia

2. **Phone** 📞

    - Main: +62 812-3456-7890
    - Office: +62 21-1234-5678
    - WhatsApp: +62 812-3456-7890

3. **Email** 📧

    - General: info@premiumkitchen.com
    - Sales: sales@premiumkitchen.com
    - Support: support@premiumkitchen.com

4. **Business Hours** 🕐
    - Senin - Jumat: 08:00 - 17:00
    - Sabtu: 08:00 - 15:00
    - Minggu & Hari Libur: Tutup

```typescript
<div className='space-y-6'>
    <div className='flex items-start space-x-4'>
        <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0'>
            <MapPin className='w-6 h-6 text-primary-600' />
        </div>
        <div>
            <h3 className='font-semibold text-secondary-900 mb-1'>Alamat</h3>
            <p className='text-secondary-600'>
                Jl. Furniture Raya No. 123
                <br />
                Jakarta Selatan, 12345
            </p>
        </div>
    </div>

    {/* Similar pattern for Phone, Email, Hours */}
</div>
```

#### 4.6.3 WhatsApp Integration

**Chat via WhatsApp Box**:

```typescript
<div className='bg-primary-50 p-6 rounded-xl'>
    <h3 className='font-semibold text-secondary-900 mb-3'>Chat via WhatsApp</h3>
    <p className='text-secondary-600 mb-4'>
        Hubungi kami langsung via WhatsApp untuk respons lebih cepat
    </p>
    <Button variant='primary' className='w-full' onClick={openWhatsApp}>
        <MessageCircle className='mr-2 w-5 h-5' />
        Chat WhatsApp
    </Button>
</div>
```

**WhatsApp Function**:

```typescript
const whatsappNumber = '6281234567890';
const whatsappMessage =
    'Halo Premium Kitchen! Saya tertarik untuk konsultasi mengenai furniture.';

const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
    )}`;
    window.open(url, '_blank');
};
```

#### 4.6.4 Contact Form

**Form Fields**:

1. **Nama Lengkap** (required)

    - Type: text
    - Validation: min 2 characters

2. **Email** (required)

    - Type: email
    - Validation: valid email format

3. **Nomor Telepon** (required)

    - Type: tel
    - Validation: min 10 digits

4. **Subjek** (required)

    - Type: text
    - Validation: min 5 characters

5. **Pesan** (required)

    - Type: textarea
    - Validation: min 10 characters

6. **Jenis Project** (optional)
    - Type: select
    - Options: Kitchen Set, Wardrobe, TV Cabinet, Custom, Lainnya

**Form Implementation**:

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon tidak valid'),
    subject: z.string().min(5, 'Subjek minimal 5 karakter'),
    message: z.string().min(10, 'Pesan minimal 10 karakter'),
    projectType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(
                    'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
                );
                reset();
            } else {
                toast.error('Gagal mengirim pesan. Silakan coba lagi.');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Input
                label='Nama Lengkap'
                placeholder='Masukkan nama lengkap'
                error={errors.name?.message}
                {...register('name')}
            />

            <Input
                label='Email'
                type='email'
                placeholder='nama@email.com'
                error={errors.email?.message}
                {...register('email')}
            />

            <Input
                label='Nomor Telepon'
                type='tel'
                placeholder='08123456789'
                error={errors.phone?.message}
                {...register('phone')}
            />

            <Input
                label='Subjek'
                placeholder='Topik pesan Anda'
                error={errors.subject?.message}
                {...register('subject')}
            />

            <div>
                <label className='block text-sm font-medium text-secondary-700 mb-2'>
                    Jenis Project (Opsional)
                </label>
                <select
                    {...register('projectType')}
                    className='w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:outline-none transition-colors'
                >
                    <option value=''>Pilih jenis project</option>
                    <option value='Kitchen Set'>Kitchen Set</option>
                    <option value='Wardrobe'>Wardrobe</option>
                    <option value='TV Cabinet'>TV Cabinet</option>
                    <option value='Custom'>Custom Furniture</option>
                    <option value='Lainnya'>Lainnya</option>
                </select>
            </div>

            <Textarea
                label='Pesan'
                placeholder='Tulis pesan Anda di sini...'
                rows={6}
                error={errors.message?.message}
                {...register('message')}
            />

            <Button
                type='submit'
                variant='primary'
                className='w-full'
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className='mr-2 w-5 h-5 animate-spin' />
                        Mengirim...
                    </>
                ) : (
                    <>
                        <Send className='mr-2 w-5 h-5' />
                        Kirim Pesan
                    </>
                )}
            </Button>
        </form>
    );
}
```

#### 4.6.5 Contact API

**API Route**: `src/app/api/contact/route.ts`

**Functionality**:

1. Receive form data
2. Validate data
3. Save to database (Inquiry model)
4. Send email notification to admin
5. Send auto-reply to customer
6. Return success response

**Implementation**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate required fields
        if (
            !data.name ||
            !data.email ||
            !data.phone ||
            !data.subject ||
            !data.message
        ) {
            return NextResponse.json(
                { error: 'Semua field wajib diisi' },
                { status: 400 }
            );
        }

        // Save to database
        const inquiry = await prisma.inquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                projectType: data.projectType,
                status: 'new',
            },
        });

        // Send email to admin
        await sendEmail({
            to: process.env.ADMIN_EMAIL!,
            subject: `New Inquiry: ${data.subject}`,
            html: `
        <h2>New Inquiry Received</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Project Type:</strong> ${
            data.projectType || 'Not specified'
        }</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
        });

        // Send auto-reply to customer
        await sendEmail({
            to: data.email,
            subject: 'Terima kasih atas inquiry Anda - Premium Kitchen Set',
            html: `
        <h2>Halo ${data.name},</h2>
        <p>Terima kasih telah menghubungi Premium Kitchen Set.</p>
        <p>Kami telah menerima pesan Anda dan akan segera menghubungi Anda dalam waktu 1x24 jam.</p>
        <h3>Detail Inquiry Anda:</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <br/>
        <p>Salam,</p>
        <p><strong>Premium Kitchen Set Team</strong></p>
        <p>Phone: +62 812-3456-7890</p>
        <p>Email: info@premiumkitchen.com</p>
      `,
        });

        return NextResponse.json({ success: true, inquiry });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Gagal mengirim pesan' },
            { status: 500 }
        );
    }
}
```

---

### 4.7 CUSTOMIZER PAGE (Kalkulator Harga Kitchen Set)

**URL**: `http://localhost:3008/customizer`  
**Route**: `src/app/(public)/customizer/page.tsx`  
**Component**: `src/components/ProductCustomizer.tsx`

#### 4.7.1 Overview

**Deskripsi**:
Interactive price calculator yang memungkinkan customer mendesain kitchen set mereka sendiri dan mendapatkan estimasi harga real-time.

**Features**:

-   Input dimensi (width, height, depth)
-   Pilih material
-   Pilih finishing
-   Pilih hardware tier
-   Optional: Installation & Delivery
-   Real-time price calculation
-   Copy quote to clipboard

#### 4.7.2 Dimensions Input

**Parameters**:

-   **Width (Lebar)**: 100-600 cm
-   **Height (Tinggi)**: 100-300 cm
-   **Depth (Kedalaman)**: 30-100 cm

**Calculation**:

```typescript
// Total area calculation (all 6 faces)
const totalArea = useMemo(() => {
    const { width, height, depth } = dimensions;
    const front = (width * height) / 10000; // cm² to m²
    const side = (depth * height) / 10000;
    const top = (width * depth) / 10000;
    return front * 2 + side * 2 + top * 2;
}, [dimensions]);
```

**UI**:

```typescript
<div className='grid grid-cols-3 gap-4'>
  <div>
    <label className='block text-sm font-medium text-gray-700 mb-2'>
      Width (cm)
    </label>
    <input
      type='number'
      min='100'
      max='600'
      value={dimensions.width}
      onChange={(e) => setDimensions({
        ...dimensions,
        width: parseInt(e.target.value) || 0,
      })}
      className='w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-500 focus:outline-none transition-colors'
    />
  </div>
  {/* Similar for height and depth */}
</div>

<div className='mt-4 p-4 bg-primary-50 rounded-lg'>
  <p className='text-sm text-secondary-700'>
    Total area: <span className='font-bold text-primary-600'>{totalArea.toFixed(2)} m²</span>
  </p>
</div>
```

#### 4.7.3 Material Selection

**Materials Available**:

1. **Plywood Standard**

    - Price: Rp 250,000/m²
    - Icon: 🪵
    - Description: Plywood berkualitas baik untuk budget standard

2. **MDF Premium**

    - Price: Rp 350,000/m²
    - Icon: 📦
    - Description: MDF premium dengan density tinggi

3. **Solid Wood**

    - Price: Rp 650,000/m²
    - Icon: 🌳
    - Description: Kayu solid premium (mahoni/jati)

4. **HPL Coating**
    - Price: Rp 450,000/m²
    - Icon: ✨
    - Description: Plywood dengan coating HPL premium

**UI Grid**:

```typescript
<div className='grid grid-cols-2 gap-4'>
    {materials.map((material) => (
        <button
            key={material.id}
            onClick={() => setSelectedMaterial(material.id)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedMaterial === material.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
            }`}
        >
            <div className='text-4xl mb-3'>{material.image}</div>
            <h3 className='font-bold text-lg mb-1'>{material.name}</h3>
            <p className='text-primary-600 font-semibold'>
                Rp {material.pricePerSqm.toLocaleString('id-ID')}/m²
            </p>
            {selectedMaterial === material.id && (
                <Check className='w-6 h-6 text-primary-600 mt-2' />
            )}
        </button>
    ))}
</div>
```

#### 4.7.4 Finish Selection

**Finish Options**:

1. **Matte Finish**

    - Modifier: 1.0× (no additional cost)
    - Clean and modern look

2. **Glossy Finish**

    - Modifier: 1.15× (+15%)
    - Shiny and elegant

3. **Textured Finish**

    - Modifier: 1.25× (+25%)
    - Unique texture patterns

4. **Lacquer Finish**
    - Modifier: 1.35× (+35%)
    - Premium glossy finish with UV protection

**Price Calculation**:

```typescript
const finishCost = useMemo(() => {
    const material = materials.find((m) => m.id === selectedMaterial);
    const finish = finishes.find((f) => f.id === selectedFinish);
    if (!material || !finish) return 0;

    const baseCost = totalArea * material.pricePerSqm;
    return baseCost * finish.priceModifier;
}, [selectedMaterial, selectedFinish, totalArea]);
```

#### 4.7.5 Hardware Selection

**Hardware Tiers**:

1. **Basic Hardware**

    - Price: Rp 500,000
    - Local brand, manual close

2. **Standard Hardware**

    - Price: Rp 1,000,000
    - Soft-close hinges, local premium brand

3. **Premium Hardware**

    - Price: Rp 2,000,000
    - Blum/Hafele, soft-close, push-to-open

4. **Luxury Hardware**
    - Price: Rp 3,500,000
    - Blum Aventos, servo-drive, full automation

#### 4.7.6 Additional Services

**1. Professional Installation**

-   Cost: 15% of (finish cost + hardware cost)
-   Includes: Professional team, complete tools, post-installation cleaning

**2. Delivery**

-   Based on volume (width × height × depth)
-   Small (< 2m³): Rp 200,000
-   Medium (2-5m³): Rp 400,000
-   Large (> 5m³): Rp 600,000

**Calculation**:

```typescript
const deliveryCost = useMemo(() => {
    if (!includeDelivery) return 0;
    const volume =
        (dimensions.width * dimensions.height * dimensions.depth) / 1000000; // to m³

    if (volume < 2) return 200000;
    if (volume < 5) return 400000;
    return 600000;
}, [includeDelivery, dimensions]);

const installationCost = useMemo(() => {
    if (!includeInstallation) return 0;
    const hardware = hardwareOptions.find((h) => h.id === selectedHardware);
    return (finishCost + (hardware?.price || 0)) * 0.15;
}, [includeInstallation, finishCost, selectedHardware]);
```

#### 4.7.7 Price Summary Sidebar

**Real-time Summary**:

```typescript
<div className='bg-primary-600 text-white p-6 rounded-xl sticky top-24'>
    <div className='flex items-center mb-6'>
        <Calculator className='w-6 h-6 mr-2' />
        <h3 className='text-2xl font-bold'>Price Summary</h3>
    </div>

    {/* Material */}
    <div className='flex justify-between mb-3 pb-3 border-b border-white/20'>
        <span>Material</span>
        <span className='font-semibold'>
            Rp {(totalArea * selectedMaterialPrice).toLocaleString('id-ID')}
        </span>
    </div>

    {/* Hardware */}
    <div className='flex justify-between mb-3 pb-3 border-b border-white/20'>
        <span>Hardware</span>
        <span className='font-semibold'>
            Rp {selectedHardwarePrice.toLocaleString('id-ID')}
        </span>
    </div>

    {/* Installation */}
    {includeInstallation && (
        <div className='flex justify-between mb-3 pb-3 border-b border-white/20'>
            <span>Installation</span>
            <span className='font-semibold'>
                Rp {installationCost.toLocaleString('id-ID')}
            </span>
        </div>
    )}

    {/* Delivery */}
    {includeDelivery && (
        <div className='flex justify-between mb-3 pb-3 border-b border-white/20'>
            <span>Delivery</span>
            <span className='font-semibold'>
                Rp {deliveryCost.toLocaleString('id-ID')}
            </span>
        </div>
    )}

    {/* Total */}
    <div className='mt-6 pt-6 border-t-2 border-white/30'>
        <div className='flex justify-between items-center'>
            <span className='text-lg'>TOTAL PRICE</span>
            <span className='text-3xl font-bold'>
                Rp {totalPrice.toLocaleString('id-ID')}+
            </span>
        </div>
    </div>

    {/* Request Quote Button */}
    <button
        onClick={handleRequestQuote}
        className='w-full mt-6 bg-white text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
    >
        Request Quote
    </button>

    <p className='text-xs text-white/80 mt-4 text-center'>
        * Prices are estimates. Final quote may vary based on specific
        requirements.
    </p>
</div>
```

#### 4.7.8 Request Quote Function

**Copy to Clipboard**:

```typescript
const handleRequestQuote = () => {
    const material = materials.find((m) => m.id === selectedMaterial);
    const finish = finishes.find((f) => f.id === selectedFinish);
    const hardware = hardwareOptions.find((h) => h.id === selectedHardware);

    const quoteDetails = `
KITCHEN SET QUOTE - Premium Kitchen Set

DIMENSIONS:
Width: ${dimensions.width} cm
Height: ${dimensions.height} cm
Depth: ${dimensions.depth} cm
Total Area: ${totalArea.toFixed(2)} m²

SPECIFICATIONS:
Material: ${material?.name} (Rp ${material?.pricePerSqm.toLocaleString(
        'id-ID'
    )}/m²)
Finish: ${finish?.name}
Hardware: ${hardware?.name} (Rp ${hardware?.price.toLocaleString('id-ID')})

PRICING BREAKDOWN:
Material Cost: Rp ${(totalArea * material!.pricePerSqm).toLocaleString('id-ID')}
After Finish: Rp ${finishCost.toLocaleString('id-ID')}
Hardware: Rp ${hardware!.price.toLocaleString('id-ID')}
${
    includeInstallation
        ? `Installation: Rp ${installationCost.toLocaleString('id-ID')}`
        : ''
}
${includeDelivery ? `Delivery: Rp ${deliveryCost.toLocaleString('id-ID')}` : ''}

TOTAL: Rp ${totalPrice.toLocaleString('id-ID')}

Contact us for detailed consultation!
Phone: +62 812-3456-7890
Email: info@premiumkitchen.com
`;

    navigator.clipboard.writeText(quoteDetails);
    toast.success('Quote copied to clipboard! Contact us to proceed.');
};
```

---

### 4.8 FLOATING WHATSAPP BUTTON

**Component**: `src/components/WhatsAppButton.tsx`  
**Visibility**: All public pages

#### 4.8.1 Features

-   Fixed position (bottom-right)
-   WhatsApp brand color (#25D366)
-   Pulse animation
-   Hover tooltip
-   Click → Open WhatsApp with pre-filled message

#### 4.8.2 Implementation

```typescript
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const whatsappNumber = '6281234567890';
    const whatsappMessage =
        'Halo Premium Kitchen! Saya tertarik untuk konsultasi mengenai furniture.';

    const openWhatsApp = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openWhatsApp}
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

---

**Lanjut ke Part 3 untuk Admin Dashboard →**

---

**Document Information**:

-   **Part**: 2B of 5
-   **Version**: 1.0
-   **Last Updated**: December 7, 2025
