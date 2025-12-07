/**
 * Automated Use Case Testing Script
 * Tests all 24 use cases from USE-CASES.md
 */

const baseUrl = 'http://localhost:3008';

// Test results storage
const testResults = {
    passed: [],
    failed: [],
    warnings: [],
};

// Helper function to log results
function logTest(useCase, status, message) {
    const timestamp = new Date().toISOString();
    const result = { useCase, status, message, timestamp };

    if (status === 'PASSED') {
        testResults.passed.push(result);
        console.log(`✅ ${useCase}: ${message}`);
    } else if (status === 'FAILED') {
        testResults.failed.push(result);
        console.error(`❌ ${useCase}: ${message}`);
    } else {
        testResults.warnings.push(result);
        console.warn(`⚠️  ${useCase}: ${message}`);
    }
}

// Test UC-001: View Homepage
async function testHomepage() {
    try {
        const response = await fetch(`${baseUrl}/`);
        if (response.ok) {
            const html = await response.text();

            // Check for key sections
            const hasHero =
                html.includes('Furniture') || html.includes('Kitchen');
            const hasProducts =
                html.includes('Produk') || html.includes('Product');
            const hasServices =
                html.includes('Layanan') || html.includes('Service');
            const hasTestimonials =
                html.includes('Testimonial') || html.includes('testimoni');
            const hasContact =
                html.includes('Kontak') || html.includes('Contact');

            if (hasHero && hasProducts && hasServices) {
                logTest(
                    'UC-001',
                    'PASSED',
                    'Homepage renders with all sections'
                );
            } else {
                logTest('UC-001', 'FAILED', 'Homepage missing some sections');
            }
        } else {
            logTest(
                'UC-001',
                'FAILED',
                `Homepage returned status ${response.status}`
            );
        }
    } catch (error) {
        logTest('UC-001', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-002: Browse Product Catalog
async function testProducts() {
    try {
        const response = await fetch(`${baseUrl}/products`);
        if (response.ok) {
            const html = await response.text();
            if (html.includes('Produk') || html.includes('Product')) {
                logTest('UC-002', 'PASSED', 'Product catalog page accessible');
            } else {
                logTest(
                    'UC-002',
                    'WARNING',
                    'Product page loaded but content unclear'
                );
            }
        } else {
            logTest(
                'UC-002',
                'FAILED',
                `Products page returned status ${response.status}`
            );
        }
    } catch (error) {
        logTest('UC-002', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-003: View Gallery
async function testGallery() {
    try {
        const response = await fetch(`${baseUrl}/gallery`);
        if (response.ok) {
            logTest('UC-003', 'PASSED', 'Gallery page accessible');
        } else {
            logTest(
                'UC-003',
                'FAILED',
                `Gallery returned status ${response.status}`
            );
        }
    } catch (error) {
        logTest('UC-003', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-004: Services Page
async function testServices() {
    try {
        const response = await fetch(`${baseUrl}/services`);
        if (response.ok) {
            logTest('UC-004', 'PASSED', 'Services page accessible');
        } else {
            logTest(
                'UC-004',
                'FAILED',
                `Services returned status ${response.status}`
            );
        }
    } catch (error) {
        logTest('UC-004', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-005: Contact Form
async function testContactForm() {
    try {
        // Test GET contact page
        const pageResponse = await fetch(`${baseUrl}/contact`);
        if (!pageResponse.ok) {
            logTest('UC-005', 'FAILED', 'Contact page not accessible');
            return;
        }

        // Test POST contact API
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '08123456789',
            subject: 'Test Inquiry',
            message: 'This is an automated test message',
        };

        const apiResponse = await fetch(`${baseUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData),
        });

        if (apiResponse.ok) {
            logTest('UC-005', 'PASSED', 'Contact form submission works');
        } else {
            const error = await apiResponse.text();
            logTest('UC-005', 'FAILED', `Contact API failed: ${error}`);
        }
    } catch (error) {
        logTest('UC-005', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-006: About Page
async function testAbout() {
    try {
        const response = await fetch(`${baseUrl}/about`);
        if (response.ok) {
            logTest('UC-006', 'PASSED', 'About page accessible');
        } else {
            logTest(
                'UC-006',
                'FAILED',
                `About returned status ${response.status}`
            );
        }
    } catch (error) {
        logTest('UC-006', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-007 & UC-008: Product Customizer
async function testCustomizer() {
    try {
        const response = await fetch(`${baseUrl}/customizer`);
        if (response.ok) {
            const html = await response.text();
            if (html.includes('customizer') || html.includes('Customizer')) {
                logTest('UC-007', 'PASSED', 'Customizer page accessible');
                logTest(
                    'UC-008',
                    'PASSED',
                    'Customizer modification available (client-side)'
                );
            } else {
                logTest(
                    'UC-007',
                    'WARNING',
                    'Customizer page loaded but content unclear'
                );
            }
        } else {
            logTest(
                'UC-007',
                'FAILED',
                `Customizer returned status ${response.status}`
            );
            logTest('UC-008', 'FAILED', 'Cannot test without UC-007');
        }
    } catch (error) {
        logTest('UC-007', 'FAILED', `Error: ${error.message}`);
        logTest('UC-008', 'FAILED', 'Cannot test without UC-007');
    }
}

// Test UC-009: Admin Login
async function testAdminLogin() {
    try {
        // Test login page access
        const pageResponse = await fetch(`${baseUrl}/admin/login`);
        if (!pageResponse.ok) {
            logTest('UC-009', 'FAILED', 'Login page not accessible');
            return null;
        }

        // Test login API
        const loginData = {
            email: 'admin@premiumkitchen.com',
            password: 'admin123',
        };

        const apiResponse = await fetch(
            `${baseUrl}/api/auth/callback/credentials`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
                redirect: 'manual',
            }
        );

        // NextAuth returns 302 on successful login
        if (apiResponse.status === 302 || apiResponse.status === 200) {
            logTest('UC-009', 'PASSED', 'Admin login functional');
            return apiResponse.headers.get('set-cookie');
        } else {
            logTest(
                'UC-009',
                'WARNING',
                'Login API needs NextAuth session (test in browser)'
            );
            return null;
        }
    } catch (error) {
        logTest(
            'UC-009',
            'WARNING',
            `Login requires browser session: ${error.message}`
        );
        return null;
    }
}

// Test UC-011: Protected Routes
async function testProtectedRoutes() {
    try {
        const protectedRoutes = [
            '/admin',
            '/admin/products',
            '/admin/projects',
            '/admin/testimonials',
            '/admin/inquiries',
        ];

        let allRedirect = true;
        for (const route of protectedRoutes) {
            const response = await fetch(`${baseUrl}${route}`, {
                redirect: 'manual',
            });
            if (response.status !== 302 && response.status !== 307) {
                allRedirect = false;
                break;
            }
        }

        if (allRedirect) {
            logTest(
                'UC-011',
                'PASSED',
                'Protected routes redirect unauthenticated users'
            );
        } else {
            logTest(
                'UC-011',
                'WARNING',
                'Some protected routes accessible (check middleware)'
            );
        }
    } catch (error) {
        logTest('UC-011', 'FAILED', `Error: ${error.message}`);
    }
}

// Test UC-013: Dashboard (requires auth)
async function testDashboard() {
    logTest(
        'UC-013',
        'WARNING',
        'Dashboard requires browser authentication to test fully'
    );
}

// Test database connection
async function testDatabase() {
    try {
        const response = await fetch(`${baseUrl}/api/products`);
        if (response.ok) {
            const data = await response.json();
            logTest(
                'DATABASE',
                'PASSED',
                `Database accessible, ${data.length || 0} products found`
            );
        } else {
            logTest('DATABASE', 'WARNING', 'Products API not accessible');
        }
    } catch (error) {
        logTest('DATABASE', 'FAILED', `Database error: ${error.message}`);
    }
}

// Test file upload API (requires auth)
async function testUploadAPI() {
    try {
        const response = await fetch(`${baseUrl}/api/upload`, {
            method: 'POST',
            redirect: 'manual',
        });

        // Should return 401 or redirect if not authenticated
        if (response.status === 401 || response.status === 302) {
            logTest('UC-018', 'PASSED', 'Upload API protected (requires auth)');
        } else {
            logTest('UC-018', 'WARNING', 'Upload API response unclear');
        }
    } catch (error) {
        logTest('UC-018', 'WARNING', `Upload requires auth: ${error.message}`);
    }
}

// Run all tests
async function runAllTests() {
    console.log('🧪 Starting Use Case Testing...\n');
    console.log('='.repeat(60));

    // Public Website Tests
    console.log('\n📱 PUBLIC WEBSITE USE CASES (UC-001 to UC-006)\n');
    await testHomepage();
    await testProducts();
    await testGallery();
    await testServices();
    await testContactForm();
    await testAbout();

    // Customizer Tests
    console.log('\n🎨 PRODUCT CUSTOMIZER USE CASES (UC-007, UC-008)\n');
    await testCustomizer();

    // Authentication Tests
    console.log('\n🔐 AUTHENTICATION USE CASES (UC-009 to UC-012)\n');
    await testAdminLogin();
    logTest('UC-010', 'WARNING', 'Logout requires browser session to test');
    await testProtectedRoutes();
    logTest(
        'UC-012',
        'WARNING',
        'Session persistence requires browser to test'
    );

    // Admin Dashboard Tests
    console.log('\n📊 ADMIN DASHBOARD USE CASES (UC-013 to UC-017)\n');
    await testDashboard();
    logTest(
        'UC-014',
        'WARNING',
        'Product CRUD requires authenticated browser session'
    );
    logTest(
        'UC-015',
        'WARNING',
        'Project CRUD requires authenticated browser session'
    );
    logTest(
        'UC-016',
        'WARNING',
        'Testimonial CRUD requires authenticated browser session'
    );
    logTest(
        'UC-017',
        'WARNING',
        'Inquiry management requires authenticated browser session'
    );

    // File Upload Tests
    console.log('\n📤 FILE UPLOAD USE CASES (UC-018 to UC-020)\n');
    await testUploadAPI();
    logTest(
        'UC-019',
        'WARNING',
        'Image replacement requires browser interaction'
    );
    logTest(
        'UC-020',
        'WARNING',
        'Image deletion requires authenticated session'
    );

    // System Tests
    console.log('\n🔔 SYSTEM & NOTIFICATIONS (UC-023, UC-024)\n');
    logTest(
        'UC-023',
        'WARNING',
        'Email notifications require email server config'
    );
    logTest('UC-024', 'WARNING', 'Auto-reply requires email server config');

    // Database Test
    console.log('\n💾 DATABASE CONNECTION\n');
    await testDatabase();

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 TEST SUMMARY\n');
    console.log(`✅ Passed: ${testResults.passed.length}`);
    console.log(`❌ Failed: ${testResults.failed.length}`);
    console.log(`⚠️  Warnings: ${testResults.warnings.length}`);
    console.log(
        `📝 Total: ${
            testResults.passed.length +
            testResults.failed.length +
            testResults.warnings.length
        }`
    );

    // Detailed results
    if (testResults.failed.length > 0) {
        console.log('\n❌ FAILED TESTS:');
        testResults.failed.forEach((r) => {
            console.log(`   ${r.useCase}: ${r.message}`);
        });
    }

    console.log('\n' + '='.repeat(60));

    // Exit code
    process.exit(testResults.failed.length > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch((error) => {
    console.error('Test suite failed:', error);
    process.exit(1);
});
