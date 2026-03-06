import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth"
import bcrypt from "bcrypt";

import { connectDB } from "./db";
import User from "@/modules/user/user.model";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {}               
      }, 

      async authorize(credentials: any) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null

          return {
            id: user._id,
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.log("Error in authorize callback:", error)
          return null;                  
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "github") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            githubId: profile?.id,
            name: user.name,
            avatar: user.image,
          });
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }: any) {
      // This runs when user first logs in
      if (account && profile) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      if (account?.provider === "github" && profile) {
        token.id = String(profile.id);
      }
      if (account?.provider === "credentials" && user) {
        token.id = String(user.id);
        token.provider = "credentials";
      }
      return token;
    },

    async session({ session, token }: any) {
      // This runs on every request — copy token data into session
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Signout -> Homepage
      if (url === baseUrl || url === "/") return baseUrl;
      // Login -> Dashboard
      if (url.startsWith(baseUrl)) return url;
      return baseUrl + "/dashboard";
    }
  },

  pages: {
    signIn: "/auth/login"
  },

  secret: process.env.NEXTAUTH_SECRET
}