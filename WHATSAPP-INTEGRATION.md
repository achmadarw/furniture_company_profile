# WhatsApp Integration Guide

## 📱 Overview

Aplikasi ini terintegrasi dengan WhatsApp untuk memudahkan customer menghubungi perusahaan langsung. WhatsApp integration tersedia di beberapa tempat strategis di website.

---

## 🎯 WhatsApp Button Locations

### 1. **Floating WhatsApp Button** (Semua Halaman Public)

-   **Lokasi**: Kanan bawah layar (fixed position)
-   **File**: `src/components/WhatsAppButton.tsx`
-   **Features**:
    -   Floating button dengan warna hijau WhatsApp (#25D366)
    -   Animasi pulse untuk menarik perhatian
    -   Tooltip muncul saat hover
    -   Responsive di semua ukuran layar
    -   Tersedia di semua halaman public (beranda, produk, galeri, layanan, tentang, kontak, customizer)

### 2. **Contact Page - WhatsApp Chat Box**

-   **Lokasi**: Halaman Kontak (`/contact`)
-   **File**: `src/app/(public)/contact/page.tsx`
-   **Features**:
    -   Box khusus untuk WhatsApp di bagian contact info
    -   Tombol "Chat WhatsApp" dengan style primary
    -   Pesan pre-filled untuk konsultasi

### 3. **Homepage - Call to Action Section**

-   **Lokasi**: Halaman Beranda (bagian bawah)
-   **File**: `src/components/sections/CallToAction.tsx`
-   **Features**:
    -   Tombol WhatsApp besar di CTA section
    -   Phone number yang klik langsung buka WhatsApp
    -   Tombol "Hubungi Kami" link ke halaman contact

---

## ⚙️ Configuration

### WhatsApp Number Format

Nomor WhatsApp harus dalam format internasional tanpa simbol `+` dan tanpa spasi:

```javascript
// ✅ CORRECT
const whatsappNumber = '6281234567890';
// Format: countryCode + number
// Indonesia (62) + 81234567890

// ❌ WRONG
const whatsappNumber = '+62 812-3456-7890'; // Jangan pakai +, spasi, atau dash
```

### Update Nomor WhatsApp

Edit nomor WhatsApp di 3 lokasi:

1. **Floating Button**: `src/components/WhatsAppButton.tsx`

```typescript
const whatsappNumber = '6281234567890'; // Ganti dengan nomor Anda
```

2. **Contact Page**: `src/app/(public)/contact/page.tsx`

```typescript
const whatsappNumber = '6281234567890'; // Ganti dengan nomor Anda
```

3. **Call to Action**: `src/components/sections/CallToAction.tsx`

```typescript
const whatsappNumber = '6281234567890'; // Ganti dengan nomor Anda
```

### Customize Pre-filled Message

Edit pesan default yang akan muncul saat customer klik tombol WhatsApp:

```typescript
// Floating Button & Contact Page
const whatsappMessage =
    'Halo Premium Kitchen! Saya tertarik untuk konsultasi mengenai furniture.';

// Call to Action
const whatsappMessage =
    'Halo Premium Kitchen! Saya tertarik untuk konsultasi gratis mengenai furniture.';
```

**Tips Pesan**:

-   Gunakan bahasa yang sopan dan ramah
-   Sebutkan nama perusahaan
-   Jelas menyebutkan tujuan (konsultasi, inquiry, dll)
-   Maksimal 2-3 kalimat

---

## 🔧 Technical Implementation

### How It Works

Semua tombol WhatsApp menggunakan WhatsApp API URL format:

```
https://wa.me/{number}?text={message}
```

Example:

```javascript
const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
    )}`;
    window.open(url, '_blank');
};
```

### Component Structure

#### 1. WhatsAppButton Component

```typescript
// src/components/WhatsAppButton.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
    const whatsappNumber = '6281234567890';
    const whatsappMessage = 'Halo Premium Kitchen! ...';

    const openWhatsApp = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            onClick={openWhatsApp}
            className='fixed bottom-6 right-6 z-40 bg-[#25D366] ...'
        >
            <MessageCircle className='w-8 h-8' />
        </motion.button>
    );
}
```

#### 2. Added to Public Layout

```typescript
// src/app/(public)/layout.tsx
import WhatsAppButton from '@/components/WhatsAppButton';

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton /> {/* Floating button */}
        </>
    );
}
```

---

## 🎨 Styling

### WhatsApp Brand Colors

```css
/* Official WhatsApp Green */
background: #25d366;
hover: #20ba5a;

