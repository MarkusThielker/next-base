import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { URL_ACCOUNT } from '@/lib/constants';

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 text-3xl space-y-4 relative">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" asChild>
                <Link href={URL_ACCOUNT}>
                    <User/>
                </Link>
            </Button>
            Next Base
        </main>
    );
}
