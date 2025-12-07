# Use Case Documentation - Premium Kitchen Set Website

## 📋 Table of Contents

1. [Public Website Use Cases](#public-website-use-cases)
2. [Admin Dashboard Use Cases](#admin-dashboard-use-cases)
3. [Authentication Use Cases](#authentication-use-cases)
4. [Product Customizer Use Cases](#product-customizer-use-cases)
5. [File Upload Use Cases](#file-upload-use-cases)

---

## 🌐 Public Website Use Cases

### UC-001: View Homepage

**Actor**: Visitor (Unauthenticated User)

**Precondition**: None

**Flow**:

1. User navigates to website homepage
2. System displays hero section with company tagline
3. System shows about section with company overview
4. System displays featured products (3 items)
5. System shows service offerings
6. System displays recent projects gallery
7. System shows customer testimonials
8. System displays contact information and CTA

**Postcondition**: User gains overview of company services

**Alternative Flow**: None

---

### UC-002: Browse Product Catalog

**Actor**: Visitor

**Precondition**: None

**Flow**:

1. User clicks "Produk" in navigation menu
2. System displays product catalog page
3. System shows all available products with:
    - Product image
    - Product name
    - Category
    - Short description
    - Price range
4. User can click on product for details
5. System displays detailed product information

**Postcondition**: User views product offerings

**Alternative Flow**:

-   3a. No products available → System shows "No products yet" message

---

### UC-003: View Project Gallery

**Actor**: Visitor

**Precondition**: None

**Flow**:

1. User clicks "Galeri" in navigation menu
2. System displays project gallery page
3. System shows completed projects in grid layout
4. Each project shows:
    - Project image
    - Project name
    - Location
    - Category
5. User clicks on project
6. System displays full project details and images

**Postcondition**: User views company portfolio

**Alternative Flow**:

-   3a. No projects → System shows "No projects yet" message

---

### UC-004: Learn About Services

**Actor**: Visitor

**Precondition**: None

**Flow**:

1. User clicks "Layanan" in navigation menu
2. System displays services page
3. System shows 4 main services:
    - Custom Kitchen Set
    - Custom Furniture
    - Interior Design
    - Professional Installation
4. Each service displays:
    - Service icon
    - Service name
    - Detailed description
    - Benefits
    - Process overview

**Postcondition**: User understands service offerings

---

### UC-005: Submit Contact Inquiry

**Actor**: Visitor

**Precondition**: None

**Flow**:

1. User clicks "Kontak" in navigation menu
2. System displays contact form
3. User fills in:
    - Name (required)
    - Email (required, must be valid format)
    - Phone (required)
    - Subject (required)
    - Message (required)
4. User clicks "Send Message"
5. System validates all fields
6. System saves inquiry to database
7. System sends email notification to admin
8. System sends auto-reply to customer
9. System shows success message

**Postcondition**:

-   Inquiry saved in database
-   Admin notified via email
-   Customer receives confirmation

**Alternative Flow**:

-   5a. Validation fails → System shows error messages for invalid fields
-   6a. Database error → System shows "Failed to send message" error
-   7a. Email fails → Inquiry still saved, admin checks dashboard

---

### UC-006: Read About Company

**Actor**: Visitor

**Precondition**: None

**Flow**:

1. User clicks "Tentang" in navigation menu
2. System displays about page showing:
    - Company history
    - Mission and vision
    - Core values
    - Team introduction
    - Achievements and certifications
    - Why choose us section

**Postcondition**: User learns about company background

---

## 🎨 Product Customizer Use Cases

### UC-007: Design Custom Kitchen Set

**Actor**: Potential Customer

**Precondition**: None

**Flow**:

1. User clicks "Customizer" in navigation
2. System displays customizer interface
3. User enters dimensions:
    - Width (100-600 cm)
    - Height (100-300 cm)
    - Depth (30-100 cm)
4. System calculates total surface area
5. User selects material from 4 options:
    - Plywood Standard (Rp 250k/m²)
    - MDF Premium (Rp 350k/m²)
    - Solid Wood (Rp 650k/m²)
    - HPL Coating (Rp 450k/m²)
6. User selects finish:
    - Matte (+0%)
    - Glossy (+15%)
    - Textured (+25%)
    - Lacquer (+35%)
7. User selects hardware tier:
    - Basic (Rp 500k)
    - Standard (Rp 1M)
    - Premium (Rp 2M)
    - Luxury (Rp 3.5M)
8. User toggles additional services:
    - Professional Installation (+15% of material)
    - Delivery (Rp 200k-600k based on volume)
9. System calculates total price in real-time
10. User clicks "Request Quote"
11. System generates detailed quote
12. System copies quote to clipboard
13. System shows success message

**Postcondition**:

-   User has price estimate
-   Quote copied to clipboard
-   User can contact company to proceed

**Alternative Flow**:

-   3a. Invalid dimensions → System shows validation error
-   10a. Copy fails → System shows quote text in modal to manually copy

**Business Rules**:

-   Base price = Material price × Total area
-   Finish cost = Base price × Finish modifier
-   Installation = (Finish + Hardware) × 15%
-   Delivery = Volume-based (200k/400k/600k)
-   Total = Finish + Hardware + Installation + Delivery

---

### UC-008: Modify Custom Design

**Actor**: Potential Customer

**Precondition**: User is on customizer page

**Flow**:

1. User changes any parameter (dimension/material/finish/hardware)
2. System immediately recalculates:
    - Surface area
    - Material cost
    - Finish cost
    - Hardware cost
    - Installation cost
    - Delivery cost
    - Total price
3. System updates price summary sidebar
4. System shows new total price

**Postcondition**: Price updated to reflect new selections

**Alternative Flow**: None

---

## 🔐 Authentication Use Cases

### UC-009: Admin Login

**Actor**: Administrator

**Precondition**:

-   Admin account exists in database
-   User is not logged in

**Flow**:

1. User navigates to `/admin` or `/admin/login`
2. System displays login page
3. User enters credentials:
    - Email: admin@premiumkitchen.com
    - Password: admin123
4. User clicks "Sign In"
5. System validates credentials against database
6. System creates JWT session token
7. System redirects to admin dashboard
8. System displays welcome message

**Postcondition**:

-   User authenticated
-   Session created
-   Redirected to dashboard

**Alternative Flow**:

-   5a. Invalid credentials → System shows "Invalid email or password" error
-   5b. Account doesn't exist → System shows "Invalid email or password" error
-   6a. Database error → System shows "Login failed" error

**Security Notes**:

-   Password hashed with bcryptjs (10 salt rounds)
-   JWT token stored in secure HTTP-only cookie
-   Session expires after inactivity

---

### UC-010: Admin Logout

**Actor**: Administrator

**Precondition**: User is logged in

**Flow**:

1. User clicks "Logout" button in admin sidebar
2. System confirms logout action
3. System destroys session
4. System clears authentication cookies
5. System redirects to login page
6. System shows "Logged out successfully" message

**Postcondition**:

-   Session destroyed
-   User logged out
-   Redirected to login page

---

### UC-011: Access Protected Route

**Actor**: Administrator

**Precondition**: User is logged in

**Flow**:

1. User navigates to any `/admin/*` route
2. Middleware checks for valid session
3. Session exists and is valid
4. System allows access to requested page

**Postcondition**: User accesses protected route

**Alternative Flow**:

-   3a. No session → System redirects to `/admin/login`
-   3b. Session expired → System redirects to `/admin/login` with message
-   3c. Invalid session → System destroys session and redirects to login

---

### UC-012: Automatic Session Persistence

**Actor**: Administrator

**Precondition**: User is logged in

**Flow**:

1. User browses admin pages
2. User refreshes browser
3. Middleware validates session token
4. Session is still valid
5. User remains logged in
6. User continues working

**Postcondition**: User session persists across page refreshes

**Alternative Flow**:

-   4a. Session expired → User redirected to login

---

## 📊 Admin Dashboard Use Cases

### UC-013: View Dashboard Overview

**Actor**: Administrator

**Precondition**: User is logged in

**Flow**:

1. User logs in or navigates to `/admin`
2. System displays dashboard with:
    - Personalized greeting (Good Morning/Afternoon/Evening + name)
    - Current date
    - Statistics cards:
        - Total Products count
        - Total Projects count
        - Total Testimonials count
        - New Inquiries count (status: new)
    - Recent inquiries (5 latest)
    - Activity summary sidebar
    - System status indicators
    - Quick action buttons
3. System fetches real-time data from database
4. System displays change percentages for metrics

**Postcondition**: Admin sees business overview

---

### UC-014: Manage Products (CRUD)

**Actor**: Administrator

**Precondition**: User is logged in

**Sub Use Cases**:

#### UC-014.1: Create Product

**Flow**:

1. User clicks "Manage Products" or navigates to `/admin/products`
2. System displays product list
3. User clicks "Add New Product" button
4. System displays product creation form
5. User fills in:
    - Product name (required)
    - Category (Kitchen Set/Wardrobe/TV Cabinet/etc)
    - Description (required)
    - Price (required, number)
    - Image URL (optional, can upload)
6. User can upload image using ImageUploader
7. User clicks "Create Product"
8. System validates all fields
9. System saves product to database
10. System shows success toast
11. System redirects to product list

**Postcondition**: New product created and visible in catalog

**Alternative Flow**:

-   8a. Validation fails → System shows error messages
-   9a. Database error → System shows "Failed to create product" error

#### UC-014.2: View Product List

**Flow**:

1. User navigates to `/admin/products`
2. System displays all products in table format showing:
    - Product image (thumbnail)
    - Product name
    - Category
    - Price
    - Created date
    - Action buttons (Edit, Delete)
3. Products sorted by newest first

**Postcondition**: Admin sees all products

**Alternative Flow**:

-   2a. No products → System shows "No products yet" message

#### UC-014.3: Edit Product

**Flow**:

1. User clicks "Edit" button on product
2. System displays edit form pre-filled with current data
3. User modifies desired fields
4. User clicks "Update Product"
5. System validates changes
6. System updates product in database
7. System shows success toast
8. System updates product list

**Postcondition**: Product updated with new information

**Alternative Flow**:

-   5a. Validation fails → System shows errors
-   6a. Database error → System shows "Update failed" error

#### UC-014.4: Delete Product

**Flow**:

1. User clicks "Delete" button on product
2. System shows confirmation dialog
3. User confirms deletion
4. System removes product from database
5. System shows success toast
6. System updates product list

**Postcondition**: Product permanently deleted

**Alternative Flow**:

-   3a. User cancels → No action taken
-   4a. Database error → System shows "Delete failed" error

---

### UC-015: Manage Projects (CRUD)

**Actor**: Administrator

**Precondition**: User is logged in

**Sub Use Cases**: Similar structure to UC-014

#### UC-015.1: Create Project

**Flow**:

1. User navigates to `/admin/projects`
2. User clicks "Add New Project"
3. User fills in:
    - Project name (required)
    - Location (required)
    - Category (Residential/Commercial)
    - Description (required)
    - Client name (optional)
    - Completion date (optional)
    - Images (can upload multiple)
4. User uploads project images
5. User clicks "Create Project"
6. System validates and saves

**Postcondition**: New project added to portfolio

#### UC-015.2: View Projects

**Flow**:

1. User views project list in table
2. System displays project cards with images
3. Admin can see all project details

#### UC-015.3: Edit Project

**Flow**:

1. User edits project information
2. User can add/remove images
3. System updates project

#### UC-015.4: Delete Project

**Flow**:

1. User deletes project
2. System removes from portfolio

---

### UC-016: Manage Testimonials (CRUD)

**Actor**: Administrator

**Precondition**: User is logged in

#### UC-016.1: Create Testimonial

**Flow**:

1. User navigates to `/admin/testimonials`
2. User clicks "Add New Testimonial"
3. User fills in:
    - Customer name (required)
    - Company/Role (optional)
    - Rating (1-5 stars, required)
    - Testimonial text (required)
    - Customer photo (optional, can upload)
    - Date (optional)
4. User uploads customer photo if available
5. User clicks "Create Testimonial"
6. System validates and saves

**Postcondition**: New testimonial added

#### UC-016.2: Approve/Reject Testimonial

**Flow**:

1. User reviews testimonial
2. User can approve or reject
3. Only approved testimonials show on public site

#### UC-016.3: Edit Testimonial

**Flow**:

1. User edits testimonial content
2. System updates testimonial

#### UC-016.4: Delete Testimonial

**Flow**:

1. User deletes testimonial
2. System removes from database

---

### UC-017: Manage Inquiries

**Actor**: Administrator

**Precondition**: User is logged in

#### UC-017.1: View Inquiries

**Flow**:

1. User navigates to `/admin/inquiries`
2. System displays all customer inquiries with:
    - Customer name
    - Email
    - Phone
    - Subject
    - Message
    - Status (new/contacted/quoted/closed)
    - Submission date
3. Inquiries sorted by newest first
4. New inquiries highlighted

**Postcondition**: Admin sees all customer messages

#### UC-017.2: Update Inquiry Status

**Flow**:

1. User selects inquiry
2. User changes status dropdown:
    - New → Contacted
    - Contacted → Quoted
    - Quoted → Closed
3. System updates status
4. System shows status badge color-coded:
    - New: Red
    - Contacted: Blue
    - Quoted: Yellow
    - Closed: Green

**Postcondition**: Inquiry status updated

#### UC-017.3: Respond to Inquiry

**Flow**:

1. User clicks on inquiry
2. User views full inquiry details
3. User can:
    - Copy email to respond directly
    - Copy phone to call
    - Mark as contacted
    - Add internal notes (future feature)

**Postcondition**: Admin can follow up with customer

#### UC-017.4: Delete Inquiry

**Flow**:

1. User deletes old/spam inquiries
2. System removes from database

---

## 📤 File Upload Use Cases

### UC-018: Upload Product Image

**Actor**: Administrator

**Precondition**:

-   User is logged in
-   User is creating/editing product

**Flow**:

1. User in product form
2. User sees ImageUploader component
3. User drags and drops image OR clicks to browse
4. System validates file:
    - Must be image (jpg/png/webp)
    - Max size 5MB
5. System shows upload progress
6. System sends file to `/api/upload`
7. API validates authentication
8. API generates unique filename with timestamp
9. API creates `/public/uploads/` directory if not exists
10. API saves file to disk
11. API returns file URL: `/uploads/timestamp-filename.jpg`
12. System updates form with image URL
13. System shows image preview
14. System displays success toast

**Postcondition**:

-   Image uploaded to server
-   Image URL saved in form
-   Preview visible

**Alternative Flow**:

-   4a. Invalid file type → System shows "Please upload an image file"
-   4b. File too large → System shows "Image must be less than 5MB"
-   7a. Not authenticated → API returns 401 Unauthorized
-   10a. Disk write fails → System shows "Upload failed"

---

### UC-019: Replace Uploaded Image

**Actor**: Administrator

**Precondition**:

-   User is logged in
-   Image already uploaded in form

**Flow**:

1. User sees current image preview
2. User hovers over image
3. System shows "Remove" button
4. User clicks remove button
5. System clears image URL from form
6. System removes image preview
7. User can upload new image (see UC-018)

**Postcondition**:

-   Old image removed from form
-   Ready for new upload

**Alternative Flow**: None

**Note**: Old file remains on disk (manual cleanup required)

---

### UC-020: Delete Uploaded Image (API)

**Actor**: Administrator (via system)

**Precondition**:

-   User is logged in
-   File exists on server

**Flow**:

1. System calls DELETE `/api/upload?filename=image.jpg`
2. API validates authentication
3. API checks if file exists in `/public/uploads/`
4. API deletes file from disk
5. API returns success response

**Postcondition**: File removed from server

**Alternative Flow**:

-   2a. Not authenticated → API returns 401
-   3a. File not found → API still returns success (idempotent)
-   4a. Delete fails → API returns 500 error

---

## 📱 Responsive & Performance Use Cases

### UC-021: Mobile Navigation

**Actor**: Mobile User

**Precondition**: User on mobile device

**Flow**:

1. User visits website on mobile
2. System detects screen size < 1024px
3. System shows hamburger menu icon
4. User clicks hamburger menu
5. System opens mobile navigation drawer
6. User clicks navigation link
7. System closes drawer and navigates
8. System displays mobile-optimized page

**Postcondition**: User navigates on mobile device

---

### UC-022: Lazy Load Images

**Actor**: Any User

**Precondition**: Page with multiple images

**Flow**:

1. User scrolls page
2. System loads images only when near viewport
3. System shows placeholder while loading
4. System displays image when loaded

**Postcondition**:

-   Faster initial page load
-   Better performance

---

## 🔔 Notification Use Cases

### UC-023: Admin Email Notification

**Actor**: System

**Precondition**: Customer submits inquiry

**Flow**:

1. System receives new inquiry
2. System saves to database
3. System sends email to admin using Nodemailer
4. Email contains:
    - Customer name
    - Email
    - Phone
    - Subject
    - Message
    - Submission time
5. Admin receives email notification

**Postcondition**: Admin notified of new inquiry

**Alternative Flow**:

-   3a. Email fails → Inquiry still saved, admin checks dashboard

---

### UC-024: Customer Auto-Reply

**Actor**: System

**Precondition**: Customer submits inquiry

**Flow**:

1. System receives inquiry
2. System sends auto-reply email to customer
3. Email contains:
    - Thank you message
    - Confirmation of receipt
    - Expected response time
    - Company contact info
4. Customer receives confirmation

**Postcondition**: Customer knows inquiry received

---

## 🎯 Summary Statistics

### Total Use Cases: 24

**By Category**:

-   Public Website: 6 use cases
-   Product Customizer: 2 use cases
-   Authentication: 4 use cases
-   Admin Dashboard: 7 use cases
-   File Upload: 3 use cases
-   System/Notifications: 2 use cases

**Actors**:

1. Visitor (unauthenticated public user)
2. Potential Customer (using customizer)
3. Administrator (authenticated admin)
4. System (automated processes)

**Key Features**:

-   ✅ Complete CRUD for Products, Projects, Testimonials
-   ✅ Inquiry management with status tracking
-   ✅ Secure authentication with session management
-   ✅ Real-time price calculation in customizer
-   ✅ File upload with validation
-   ✅ Email notifications
-   ✅ Mobile responsive
-   ✅ Dashboard analytics

---

## 📊 User Journeys

### Journey 1: Customer Discovery to Quote

1. UC-001: View Homepage → Learn about company
2. UC-002: Browse Products → See offerings
3. UC-003: View Gallery → See completed work
4. UC-007: Design Custom Kitchen → Get price estimate
5. UC-005: Submit Inquiry → Request consultation

**Time**: 10-15 minutes
**Conversion**: Quote request

---

### Journey 2: Admin Daily Workflow

1. UC-009: Login → Access dashboard
2. UC-013: View Dashboard → Check new inquiries
3. UC-017: Manage Inquiries → Update status, respond
4. UC-014: Manage Products → Add new products
5. UC-018: Upload Images → Add product photos
6. UC-010: Logout → End session

**Time**: 30-60 minutes
**Result**: Content updated, customers contacted

---

### Journey 3: Mobile Customer

1. UC-001: View Homepage (mobile) → Browse on phone
2. UC-021: Mobile Navigation → Access menu
3. UC-007: Use Customizer (mobile) → Design kitchen
4. UC-005: Submit Inquiry (mobile) → Request quote

**Time**: 5-10 minutes
**Conversion**: Mobile inquiry

---

## ✅ Acceptance Criteria Summary

All use cases should meet:

-   ✅ Functional requirements working
-   ✅ Validation preventing invalid data
-   ✅ Error handling with user-friendly messages
-   ✅ Success feedback (toasts/messages)
-   ✅ Security checks (authentication/authorization)
-   ✅ Data persistence to database
-   ✅ Responsive design (mobile/tablet/desktop)
-   ✅ Performance (fast load times)
-   ✅ Accessibility (WCAG guidelines)

---

**Document Version**: 1.0
**Last Updated**: December 7, 2025
**Status**: Complete - All 24 use cases documented
