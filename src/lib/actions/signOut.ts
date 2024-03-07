import { getSession, lucia } from '@/auth';
import { cookies } from 'next/headers';
import { ActionResponse } from '@/lib/actions/types/ActionResponse';
import { URL_SIGN_IN } from '@/lib/constants';

export default async function signOut(): Promise<ActionResponse> {
    'use server';

    const session = await getSession();
    if (!session) {
        return {
            type: 'error',
            message: 'You aren\'t signed in',
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return {
        type: 'success',
        message: 'Signed out successfully',
        redirect: URL_SIGN_IN,
    };
}
