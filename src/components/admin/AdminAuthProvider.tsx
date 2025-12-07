'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function AdminAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
