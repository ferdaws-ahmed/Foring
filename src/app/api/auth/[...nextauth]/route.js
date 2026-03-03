import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Terminal Access",
      async authorize(credentials) {
        // ১. সরাসরি MongoDB কানেকশন
        const client = await clientPromise;
        const db = client.db("foring_uav");

        // ২. ইউজার খুঁজে বের করা
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("ACCESS_DENIED: OPERATOR_NOT_FOUND");
        }

        // ৩. পাসওয়ার্ড ভেরিফিকেশন
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("ACCESS_DENIED: INVALID_KEY");
        }

        // ৪. OTP চেক (সবার জন্য)
        const currentTime = new Date();
        if (credentials.otp !== user.currentOtp) {
          throw new Error("AUTH_FAIL: INVALID_2FA");
        }
        if (currentTime > user.otpExpires) {
          throw new Error("AUTH_FAIL: CODE_EXPIRED");
        }

        // ৫. এডমিনদের জন্য স্পেশাল সিকিউরিটি লেয়ার (Color + Master Key)
       if (user.role === "admin") {
          
          // ক) কালার সিকোয়েন্স ভেরিফিকেশন (Blind Validation)
          const SERVER_COLOR_SEQUENCE = process.env.NEXT_PUBLIC_COLOR_SEQUENCE; // .env থেকে সঠিক সিকোয়েন্স নিচ্ছি
          
          if (credentials.colorSequence !== SERVER_COLOR_SEQUENCE) {
            throw new Error("SECURITY_ALERT: COLOR_PATTERN_MISMATCH");
          }

          // খ) মাস্টার কি চেক (সরাসরি .env থেকে)
          const ENV_MASTER_KEY = process.env.MASTER_SECURITY_KEY;
          if (credentials.masterKey !== ENV_MASTER_KEY) {
            throw new Error("TERMINAL_LOCKED: MASTER_KEY_MISMATCH");
          }
        }
        // ৬. সফল হলে ডাটাবেস থেকে ওটিপি ক্লিন করা (One-time use security)
        await db.collection("users").updateOne(
          { _id: user._id },
          { $set: { currentOtp: null, otpExpires: null } }
        );

        // ৭. সেশন ডাটা রিটার্ন
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