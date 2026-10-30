/**
 * NextAuth configuration.
 *
 * Strategy: JWT (stateless) — the role claim from the API is embedded in the
 * NextAuth JWT and surfaced on the session so server components and middleware
 * can read it without a database call.
 *
 * Providers:
 *   - CredentialsProvider  — calls POST /api/auth/login on the Express API
 *   - GoogleProvider       — OAuth 2.0 via Google
 */
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:4000'

export const authOptions: NextAuthOptions = {
  // Use JWT strategy — no database adapter needed for session storage
  session: { strategy: 'jwt' },

  providers: [
    // ── Credentials ─────────────────────────────────────────────────────────
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:    credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) return null

        const data = (await res.json()) as {
          accessToken: string
          user: { id: string; email: string; role: string }
        }

        // Return shape must match the User type augmented below
        return {
          id:          data.user.id,
          email:       data.user.email,
          role:        data.user.role,
          accessToken: data.accessToken,
        }
      },
    }),

    // ── Google OAuth ─────────────────────────────────────────────────────────
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID     ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    // Embed role + accessToken into the JWT on sign-in
    async jwt({ token, user }) {
      if (user) {
        token['role']        = (user as { role?: string }).role ?? 'BUYER'
        token['accessToken'] = (user as { accessToken?: string }).accessToken
      }
      return token
    },

    // Expose role on the session so client components can read it
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id     = token.sub ?? ''
        ;(session.user as { role?: string }).role = token['role'] as string
      }
      ;(session as { accessToken?: string }).accessToken = token['accessToken'] as string
      return session
    },
  },

  pages: {
    signIn: '/login',
    error:  '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
