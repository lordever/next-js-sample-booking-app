import NextAuth from 'next-auth';
import { authOptions } from '@/services/auth-options.service';

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
