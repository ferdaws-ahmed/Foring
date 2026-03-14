import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Terminal Access",
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("foring_uav");

        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("ACCESS_DENIED: OPERATOR_NOT_FOUND");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("ACCESS_DENIED: INVALID_KEY");
        }

        // --- আপডেট করা অংশ শুরু ---
        
        // ৪. শুধুমাত্র অ্যাডমিনদের জন্য OTP চেক
        if (user.role === "admin") {
          const currentTime = new Date();
          
          if (!credentials.otp || credentials.otp !== user.currentOtp) {
            throw new Error("AUTH_FAIL: INVALID_2FA");
          }
          if (currentTime > user.otpExpires) {
            throw new Error("AUTH_FAIL: CODE_EXPIRED");
          }

          // ৫. অ্যাডমিনদের জন্য কালার + মাস্টার কি ভেরিফিকেশন
          const SERVER_COLOR_SEQUENCE = process.env.NEXT_PUBLIC_COLOR_SEQUENCE;
          if (credentials.colorSequence !== SERVER_COLOR_SEQUENCE) {
            throw new Error("SECURITY_ALERT: COLOR_PATTERN_MISMATCH");
          }

          const ENV_MASTER_KEY = process.env.MASTER_SECURITY_KEY;
          if (credentials.masterKey !== ENV_MASTER_KEY) {
            throw new Error("TERMINAL_LOCKED: MASTER_KEY_MISMATCH");
          }

          // অ্যাডমিন লগইন সফল হলে ওটিপি ক্লিন করা
          await db.collection("users").updateOne(
            { _id: user._id },
            { $set: { currentOtp: null, otpExpires: null } }
          );
        }

        // --- আপডেট করা অংশ শেষ ---

        return { 
          id: user._id.toString(), 
          email: user.email, 
          role: user.role, 
          name: user.name 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };