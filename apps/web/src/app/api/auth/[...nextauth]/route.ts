/**
 * NextAuth.js route handler — Next.js App Router.
 * Providers: CredentialsProvider (calls the API login endpoint) + GoogleProvider.
 */
import NextAuth from 'next-auth'

import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
