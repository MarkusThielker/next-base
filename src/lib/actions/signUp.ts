import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { lucia, prismaClient } from '@/auth';
import { cookies } from 'next/headers';
import { signUpFormSchema } from '@/lib/form-schemas/signUpFormSchema';
import { ActionResponse } from '@/lib/actions/types/ActionResponse';
import { URL_HOME } from '@/lib/constants';

export default async function signUp({username, password}: z.infer<typeof signUpFormSchema>): Promise<ActionResponse> {
    'use server';

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const existingUser = await prismaClient.user.findFirst({
        where: {
            username: username.toLowerCase(),
        },
    });

    if (existingUser) {
        return {
            type: 'error',
            message: 'Username already exists',
        };
    }

    await prismaClient.user.create({
        data: {
            id: userId,
            username: username,
            password: hashedPassword,
        },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return {
        type: 'success',
        message: 'Signed up successfully',
        redirect: URL_HOME,
    };
}
