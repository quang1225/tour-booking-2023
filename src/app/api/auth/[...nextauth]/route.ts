import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
import prisma from '@/app/admin/(utils)/prisma'

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    // }),
  ],
  callbacks: {
    async signIn(data) {
      const { name = '', email, image = '' } = data.user
      if (!email) return false

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      // CREATE NEW USER IF LOGGED BY SOCIAL ACCOUNTS FIRST TIME
      if (!user) {
        await prisma.user.create({
          data: {
            email: email,
            fullname: name,
            avatar: image,
            isEmailVerified: true,
          },
        })
        return true
      }

      if (!user.isActive) {
        return false
      }

      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
