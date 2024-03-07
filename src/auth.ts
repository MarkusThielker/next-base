import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

export const prismaClient = new PrismaClient();

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
        };
    },
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}

export function getSessionId() {
    return cookies().get(lucia.sessionCookieName)?.value ?? null;
}

export async function getSession() {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    const {session} = await lucia.validateSession(sessionId);
    return session;
}

export async function getUser() {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    const {user, session} = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch {
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return user;
}
