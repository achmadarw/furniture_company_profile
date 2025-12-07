# Setup Guide - Furniture Company Website

## Prerequisites

-   Node.js 18+ installed
-   npm or yarn package manager
-   Git (optional)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env.local` file in root directory:

```env
# Email Configuration (Gmail example)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
EMAIL_FROM="noreply@furniturecompany.com"
ADMIN_EMAIL="admin@furniturecompany.com"

# Company Information
NEXT_PUBLIC_COMPANY_NAME="Premium Kitchen Set"
NEXT_PUBLIC_COMPANY_PHONE="+62 812-3456-7890"
NEXT_PUBLIC_COMPANY_EMAIL="info@furniturecompany.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="+6281234567890"
```

#### Getting Gmail App Password:

1. Go to Google Account settings
2. Security > 2-Step Verification
3. App passwords
4. Generate new app password
5. Copy password to EMAIL_PASSWORD

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Customization Guide

### Update Company Information

1. **Logo & Branding**

    - Replace logo in `src/components/layout/Navbar.tsx`
    - Update colors in `tailwind.config.ts`

2. **Content**

    - Homepage: `src/app/page.tsx`
    - About: `src/app/about/page.tsx`
    - Services: `src/app/services/page.tsx`
    - Contact: `src/app/contact/page.tsx`

3. **Images**
    - Replace Unsplash URLs with your own images
    - Store in `public/images/` directory
    - Update imports in components

### Add New Pages

1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/layout/Navbar.tsx`

Example:

```typescript
// src/app/blog/page.tsx
export default function BlogPage() {
    return <div>Blog Content</div>;
}
```

### Styling

#### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#fef8f3',
    // ... your colors
    900: '#73372c',
  },
}
```

#### Fonts

Update in `src/app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({ subsets: ['latin'] });
```

## Email Setup

### Gmail

1. Enable 2-factor authentication
2. Create app-specific password
3. Use in EMAIL_PASSWORD

### SMTP Services

-   **SendGrid**: More reliable for production
-   **Mailgun**: Good for transactional emails
-   **AWS SES**: Cost-effective for high volume

Update `EMAIL_HOST` and `EMAIL_PORT` accordingly.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

#### Netlify

```bash
npm run build
# Deploy dist folder
```

#### Railway/Render

-   Set build command: `npm run build`
-   Set start command: `npm start`
-   Add environment variables

## Features Checklist

✅ Responsive design
✅ Contact form with email
✅ Gallery with lightbox
✅ Product showcase
✅ SEO optimized
✅ Performance optimized
✅ Animations

🔲 Admin dashboard (future)
🔲 Database integration (future)
🔲 Payment gateway (future)
🔲 Blog/CMS (future)

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Email Not Sending

-   Check EMAIL_PASSWORD is app-specific password
-   Verify SMTP settings
-   Check firewall/antivirus
-   Test with console.log in API route

### Build Errors

```bash
# Clear cache
rm -rf .next
npm run build
```

## Support

For issues or questions:

-   Check documentation
-   Review error logs
-   Contact: info@premiumkitchen.com

## License

Copyright © 2025 Premium Kitchen Set
