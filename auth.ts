import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import db from "@/db/drizzle";
import { sendVerification } from "./lib/auth-send-request";

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Github,
    Google,
    Resend({
      from: process.env.RESEND_EMAIL!,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        return sendVerification({
          identifier: email,
          url,
          provider: { server, from },
        });
      },
    }),
  ],
  pages: {
    signIn: "/v2/signin",
    verifyRequest: "/v2/verify-request",
  },
});
