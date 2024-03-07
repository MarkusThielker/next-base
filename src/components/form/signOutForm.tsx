'use client';

import { ActionResponse } from '@/lib/actions/types/ActionResponse';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { sonnerContent } from '@/components/ui/sonner';

export default function SignOutForm({onSubmit}: { onSubmit: () => Promise<ActionResponse> }) {

    const router = useRouter();

    const handleSignOut = async () => {
        const response = await onSubmit();
        toast(sonnerContent(response));
        if (response.redirect) {
            router.push(response.redirect);
        }
    };

    return (
        <Button className="w-full" onClick={handleSignOut}>Sign out</Button>
    );
}
