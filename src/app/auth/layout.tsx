import React from 'react';
import { ThemeToggle } from '@/components/themeToggle';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen items-center justify-center relative">
            <div className="absolute top-4 right-4">
                <ThemeToggle/>
            </div>
            {children}
        </div>
    );
}