/* Text */
color: #ffffff;
```

### Floating Button Styles

-   **Size**: 64px × 64px (w-16 h-16)
-   **Position**: Fixed bottom-right (bottom-6 right-6)
-   **Z-index**: 40 (di atas konten, di bawah navbar/modal)
-   **Shadow**: shadow-lg untuk depth
-   **Animation**:
    -   Scale animation on hover/tap
    -   Pulse animation untuk menarik perhatian

### Responsive Behavior

```typescript
// Mobile (< 640px)
bottom: 1.5rem (24px)
right: 1.5rem (24px)
size: 64px × 64px

// Desktop (> 640px)
Same positioning
Tooltip muncul di sebelah kiri button
```

---

## 📱 User Experience Flow

### Customer Journey

1. **Discovery**:

    - Customer melihat floating WhatsApp button di pojok kanan bawah
    - Atau melihat tombol WhatsApp di Contact page atau CTA section

2. **Interaction**:

    - Customer hover → Tooltip muncul "Chat via WhatsApp"
    - Customer klik → Browser membuka WhatsApp (web atau app)

3. **WhatsApp Opens**:

    - Desktop: Membuka web.whatsapp.com atau WhatsApp desktop app
    - Mobile: Membuka WhatsApp mobile app
    - Pesan pre-filled sudah terisi otomatis
    - Customer tinggal klik Send

4. **Conversation**:
    - Customer terkoneksi langsung dengan nomor bisnis
    - Admin menerima pesan di WhatsApp Business
    - Percakapan dimulai

---

## 🔒 Security & Privacy

### Safe Implementation

✅ **Menggunakan `window.open(url, '_blank')`**

-   Membuka di tab baru
-   Tidak mengalihkan halaman utama
-   User bisa kembali ke website dengan mudah

✅ **URL Encoding**

-   Pesan di-encode dengan `encodeURIComponent()`
-   Aman dari XSS dan special characters
-   Support emoji dan karakter non-ASCII

✅ **No Data Collection**

-   Tidak menyimpan data customer
-   Langsung redirect ke WhatsApp
-   Privacy-friendly

---

## 📊 Analytics & Tracking (Optional)

Untuk tracking berapa banyak customer yang klik WhatsApp button, tambahkan Google Analytics atau tracking lainnya:

```typescript
const openWhatsApp = () => {
    // Track event (jika pakai Google Analytics)
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: 'WhatsApp Button Click',
        });
    }

    // Open WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
    )}`;
    window.open(url, '_blank');
};
```

---

## 🧪 Testing

### Test Checklist

-   [ ] Floating button muncul di semua halaman public
-   [ ] Tombol WhatsApp di Contact page berfungsi
-   [ ] Tombol WhatsApp di CTA section berfungsi
-   [ ] Nomor WhatsApp benar (format internasional)
-   [ ] Pesan pre-filled muncul dengan benar
-   [ ] Membuka WhatsApp Web di desktop
-   [ ] Membuka WhatsApp App di mobile
-   [ ] Tooltip muncul saat hover (desktop)
-   [ ] Animation berjalan smooth
-   [ ] Responsive di mobile, tablet, desktop

### Test URLs

```
Floating Button: Semua halaman
- http://localhost:3008/
- http://localhost:3008/products
- http://localhost:3008/gallery
- http://localhost:3008/services
- http://localhost:3008/about
- http://localhost:3008/contact
- http://localhost:3008/customizer

Contact Page Box:
- http://localhost:3008/contact

CTA Section:
- http://localhost:3008/ (scroll to bottom)
```

---

## 🚀 Production Deployment

### Before Going Live

1. **Update WhatsApp Number**

    - Ganti `6281234567890` dengan nomor bisnis asli
    - Pastikan nomor aktif dan bisa menerima pesan
    - Test dari device yang berbeda

2. **Verify WhatsApp Business**

    - Gunakan WhatsApp Business (bukan personal)
    - Setup auto-reply dan quick replies
    - Set business hours

3. **Test dari External**

    - Test dari device lain (bukan development machine)
    - Test dari mobile dan desktop
    - Verify pesan diterima dengan baik

