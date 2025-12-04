import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type AuthUser = {
  id: string;
  name?: string;
  email?: string;
};

const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        if (user.length === 0) return null;

        if (!user[0].password) return null;

        const validPassword = await bcrypt.compare(
          credentials.password,
          user[0].password
        );

        if (!validPassword) return null;

        // IMPORTANT: convert id to string because NextAuth requires it
        return {
          id: String(user[0].id),
          name: user[0].username ?? "",
          email: user[0].email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as { id: string }).id = token.id as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
