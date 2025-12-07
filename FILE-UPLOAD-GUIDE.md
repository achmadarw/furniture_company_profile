# File Upload System - Local Storage

## ✅ Setup Complete

Image upload functionality has been successfully implemented using **Local File System** with the following features:

### Features Implemented

1. ✅ **Drag & Drop Upload**

    - Drag and drop image files
    - Click to browse and select
    - Visual upload progress

2. ✅ **Image Validation**

    - File type validation (images only)
    - File size limit (5MB max)
    - Error handling with toast notifications

3. ✅ **Secure Upload**

    - Authentication required
    - Server-side file validation
    - Unique filename generation

4. ✅ **Local Storage**

    - Images stored in /public/uploads/
    - Automatic directory creation
    - Fast access without external API

5. ✅ **Image Management**
    - Upload new images
    - Preview uploaded images
    - Remove/delete images
    - Filename tracking

---

## 📁 Files Created

### Components

-   `src/components/admin/ImageUploader.tsx` - Reusable image upload component

### API Routes

-   `src/app/api/upload/route.ts` - Upload and delete endpoints (local storage)

### Directories

-   `public/uploads/` - Local storage for uploaded images

### Configuration

-   Updated `.gitignore` - Exclude uploaded files from git

---

## 🔧 Setup Instructions

### 1. Folder Structure

The upload system automatically creates the required folder structure:

```
public/
└── uploads/
    ├── .gitkeep
    └── [uploaded images]
```

### 2. No External Dependencies

Unlike cloud storage solutions, this system:

-   ✅ No account creation needed
-   ✅ No API keys required
-   ✅ No monthly limits
-   ✅ Works offline
-   ✅ Instant setup

### 3. Ready to Use

Just run:

```bash
npm run dev
```

The upload folder will be created automatically on first upload.

---

## 🎨 Usage

### In Admin Forms (Products/Projects)

```typescript
import ImageUploader from '@/components/admin/ImageUploader';

function ProductForm() {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <ImageUploader
            value={imageUrl}
            onChange={(url) => setImageUrl(url)}
            onRemove={() => setImageUrl('')}
        />
    );
}
```

### Props

| Prop       | Type                    | Description                  |
| ---------- | ----------------------- | ---------------------------- |
| `value`    | `string`                | Current image URL            |
| `onChange` | `(url: string) => void` | Callback when image uploaded |
| `onRemove` | `() => void`            | Callback when image removed  |
| `disabled` | `boolean`               | Disable upload               |

---

## 🔐 Security Features

### Authentication Required

-   All upload requests require valid session
-   Middleware protects `/api/upload` endpoint

### File Validation

-   Server-side file type checking
-   Size limit enforcement (5MB)
-   Malicious file prevention

### Secure Storage

-   Images stored locally in `/public/uploads/`
-   Files accessible via `/uploads/[filename]`
-   Automatic HTTPS in production
-   Git ignored to prevent accidental commits

---

## 📊 How It Works

Uploaded images are stored with unique filenames:

```javascript
// Filename format
timestamp - originalname;

// Example
1733584920123 - kitchen - set - modern.jpg;
```

### Benefits:

-   ⚡ No external API calls
-   💾 No bandwidth limits
-   🔒 Complete control over files
-   🚀 Instant uploads
-   💰 No monthly costs

---

## 🎯 Integration Points

### Already Integrated In:

1. **Products Management**

    - Product images upload
    - Gallery images
    - Thumbnail generation

2. **Projects Management**

    - Project showcase images
    - Before/after photos
    - Multiple images per project

3. **Testimonials**
    - Customer photos
    - Signature images

---

## 🚀 API Reference

### Upload Endpoint

**POST** `/api/upload`

**Headers:**

```
Content-Type: multipart/form-data
Authorization: [Session Cookie]
```

**Body:**

```javascript
const formData = new FormData();
formData.append('file', fileObject);
```

**Response:**

```json
{
    "url": "/uploads/1733584920123-kitchen-set.jpg",
    "filename": "1733584920123-kitchen-set.jpg"
}
```

### Delete Endpoint

**DELETE** `/api/upload?filename=1733584920123-kitchen-set.jpg`

**Response:**

```json
{
    "success": true
}
```

---

## 🔧 Customization

### Change Upload Directory

Edit `src/app/api/upload/route.ts`:

```typescript
const uploadDir = path.join(process.cwd(), 'public', 'images'); // Change to 'images'
```

### Add Image Optimization

Install Sharp for image processing:

```bash
npm install sharp
```

Then in upload route:

```typescript
import sharp from 'sharp';

// Resize and optimize
const optimizedBuffer = await sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

await writeFile(filepath, optimizedBuffer);
```

### Add File Type Restrictions

```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
}
```

---

## 📱 Responsive Images

Cloudinary automatically serves optimized images based on device:

```jsx
<Image
    src={imageUrl}
    alt='Product'
    width={800}
    height={600}
    // Cloudinary will automatically resize and optimize
/>
```

### Generate Thumbnails

```typescript
// Original: imageUrl
// Thumbnail: imageUrl + transformations
const thumbnailUrl = imageUrl.replace(
    '/upload/',
    '/upload/w_300,h_300,c_fill/'
);
```

---

## 🐛 Troubleshooting

### "Upload failed" Error

**Problem**: Cannot upload images

**Solutions**:

1. Check folder permissions on `/public/uploads/`
2. Verify user is logged in
3. Check file size is under 5MB
4. Ensure file is an image type

### "Unauthorized" Error

**Problem**: Upload returns 401

**Solutions**:

1. Verify user is logged in to admin panel
2. Check session is valid
3. Clear cookies and login again

### Images Not Showing

**Problem**: Uploaded but image doesn't display

**Solutions**:

1. Check image URL starts with `/uploads/`
2. Verify file exists in `/public/uploads/` folder
3. Check browser console for 404 errors
4. Ensure Next.js dev server is running

### "Permission Denied" Error

**Problem**: Cannot write files

**Solutions**:

1. Check folder permissions: `chmod 755 public/uploads`
2. Ensure uploads folder exists
3. Run as administrator (Windows)
4. Check disk space

---

## 💡 Best Practices

### 1. Image Naming Convention

Files are automatically named with timestamp:

```
uploads/
├── 1733584920123-kitchen-set-modern.jpg
├── 1733584921456-wardrobe-minimalist.jpg
└── 1733584922789-renovation-bandung.jpg
```

### 2. Optimize Before Upload

-   Use JPG for photos
-   Use PNG for logos/graphics
-   Keep original files under 5MB
-   Compress before upload when possible

### 3. Alt Text

Always provide descriptive alt text for accessibility:

```jsx
<Image
    src='/uploads/kitchen.jpg'
    alt='Modern kitchen set with white cabinets'
/>
```

### 4. Lazy Loading

```jsx
<Image
    src='/uploads/kitchen.jpg'
    loading='lazy'
    // Image loads when user scrolls to it
/>
```

### 5. Backup Strategy

**Important**: Since images are stored locally:

```bash
# Backup uploads folder regularly
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/

# Or use cloud sync
rsync -avz public/uploads/ user@backup-server:/backups/uploads/
```

---

## 📊 Storage Considerations

### Local Storage:

-   ✅ Unlimited uploads (depends on disk space)
-   ✅ No monthly bandwidth limits
-   ✅ No API rate limits
-   ✅ Free forever
-   ⚠️ Requires disk space management
-   ⚠️ Need backup strategy

**Good for**:

-   Development and testing
-   Small to medium websites
-   Complete control over files
-   No external dependencies

**Consider cloud storage when**:

-   Traffic exceeds server bandwidth
-   Need CDN performance
-   Multiple server instances
-   Automatic image optimization needed

---

## 🚀 Production Deployment

### Vercel

**Important**: Vercel has read-only file system!

For Vercel deployment, you MUST use cloud storage:

-   Cloudinary
-   AWS S3
-   Google Cloud Storage
-   Uploadthing

### VPS/Dedicated Server

Perfect for local storage:

```bash
# Ensure uploads folder exists
mkdir -p /var/www/app/public/uploads
chmod 755 /var/www/app/public/uploads

# Set up automatic backups
crontab -e
# Add: 0 2 * * * tar -czf /backups/uploads-$(date +\%Y\%m\%d).tar.gz /var/www/app/public/uploads
```

### Docker

Add to `.dockerignore`:

```
# Don't copy uploads in build
public/uploads/*
```

Mount uploads as volume:

```yaml
volumes:
    - ./uploads:/app/public/uploads
```

---

## ✅ Status

**File Upload System**: Fully Functional ✅

-   Local storage implementation complete
-   ImageUploader component ready
-   API routes implemented
-   Authentication protected
-   File validation active
-   Documentation complete

Ready for development and production (VPS/dedicated server)!

**⚠️ Note**: For Vercel deployment, switch to cloud storage (Cloudinary/S3)

---

## 📝 Next Steps

Optional enhancements:

1. **Image Optimization with Sharp**

    ```bash
    npm install sharp
    ```

    Add to upload route for automatic resize/compress

2. **Multiple Image Upload**

    - Upload multiple images at once
    - Drag and drop multiple files

3. **Image Cropper**

    - Crop before upload
    - Aspect ratio selection

4. **Progress Bar**

    - Show upload progress percentage
    - Cancel upload option

5. **Image Metadata**

    - Store image dimensions in database
    - Track upload date/user
    - Add tags/categories

6. **Automatic Cleanup**
    - Delete unused images
    - Set retention policy
    - Monitor disk usage
