# Authentication System - Implementation Guide

## ✅ Setup Complete

Authentication system has been successfully implemented using **NextAuth.js v5** with the following features:

### Features Implemented

1. ✅ **Credential-based Authentication**

    - Email & password login
    - Secure password hashing with bcryptjs
    - JWT-based session management

2. ✅ **Protected Admin Routes**

    - Middleware protection for `/admin/*` routes
    - Auto-redirect to login if not authenticated
    - Auto-redirect to dashboard if already logged in

3. ✅ **User Management**

    - User model in Prisma schema
    - Admin user creation script
    - Role-based access control (ready for future)

4. ✅ **Login Page**

    - Beautiful, responsive login UI
    - Loading states
    - Error handling with toast notifications
    - Demo credentials displayed

5. ✅ **Session Management**
    - User session in admin layout header
    - Logout functionality
    - Session persists across page refreshes

---

## 📁 Files Created

### Core Authentication

-   `src/auth.ts` - NextAuth configuration
-   `src/app/api/auth/[...nextauth]/route.ts` - API route handler
-   `src/middleware.ts` - Route protection middleware
-   `src/types/next-auth.d.ts` - TypeScript type definitions

### UI Components

-   `src/app/admin/login/page.tsx` - Login page
-   `src/components/admin/AdminAuthProvider.tsx` - Session provider wrapper
-   `src/app/admin/layout.tsx` - Admin layout with session

### Scripts

-   `scripts/create-admin.js` - Admin user creation script

### Configuration

-   Updated `.env.local` with NEXTAUTH_URL and NEXTAUTH_SECRET
-   Updated `package.json` with `create:admin` script

---

## 🔐 Admin Credentials

### Default Admin User

```
Email: admin@premiumkitchen.com
Password: admin123
```

---

## 🚀 Usage

### Access Admin Dashboard

1. Navigate to: `http://localhost:3008/admin`
2. You'll be redirected to: `http://localhost:3008/admin/login`
3. Enter credentials and click "Sign In"
4. You'll be redirected to admin dashboard

### Create New Admin User

```bash
npm run create:admin
```

This will create a user with:

-   Email: `admin@premiumkitchen.com`
-   Password: `admin123`
-   Role: `admin`

### Logout

Click the "Logout" button in the admin sidebar

---

## 🔧 Configuration

### Environment Variables

Add to `.env.local`:

```env
NEXTAUTH_URL="http://localhost:3008"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
```

**Important for Production**:

-   Generate a secure `NEXTAUTH_SECRET`:
    ```bash
    openssl rand -base64 32
    ```
-   Update `NEXTAUTH_URL` to your production domain

---

## 📊 Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // hashed with bcryptjs
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🛡️ Security Features

### Password Hashing

-   Uses **bcryptjs** with salt rounds of 10
-   Passwords never stored in plain text

### JWT Sessions

-   Stateless authentication
-   Secure token storage
-   Auto-refresh on activity

### Route Protection

-   Middleware checks authentication before allowing access
-   Protects all `/admin/*` routes except `/admin/login`
-   Redirects to login if session expired

### CSRF Protection

-   Built-in CSRF token validation
-   Secure cookie settings

---

## 🎨 Customization

### Change Login Page Design

Edit `src/app/admin/login/page.tsx`:

```typescript
// Change logo, colors, text, etc.
```

### Add More Authentication Providers

Edit `src/auth.ts`:

```typescript
import Google from 'next-auth/providers/google';

providers: [
    Credentials({ ... }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
],
```

### Customize Session Data

Edit `src/auth.ts` callbacks:

```typescript
async jwt({ token, user }) {
    if (user) {
        token.customField = user.customField;
    }
    return token;
},
```

---

## 👥 User Roles (Future Enhancement)

The system is ready for role-based access:

```typescript
// Check role in components
const { data: session } = useSession();
if (session?.user?.role === 'admin') {
    // Show admin-only features
}

// Protect specific routes by role
// Add to middleware.ts
if (pathname.startsWith('/admin/settings')) {
    if (session?.user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
}
```

### Possible Roles

-   `admin` - Full access
-   `editor` - Can edit content
-   `viewer` - Read-only access

---

## 🧪 Testing

### Test Login Flow

1. Go to `http://localhost:3008/admin`
2. Should redirect to login
3. Enter valid credentials
4. Should redirect to dashboard
5. Refresh page - should stay logged in

### Test Protected Routes

1. Logout from admin panel
2. Try accessing `http://localhost:3008/admin/products`
3. Should redirect to login

### Test Session Persistence

1. Login to admin
2. Refresh page multiple times
3. Session should persist
4. User info should display in header

---

## 🐛 Troubleshooting

### "Invalid email or password" Error

**Problem**: Cannot login with correct credentials

**Solutions**:

1. Check if admin user exists:

    ```bash
    npm run db:studio
    ```

    Look for user in Users table

2. Re-create admin user:
    ```bash
    # Delete existing user in Prisma Studio
    npm run create:admin
    ```

### Session Not Persisting

**Problem**: Gets logged out on page refresh

**Solutions**:

1. Check `NEXTAUTH_SECRET` is set in `.env.local`
2. Clear browser cookies and try again
3. Check browser console for errors

### Redirect Loop

**Problem**: Keeps redirecting between login and dashboard

**Solutions**:

1. Check middleware.ts logic
2. Clear browser cache and cookies
3. Restart development server

### "NEXTAUTH_URL mismatch" Error

**Problem**: URL doesn't match environment

**Solutions**:

1. Check `.env.local` has correct `NEXTAUTH_URL`
2. Match the port (3008 in this project)
3. Restart dev server after changing .env

---

## 📚 API Reference

### Server-Side Authentication

```typescript
import { auth } from '@/auth';

// In Server Component or API Route
const session = await auth();
if (!session) {
    redirect('/admin/login');
}
```

### Client-Side Authentication

```typescript
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

function Component() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <div>Loading...</div>;
    if (!session) return <div>Not authenticated</div>;

    return <div>Hello {session.user.name}</div>;
}
```

### Sign In

```typescript
import { signIn } from 'next-auth/react';

await signIn('credentials', {
    email: 'admin@example.com',
    password: 'password',
    redirect: false,
});
```

### Sign Out

```typescript
import { signOut } from 'next-auth/react';

await signOut({
    callbackUrl: '/admin/login',
});
```

---

## 🚀 Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard:

    ```
    NEXTAUTH_URL="https://yourdomain.com"
    NEXTAUTH_SECRET="generated-secret-key"
    DATABASE_URL="your-production-db-url"
    ```

2. Deploy:

    ```bash
    vercel deploy --prod
    ```

3. Create admin user on production:
    - SSH into server or use Vercel CLI
    - Run: `node scripts/create-admin.js`

### Other Platforms

Same process: Set environment variables, deploy, create admin user.

---

## 📝 Next Steps

Optional enhancements:

1. **Email Verification**

    - Add email verification on signup
    - Password reset functionality

2. **Multi-Factor Authentication**

    - Add TOTP/SMS verification
    - Backup codes

3. **Social Login**

    - Google, Facebook, GitHub OAuth
    - Easier login for users

4. **Activity Logs**

    - Track admin actions
    - Audit trail for security

5. **User Management UI**
    - Add/edit/delete users from admin panel
    - Role management interface

---

## ✅ Status

**Authentication System**: Fully Functional ✅

-   Login/Logout working
-   Route protection active
-   Session management stable
-   Admin user created
-   Documentation complete

Ready for production use!
