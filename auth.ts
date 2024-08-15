import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "@/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const response = await loginUser({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (response.success && response.user) {
          return response.user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
});
