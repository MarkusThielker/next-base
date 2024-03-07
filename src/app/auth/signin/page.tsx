import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SignInForm from '@/components/form/signInForm';
import signIn from '@/lib/actions/signIn';
import Link from 'next/link';
import { URL_SIGN_UP } from '@/lib/constants';

export default async function SignInPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Sign into your existing account</CardDescription>
            </CardHeader>
            <CardContent>
                <SignInForm onSubmit={signIn}/>
            </CardContent>
            <CardFooter>
                <Link href={URL_SIGN_UP}>
                    Don&apos;t have an account? Sign up
                </Link>
            </CardFooter>
        </Card>
    );
}
