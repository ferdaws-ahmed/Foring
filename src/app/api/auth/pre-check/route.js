import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("foring_uav"); // তোর ডাটাবেস নাম
    
    // ১. ইউজারকে খুঁজে বের করা
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "OPERATOR_NOT_FOUND" }, { status: 404 });
    }

    // ২. পাসওয়ার্ড ভেরিফিকেশন (Bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "INVALID_SECURITY_KEY" }, { status: 401 });
    }

    // ৩. ওটিপি জেনারেট এবং ১ মিনিটের এক্সপায়ারি সেট করা
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // ঠিক ১ মিনিট

    // ৪. ডাটাবেসে ওটিপি আপডেট করা (Native MongoDB Syntax)
    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { currentOtp: otp, otpExpires: otpExpires } }
    );

    // ৫. Nodemailer দিয়ে ইমেইল পাঠানো
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Foring Terminal" <no-reply@foring.uav>',
      to: user.email,
      subject: "TERMINAL ACCESS CODE",
      html: `
        <div style="background:#050505; color:#fff; padding:30px; border:1px solid #fbbf24; font-family:monospace;">
          <h2 style="color:#fbbf24;">ACCESS REQUEST DETECTED</h2>
          <p>Verify your identity with this code:</p>
          <h1 style="font-size:40px; letter-spacing:10px;">${otp}</h1>
          <p style="color:red;">WARNING: This code expires in 60 seconds.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, role: user.role });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "TERMINAL_ERROR" }, { status: 500 });
  }
}