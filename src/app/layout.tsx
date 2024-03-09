import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
import { ThemeProvider } from '@/components/themeProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Next Base',
    description: 'The base for your next project.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn(inter.className)}>
        <main>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster/>
            </ThemeProvider>
        </main>
        </body>
        </html>
    );
}
