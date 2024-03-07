import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import signUp from '@/lib/actions/signUp';
import SignUpForm from '@/components/form/signUpForm';
import Link from 'next/link';
import { URL_SIGN_IN } from '@/lib/constants';

export default async function SignUpPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm onSubmit={signUp}/>
            </CardContent>
            <CardFooter>
                <Link href={URL_SIGN_IN}>
                    Already have an account? Sign in
                </Link>
            </CardFooter>
        </Card>
    );
}
