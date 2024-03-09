import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { URL_ACCOUNT } from '@/lib/constants';
import { ThemeToggle } from '@/components/themeToggle';

export default async function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center text-3xl relative">
            <div className="absolute flex items-center space-x-4 top-4 right-4">
                <ThemeToggle/>
                <Button variant="outline" size="icon" asChild>
                    <Link href={URL_ACCOUNT}>
                        <User/>
                    </Link>
                </Button>
            </div>
            Next Base
        </main>
    );
}
