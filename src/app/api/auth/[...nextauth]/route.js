import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // তোর আগে বানানো Firebase Client config

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // ১. Firebase Client SDK দিয়ে লগইন চেক
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          
          const user = userCredential.user;

          if (user) {
            // ২. রোল ডিফাইন করা (আপাতত ইমেইল দিয়ে চেক করছি, তুই পরে Firestore থেকে ডাটা আনতে পারবি)
            const role = user.email.includes("admin") ? "admin" : "agent";

            return {
              id: user.uid,
              email: user.email,
              name: user.displayName || user.email.split("@")[0],
              role: role,
            };
          }
          return null;
        } catch (error) {
          // Firebase-এর এরর মেসেজ হ্যান্ডলিং
          console.error("Auth Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    // JWT টোকেনে রোল ঢুকানো
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // সেশনে রোল পাস করা যাতে client-side এ useSession() দিয়ে পাওয়া যায়
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // তোর কাস্টম লগইন পেজ পাথ
  },
  session: {
    strategy: "jwt", // সেশন ম্যানেজমেন্টের জন্য JWT ব্যবহার করছি
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };