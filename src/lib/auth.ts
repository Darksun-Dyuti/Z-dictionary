import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (user) {
          session.user.id = user.id
        } else if (token) {
          session.user.id = token.sub as string
        }
      }
      return session
    },
  },
})
