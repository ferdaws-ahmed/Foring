import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | Foring B2B",
  description: "Join the drone fleet network",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0f1a] overflow-hidden flex items-center justify-center">
      {/* Background Decorative Elements - মাথা নষ্ট ভাইব দেওয়ার জন্য */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      {/* Main Register Form Component */}
      <div className="relative z-10 w-full">
        <RegisterForm />
      </div>

      {/* Footer System Status */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">
          System Status: <span className="text-green-500 animate-pulse">Operational</span> | Node: Dhaka_South_01
        </p>
      </div>
    </main>
  );
}