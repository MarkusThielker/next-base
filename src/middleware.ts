import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { URL_AUTH, URL_HOME, URL_SIGN_IN } from './lib/constants';

export async function middleware(request: NextRequest) {

    // get session id from cookies
    const sessionId = request.cookies.get('auth_session')?.value ?? null;

    // redirect to home if user is already authenticated
    if (request.nextUrl.pathname.startsWith(URL_AUTH) && sessionId) {
        return NextResponse.redirect(new URL(URL_HOME, request.url));
    }

    // redirect to sign in if user is not authenticated
    if (!request.nextUrl.pathname.startsWith(URL_AUTH) && !sessionId) {
        return NextResponse.redirect(new URL(URL_SIGN_IN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
