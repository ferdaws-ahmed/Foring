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
  const [colorSequence, setColorSequence] = useState(""); 
  const router = useRouter();

  // ১. প্রি-চেক লজিক আপডেট
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

      // কন্ডিশন: শুধুমাত্র রোল 'admin' হলে সিকিউরিটি লেয়ার শুরু হবে
      if (data.role === "admin") {
        setStep("2fa");
        toast.success(`Access Code Sent to Admin Email`);
      } else {
        // রোল যদি 'agency' বা অন্য কিছু হয়, তবে সরাসরি লগইন সম্পন্ন হবে
        toast.success(`Welcome, ${data.role.toUpperCase()}. Initializing Dashboard...`);
        completeAuth({ role: data.role });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ২. OTP ভেরিফিকেশন (এটি শুধু এডমিনের জন্যই আসবে)
  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (role === "admin") {
      setStep("color_grid"); 
    } else {
      // এটি মূলত ট্রিগার হবে না কারণ এজেন্সি সরাসরি লগইন হয়ে যাচ্ছে, তাও নিরাপত্তার জন্য রাখা
      completeAuth({ role }); 
    }
  };

  const completeAuth = async (finalData = {}) => {
    setLoading(true);
    const res = await signIn("credentials", {
      ...formData,
      otp: otp || "",
      colorSequence: colorSequence || "",
      masterKey: finalData.masterKey || "",
      isColorVerified: finalData.isColorVerified ? "true" : "false",
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Identity Verified. Accessing Terminal...");

      setTimeout(() => {
        // ডাইনামিক রাউটিং: ডাটাবেজের রোল অনুযায়ী রিডাইরেক্ট হবে
        const userRole = finalData.role || role; 
        
        if (userRole) {
          window.location.href = `/dashboard/${userRole}`;
        } else {
          window.location.href = "/dashboard";
        }
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020202] font-mono text-white">
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10"><Logo /></div>

          {/* স্টেপ ১: ইউজারনেম ও পাসওয়ার্ড */}
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
              <button disabled={loading} className="w-full py-4 bg-yellow-500 text-black font-black uppercase italic rounded-xl disabled:opacity-50">
                {loading ? "INITIALIZING..." : "INITIALIZE"}
              </button>
            </form>
          )}

          {/* স্টেপ ২: OTP (শুধুমাত্র এডমিনের জন্য) */}
          {step === "2fa" && (
            <form onSubmit={handleOTPVerify} className="space-y-6">
              <p className="text-[10px] text-center text-white/40 uppercase tracking-widest">Master Admin Auth Required</p>
              <input 
                type="text" maxLength="6" placeholder="0 0 0 0 0 0" 
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-xl text-xl text-center font-black tracking-[0.5em] outline-none"
                value={otp} onChange={(e) => setOtp(e.target.value)} required
              />
              <button className="w-full py-4 bg-blue-600 text-white font-black uppercase italic rounded-xl">
                VERIFY_CODE
              </button>
            </form>
          )}

          {/* স্টেপ ৩: কালার সিকিউরিটি (শুধুমাত্র এডমিনের জন্য) */}
          {step === "color_grid" && (
            <ColorGridSecurity 
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

          {/* স্টেপ ৪: মাস্টার কি (শুধুমাত্র এডমিনের জন্য) */}
          {step === "master_key" && (
            <MasterKeyModal
              onConfirm={(key) => completeAuth({ isColorVerified: true, masterKey: key, role: "admin" })}
              onFail={() => setStep("credentials")} 
            />
          )}

        </div>
      </div>
    </div>
  );
}