4. **Monitor Performance**
    - Track conversion rate (berapa yang klik)
    - Response time (berapa lama reply)
    - Customer satisfaction

---

## 🎯 Best Practices

### WhatsApp Business Setup

1. **Profile Setup**:

    - Business name: Premium Kitchen Set
    - Description: Jelas dan informatif
    - Business hours: Sesuai jam operasional
    - Address: Alamat workshop/showroom

2. **Auto Messages**:

    - Greeting message: "Halo! Terima kasih telah menghubungi Premium Kitchen Set..."
    - Away message: (di luar jam kerja)
    - Quick replies: FAQ umum

3. **Catalog**:
    - Upload produk ke WhatsApp Catalog
    - Include harga dan deskripsi
    - High-quality product photos

### Response Strategy

-   **Fast Response**: Target < 5 menit during business hours
-   **Professional**: Gunakan bahasa yang sopan
-   **Helpful**: Siap menjawab pertanyaan dan memberi saran
-   **Follow-up**: Jangan biarkan customer menunggu tanpa jawaban

---

## 🐛 Troubleshooting

### Button Tidak Muncul

**Problem**: Floating WhatsApp button tidak terlihat

**Solution**:

1. Check `src/app/(public)/layout.tsx` - pastikan `<WhatsAppButton />` ada
2. Clear cache browser (Ctrl+Shift+R)
3. Check console untuk error
4. Verify z-index tidak tertutup element lain

### WhatsApp Tidak Terbuka

**Problem**: Klik tombol tidak membuka WhatsApp

**Solution**:

1. Check format nomor (harus tanpa + dan spasi)
2. Test di browser berbeda
3. Check console untuk JavaScript errors
4. Verify `window.open()` tidak di-block oleh popup blocker

### Pesan Tidak Pre-filled

**Problem**: WhatsApp terbuka tapi pesan kosong

**Solution**:

1. Check `encodeURIComponent()` untuk special characters
2. Pastikan pesan tidak terlalu panjang (max ~2000 chars)
3. Test dengan pesan sederhana dulu

### Mobile App Tidak Terbuka

**Problem**: Di mobile buka WhatsApp Web, bukan app

**Solution**:

1. Pastikan WhatsApp app terinstall di device
2. Update WhatsApp ke versi terbaru
3. Check browser support untuk `wa.me` deep linking

---

## 📝 Customization Ideas

### Advanced Features (Future Enhancement)

1. **Dynamic Messages**:

```typescript
// Pesan berbeda berdasarkan halaman
const getMessage = (page: string) => {
    switch (page) {
        case 'products':
            return 'Halo! Saya tertarik dengan produk kitchen set Anda.';
        case 'customizer':
            return 'Halo! Saya sudah mencoba customizer dan ingin konsultasi.';
        default:
            return 'Halo Premium Kitchen! Saya tertarik untuk konsultasi.';
    }
};
```

2. **Include Quote from Customizer**:

```typescript
// Di halaman customizer, sertakan detail quote
const message = `Halo! Saya tertarik dengan kitchen set dengan spesifikasi:
- Ukuran: ${width}×${height}×${depth} cm
- Material: ${selectedMaterial}
- Total: Rp ${totalPrice.toLocaleString()}

Mohon info lebih lanjut.`;
```

3. **Multiple WhatsApp Numbers**:

```typescript
// Berdasarkan wilayah atau departemen
const getWhatsAppNumber = (department: string) => {
    switch (department) {
        case 'sales':
            return '6281234567890';
        case 'support':
            return '6281234567891';
        case 'custom':
            return '6281234567892';
        default:
            return '6281234567890';
    }
};
```

---

## ✅ Summary

WhatsApp integration sudah lengkap dengan:

-   ✅ Floating button di semua halaman public
-   ✅ Dedicated WhatsApp section di Contact page
-   ✅ CTA buttons di homepage
-   ✅ Pre-filled messages untuk kemudahan customer
-   ✅ Responsive design untuk mobile & desktop
-   ✅ Brand-consistent styling (WhatsApp green)
-   ✅ Smooth animations dan UX

**Update nomor WhatsApp di 3 file** sebelum production deployment!

---

**Last Updated**: December 7, 2025  
**Version**: 1.0  
**Status**: Production Ready
