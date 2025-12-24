# 🔧 Quick Fix untuk Error Build Vercel

## Error yang Terjadi

```
Type error: Property 'fullWidth' does not exist on type 'ButtonProps'
```

## Solusi yang Diterapkan

Menambahkan property `fullWidth` ke component Button untuk kompatibilitas.

## Langkah Deploy Ulang

### 1. Commit dan Push Perubahan

```bash
git add .
git commit -m "Fix: Add fullWidth prop to Button component for Vercel build"
git push origin main
```

### 2. Vercel Auto-Deploy

Setelah push, Vercel akan otomatis detect perubahan dan build ulang. Cek di:

-   [Vercel Dashboard](https://vercel.com/dashboard) → Pilih project Anda
-   Tab "Deployments" untuk melihat progress

### 3. Jika Masih Ada Error

Jalankan build test secara lokal terlebih dahulu:

```bash
# Install dependencies
npm install

# Test build
npm run build
```

Jika build lokal berhasil tapi Vercel gagal:

1. **Cek Environment Variables**

    - Pastikan semua env vars sudah diset di Vercel
    - Minimal yang diperlukan: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`

2. **Clear Build Cache**

    - Di Vercel Dashboard → Settings
    - Scroll ke "Build & Development Settings"
    - Klik "Redeploy" dengan opsi "Clear cache and deploy"

3. **Cek Node Version**
    - Vercel default menggunakan Node.js versi terbaru
    - Jika perlu specify versi, tambahkan di `package.json`:
    ```json
    "engines": {
      "node": ">=18.0.0"
    }
    ```

## Files yang Diupdate

-   ✅ [src/components/ui/Button.tsx](src/components/ui/Button.tsx) - Menambahkan `fullWidth` prop
-   ✅ [VERCEL-DEPLOYMENT-GUIDE.md](VERCEL-DEPLOYMENT-GUIDE.md) - Update troubleshooting section

## Setelah Deploy Sukses

Jangan lupa untuk:

1. **Setup Database** (jika belum):

    ```bash
    npx prisma migrate deploy
    ```

2. **Create Admin User**:

    ```bash
    npm run create:admin
    ```

3. **Test Website**:
    - Buka URL Vercel Anda
    - Test semua halaman
    - Test admin login

---

💡 **Tip**: Untuk menghindari error build di masa depan, selalu jalankan `npm run build` secara lokal sebelum push ke GitHub.
