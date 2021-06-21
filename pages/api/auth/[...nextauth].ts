import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { logger } from '../../../lib/logger';

export default NextAuth({
  logger: {
    error(code, ...message) {
      logger.error(message)
    },
    warn(code, ...message) {
      logger.warn(code, message)
    },
    debug(code, ...message) {
      logger.info(code, message)
    }
  },
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
        logger.info("Calling authorize with credentials: " + JSON.stringify(credentials, null, 2))
        const user = { id: 1, name: "admin", email: "admin@svit.com" };
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          logger.info("Credentials accepted!!")
          return user;
        }
        logger.warn("Credentials invalid!")
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
