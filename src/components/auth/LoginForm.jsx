"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import toast, { Toaster } from "react-hot-toast";
import ColorGridSecurity from "./ColorSecurity";
import MasterKeyModal from "./MasterKey";

export default function LoginPage() {
  const [step, setStep] = useState("credentials"); 
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [colorSequence, setColorSequence] = useState(""); // নতুন স্টেট: কালার আইডিগুলো রাখার জন্য
  const router = useRouter();

  const handlePreCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/pre-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unknown Operator");

      setRole(data.role);
      setStep("2fa"); 
      toast.success(`Access Code Sent to ${data.role.toUpperCase()} Email`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (role === "admin") {
      setStep("color_grid"); 
    } else {
      completeAuth(); 
    }
  };

  const completeAuth = async (finalData = {}) => {
    setLoading(true);
    const res = await signIn("credentials", {
      ...formData,
      otp,
      // কালার সিকোয়েন্স এবং মাস্টার কি দুটোই ব্যাকএন্ডে পাঠানো হচ্ছে
      colorSequence: colorSequence || "", 
      masterKey: finalData.masterKey || "",
      isColorVerified: finalData.isColorVerified ? "true" : "false",
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      // যদি সিকিউরিটি ফেল করে তবে একদম শুরুতে পাঠিয়ে দেওয়া নিরাপদ
      if(res.error.includes("SECURITY")) setStep("credentials");
    } else {
      toast.success("Identity Verified. Accessing Hangar...");
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020202] font-mono text-white">
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10"><Logo /></div>

          {step === "credentials" && (
            <form onSubmit={handlePreCheck} className="space-y-4">
              <input 
                type="email" placeholder="OPERATOR_ID" 
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl text-center outline-none focus:border-yellow-500/40"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input 
                type="password" placeholder="SECURITY_KEY" 
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl text-center outline-none focus:border-yellow-500/40 tracking-widest"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button className="w-full py-4 bg-yellow-500 text-black font-black uppercase italic rounded-xl">
                {loading ? "SEARCHING..." : "INITIALIZE"}
              </button>
            </form>
          )}

          {step === "2fa" && (
            <form onSubmit={handleOTPVerify} className="space-y-6">
              <p className="text-[10px] text-center text-white/40">ENTER 6-DIGIT AUTH CODE</p>
              <input 
                type="text" maxLength="6" placeholder="0 0 0 0 0 0" 
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl text-xl text-center font-black tracking-[0.5em] outline-none"
                value={otp} onChange={(e) => setOtp(e.target.value)} required
              />
              <button className="w-full py-4 bg-blue-600 text-white font-black uppercase italic rounded-xl">
                CONTINUE
              </button>
            </form>
          )}

          {step === "color_grid" && (
            <ColorGridSecurity 
              // এখানে sequence রিসিভ করে স্টেটে রাখা হচ্ছে
              onSuccess={(sequence) => {
                setColorSequence(sequence);
                setStep("master_key");
              }}
              onFail={() => {
                toast.error("Security Breach: Sequence Invalid");
                setStep("credentials");
              }}
            />
          )}

          {step === "master_key" && (
            <MasterKeyModal
              onConfirm={(key) => completeAuth({ isColorVerified: true, masterKey: key })}
              onFail={() => setStep("credentials")} // টাইম আউট হলে ব্যাক করবে
            />
          )}

        </div>
      </div>
    </div>
  );
}