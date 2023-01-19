import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../users/findUser1";
import { db } from "../server";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const data = await db.user.findMany({
          where: {
            username: credentials.username,
            password: credentials.password,
          },
          include: {
            emply: true,
          },
        });
        //prisma check

        // const data = await res.json();
        if (data) {
          const ls = Object.keys(data).length;

          //console.log("asdasd", data[0].emply.name, ls);
          if (ls > 0) {
            // Any object returned will be saved in `user` property of the JWT
            const user = {
              id: credentials.username,
              name: data[0].emply.name,
              email: data[0].emply.designation,
            };
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },

  jwt: {
    secret: "nextaurthsecasf",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async redirect(url, baseUrl) {
      //console.log(">>>url", url);
      return url.baseUrl;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
