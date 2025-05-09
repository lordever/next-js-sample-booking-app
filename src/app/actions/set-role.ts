'use server';

import { cookies } from 'next/headers';

export async function setRole(role: 'user' | 'admin') {
  cookies().set('role', role, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24,
  });
}
