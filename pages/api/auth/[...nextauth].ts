import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: { username: string; password: string },
        req
      ) {
        const user = { id: 1, name: "admin", email: "admin@svit.com" };
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        )
          return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
