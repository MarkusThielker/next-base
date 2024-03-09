import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { getUser } from '@/auth';
import { redirect } from 'next/navigation';
import signOut from '@/lib/actions/signOut';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SignOutForm from '@/components/form/signOutForm';
import { URL_HOME, URL_SIGN_IN } from '@/lib/constants';

export default async function AccountPage() {

    const user = await getUser();

    if (!user) {
        redirect(URL_SIGN_IN);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center relative">
            <Button variant="outline" size="icon" className="absolute top-4 left-4" asChild>
                <Link href={URL_HOME}>
                    <ChevronLeft/>
                </Link>
            </Button>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Hey, {user?.username}!</CardTitle>
                    <CardDescription>This is your account overview.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <Label>ID</Label>
                        <Input
                            disabled
                            value={user?.id}/>
                    </div>
                    <div>
                        <Label>Username</Label>
                        <Input
                            disabled
                            value={user?.username}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <SignOutForm onSubmit={signOut}/>
                </CardFooter>
            </Card>
        </div>
    );
}
