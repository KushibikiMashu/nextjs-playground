import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async redirect(url, baseUrl) {
      return `${baseUrl}/next-auth`
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  theme: 'light',
  debug: true,
})
