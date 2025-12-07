import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { addInquiry } from '@/lib/data/store';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message, projectType, budget } =
            body;

        // Save inquiry to data store
        addInquiry({
            name,
            email,
            phone,
            subject,
            message,
            projectType,
            budget,
            status: 'new',
        });

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email to admin
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `[Inquiry] ${subject}`,
            html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telepon:</strong> ${phone}</p>
        ${
            projectType
                ? `<p><strong>Jenis Proyek:</strong> ${projectType}</p>`
                : ''
        }
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
        });

        // Auto-reply to customer
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Terima kasih atas pesan Anda - Premium Kitchen Set',
            html: `
        <h2>Terima kasih, ${name}!</h2>
        <p>Kami telah menerima pesan Anda dan akan segera menghubungi Anda.</p>
        <p>Tim kami akan merespon dalam waktu 1x24 jam.</p>
        <br>
        <p><strong>Detail Pesan Anda:</strong></p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong> ${message}</p>
        <br>
        <p>Salam hangat,</p>
        <p><strong>Premium Kitchen Set Team</strong></p>
        <p>Telepon: ${process.env.NEXT_PUBLIC_COMPANY_PHONE}</p>
        <p>Email: ${process.env.NEXT_PUBLIC_COMPANY_EMAIL}</p>
      `,
        });

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
