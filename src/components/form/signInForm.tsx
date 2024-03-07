'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { signInFormSchema } from '@/lib/form-schemas/signInFormSchema';
import { ActionResponse } from '@/lib/actions/types/ActionResponse';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { sonnerContent } from '@/components/ui/sonner';

export default function SignInForm({onSubmit}: {
    onSubmit: (data: z.infer<typeof signInFormSchema>) => Promise<ActionResponse>
}) {

    const router = useRouter();

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const handleSubmit = async (data: z.infer<typeof signInFormSchema>) => {
        const response = await onSubmit(data);
        toast(sonnerContent(response));
        if (response.redirect) {
            router.push(response.redirect);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Sign in</Button>
            </form>
        </Form>
    );
}
