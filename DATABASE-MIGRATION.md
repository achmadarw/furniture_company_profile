# Database Migration Guide

## Setup Prisma Database

Website ini sekarang support **2 mode data storage**:

1. **In-Memory Store** (Default) - Data temporary, hilang saat restart
2. **Prisma Database** (Recommended for Production) - Persistent data dengan SQLite/PostgreSQL/MySQL

---

## ✅ Prisma Database Sudah Di-Setup

Database schema dan migrations sudah dibuat dengan model:

-   `Product` - Product catalog
-   `Project` - Portfolio projects
-   `Testimonial` - Customer reviews
-   `Inquiry` - Contact form submissions
-   `User` - Admin authentication (future)

---

## 🔄 Cara Migrasi dari In-Memory ke Database

### Step 1: Update Import di Admin Pages

Ganti import dari `store.ts` ke `db.ts` di semua admin pages:

#### File: `src/app/admin/page.tsx`

```typescript
// BEFORE
import {
    getProducts,
    getProjects,
    getTestimonials,
    getInquiries,
} from '@/lib/data/store';

// AFTER
import {
    getProducts,
    getProjects,
    getTestimonials,
    getInquiries,
} from '@/lib/data/db';
```

#### File: `src/app/admin/products/page.tsx`

```typescript
// BEFORE
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/data/store';

// AFTER
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/data/db';
```

#### File: `src/app/admin/projects/page.tsx`

```typescript
// BEFORE
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
} from '@/lib/data/store';

// AFTER
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
} from '@/lib/data/db';
```

#### File: `src/app/admin/testimonials/page.tsx`

```typescript
// BEFORE
import {
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '@/lib/data/store';

// AFTER
import {
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '@/lib/data/db';
```

#### File: `src/app/admin/inquiries/page.tsx`

```typescript
// BEFORE
import { getInquiries, updateInquiry, deleteInquiry } from '@/lib/data/store';

// AFTER
import { getInquiries, updateInquiry, deleteInquiry } from '@/lib/data/db';
```

#### File: `src/app/api/contact/route.ts`

```typescript
// BEFORE
import { addInquiry } from '@/lib/data/store';

// AFTER
import { addInquiry } from '@/lib/data/db';
```

### Step 2: Update Admin Pages to Async

Karena database operations adalah async, update component logic:

#### Example: `src/app/admin/products/page.tsx`

```typescript
// Add useState and useEffect
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    }
    loadProducts();
}, []);

// Update CRUD operations to async
const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
        await deleteProduct(id);
        const updated = await getProducts();
        setProducts(updated);
        toast.success('Deleted successfully');
    }
};

const handleSave = async () => {
    // ... save logic
    const updated = await getProducts();
    setProducts(updated);
    setShowModal(false);
};
```

### Step 3: Restart Development Server

```bash
npm run dev
```

---

## 🗄️ Database Commands

### View Database Content

```bash
npm run db:studio
```

Buka Prisma Studio di browser untuk melihat dan edit data secara visual.

### Create New Migration

```bash
npm run db:migrate
```

Jalankan setelah mengubah schema di `prisma/schema.prisma`.

### Seed Database

```bash
npm run db:seed
```

Populate database dengan sample data.

### Reset Database

```bash
npx prisma migrate reset
```

⚠️ **WARNING**: Akan menghapus semua data!

---

## 🔧 Change Database Provider

### Dari SQLite ke PostgreSQL

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

3. Run migration:

```bash
npm run db:migrate
```

### Dari SQLite ke MySQL

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

3. Run migration:

```bash
npm run db:migrate
```

---

## 📊 Database Schema

### Products Table

```sql
- id: String (CUID)
- name: String
- category: String
- description: String
- images: String (JSON)
- priceMin: Int
- priceMax: Int
- materials: String (JSON)
- featured: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

### Projects Table

```sql
- id: String (CUID)
- title: String
- category: String
- description: String
- location: String
- afterImage: String
- images: String (JSON)
- clientName: String?
- testimonial: String?
- featured: Boolean
- completionDate: DateTime
- createdAt: DateTime
- updatedAt: DateTime
```

### Testimonials Table

```sql
- id: String (CUID)
- name: String
- role: String
- image: String?
- rating: Int
- comment: String
- projectType: String
- createdAt: DateTime
- updatedAt: DateTime
```

### Inquiries Table

```sql
- id: String (CUID)
- name: String
- email: String
- phone: String
- subject: String
- message: String
- projectType: String?
- budget: String?
- status: String (new/contacted/quoted/closed)
- createdAt: DateTime
- updatedAt: DateTime
```

---

## 🚀 Production Deployment

### Vercel + PostgreSQL (Recommended)

1. Create Vercel Postgres database di dashboard
2. Copy connection string
3. Add to Vercel environment variables:
    ```
    DATABASE_URL="your-postgres-connection-string"
    ```
4. Deploy aplikasi
5. Run migrations di Vercel:
    ```bash
    vercel env pull
    npx prisma migrate deploy
    ```

### Railway

1. Create new project di Railway
2. Add PostgreSQL service
3. Copy `DATABASE_URL` dari Railway dashboard
4. Add ke environment variables
5. Deploy dan Railway akan auto-run migrations

---

## ⚠️ Important Notes

### JSON Fields

SQLite tidak support native JSON type, jadi kita store sebagai string:

```typescript
// Saat save ke database
images: JSON.stringify(['url1', 'url2']);

// Saat read dari database
images: JSON.parse(product.images);
```

### Date Handling

```typescript
// Convert string to Date object
completionDate: new Date(formData.completionDate);

// Display date
new Date(project.completionDate).toLocaleDateString();
```

### TypeScript Types

Prisma auto-generate types di `node_modules/@prisma/client`, tapi kita tetap menggunakan custom types di `src/types/index.ts` untuk konsistensi dengan frontend.

---

## 🔍 Troubleshooting

### Error: "PrismaClient is unable to be run in the browser"

**Solution**: Make sure you're only importing Prisma in server components or API routes, not client components.

### Error: "Can't reach database server"

**Solution**: Check `DATABASE_URL` di `.env` file. Untuk SQLite, pastikan path file valid.

### Error: "Migration failed"

**Solution**:

1. Backup data jika ada
2. Delete `prisma/migrations` folder
3. Delete `prisma/dev.db` (SQLite only)
4. Run `npm run db:migrate` lagi

### Data tidak muncul setelah seed

**Solution**:

1. Check file `prisma/dev.db` exists
2. Run `npm run db:studio` untuk verify data
3. Restart development server

---

## 📚 Resources

-   [Prisma Documentation](https://www.prisma.io/docs)
-   [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
-   [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
-   [Next.js with Prisma](https://www.prisma.io/nextjs)

---

**Status**: Database setup complete ✅  
**Next Step**: Update admin pages imports untuk menggunakan `db.ts` instead of `store.ts`
