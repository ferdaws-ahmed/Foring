"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginToast = toast.loading("Verifying credentials...");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error("Access Denied! Check Email or Password", { id: loginToast });
        setLoading(false);
      } else {
        toast.success("Login Successful! Redirecting...", { id: loginToast });
        
        // ড্যাশবোর্ডে পাঠানোর আগে একটু ডিলে যাতে টোস্ট দেখা যায়
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      toast.error("System Error! Try again later", { id: loginToast });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a] px-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
            <span className="text-2xl">🚁</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Foring <span className="text-yellow-500 font-mono italic">B2B</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Mission Control Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Email Terminal</label>
            <input
              type="email"
              placeholder="admin@foring.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 p-4 rounded-xl text-white focus:border-yellow-500 outline-none transition-all placeholder:text-slate-700 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Access Key</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 p-4 rounded-xl text-white focus:border-yellow-500 outline-none transition-all placeholder:text-slate-700 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-black tracking-widest uppercase transition-all shadow-xl ${
              loading 
              ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
              : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/10 active:scale-[0.98]"
            }`}
          >
            {loading ? "Processing..." : "Initiate Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">
            Don't have an account? <span onClick={() => router.push('/register')} className="text-yellow-500 cursor-pointer hover:underline underline-offset-4">Register Base</span>
          </p>
        </div>
      </div>
    </div>
  );
}